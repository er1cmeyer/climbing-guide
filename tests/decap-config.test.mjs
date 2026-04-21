import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('decap admin files exist and target the routes content collection', () => {
  assert.equal(existsSync(new URL('../public/admin/index.html', import.meta.url)), true);
  assert.equal(existsSync(new URL('../public/admin/config.yml', import.meta.url)), true);
  assert.equal(existsSync(new URL('../public/admin/gunks-routes-logo.png', import.meta.url)), true);

  const html = readFileSync(new URL('../public/admin/index.html', import.meta.url), 'utf8');
  const config = readFileSync(new URL('../public/admin/config.yml', import.meta.url), 'utf8');

  assert.match(html, /decap-cms@\^3\.0\.0\/dist\/decap-cms\.js/);
  assert.match(html, /decap-cms-media-library-cloudinary@\^3\.0\.0\/dist\/decap-cms-media-library-cloudinary\.js/);
  assert.match(html, /CMS\.registerMediaLibrary\(DecapCmsMediaLibraryCloudinary\)/);
  assert.match(html, /<title>Gunks Routes<\/title>/);
  assert.match(config, /name:\s+github/);
  assert.match(config, /repo:\s+er1cmeyer\/climbing-guide/);
  assert.match(config, /branch:\s+master/);
  assert.match(config, /site_url:\s+https:\/\/climbing-guide\.netlify\.app/);
  assert.match(config, /display_url:\s+https:\/\/climbing-guide\.netlify\.app/);
  assert.match(config, /logo:\s*\n\s+src:\s+\/admin\/gunks-routes-logo\.png/);
  assert.match(config, /show_in_header:\s+true/);
  assert.match(config, /media_folder:\s+public\/uploads/);
  assert.match(config, /public_folder:\s+\/uploads/);
  assert.match(config, /media_library:\s*\n\s+name:\s+cloudinary/);
  assert.match(config, /cloud_name:\s+duxnrxcjx/);
  assert.match(config, /api_key:\s+['"]?525961968994667['"]?/);
  assert.match(config, /folder:\s+src\/content\/routes/);
  assert.match(config, /sortable_fields:\s+\['order',\s+'route',\s+'rating'\]/);
  assert.match(config, /summary:\s+'?\{\{order\}\}\s+-\s+\{\{route\}\}\s+\{\{area\}\}'?/);
  assert.match(config, /name:\s+route/);
  assert.match(config, /name:\s+rating/);
  assert.match(config, /name:\s+area/);
  assert.match(config, /name:\s+order/);
  assert.match(config, /label:\s+Order,\s+name:\s+order,\s+widget:\s+number,\s+value_type:\s+float,\s+min:\s+0,\s+step:\s+0\.01/);
  assert.match(config, /name:\s+body/);
});
