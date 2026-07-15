# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-07-15

First release: a central collection of 15 skills.

### Added

- `handoff` skill — writes HANDOFF.md, the session-to-session baton for
  multi-phase PLAN.md execution.
- `workonplan` skill — executes PLAN.md phases one at a time as a single main
  agent, ending every session with a handoff.
- Spec-driven loop vendored from
  [JuliusBrussee/cavekit](https://github.com/JuliusBrussee/cavekit) (MIT):
  `spec`, `build`, `check`, `backprop`, `grill`, `research`, `review`, `deepen`.
- Compression skills vendored from
  [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) (MIT):
  `caveman`, `caveman-commit`, `caveman-review`, and `caveman-help` (rewritten
  for this collection's roster).
- `NOTICE.md` reproducing the upstream MIT copyright and permission notices,
  with per-skill provenance and a record of every modification.
- Contract test suite validating all skills against the
  [Agent Skills specification](https://agentskills.io/specification.md), an
  attribution suite that fails if a vendored skill is missing from NOTICE.md,
  and a discovery test that runs the real `skills` CLI against this repo.
- CI workflow (Node 20/22/24 on Linux, Node 22 on Windows) and a tag-triggered
  release workflow that derives release notes from this file.

### Changed

- cavekit's `caveman` ships as **`caveman-encode`**. Upstream, cavekit and the
  caveman repo both publish a skill named `caveman` with contradictory rules —
  cavekit's requires the `→ ∴ ∀` symbol set for SPEC.md, the caveman repo's
  bans arrows outright. Under one name, installing both meant one silently
  shadowing the other. Renaming lets both coexist; their descriptions now point
  at each other so an agent picks the right one.
- `spec` no longer requires a per-project `FORMAT.md`. The format is embedded in
  the skill, and generated `SPEC.md` files open with a baked format header (an
  HTML comment) that makes them self-describing. `build`, `handoff`, and
  `workonplan` read that header instead of the file. `FORMAT.md` removed.

### Not included

- `caveman-stats`, `cavecrew`, and `caveman-compress` are not vendored — they
  require hooks, subagents, and Python respectively, none of which survive an
  `npx skills add` install. See [NOTICE.md](NOTICE.md).

[Unreleased]: https://github.com/jasonyang-ee/skills/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/jasonyang-ee/skills/releases/tag/v0.1.0
