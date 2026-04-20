import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

test('build output uses the climbingguide DaisyUI theme tokens', () => {
  execFileSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  const astroDir = new URL('../dist/_astro/', import.meta.url);
  const cssFile = readdirSync(astroDir).find((name) => name.endsWith('.css'));

  assert.ok(cssFile, 'expected a built CSS asset in dist/_astro');

  const css = readFileSync(join(astroDir.pathname, cssFile), 'utf8');

  assert.match(css, /:where\(:root\),:root:has\(input\.theme-controller\[value=climbingguide\]:checked\),\[data-theme=climbingguide\]/);
  assert.match(css, /--color-base-100:#fffaf0;/);
  assert.match(css, /--color-base-200:#ffefc4;/);
  assert.match(css, /--color-base-300:#f3ddb0;/);
  assert.match(css, /--color-base-content:#4d466e;/);
  assert.match(css, /--color-primary:#58d5d5;/);
  assert.match(css, /--color-secondary:#aee3ff;/);
  assert.match(css, /--color-accent:#6599af;/);
  assert.match(css, /--color-neutral:#4d466e;/);
});
