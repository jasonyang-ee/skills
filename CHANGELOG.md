# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-07-23

### Changed

- The baked document headers now live in a new `encode-header` skill instead
  of `encode-docs`. `encode-docs` is loaded on almost every write, but the
  header text is only needed when a header is actually being created, so
  moving it keeps the almost-always-loaded skill lean; `encode-docs` still
  performs every write. This also fixes the README link, which pointed at a skill that did
  not exist.
- `BACKLOG.md` is now strictly `prep`'s input. `cook`, `cater`, `review-plan`,
  `review-code`, and `garnish` never read it, so none of them can act on a
  request nobody approved, and `garnish` never clears it, so closing a cycle
  no longer silently erases a pending request. `prep` owns the whole
  lifecycle: it folds the backlog into a new plan and clears it only after
  that plan is written, or appends to it when a plan is already running.
- The handoff header is now a single line for test state — the pass count, or
  the exact failing file and case, followed by the command that produced it —
  and it records only the commit hash. The separate baseline line was dropped
  because it repeated the same fact under a second name.
- The plan's `planning status` now tracks execution instead of authorship.
  `prep` leaves a freshly written or expanded plan as `new`, and only `cook`
  and `cater` mark it work-in-progress, at the moment they actually start a
  phase. They also now run on a `new` plan that has phase sections rather
  than refusing it — only a `new` plan with no phases is treated as an empty
  stub and sent back to `/prep`. This fixes `prep` refusing to expand a plan
  nobody had begun, and stops a plan claiming to be running before anyone
  ran it. `handoff` no longer writes work-in-progress; it sets `done` when
  the cycle finishes and otherwise leaves the value alone.
- The tables in a generated `SPEC.md` now carry the markdown delimiter row
  under their header, so the constraint, interface, research, and invariant
  sections render as real tables on GitHub instead of a wall of pipe
  characters. The rule is stated in `encode-docs`, baked into the `SPEC.md`
  header, and repeated in the `AGENTS.md` guidance `setup` writes, so a repo
  bootstrapped from scratch inherits it.
- Reflow every skill body to unwrapped prose — one line per paragraph, relying
  on the editor's soft-wrap instead of manual line breaks — and tighten the
  wording without dropping any instruction, cutting roughly 320 lines of hard
  wrapping across the eleven skills. Fix three typos along the way ("Enhanced",
  and "deviating"/"Deviation" in both review skills). Add an `AGENTS.md` rule
  recording the unwrapped-prose convention for skill bodies.
- Mark the report-output formatting block shared by `review-plan` and
  `review-code` as a second verbatim mirror, alongside the finding taxonomy,
  and reconcile the two copies so they are byte-identical — the security
  carve-out now reads the same in both, and both headings match.
- Add a `planning status` gate to the plan cycle. `PLAN.md` now carries a
  `new | work-in-progress | done` value in its header: `prep` sets it to
  work-in-progress, `handoff` marks it done once every task is finished and
  final verification holds, and `garnish` resets it to new when it clears the
  file. `cook` and `cater` only execute while it reads work-in-progress —
  otherwise they stop and point you at `/prep` (stub plan) or `/garnish`
  (finished cycle).
- `garnish` now blanks `PLAN.md` and `HANDOFF.md` back to their template
  instead of deleting them, so the next cycle starts from a header rather than
  from nothing. The wording that described this as deletion or purging is
  corrected everywhere it appeared (`garnish`, `cater`, `setup`,
  `encode-commit`, `AGENTS.md`), including a stale claim that `SPEC.md` was
  purged each cycle — it is preserved and pruned, never purged.
- Finish rolling out the multi-task-per-phase plan model. `review-plan` no
  longer blocks a valid plan whose phases carry more than one task, and the
  same-`T<n>` ids that legitimately recur across phases are no longer flagged
  as duplicates; `prep`, `handoff`, and `encode-docs` wording is aligned to the
  same shape.
- Align `setup` to the five core workflow steps named in the spec, so it no
  longer describes six steps with `encode-docs` counted as one of them —
  `encode-docs` and `handoff` are supporting skills, not core steps.
