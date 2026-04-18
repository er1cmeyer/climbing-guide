# Decap GitHub Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Decap CMS admin surface under `/admin/` that edits the existing Astro routes content collection using the GitHub backend.

**Architecture:** Serve Decap as static files from Astro's `public/` directory so the CMS is deployment-agnostic and does not depend on Astro runtime code. Configure a single folder collection that maps directly onto `src/content/routes/*.md`, and leave GitHub OAuth host details as explicit placeholders because the repository remote and deployed auth host are not configured in this workspace.

**Tech Stack:** Astro static assets, Decap CMS CDN bundle, YAML config, Node test runner

---

### Task 1: Lock the CMS contract with a test

**Files:**
- Create: `tests/decap-config.test.mjs`
- Test: `tests/decap-config.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('decap admin files exist and target the routes content collection', () => {
  assert.equal(existsSync(new URL('../public/admin/index.html', import.meta.url)), true);
  assert.equal(existsSync(new URL('../public/admin/config.yml', import.meta.url)), true);

  const html = readFileSync(new URL('../public/admin/index.html', import.meta.url), 'utf8');
  const config = readFileSync(new URL('../public/admin/config.yml', import.meta.url), 'utf8');

  assert.match(html, /decap-cms@\^3\.0\.0\/dist\/decap-cms\.js/);
  assert.match(config, /name:\s+github/);
  assert.match(config, /folder:\s+src\/content\/routes/);
  assert.match(config, /name:\s+route/);
  assert.match(config, /name:\s+rating/);
  assert.match(config, /name:\s+area/);
  assert.match(config, /name:\s+order/);
  assert.match(config, /name:\s+body/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/decap-config.test.mjs`
Expected: FAIL because `public/admin/index.html` and `public/admin/config.yml` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```text
Create public/admin/index.html with the Decap CDN script.
Create public/admin/config.yml with:
- backend.name = github
- backend.repo placeholder
- backend.branch = develop
- commented OAuth host placeholders
- a routes folder collection for src/content/routes
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/decap-config.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add public/admin/index.html public/admin/config.yml tests/decap-config.test.mjs docs/superpowers/plans/2026-04-17-decap-github-backend.md
git commit -m "Add Decap CMS GitHub admin setup"
```

### Task 2: Verify the project test suite still passes

**Files:**
- Test: `tests/homepage-grid.test.mjs`
- Test: `tests/decap-config.test.mjs`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with both the homepage tests and the new Decap config test green.

- [ ] **Step 2: Confirm the generated admin path is source-only**

Run: `git status --short`
Expected: only the intended Decap files and plan file are modified or added before commit.

- [ ] **Step 3: Commit**

```bash
git add public/admin/index.html public/admin/config.yml tests/decap-config.test.mjs docs/superpowers/plans/2026-04-17-decap-github-backend.md
git commit -m "Add Decap CMS GitHub admin setup"
```
