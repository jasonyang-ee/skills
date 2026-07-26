<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | §T tasks (≥1) | verify | exit | next
§T tasks defined & tracked in each phase. Status: x done | ~ wip | . todo.
Tracked: planning status ∈ {new, work-in-progress, done} — keyed to EXECUTION, ⊥ authorship. prep writes/expands as `new`; cook/cater ALONE flip new→work-in-progress at start & run on new(has phases)|wip; handoff→done on ∀ §T x + verify HOLD; garnish resets new. `new`+⊥phases (empty stub) → /prep; `done` → /garnish. prep expands ⟺ status ≠ work-in-progress.
Encoding: same symbol set as SPEC.md. Preserve code/paths/ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
planning status: work-in-progress
-->

# PLAN

goal: make `cater` choose direct vs delegated execution intelligently, expose complete agent selections, & dispatch quality-complete prompts through new `encode-agent` support skill

## ground rules

- research first; implementation only after F1 evidence tightens later phases; final verification last
- smallest coherent public-skill diff; unwrapped prose in `skills/**`; ⊥ project-specific refs, Python, skill `scripts/`, runtime deps
- `encode-docs` sole mutator of `SPEC.md`/`PLAN.md`/`HANDOFF.md`; durable desired state = §I12/§V15/§V22/§V30
- ∀ phase: read touched files in full, preserve user changes, produce named file/test evidence, self-review full diff, update `CHANGELOG.md` only when behavior ships
- automated tests cover Agent Skills contract + real CLI discovery only; skill behavior/prose verified by explicit manual contract sweeps (§C8)
- no push/tag; implementation commits through `encode-commit`; `handoff` refreshed after each executed phase

## existing assets

- `skills/cater/SKILL.md` already owns phase selection, disjoint-file safety, capability-tier choice, per-phase assignment files, acceptance review
- `skills/cook/SKILL.md` owns direct main-agent quality contract; current `cater` dispatcher-only rules contradict requested fallback
- `tests/skill-contract.test.mjs` proves §V1-4; `tests/cli-discovery.test.mjs` proves §V5 for dynamic `skills/` roster
- `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `SPEC.md` carry roster/workflow descriptions
- research checked 2026-07-26: sub-agents have isolated context; host model/effort controls vary; named skill content may preload (§R8)
- `BACKLOG.md` request ingested only after this plan reaches disk (§V27)

## phase order

id|goal|depends|exit
|---|---|---|---|
F1|confirm portable routing + prompt contracts|-|decision matrix, edit map, manual checks recorded; later phases tightened
F2|ship `encode-agent` + adaptive `cater`|F1|new skill discoverable; routing, metadata, prompt contracts coherent
F3|align public docs + bootstrap guidance|F2|roster/workflow/changelog match shipped behavior
F4|final verify implementation vs spec + plan|F3|full suite green; relevant §I/§V/§T classified; drift resolved

## F1 research

goal: prove exact adaptive-routing and compact-prompt contracts before edits
inputs: backlog request; §C2-4/§C8/§C11-12; §I7/§I12; §R8; §V1-8/§V15-16/§V22/§V28-30; current `cook`/`cater` contracts; current host primary docs
files: `SPEC.md`, `skills/cater/SKILL.md`, `skills/cook/SKILL.md`, `skills/encode-docs/SKILL.md`, `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `NOTICE.md`, `tests/*.mjs`
research evidence:
- direct-route contradictions: `skills/cater/SKILL.md:4`, `:7`, `:9`, `:11`, `:18`, `:29`, `:31`, `:88`, `:126`; existing fallback seed `:55`
- routing decision: default direct when one ready phase or ⊥ parallel-safe set; single delegation allowed only for named context isolation, specialist capability, or context-budget benefit; one phase ⊥ direct + delegated simultaneously
- prompt boundary: `encode-agent` receives caller-selected facts only; ⊥ reads cycle docs; output fields = objective, scope, authority, relevant invariants, quality, verification, stop, completion
- dispatch disclosure: phase/task, scope, capability/type, model, effort, rationale; absent host control → `inherit` | `unavailable`; ⊥ fixed provider model names (§R8)
- verification split: `tests/skill-contract.test.mjs` exact 5 cases → §V1-4; `tests/cli-discovery.test.mjs` exact 2 cases → §V5; routing/prose/provenance → manual under §C8
- provenance: `NOTICE.md` table covers modified upstream skills; `AGENTS.md` requires row only for new vendored MIT skill ∴ original `encode-agent` → ⊥ NOTICE row