- Refresh `SPEC.md` to the current `encode-docs` template: constraints,
  interfaces, and invariants are now id-keyed pipe tables (`C1`, `I1`, `V1`)
  instead of loose bullets and `V1:` lines, and the baked header tracks the next
  id for all four id sections. Reverse-distilled `§C` and `§V` from the current
  skill files so the spec matches intent: the invariant that mapped each plan
  phase to exactly one task is rewritten, since a phase now carries multiple
  tasks whose ids restart per phase, and a new invariant records `BACKLOG.md`,
  the freeform file `prep` writes to defer a request while a cycle is mid-flight.
- Redefine `SPEC.md` as lean, durable, and mutable. It now carries only five
  sections — goal, constraints, interfaces, research, and invariants. The task
  section and the bug section are gone: task tracking moves to `PLAN.md`, where
  it is short-lived, and one-time fixes and bug history live in `CHANGELOG.md`
  and git. This removes the two sections that grew fat with one-time entries and
  drove the spec drift the old file suffered from. A fresh `SPEC.md` is written
  from the new direction; the previous spec is kept as `SPEC-OBSELETE.md` as a
  record of that drift.
- `prep` now guards the spec. Adding a row to `SPEC.md` is a deliberate,
  high-bar decision rather than a byproduct of planning: the default is no spec
  change, a new invariant must be a standing guarantee rather than a one-time
  fix or a task, and editing or deleting an existing row is preferred over
  adding one. Tasks are authored directly in `PLAN.md` and never handed to
  `encode-docs` for `SPEC.md`.
- `encode-docs` drops the task and bug sections from the `SPEC.md` format and
  from its baked header, adds a "what belongs here" bar for spec rows, and moves
  the task-status legend to the `PLAN.md` header, which is where tasks now live.
- Point the rest of the workflow at the new task location. `cook`, `cater`,
  `garnish`, `review-plan`, `review-code`, `setup`, and `AGENTS.md` now read and
  flip `§T` task status in `PLAN.md` rather than `SPEC.md`.
- `encode-docs` is now the sole writer of all three documents, not just
  `SPEC.md`. `PLAN.md` and `HANDOFF.md` edits — including task-status flips —
  are handed to it by the other workflow skills instead of being written
  directly, so concurrent work cannot clobber a shared document.
- Redesign the `HANDOFF.md` baton into a leaner, pointer-based format that
  refers to plan work as phase-dot-task, and reframe the `handoff` skill as a
  content-gatherer that hands the baton to `encode-docs` to write.
- Slim `encode-commit` from 94 to 45 lines, keeping every rule while dropping
  duplicated examples and folding the always-include-a-body cases into the body
  rule.
- `review-code` and `review-plan` now share one finding taxonomy (block,
  divergence, unknown, harden, note) and one exhaustive go/no-go rule, written
  identically in both — replacing `review-code`'s duplicated, mis-pasted
  category list and the plan gate's missing divergence row.
- Trim the test suite to the two checks that verify something real — the Agent
  Skills frontmatter contract and live skills-CLI discovery — and narrow the
  documented test scope to match.

### Added

- Claude Code plugin marketplace manifests (`.claude-plugin/marketplace.json`
  and `plugin.json`) so the collection installs with `/plugin marketplace add`
  and `/plugin install skills@jasonyang-ee`, no CLI needed. Document every
  install path (default, per-agent for Claude Code and Codex, and the plugin
  path) in the README and `AGENTS.md`.

### Removed

- The `tests/repo-hygiene.test.mjs` and `tests/attribution.test.mjs` suites,
  which asserted skill-body wording and stale invariant numbers and went red on
  every legitimate edit without covering anything real.

## [0.5.2] - 2026-07-19

### Fixed

- Include better line breaks for windows CI test.

## [0.5.1] - 2026-07-19

### Fixed

