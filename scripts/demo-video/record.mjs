// Records one demo video: node scripts/demo-video/record.mjs <student|parent|counselor> [--frames]
// Needs the demo stack from docs/DEMO_VIDEOS.md (backend, seeded DB, frontend). Output: public/videos/<name>.{mp4,vtt,-poster.jpg}.
// --frames skips audio/encoding and saves a screenshot at the end of each segment into $FRAMES_DIR for a dry check.
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEMO_VIDEOS, captionText } from '../../src/data/demoVideos.js';
import { ACCOUNTS, TOURS } from './tours.mjs';

const name = process.argv[2];
const frames = process.argv.includes('--frames');
const video = DEMO_VIDEOS[name];
if (!video) { console.error('usage: record.mjs <student|parent|counselor> [--frames]'); process.exit(1); }

const APP = process.env.DEMO_APP_URL || 'http://localhost:5174';
const API = process.env.DEMO_API_URL || 'http://localhost:8001/api/v1';
const PASSWORD = process.env.DEMO_PASSWORD || 'DemoPass123!';
const VOICE = process.env.DEMO_VOICE || 'Samantha';
const RATE = process.env.DEMO_RATE || '172';
const GAP = 0.7; // seconds of quiet after each segment
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const work = join(process.env.DEMO_WORK_DIR || join(root, '.demo-work'), name);
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });
const framesDir = process.env.FRAMES_DIR || work;

