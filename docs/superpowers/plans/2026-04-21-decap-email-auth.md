# Decap Email Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch Decap CMS from GitHub OAuth to Netlify Identity plus Git Gateway so invited editors can sign in to `/admin/` with email-based credentials.

**Architecture:** Keep the current static Decap admin entrypoint in `public/admin/` and preserve the existing content schema. Update the Decap config to use `git-gateway`, add the standard Netlify Identity bootstrap script to the admin HTML, and lock the contract with the existing Node test file before changing production files.

**Tech Stack:** Astro static assets, Decap CMS CDN bundle, Netlify Identity bootstrap script, Node test runner

---

### Task 1: Lock the new admin contract with a failing test

**Files:**
- Modify: `tests/decap-config.test.mjs`
- Test: `tests/decap-config.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
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
  assert.match(html, /<script src="https:\/\/identity\.netlify\.com\/v1\/netlify-identity-widget\.js"><\/script>/);
  assert.match(html, /if \(window\.netlifyIdentity\) \{/);
  assert.match(html, /window\.netlifyIdentity\.on\('init'/);
  assert.match(html, /window\.netlifyIdentity\.on\('login'/);
  assert.match(html, /document\.location\.href = '\/admin\/';/);
  assert.match(html, /<title>Gunks Routes<\/title>/);
  assert.match(config, /name:\s+git-gateway/);
  assert.doesNotMatch(config, /repo:\s+er1cmeyer\/climbing-guide/);
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/decap-config.test.mjs`
Expected: FAIL because the current config still uses `github` and the admin HTML does not yet include the Netlify Identity bootstrap.

- [ ] **Step 3: Write minimal implementation**

```yaml
backend:
  name: git-gateway
  branch: master
```

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', (user) => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/';
        });
      }
    });
  }
</script>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/decap-config.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/decap-config.test.mjs public/admin/config.yml public/admin/index.html docs/superpowers/specs/2026-04-21-decap-email-auth-design.md docs/superpowers/plans/2026-04-21-decap-email-auth.md
git commit -m "Switch Decap admin to Netlify Identity auth"
```

### Task 2: Verify the static admin setup in the project test suite

**Files:**
- Test: `tests/decap-config.test.mjs`

- [ ] **Step 1: Run the focused Decap test**

```bash
npm test -- tests/decap-config.test.mjs
```

- [ ] **Step 2: Run the broader project test suite**

```bash
npm test
```

- [ ] **Step 3: Confirm deployment-side follow-up**

After publishing, invite users in Netlify Identity and validate `/admin/` on the deployed site because Netlify Identity cannot be fully exercised in local development.
