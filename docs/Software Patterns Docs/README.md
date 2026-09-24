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

This placeholder README remains. Product-specific operating model docs live under [System_Design](../System_Design/) (ConOps, SRD, TSD, SAC).

**Agents:** start at [System_Design/TSD/Pattern_Selection.md](../System_Design/TSD/Pattern_Selection.md) (impact / risk / Diff), then one pattern file here. Do not load this whole tree. Use [`recognition_examples/`](./recognition_examples/) and [`composition_problems/`](./composition_problems/) only as needed (skip `exercises/` for product work). Then User_Guide + apps as needed.

**Note:** Next `docs:sync-patterns` from the npm package may restore old folder names (`pattern-examples`, `Problem_solving_using_SEP`) until upstream is renamed the same way — re-apply or sync from an updated package.
