<!-- SPEC FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants | §T tasks | §B bugs
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Tables (§R,§T,§B): pipe-delimited. Escape literal \| . Empty cell = -
§T status: x done | ~ wip | . todo
ids: monotonic, never reused — take the next from `next:` below, ⊥ from the highest row (rows get pruned)
next: V95 T91 B7
One file rule: >500 lines → compact §B oldest-first, ⊥ split into more files.
Full rules: /encode-docs skill. Cutting a word that loses a fact ⊥ allowed.
-->

# SPEC

## §G GOAL

Public repo `jasonyang-ee/skills` → personal central skill collection, installable via `npx skills add jasonyang-ee/skills`

Core purpose = 5-step spec driven design workflow.
1. `prep` → interative idea/bug/feature/expected behavior → `PLAN.md` + `HANDOFF.md` + durable `SPEC.md`
2. `review-plan` → interative research/refute until plan ready
3. `cook`|`cater` → execute phases per plan with handoff closure
4. `garnish` → cleanup short-term files, preserve durable state
5. `review-code` → clean review for implementaions then close cycle, may trigger next `prep` if bug or gap is found

Core AI files
1. `SPEC.md` → durable truth but mutable if scope changes
2. `PLAN.md` → implementation phase planning for `cook`|`cater`, research-first, verify-last, iterative
3. `HANDOFF.md` → session baton for cold resume, tracks phase progress, uncommitted files, next step

Helper skills = `setup` (bootstrap repo guidance), `encode-docs` (governs every `PLAN.md`/`HANDOFF.md`/`SPEC.md` write), `encode-commit` (clean commit message generator). `encode-pr` (PR summary generator)


## §C CONSTRAINTS

- Comply to Agent Skills spec. https://agentskills.io/specification.md
- Install by `npx skills add`. https://www.skills.sh/docs
- Install by Claude Code skills. https://code.claude.com/docs/en/skills
- Skills = markdown only. ⊥ runtime deps. ⊥ Python. ⊥ scripts
- License MIT. `NOTICE.md` @ root credit for upstream copyright
- ⊥ npm publish
- Test scope = `skills/**` contents only
- Layout `skills/<name>/SKILL.md`. Agent Skills spec + skills CLI flat discovery
- Efficient skill instructions

- `/setup` bootstrap repo guidance in `AGENTS.md` and `CLAUDE.md` with only expending `AI File Purpose` `Skills` `Encoding Symbols`. Don't overwrite existing user content. Spawn minimal blank template for `CHANGELOG.md` + `SPEC.md` + `PLAN.md` + `HANDOFF.md` if missing.
- `/prep` iteratively turn idea/bug/feature/expected behavior from user into `PLAN.md` + `HANDOFF.md` + durable `SPEC.md`. Ask user for clearification on unknowns until firm understanding on user's intent. Trigger `/encode-docs` to write all three files.
- `/review-plan` iteratively research/refute plan until ready. End with explicit GO/NO-GO. Invoke `/prep` to improve plan if bug or gap is found.
- `/cook` execute all remaining phases in order as a single main agent by default. Verify, commit, and refresh `HANDOFF.md` after each phase. Pass a phase to target one phase only. Invoke `/handoff` at the end of every session.
- `/cater` same as `/cook` but dispatches multiple sub-agents in parallel to run `/cook` for phases whose file sets do not overlap. Invoke `/handoff` at the end of every session.
- `/garnish` verify a completed plan cycle, then remove contents in short-lived `PLAN.md` and `HANDOFF.md` while preserving blank template format to reduce file recreation cost. Then review durible `SPEC.md` to remove out-of-scope spec in all sections. Invoke `/encode-docs` to write all three files.
- `/review-code` principal-engineer sweep since the last release baseline for correctness, complexity, security, reuse, and coherence. Generate question for user to clarify unknowns if distilled code and evidence diviate from `SPEC.md`. End with explicit report of findings and suggested next step. Trigger `/prep` to document all questions and reports in `HANDOFF.md` where user will run `/prep` to clarify unknowns or supply further instruction.
- `/encode-docs` owns the format of `SPEC.md` + `PLAN.md` + `HANDOFF.md`. Must user this skill to modify those documents.
- `/encode-commit` generate compressed commit messages summarizing all changes.
- `/encode-pr` generate compressed pull request summary. One line per finding: location, problem, fix.
- `/handoff` writes `HANDOFF.md` using `/encode-docs`, the baton for next cold session agent reads to know exactly where work stopped and how to resume.



## §I INTERFACES

- cmd: `npx skills add jasonyang-ee/skills`
- cmd: `npx skills add jasonyang-ee/skills --list`
- cmd: `npx skills add jasonyang-ee/skills -s prep -s cook -s encode-docs -a claude-code -g -y`
- file: `skills/<name>/SKILL.md` → frontmatter `{name == <name>, description}`
- cmd: `npm test` → `node --test` → exit 0 ⟺ automated §V tests pass; release/manual checks.
- cmd: `./release.sh [--major|--minor|--patch] [-y] [-n]` → release entrypoint. Preflight (branch, clean tree, tag ⊥ ∃, `[Unreleased]` ⊥ empty) → `npm test` gate → bump → changelog move → commit → tag `v<x.y.z>` → push. ⊥ publish (tag push → `release.yml` → GitHub Release ∵ dup else). Test gate ! stay & ! surface output on red; ⊥ skip flag (∵ red tag ≫ painful to revert)
- ci: push | PR → `.github/workflows/ci.yml` → matrix Node 20, 22, 24
- ci: tag `v*.*.*` → `.github/workflows/release.yml` → GitHub Release, body ← `CHANGELOG.md` section
