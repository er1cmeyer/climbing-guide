import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

test('homepage renders routes as a compact grid of tiles', () => {
  execFileSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

  assert.match(html, /<body class="[^"]*bg-base-100-content[^"]*text-base-100[^"]*">/);
  assert.match(html, /class="[^"]*routes-grid[^"]*"/);
  assert.match(html, /class="[^"]*route-card[^"]*"/);
  assert.match(html, /class="[^"]*route-name[^"]*"/);
  assert.match(html, /class="[^"]*route-grade[^"]*"/);
  assert.match(html, /class="[^"]*route-area[^"]*"/);
  assert.match(html, /id="route-search"/);
  assert.match(html, /data-route-filter-input/);
  assert.match(html, /data-route-filter-grid/);
  assert.match(html, /data-route-card/);
  assert.match(html, /data-route-search=/);
  assert.match(html, /data-route-filter-status/);
  assert.match(html, /data-route-filter-empty/);
  assert.match(html, /window\.location\.hash/);
  assert.match(html, /#\(\?:invite\|confirmation\|recovery\|email_change\)_token=/);
  assert.match(html, /window\.location\.replace\(`\/admin\/\$\{window\.location\.hash\}`\)/);
  assert.match(html, /id="header"/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">/);
  assert.match(html, /<meta name="theme-color" content="#dc2626">/);
  assert.doesNotMatch(html, /data-route-shell/);
  assert.doesNotMatch(html, /data-route-scroll/);
  assert.doesNotMatch(html, /id="header" class="[^"]*\bfixed\b/);
});

test('route detail pages use reversed colors', () => {
  execFileSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  const html = readFileSync(new URL('../dist/routes/apoplexy/index.html', import.meta.url), 'utf8');
  const routePageSource = readFileSync(new URL('../src/components/route-page.astro', import.meta.url), 'utf8');

  assert.match(html, /<body class="[^"]*bg-base-100[^"]*text-base-100-content[^"]*">/);
  assert.match(html, /class="[^"]*md:max-w-6xl[^"]*"/);
  assert.match(routePageSource, /import RouteDetailLayout from ['"]\.\.\/layouts\/route-detail\.astro['"]/);
});

test('astro components use inline tailwind utilities instead of local style blocks', () => {
  const homepageSource = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  const routePageSource = readFileSync(new URL('../src/components/route-page.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(homepageSource, /<style>/);
  assert.doesNotMatch(routePageSource, /<style>/);
});

test('homepage renders route tiles through a dedicated route card component', () => {
  const homepageSource = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.match(homepageSource, /import RouteCard from ['"]\.\.\/components\/route-card\.astro['"]/);
  assert.match(homepageSource, /<RouteCard\s+/);
});
