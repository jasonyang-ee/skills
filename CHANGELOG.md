# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Renamed `caveman-review` to `caveman-pr` to better reflect its scope
  (PR review comments rather than general code review). NOTICE.md updated
  to record the upstream name and the rename modification.
- Trimmed `caveman` skill to full and ultra modes only. Removed wenyan
  (classical Chinese) levels, lite mode, and language-matching behaviour.
  English only.

### Removed

- Removed `caveman-help` skill. Small collection with no need for a help
  menu; users can read the skill files directly.

### Removed

- Retired `build` from the shipped skill roster. Its patterns (§R fidelity,
  failure classification, exact test naming, full-suite gate) are fully absorbed
  into `workonplan`. All `/build` command references updated to `/workonplan`
  across skill files, README, and tests. Skill count: 11 → 10.

### Added

- `cook` — a composite planning skill that turns a user request into a
  caveman-encoded `PLAN.md` and `HANDOFF.md`, hands durable facts to `spec`,
  starts with research, and ends with final verification for `workonplan`.

### Changed

- `build` and `workonplan` no longer point at a standalone `backprop` skill.
  When a failure exposes wrong or missing spec memory, they now route the issue
  through `/spec bug:` before retrying.
- `spec`, `caveman-encode`, and `caveman-help` now treat `cook` as the planning
  front door and `PLAN.md` / `HANDOFF.md` as caveman-encoded short-term files.
- `cook` phases now bind one-to-one to `§T` rows; research requires sourced
  findings or explicit unknowns; final verification records per-item status and
  evidence in `HANDOFF.md`.
- `workonplan` now rejects phases missing a matching SPEC task.
- `workonplan` now requires exact per-invariant tests, preserves sourced `§R`
  facts, classifies failures before retry, and runs the full suite at session end.
- `handoff` now records baseline/oracle test state and keeps the cold-resume
  stop point and next executable step explicit.
- `AGENTS.md` now includes the caveman-encode symbol legend for cold sessions.
- Documentation now matches the current engine floor: Node 20+.

### Removed

- Retired `backprop`, `check`, `deepen`, `grill`, and `research` from the
  shipped skill roster. `cook` now covers the planning and verification
  surfaces they previously handled.

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
  `caveman`, `caveman-commit`, `caveman-pr`, and `caveman-help` (rewritten
  for this collection's roster).
- `NOTICE.md` reproducing the upstream MIT copyright and permission notices,
  with per-skill provenance and a record of every modification.
- Contract test suite validating all skills against the
  [Agent Skills specification](https://agentskills.io/specification.md), an
  attribution suite that fails if a vendored skill is missing from NOTICE.md,
  and a discovery test that runs the real `skills` CLI against this repo.
- CI workflow (Node 20/22/24 on Linux, Node 22 on Windows) and a tag-triggered
  release workflow that derives release notes from this file.
- Dependabot config tracking GitHub Actions and npm, with version-update pull
  requests disabled (`open-pull-requests-limit: 0`) — this repo is public and
  those PRs are noise. Dependabot security updates and alerts stay enabled: the
  lockfile is public either way, so a security PR shortens the exposure window
  rather than creating it, and alerts stay private to maintainers.

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
