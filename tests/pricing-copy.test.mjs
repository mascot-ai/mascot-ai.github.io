// Guards the Match Score wording on the built site. Run after a build: `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = (p) => readFileSync(new URL(`../dist/${p}/index.html`, import.meta.url), 'utf8');
const pages = ['', 'pricing', 'features', 'compare', 'college-list-builder', 'parents'];

test('no page uses the retired School Saves or Regenerate wording', () => {
  for (const p of pages) {
    assert.doesNotMatch(page(p), /school saves?\b|regenerat/i, `/${p}`);
  }
});

test('pricing table shows unlimited saving and the Match Score allowances', () => {
  const html = page('pricing');
  assert.match(html, /Schools you can save/);
  assert.match(html, /Match Scores \(your odds at a school\)/);
  assert.match(html, /10 total/);
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
  assert.match(html, /10 Match Scores/);
});

test('no em dashes in the Match Score copy', () => {
  for (const p of ['pricing', '']) {
    const copy = page(p).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
    assert.doesNotMatch(copy, /Match Scores?[^<]{0,80}—/);
  }
});
