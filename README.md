# AGENT SKILLS

[![CI](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml/badge.svg)](https://github.com/jasonyang-ee/skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A personal collection of agent skills for spec-driven development

## INSTALL

Install with [`Vercel Skills`](https://www.skills.sh/docs).

- Default

	```bash
	npx skills add jasonyang-ee/skills
	```

- All skills, global scope, non-interactive

	```bash
	npx skills add jasonyang-ee/skills --skill '*' --global --yes
	```

- Target one agent with `-a`

	```bash
	npx skills add jasonyang-ee/skills --skill '*' --global --yes -a claude-code
	```

Install with Claude Code or Codex via Marketplace.

- Add Marketplace Then Install Skills Plugin

	```
	/plugin marketplace add jasonyang-ee/skills
	/plugin install skills@jasonyang-ee
	```

## MAIN SKILLS

| Skill&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | What it does |
| --- | --- |
| [`setup`](skills/setup/SKILL.md) | Bootstraps `AGENTS.md`, the `CLAUDE.md` import, and minimal missing `CHANGELOG.md`/`SPEC.md` files before the core workflow. |
| [`prep`](skills/prep/SKILL.md) | Researches a request and creates `PLAN.md` + `HANDOFF.md` with reusable evidence and gates. A numbered research phase is optional; final verification remains last. Hands durable facts to `encode-docs`. |
| [`review-plan`](skills/review-plan/SKILL.md) | Adversarial senior review that tries to *refute* the spec and plan before implementation. Ends in an explicit go/no-go. |
| [`cook`](skills/cook/SKILL.md) | Executes all remaining `PLAN.md` phases in order as a single main agent by default — verification contract first, self-review before every commit, no sub-agents. Pass a phase such as `F1` to target one phase. |
| [`cater`](skills/cater/SKILL.md) | Adaptively executes a phase directly through `cook` or delegates disjoint work when parallelism, context isolation, or specialist capability pays; shows scope, agent type, model, effort, and rationale before dispatch, then reviews every returned diff. |
| [`review-code`](skills/review-code/SKILL.md) | Reviews an explicit baseline or the latest reachable release for correctness, security, complexity, reuse, and coherence; hands accepted follow-up work to `prep` when authorized. |
| [`review-vibe`](skills/review-vibe/SKILL.md) | Standalone review and direct fixes requested by the user, including matching natural language; never invoked by another skill. Small reviews completed and verified in one session may omit `REVIEW.md`; broader or unfinished work keeps coverage and resume evidence. |
| [`garnish`](skills/garnish/SKILL.md) | Verifies a completed cycle, prunes superseded requirements on evidence, and resets `PLAN.md` and `HANDOFF.md` to their headers while preserving `SPEC.md`. |

## WORKFLOW

0. **Setup**
   
   Using `/setup` to bootstrap a repository for the following main workflow:

1. **Prep**
   
   Using `/prep` to inspect and research an idea, bug, feature, or expected behavior, then create an iterative `PLAN.md` and `HANDOFF.md`, while handing durable decisions to `SPEC.md`. The plan records the covered questions, findings, local revisions and relevant dirty inputs, applicable external sources/check dates, unknowns, and gate. When that evidence covers the scope, the first phase can implement the change; a separate research or confirmation phase is unnecessary.
   
2. **Review the plan**
   
   In a cold session, `review-plan` resolves research questions and refutes the plan until it reaches an explicit GO gate. Repeat as needed.

3. **Work on the plan**
   
   In another cold session, `/cook` executes all remaining phases in order, verifying, committing, and refreshing `HANDOFF.md` after each phase. Pass a phase to target one phase only. Or use `/cater` to choose per ready phase: direct execution through loaded `cook` when delegation has no material benefit, or bounded sub-agent assignments when safe parallelism, context isolation, or specialist capability pays. Both validate relevant research before changing execution state, coding, or dispatching; missing or stale evidence runs `review-plan` in the main agent first. Unresolved consequential questions block dependent coding. Changed inputs prompt a check of affected assumptions; refresh only evidence whose findings or decisions no longer support the work. Unrelated changes and verified planned edits that preserve that support do not require repeating research.

4. **Garnish**
   
   After all phases pass, `/garnish` preserves completion evidence, reviews durable requirements, and resets `PLAN.md` and `HANDOFF.md` to their baked headers. It prunes spec rows only when evidence shows the requirement was retired or superseded.

5. **Review the implementation**
   
   Use `/review-code` to review the completed implementation from an explicit baseline or the latest reachable release. Accepted fixes or improvements enter the next `/prep` cycle when follow-up planning is authorized.

The loop is iterative. This is the default order; execution and closure gates still apply to the retained-cycle variant below.

- Step 1 can be used repetitively to refine research and the plan
- Step 5 can start another prep cycle.
- `handoff` keeps the baton current at phase closure and session stops during active cycle work.

### Review with retained cycle context

You can review before cleanup to retain task and verification context. For example: “Use `/review-code` against `main`, using the retained plan and handoff. Then run `/garnish` if closure checks pass, and `/prep` for accepted actionable findings.” This authorizes the chain without another confirmation. The review preserves findings, baseline, and task evidence before cleanup; `garnish` still requires valid completed work. Stale evidence or unfinished work prevents cleanup. During active execution, authorized `prep` queues findings; no accepted actionable work means no empty remediation plan. A plain review request does not authorize cleanup or planning.

### Standalone review and fixes

Use `/review-vibe`, or a matching natural-language request, for a standalone review with direct fixes: correctness and security, test value, complexity and reuse, provider contracts, recovery and concurrency, data integrity, file organization, performance, and applicable UI behavior. No other skill may invoke or load it as a phase, hook, or helper; it can use its own encoding helpers. It follows evidence, verifies changes, and reports coverage limits. Existing cycle ownership and unrelated edits are preserved; supported durable spec corrections go through `encode-docs`.

A small identifiable scope whose applicable surfaces, relevant callers, fixes, and required verification finish in one session/context may omit `REVIEW.md`; this can include a whole tiny codebase. Its final report still states coverage, results, and limits. Reviews beyond that bounded case, including broad or multi-round work, automatically keep scope, coverage, findings, checks, and the next action in root `REVIEW.md`. If small work expands, leaves unresolved coverage, encounters blockers, or cannot finish, it creates or updates that record before stopping and preserves the evidence already gathered. Large reviews continue through bounded sections and rounds while work is feasible. Later sessions resume from the record and recheck affected coverage. A completed round does not mean the whole review or all fixes are complete. Explicit scope and output preferences take precedence, and unrelated existing ledger content is preserved.

## SUPPORTIVE SKILLS

Those skills are loaded by the main skills above, but can also be invoked directly for custom workflows.

| Skill&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | What it does |
| --- | --- |
| [`handoff`](skills/handoff/SKILL.md) | Gathers `HANDOFF.md`, the baton the next cold session reads to know exactly where work stopped and what to watch out for, and hands it to `encode-docs` to write. |
| [`encode-docs`](skills/encode-docs/SKILL.md) | Owns the compact format and all writes to `SPEC.md`, `PLAN.md`, and `HANDOFF.md`; other workflow skills supply content. |
| [`encode-header`](skills/encode-header/SKILL.md) | Generate compressed header for `SPEC.md`, `PLAN.md`, and `HANDOFF.md`. |
| [`encode-agent`](skills/encode-agent/SKILL.md) | Generate a compact, self-contained sub-agent prompt with explicit scope, quality, verification, stop, and completion contracts. |
| [`encode-commit`](skills/encode-commit/SKILL.md) | Writes concise Conventional Commit messages, preferably under 50 characters, with rationale when needed. |
| [`encode-pr`](skills/encode-pr/SKILL.md) | Drafts concise review comments with location, problem, impact, and fix direction; expands when clarity requires it. |

## Benchmark

See [the tiny workflow benchmark](benchmark/README.md) for three small coding prompts and [the comparison results](benchmark/RESULTS.md) for old, current, and revised skills, with independent checks and preserved run evidence.

## License

[MIT](LICENSE) for original work. see [NOTICE.md](NOTICE.md) for modified upstream source.