- Rename `encode-docs`'s three tailored sections from `## SPEC SECTIONS` /
  `## PLAN SECTIONS` / `## HANDOFF SECTIONS` to `## SPEC.md FILE` /
  `## PLAN.md FILE` / `## HANDOFF.md FILE`. Each one gates a whole file, not
  a subsection of one, so `SECTIONS` was the wrong word; `SPEC.md` invariants
  V20 and V87 named the old strings and are corrected to match.

## [0.5.0] - 2026-07-19

### Fixed

- `tests/repo-hygiene.test.mjs` no longer requires `PLAN.md` and
  `HANDOFF.md` to exist at repo root. Both are short-lived cycle state
  that `/garnish` purges once a plan closes, so a repo between cycles
  (like this one) failed the baked-header check with `ENOENT` even
  though nothing was wrong. The check now only validates the docs that
  are actually present, and `SPEC.md` is still checked unconditionally.
- Revert the `## SPEC SECTIONS` / `## PLAN SECTIONS` / `## HANDOFF
  SECTIONS` header renames in `/encode-docs` (introduced by the last
  wording pass), which had silently broken V20 and V87 and failed the
  section-set test.

### Changed

- Rename seven skills to a consistent culinary and encoding vocabulary:
  `prep` becomes `setup` (repository bootstrap), `cook` becomes `prep`
  (planning), `workonplan` becomes `cook` (sequential execution),
  `dispatchplan` becomes `cater` (parallel execution), `caveman-encode`
  becomes `encode-docs`, `caveman-commit` becomes `encode-commit`, and
  `caveman-pr` becomes `encode-pr`. Slash commands change with the skill
  names, so `/cook` now runs phases instead of planning them and `/prep`
  now plans instead of bootstrapping.
- Rename the encoding vocabulary to match. The `AGENTS.md` section that
  `/setup` generates is now `## Encoding symbols` rather than
  `## Caveman symbols`, and the format header baked into each `SPEC.md`
  opens with `Encoding:` rather than `Encoding caveman:`. Existing
  `SPEC.md` files keep their old header until the next `/spec` run
  rewrites it; nothing reads that line, so the drift is cosmetic.

### Added

- Merge the `spec` skill into `/encode-docs`, which now owns the format
  of all three project documents and remains the only writer of `SPEC.md`.
  It carries a tailored section set per document, because the three do
  different jobs: the spec is durable and addressed from outside, the plan
  is a one-cycle contract replaced wholesale, and the handoff is a baton
  overwritten every session. `/spec` no longer resolves; use
  `/encode-docs`, whose triggers cover both former skills. The collection is
  now eleven skills.
- `PLAN.md` and `HANDOFF.md` now carry their own baked format header, as
  `SPEC.md` already did. A cold agent opening either one learns its
  structure from the file itself instead of guessing. The `SPEC.md` header
  also gains a `next:` counter naming the next free identifier, which
  matters once pruning deletes rows and the highest surviving id stops
  being the newest.
- `/encode-commit` now bars encoding symbols and plan or spec identifiers
  from the commit messages it generates, and explains how to expand an
  identifier into plain English. Plan files get purged when a cycle
  closes but the git log outlives them, so a message built out of phase
  and invariant numbers becomes unreadable the moment those files go.
  `/cook` and `/handoff` route their commits through it rather than
  keeping their own copies of the rules.

### Changed

- Skill files carry no emoji. Behaviour examples are labelled with the
  words good and bad, and `/encode-pr` severity prefixes read `bug:`,
  `risk:`, `nit:` and `q:` rather than coloured circles; the labels
  already carried the signal, so nothing is lost. Skill bodies also no
  longer carry vendor attribution blocks, which live in `NOTICE.md`.

- `/garnish` now prunes `SPEC.md` invariants and tasks that no longer
  describe live code, so a cold session loads less. Pruning is gated on
  evidence that the thing a row described is actually gone; an uncertain
  row is kept and reported instead. Rows are deleted outright rather than
  left as retired markers, and their identifiers are never reused, so an
  old commit citing one never resolves to something newer.