§T TASKS

T1|x|map direct-vs-delegate decision contract (§V15, §V22)
touch: `PLAN.md`, `HANDOFF.md`
details: inventory contradictory dispatcher-only lines; define default direct route for one/non-parallel ready phase, allowed single delegation only with named material context/capability/isolation benefit, disjoint parallel route for ≥2 safe assignments, & prohibition on dual direct/delegated ownership
verify: cited `file:line` matrix covers description, principles, selection, failure, session close, non-goals; ⊥ unresolved `?`
exit: every current contradiction mapped to F2 or explicitly preserved with reason
next: F1.T2

T2|x|prove portable `encode-agent` input/output + verification surface (§I12, §V28, §V30)
touch: `PLAN.md`, `HANDOFF.md`
details: confirm helper receives bounded caller-supplied context only; define prompt fields for objective, scope, authority, relevant §V, quality rules, verification, stop conditions, completion evidence; define visible dispatch fields phase/task, scope, capability/type, model, effort, rationale with `inherit`/`unavailable` fallback; map contract checks to existing automated tests + manual `rg`
verify: primary-source findings dated; exact F2/F3 paths + F4 commands named; no host-specific model name required
exit: cold executor can implement helper and `cater` without chat context
next: F2.T1

## F2 implementation

goal: add compact prompt helper and let `cater` route ready work directly or through quality-bound sub-agents
inputs: F1 decision matrix; §I12; §R8; §V1-8/§V15/§V22/§V28-30; `cook` quality contract
files: `skills/encode-agent/SKILL.md`, `skills/cater/SKILL.md`, `CHANGELOG.md`

§T TASKS

T1|x|create self-sufficient `encode-agent` support skill (§I12, §V1-4, §V6-8, §V28, §V30)
touch: `skills/encode-agent/SKILL.md`
details: add valid frontmatter + ≤500-line unwrapped body; accept only bounded assignment facts supplied by caller; emit condensed prompt preserving identifiers/paths/errors; mirror necessary `cook` quality outcomes without loading or reading main cycle docs; require scope guard, verification-first execution, full-diff self-review, stop conditions, completion evidence; ⊥ mutate repo state itself
verify: `node --test tests/skill-contract.test.mjs`; exact cases `ships at least one skill with parseable frontmatter`, `declares name and description as non-empty strings`, `names every skill legally, uniquely, and after its directory`, `keeps every description within the spec limit`, `keeps every body under the recommended length` prove §V1-4; manual file-tree + `rg -n "PLAN.md|HANDOFF.md|SPEC.md|cook|emoji" skills/encode-agent` prove §V6-8/§V28/§V30 per §C8
exit: helper loads alone and produces executable cold prompt contract
next: F2.T2

T2|x|rewrite `cater` routing, selection output, & assignment generation (§V15, §V22, §V30)
touch: `skills/cater/SKILL.md`, `CHANGELOG.md`
details: replace dispatcher-only premise with adaptive orchestrator; evaluate ready work before execution; default direct for one/non-parallel phase unless named benefit justifies delegation; load `cook` and follow its direct loop when main executes; preserve disjoint-file rule for parallel dispatch; before every dispatch show concise Markdown table with phase/task, scope, capability/type, model, effort, rationale; use `encode-agent` to build bounded prompt/assignment; reconcile retry, acceptance, handoff, stop, end-session, non-goal rules for both routes; record shipped behavior under `CHANGELOG.md` `## [Unreleased]`
verify: manual `rg -n "dispatcher|do not write|Dispatch only|run it yourself|model|effort|encode-agent|cook" skills/cater/SKILL.md`; inspect every hit against §V15/§V22/§V30; `node --test tests/skill-contract.test.mjs` exact 5 contract cases confirm edited frontmatter/body limits; routing behavior remains manual by §C8
exit: no contradictory dispatcher-only rule; direct + delegated paths each name quality, state, failure, verification, handoff ownership
next: F3.T1

