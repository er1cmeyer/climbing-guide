import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('decap admin files exist and target the routes content collection', () => {
  assert.equal(existsSync(new URL('../public/admin/index.html', import.meta.url)), true);
  assert.equal(existsSync(new URL('../public/admin/config.yml', import.meta.url)), true);

  const html = readFileSync(new URL('../public/admin/index.html', import.meta.url), 'utf8');
  const config = readFileSync(new URL('../public/admin/config.yml', import.meta.url), 'utf8');

  assert.match(html, /decap-cms@\^3\.0\.0\/dist\/decap-cms\.js/);
  assert.match(html, /<title>Gunks Routes<\/title>/);
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=Yellowtail/);
  assert.match(html, /data-gunks-routes-brand/);
  assert.match(html, /Gunks Routes/);
  assert.match(config, /name:\s+github/);
  assert.match(config, /repo:\s+er1cmeyer\/climbing-guide/);
  assert.match(config, /branch:\s+master/);
  assert.match(config, /site_url:\s+https:\/\/climbing-guide\.netlify\.app/);
  assert.match(config, /display_url:\s+https:\/\/climbing-guide\.netlify\.app/);
  assert.match(config, /media_folder:\s+public\/uploads/);
  assert.match(config, /public_folder:\s+\/uploads/);
  assert.match(config, /folder:\s+src\/content\/routes/);
  assert.match(config, /name:\s+route/);
  assert.match(config, /name:\s+rating/);
  assert.match(config, /name:\s+area/);
  assert.match(config, /name:\s+order/);
  assert.match(config, /name:\s+body/);
});
