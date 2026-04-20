# monpoteledj — musique approximative mixer

![CI](https://github.com/constructions-incongrues/monpoteledj/actions/workflows/ci.yml/badge.svg)

Single-page DJ mixer app. Runs directly in the browser (no build step).

## Usage

Serve with any static HTTP server (e.g. VS Code Live Server at `http://127.0.0.1:5500/index.html`).

## Tests

```bash
npm test          # run all tests once
npm run test:watch  # watch mode
```

## Stable main and safe auto-merge

This repository is configured for automatic merge with guardrails:

- CI runs on every PR targeting `main`.
- Auto-merge is only enabled when a PR has label `automerge`.
- PRs labeled `do-not-merge` are explicitly excluded.
- Merge method is `squash` to keep `main` history clean.

Mandatory GitHub settings (repository settings):

Quick setup with GitHub CLI:

```bash
bash scripts/configure-github-main-stability.sh constructions-incongrues musiqueapproximative-monpoteledj
```

1. Enable repository auto-merge in `Settings > General > Pull Requests`.
2. Protect `main` in `Settings > Branches` (or Rulesets) with:
	 - Require a pull request before merging.
	 - Require approvals (recommended: at least 1).
	 - Require status checks to pass before merging.
	 - Required checks:
		 - `Test Node 20`
		 - `Test Node 22`
		 - `Security audit`
	 - Dismiss stale approvals when new commits are pushed.
	 - Require conversation resolution before merge.

With these settings, auto-merge cannot bypass checks or reviews, and `main` remains stable.

## Architecture

See [`CLAUDE.md`](CLAUDE.md) for the full module dependency graph and design decisions.
