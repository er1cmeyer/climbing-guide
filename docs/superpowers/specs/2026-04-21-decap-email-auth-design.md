# Decap Email Auth Migration Design

## Goal

Replace Decap's GitHub-authenticated backend with Netlify Identity plus Git Gateway so editors can log into `/admin/` using email-based credentials and edit content without GitHub accounts.

## Current State

- `public/admin/config.yml` uses `backend.name: github`.
- `public/admin/index.html` only loads Decap and the Cloudinary media library.
- Netlify Identity and Git Gateway have already been enabled in the Netlify dashboard.

## Proposed Change

### Backend

Change the Decap backend from `github` to `git-gateway` while preserving the existing repository content model, branch target, media library configuration, and site URLs.

### Admin Bootstrap

Keep the built-in Decap/Netlify flow. Do not add a custom login UI. Update the admin HTML to include the standard Netlify Identity bootstrap script so invite, confirmation, and login redirects returning to `/admin/` are handled by the built-in flow.

### User Provisioning

Editors will be invited through Netlify Identity after deployment is updated. No GitHub usernames or repository permissions are required for invited editors.

## Out of Scope

- Custom login or logout UI
- Role-based authorization beyond Netlify Identity defaults
- Changes to collections, editorial schema, or media storage

## Testing

- Update the Decap config test to assert the `git-gateway` backend is configured.
- Update the Decap HTML test to assert the Netlify Identity bootstrap is present.
- Run the Decap config test locally.
- Validate the full login flow on a Netlify deploy after the code is published, because Netlify Identity is not supported in local development.
