import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('favicon svg uses the approved oversized G mark instead of an embedded bitmap', () => {
  const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');

  assert.doesNotMatch(svg, /data:image\/png;base64/i);
  assert.match(svg, /<rect[^>]+fill="#4d466e"/i);
  assert.match(svg, /<text[^>]+font-size="76"/i);
  assert.match(svg, /<text[^>]+fill="#fffaf0"[^>]*>G<\/text>/i);
});