## F3 documentation

goal: align catalog, workflow guidance, provenance decision, & release notes with shipped behavior
inputs: accepted F2 diff; §G; §I12; §V10/§V15/§V22/§V30; repo end checklist
files: `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`, `NOTICE.md`, `CHANGELOG.md`

§T TASKS

T1|.|update skill roster + workflow descriptions (§V7, §V15, §V22, §V30)
touch: `README.md`, `AGENTS.md`, `skills/setup/SKILL.md`
details: change count 12→13; add `encode-agent` support entry; describe `cater` adaptive direct/delegated route, visible model+effort selection, and `cook` loading for direct execution; keep setup template generic
verify: `rg -n "12 skills|13 skills|encode-agent|cater|sub-agent" README.md AGENTS.md skills/setup/SKILL.md`; manually classify every workflow/roster hit as aligned or unrelated history; docs prose remains manual by §C8
exit: public + bootstrapped guidance matches §V15/§V22/§V30
next: F3.T2

T2|.|verify provenance + user-visible change (§V10-11)
touch: `NOTICE.md`, `CHANGELOG.md`
details: apply F1 evidence that original `encode-agent` needs ⊥ provenance row; verify plain-English `## [Unreleased]` entries from F2 describe new helper and adaptive `cater`; correct only drift
verify: `rg -n "encode-agent|adaptive|effort|\[Unreleased\]" NOTICE.md CHANGELOG.md`; manual §V10-11 decision recorded in `HANDOFF.md` because license/release/hygiene are ⊥ test-backed (§C8)
exit: provenance decision evidenced; changelog describes shipped behavior without plan ids/symbols
next: F4.T1

## F4 final verification

goal: prove implementation holds spec, plan, Agent Skills contract, discovery, & repository coherence
inputs: full accepted diff; relevant `SPEC.md` §G/§C/§I/§R/§V; F1-F3 tasks; repo end checklist
files: `SPEC.md`, `PLAN.md`, `HANDOFF.md`, all F2-F3 touched paths

§T TASKS

T1|.|run automated + manual contract suite (§I7-8/§I12, §V1-8/§V10-11/§V15/§V22/§V28-30)
touch: `HANDOFF.md`
details: run exact commands; inspect CLI output contains `encode-agent`; run contradiction/roster/provenance searches from F2-F3; classify each relevant §I/§V and every §T as HOLD/VIOLATE/UNVERIFIABLE with file/test evidence
verify: `npm test`; `node --test tests/skill-contract.test.mjs`; `node --test tests/cli-discovery.test.mjs`; all green with exact counts, else name file+case
exit: no VIOLATE; every UNVERIFIABLE has reason + decision
next: F4.T2

T2|.|self-review full cycle diff + close baton (§V16, §V19, §V21-22, §V29)
touch: `PLAN.md`, `HANDOFF.md`
details: read full diff for logic, unnecessary complexity, missed reuse, contradictory direct/delegated ownership, host-specific assumptions, scope creep, wrapped skill prose, unrelated dirty work; resolve drift in code or spec; record final result table; mark tasks/status only after evidence holds; commit through `encode-commit`; ⊥ push/tag
verify: `git diff --check`; `git status --short`; final verification table cites every decision; plan complete only when ∀ §T=`x` + HOLD
exit: full suite green, diff coherent, final table complete, clean committed handoff
next: `/garnish`