- The test suite is 49 cases rather than 189. The count came almost
  entirely from loops that ran the same handful of rules once per skill;
  those are now single cases that check every skill and report all
  offenders at once. No assertion was dropped, and the invariants each
  case covers are named in its comment, so the suite says what it proves.

### Fixed

- Point the encoding vocabulary and every cross-reference at what
  actually ships. Several skills still told the reader to load a
  `caveman` skill that no longer exists, and the format header baked into
  generated `SPEC.md` files had drifted from the one this repository
  uses. Guards now cover both.

### Removed

- Remove the conversational `caveman` skill. Its terse-output rules now
  apply automatically to the reports written by `/review-plan` and
  `/review-code`, which is where they earned their keep; the planning and
  execution skills write files rather than chat replies, so brevity bought
  them nothing. Security findings, warnings about irreversible actions,
  every BLOCK item, and all `file:line` evidence are explicitly exempt and
  stay in full prose.

## [0.4.1] - 2026-07-17

- Align all six workflow-step skill descriptions with canonical focus
  keywords: plan gap finding and latest-web-data research in `/review-plan`,
  lossless compression in `/caveman-encode`, evidence-gated closure in
  `/garnish`, and a deduplicated `/cook` description; the `/review-plan`
  research gate now requires current, dated primary sources over model
  memory.
- Add a Security review dimension to `/review-code` (secrets, injection,
  untrusted input, authn/authz, supply-chain) with security check and infosec
  triggers, plus security cues in the `/review-plan` blast-radius axis and the
  `/workonplan` self-review checklist.
- Fix `/workonplan` description sentence fragment shipped in v0.4.0 and add
  production-quality, verification-driven, evidence-based implementation
  keywords to the `/workonplan` and `/dispatchplan` descriptions (B5).
- Strengthen `/cook` quality cues with production-quality,
  verification-driven, evidence-based implementation language and explicit
  focus across all six workflow steps.

## [0.4.0] - 2026-07-16

- Change `/workonplan` so no argument executes all remaining plan phases in
  order, while an explicit phase argument still targets one phase.
- Improve `/prep` new-user `AGENTS.md` template with AI-file purpose, project
  script placeholders, workflow context, and complete end-of-chat checks.

## [0.3.0] - 2026-07-16

### Added

- Added `dispatchplan`, the parallel alternative to `workonplan`. It assigns
  `PLAN.md` phases to sub-agents through per-phase `HANDOFF-<phase-id>.md`
  files, dispatches concurrently only when file sets do not overlap, and
  reviews every returned diff before accepting it. `workonplan` remains the
  single-agent default.

### Removed

- Removed `truth-workflow.md`. The six core workflow steps are documented in
  the README, which is now the canonical narrative, so the separate file was a
  second copy that could drift. The step order remains enforced by the spec.

### Fixed

- Fixed the test suite, which was red after `CONTRIBUTING.md` moved to
  `.github/`: two checks still read it from the repository root.
- `release.sh` now shows the test output when the run is red. It previously
  discarded it and printed only "tests are red — not releasing", which told you
  nothing about what to fix.
- Fixed a broken link in `.github/CONTRIBUTING.md`, which still pointed at
  `skills/spec/SKILL.md` relative to the repository root after the move.

### Changed

- Narrowed the test suite to what it can meaningfully guard: `skills/**`
  content, plus the licensing and release checks (LICENSE, changelog,
  workflow permissions, and the `NOTICE.md` attribution rows). Assertions on
  documentation prose — README wording, contributing guide, the AGENTS.md
  symbol legend, and the CLAUDE.md import — are gone. Those requirements still
  stand and are now marked in the spec as manually reviewed rather than
  automatically tested; a green run no longer claims to prove them.
- `/dispatchplan` is now its own entry in the bootstrap command list rather
  than a nested note under `/workonplan`, so the list names seven commands.
  They remain two ways to run one workflow step: choose one per phase.
- `AGENTS.md` now lists every shipped skill. `/caveman` and `/caveman-pr` were
  never mentioned, and `release.sh` and `.github/` were missing from the
  layout.