const api = async (path, token, init = {}) => {
  const res = await fetch(`${API}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) } });
  return res.json();
};

// Ids the counselor tour needs: a returned review round to open read only.
async function lookupIds() {
  const { token } = await api('/auth/login/', null, { method: 'POST', body: JSON.stringify({ email: ACCOUNTS.counselor, password: PASSWORD }) });
  const org = (await api('/organizations/', token)).results[0].organization_id;
  const rounds = await api(`/organizations/${org}/review-requests/?status=returned`, token);
  return { returnedRound: rounds.results?.[0]?.round_id };
}

const CURSOR = `(() => {
  const dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;width:22px;height:22px;margin:-4px 0 0 -4px;border-radius:50%;background:rgba(79,70,229,.85);border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);transition:transform .12s;left:-50px;top:-50px';
  const add = () => document.documentElement.appendChild(dot);
  document.readyState === 'loading' ? addEventListener('DOMContentLoaded', add) : add();
  addEventListener('mousemove', (e) => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }, true);
  addEventListener('mousedown', () => { dot.style.transform = 'scale(.7)'; }, true);
  addEventListener('mouseup', () => { dot.style.transform = 'scale(1)'; }, true);
})();`;

const tourFlags = ['first-run', 'essays', 'matches', 'talk'].map((t) => `mascotai_tour_v1_${t}_done`);
const browser = await chromium.launch();

// 1. Sign in once, off camera, and keep the session.
const loginCtx = await browser.newContext({ viewport: { width: 1440, height: 810 } });
const lp = await loginCtx.newPage();
await lp.goto(`${APP}/login`);
await lp.fill('input[type=email]', ACCOUNTS[name]);
await lp.fill('input[type=password]', PASSWORD);
await lp.click('button[type=submit]');
await lp.waitForURL('**/app**', { timeout: 20000 });
await lp.evaluate((flags) => flags.forEach((k) => localStorage.setItem(k, '1')), tourFlags);
const state = await loginCtx.storageState();
await loginCtx.close();

// 2. Narration audio, one clip per segment.
const clips = video.segments.map((s, i) => {
  const file = join(work, `seg${i}.aiff`);
  if (!frames) execFileSync('say', ['-v', VOICE, '-r', RATE, '-o', file, s.say]);
  const dur = frames ? 4 : Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
  return { ...s, file, dur };
});

// 3. Record the tour with the narration timing driving the pace.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 810 }, storageState: state, recordVideo: { dir: work, size: { width: 1440, height: 810 } } });
await ctx.addInitScript(CURSOR);
const page = await ctx.newPage();
const t0 = Date.now();
const now = () => (Date.now() - t0) / 1000;
let cx = 720, cy = 400;
const glide = async (x, y) => { await page.mouse.move(x, y, { steps: 28 }); cx = x; cy = y; };
const h = {
  page, ids: await lookupIds(),
  wait: (ms) => page.waitForTimeout(ms),
  goto: async (p) => { await page.goto(`${APP}${p}`); await page.waitForTimeout(600); },
  click: async (loc) => { await loc.scrollIntoViewIfNeeded(); const b = await loc.boundingBox(); await glide(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(250); await page.mouse.down(); await page.mouse.up(); },
  nav: async (label) => h.click(page.locator('aside, nav').getByRole('link', { name: label, exact: true }).first()),
  tab: async (label) => h.click(page.getByRole('button', { name: label, exact: true }).first()),
  scroll: async (dy) => { const n = 12; for (let i = 0; i < n; i++) { await page.mouse.wheel(0, dy / n); await page.waitForTimeout(40); } },
};
await page.goto(`${APP}/app`);
await page.waitForLoadState('networkidle').catch(() => {});
await page.locator('aside, nav').first().waitFor({ state: 'visible' });
await page.waitForTimeout(1200);
await glide(900, 300);
const lead = now() - 0.2; // the load screen before this is cut from the final video

const cues = [];
for (const [i, c] of clips.entries()) {
  const start = now() - lead + 0.3;
  cues.push({ ...c, start, end: start + c.dur });
  const tour = TOURS[name][c.id];
  const began = Date.now();
  try { await tour(h); } catch (e) { console.error(`  segment ${c.id} step failed: ${e.message.split('\n')[0]}`); }
  if (frames) await page.screenshot({ path: join(framesDir, `${name}-${String(i).padStart(2, '0')}-${c.id}.png`) });
  const took = (Date.now() - began) / 1000;
  const left = (c.dur + GAP - took) * 1000;
  if (left > 0) await page.waitForTimeout(left);
  console.log(`  ${c.id}: ${c.dur.toFixed(1)}s audio, steps ${took.toFixed(1)}s${took > c.dur + GAP ? ' (LONG: video outruns the voice)' : ''}`);
}
await page.waitForTimeout(800);
const webm = await page.video().path();
await ctx.close();
await browser.close();
if (frames) { console.log('frames saved to', framesDir); process.exit(0); }

// 4. Mix audio at each cue, encode, write captions and a poster.
const out = join(root, 'public', 'videos');
mkdirSync(out, { recursive: true });
const inputs = cues.flatMap((c) => ['-i', c.file]);
const delays = cues.map((c, i) => `[${i + 1}:a]adelay=${Math.round(c.start * 1000)}|${Math.round(c.start * 1000)}[a${i}]`).join(';');
const mix = `${delays};${cues.map((_, i) => `[a${i}]`).join('')}amix=inputs=${cues.length}:normalize=0[aout]`;
execFileSync('ffmpeg', ['-y', '-ss', lead.toFixed(2), '-i', webm, ...inputs, '-filter_complex', mix, '-map', '0:v', '-map', '[aout]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '112k', '-movflags', '+faststart', join(out, `${name}.mp4`)], { stdio: 'ignore' });
execFileSync('ffmpeg', ['-y', '-ss', '3', '-i', join(out, `${name}.mp4`), '-frames:v', '1', '-q:v', '3', join(out, `${name}-poster.jpg`)], { stdio: 'ignore' });
const ts = (s) => { const m = Math.floor(s / 60), r = s - m * 60; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}:${r.toFixed(3).padStart(6, '0')}`; };
writeFileSync(join(out, `${name}.vtt`), `WEBVTT\n\n${cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${captionText(c.say)}\n`).join('\n')}`);
const total = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(out, `${name}.mp4`)]).toString());
console.log(`wrote public/videos/${name}.mp4 (${total.toFixed(0)}s)`);
