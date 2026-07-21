# Software Patterns Docs

Synced (or vendored) from **`@llanesleonardo/software-patterns-docs`**.

Package: [GitHub Packages — software-patterns-docs](https://github.com/llanesleonardo/software-patterns-docs/pkgs/npm/software-patterns-docs)

## Sync

Requires a GitHub personal access token with `read:packages` (set as `NODE_AUTH_TOKEN`). Root [`.npmrc`](../../.npmrc) points `@llanesleonardo` at `https://npm.pkg.github.com`.

```bash
# from repo root
export NODE_AUTH_TOKEN=ghp_your_token   # PowerShell: $env:NODE_AUTH_TOKEN="ghp_..."
npm install
npm run docs:sync-patterns
```

After a successful sync, this folder is filled from the package. **Do not hand-edit** synced content; re-run sync to update.

## Until sync succeeds

This placeholder README remains. Product-specific operating model docs live under [Development](../Development/) (lifecycle, reliability, learning loop, governance).

**Agents:** use Development + Components + this folder (after sync) as support docs, then verify against `apps/` when code exists.