- Renamed the `review-implementation` skill to `review-code`. Invoke it as
  `/review-code`; the old command no longer resolves. Its behavior, baseline
  rules, and `cook` handoff are unchanged. Released entries below keep the old
  name, since that is what shipped.

- Reworded the README `Encode` step so it reads as the writing discipline the
  skills apply automatically, rather than a command to invoke.

### Fixed

- Fixed the documented small-task shortcut, which sent readers from `/spec`
  straight to `/workonplan`. That path cannot run: `/workonplan` executes
  `PLAN.md` phases and only `/cook` writes that file.

- Corrected `README.md` drift: the `caveman` row advertised `lite` and `wenyan`
  modes the skill no longer ships, the `caveman-encode` row omitted
  `/review-plan` from its loaders, and the layout tree listed `caveman-encode/`
  twice.

- Pointed `CONTRIBUTING.md` encoding guidance at the format embedded in the
  `spec` skill, replacing a link to the deleted `FORMAT.md`.

- Added `/caveman-commit` to the support line of the `AGENTS.md` template
  `prep` generates, so bootstrapped repos learn the skill exists.

## [0.2.0] - 2026-07-16

### Added

- Added `prep`, which safely bootstraps the six-step workflow guidance,
  `CLAUDE.md` import, and minimal missing project files.

- Hardened `prep` with explicit trigger phrases, encode-first preflight, and a
  complete Caveman symbol legend in its generated `AGENTS.md` template.

### Changed

- Clarified `SPEC.md` as the authoritative six-step workflow: `cook`,
  `caveman-encode`, `review-plan`, `workonplan`, `garnish`, and
  `review-implementation`, with iterative research and follow-up cycles.

- Expanded `README.md` with the six core workflow responsibilities and the
  distinction between `/prep` bootstrap commands and the truth-workflow steps.

- Refined `AGENTS.md` to make the six lifecycle commands explicit and keep
  supporting commands separate.

- `workonplan` now refreshes and commits `HANDOFF.md` after every phase, not
  only at session end.
- `garnish` now routes durable cleanup decisions through `spec` before purging
  short-term files and points the lifecycle to `review-implementation`.

- `cook` now defaults to **expanding** an existing `PLAN.md` when incomplete
  phases remain, rather than always replacing it. A fresh start requires an
  explicit user request or a fully-complete prior plan.
- `review-plan` rebuilt from scratch: now reads `PLAN.md` (not just
  `SPEC.md`), opens with a research gate that resolves open `?` items and
  records sourced findings in `§R`, refutes phase ordering / verification
  contracts / §T mappings, updates `PLAN.md` and `HANDOFF.md`, and ends
  with an explicit GO / NO-GO gate. Iterative: each round reduces needed
  research phases toward zero.

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
- `review-implementation` — principal-engineer code sweep from the latest
  release baseline, handing accepted fixes and improvements to `cook`.
- `garnish` — guarded cleanup of completed `PLAN.md` and `HANDOFF.md` cycles.

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
- `review` is now `review-plan`, separating plan review from implementation
  review; the shipped roster is now 11 skills.

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

[Unreleased]: personal:jasonyang-ee/skills/compare/v0.6.0...HEAD
[0.6.0]: personal:jasonyang-ee/skills/releases/tag/v0.6.0
[0.5.2]: personal:jasonyang-ee/skills/releases/tag/v0.5.2
[0.5.1]: personal:jasonyang-ee/skills/releases/tag/v0.5.1
[0.5.0]: personal:jasonyang-ee/skills/releases/tag/v0.5.0
[0.4.1]: personal:jasonyang-ee/skills/releases/tag/v0.4.1
[0.4.0]: personal:jasonyang-ee/skills/releases/tag/v0.4.0
[0.3.0]: personal:jasonyang-ee/skills/releases/tag/v0.3.0
[0.2.0]: https://github.com/jasonyang-ee/skills/releases/tag/v0.2.0
[0.1.0]: https://github.com/jasonyang-ee/skills/releases/tag/v0.1.0
