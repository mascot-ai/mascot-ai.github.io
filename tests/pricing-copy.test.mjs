// Guards the Match Score wording on the built site. Run after a build: `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = (p) => readFileSync(new URL(`../dist/${p}/index.html`, import.meta.url), 'utf8');
const pages = ['', 'pricing', 'features', 'compare', 'college-list-builder', 'parents', 'counselors', 'demo'];

test('no page uses the retired School Saves or Regenerate wording', () => {
  for (const p of pages) {
    assert.doesNotMatch(page(p), /school saves?\b|regenerat/i, `/${p}`);
  }
});

test('pricing table shows unlimited saving and the Match Score allowances', () => {
  const html = page('pricing');
  assert.match(html, /Schools you can save/);
  assert.match(html, /Match Scores \(your odds at a school\)/);
  assert.match(html, /5 total/);
  assert.match(html, /20 a month/);
});

test('pricing explains what a Match Score is and that saving is free', () => {
  const html = page('pricing');
  assert.match(html, /What is a Match Score\?/);
  assert.match(html, /Saving schools is always free and unlimited/);
});

test('the add-on is sold as +10 Match Scores', () => {
  assert.match(page('pricing'), /\+10 Match Scores/);
});

test('home plan cards state the Match Score allowances', () => {
  const html = page('');
  assert.match(html, /20 Match Scores a month/);
  assert.match(html, /5 Match Scores/);
});

test('pricing names the meters, the trial, the packs and the 6 Month Pass', () => {
  const html = page('pricing');
  for (const re of [/Coach credits/, /Voice coaching minutes/, /7 days of Navigator|free trial/i, /Essay Pack/, /4 Essay Pack/, /6 Month Pass/, /\$199\.99/]) assert.match(html, re);
  assert.doesNotMatch(html, /AI credits|AI match runs|Voice minutes/);
});

test('no page outside the legal pages says AI counselor or AI powered', () => {
  for (const p of [...pages, 'about', 'founders', 'contact', 'blog']) {
    assert.doesNotMatch(page(p), /AI[- ]powered|AI (college )?counselor|Conversational AI/i, `/${p}`);
  }
});

test('no em dashes in the Match Score copy', () => {
  for (const p of ['pricing', '']) {
    const copy = page(p).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
    assert.doesNotMatch(copy, /Match Scores?[^<]{0,80}—/);
  }
});

test('counselor page shows the live plan prices and the control promises', () => {
  const html = page('counselors');
  for (const re of [/Scout/, /\$19/, /\$199/, /\$449/, /Expedition/, /never writes the essay/i, /12 months for the price of 11/]) assert.match(html, re);
});

test('every demo video ships with captions and a transcript', () => {
  for (const p of ['demo', 'counselors', 'parents', 'features']) {
    const html = page(p);
    assert.match(html, /<track kind="captions"/, `/${p}`);
    assert.match(html, /Read the transcript/, `/${p}`);
    assert.doesNotMatch(html, /<video[^>]*\bautoplay\b/, `/${p}`);
  }
});
