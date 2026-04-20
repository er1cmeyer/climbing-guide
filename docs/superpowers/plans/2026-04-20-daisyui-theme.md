# DaisyUI Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Define a custom default DaisyUI theme so semantic tokens such as `bg-base-200` resolve to the project palette instead of DaisyUI's stock light theme.

**Architecture:** Register a single `climbingguide` DaisyUI theme as the default theme, keep the existing custom `base-100-content` alias for current page classes, and add a regression test that inspects the built CSS for the expected theme tokens.

**Tech Stack:** Astro, Tailwind CSS v4, DaisyUI v5, Node test runner

---

### Task 1: Add a failing theme regression test

**Files:**
- Modify: `tests/homepage-grid.test.mjs`
- Test: `tests/homepage-grid.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test('build output uses the climbingguide DaisyUI theme tokens', () => {
  execFileSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  const css = readFileSync(new URL('../dist/_astro/route.DflZL4AU.css', import.meta.url), 'utf8');

  assert.match(css, /--color-base-200:#ffefc4/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/homepage-grid.test.mjs`
Expected: FAIL because DaisyUI's default light theme still emits a gray `base-200`.

- [ ] **Step 3: Write minimal implementation**

```css
@plugin "daisyui" {
  themes: false;
}

@plugin "daisyui/theme" {
  name: "climbingguide";
  default: true;
  color-scheme: light;
  --color-base-200: #ffefc4;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/homepage-grid.test.mjs`
Expected: PASS

### Task 2: Register the full project theme

**Files:**
- Modify: `src/styles/global.css`
- Test: `tests/homepage-grid.test.mjs`

- [ ] **Step 1: Expand the theme tokens**

```css
@plugin "daisyui/theme" {
  name: "climbingguide";
  default: true;
  color-scheme: light;
  --color-base-100: #fffaf0;
  --color-base-200: #ffefc4;
  --color-base-300: #f3ddb0;
  --color-base-content: #4d466e;
  --color-primary: #58d5d5;
  --color-secondary: #aee3ff;
  --color-accent: #6599af;
  --color-neutral: #4d466e;
}
```

- [ ] **Step 2: Preserve current alias utilities**

```css
@theme {
  --color-base-100-content: #4d466e;
}
```

- [ ] **Step 3: Rebuild and verify generated CSS**

Run: `npm run build`
Expected: build succeeds and the emitted CSS contains the custom `climbingguide` values.
