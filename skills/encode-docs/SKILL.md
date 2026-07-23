---
name: encode-docs
description: |
  Owns the format and the writing of the three project documents: SPEC.md, PLAN.md, and HANDOFF.md. Lossless compression: cuts input tokens while  staying precise by using the symbols and notations. Each document gets its own baked header to help a cold agent bootstrap. Triggers on any write to SPEC.md, PLAN.md, or HANDOFF.md, and on "/encode-docs".
---

# encode-docs

Owns three documents and nothing else. It is the **sole mutator** of `SPEC.md`, `PLAN.md`, and `HANDOFF.md`: no other skill writes those files directly — other skills supply content, this skill performs every write. Sectioned ownership keeps concurrent edits from clobbering each other.

| doc | lifetime | written by | this skill supplies |
| --- | --- | --- | --- |
| `SPEC.md` | durable | this skill only | format + all mutation |
| `PLAN.md` | one cycle | this skill (content from `prep`/`cook`/`cater`) | format + all mutation |
| `HANDOFF.md` | one session | this skill (content from `handoff`) | format + all mutation |

Applies to those three files and spec-referencing prose. Does NOT apply to code, error strings, commit messages, or PR descriptions.

## GRAMMAR

Shared by all three documents.

- Drop articles (a, an, the).
- Drop filler (just, really, basically, simply, actually).
- Drop aux verbs where a fragment works (is, are, was, were, being).
- Drop pleasantries.
- No hedging (skip "might", "perhaps", "could be worth").
- Fragments fine.
- Short synonyms: fix > implement, big > extensive, run > execute.

## SYMBOLS

Prefer over words:

```
→   leads to / becomes / triggers
∴   therefore / fix
∀   for all / every
∃   exists / some
!   must / required
?   may / optional / unknown
⊥   never / forbidden / nil
≠   not equal
∈   in
∉   not in
≤   at most
≥   at least
&   and
|   or
§   section reference

```

## PRESERVE VERBATIM

Never compress:

- Code blocks, snippets, one-liners with backticks.
- Paths: `src/auth/mw.go`.
- URLs.
- Identifiers: function names, variable names, env vars.
- Numbers and versions.
- Error message strings.
- SQL, regex, JSON, YAML.
- Quoted strings.

## SPEC.md File

`SPEC.md` is the durable one. It outlives every plan and every session, and it is **mutable** — when scope changes, rows are added, rewritten, or deleted. Its rules are about stable addressing and sectioned ownership. Never renumber. Never reuse an id. Sections are `§G` goal, `§C` constraints, `§I` interfaces, `§R` research (optional), and `§V` invariants — and nothing else. Tasks and one-time work never live here (see What belongs here).

### What belongs here

SPEC holds durable truth only: facts true across cycles, not this cycle's work. The bar to add a row is high. A new `§V`/`§C`/`§I` row must be a standing guarantee a future reviewer keeps checking — never a one-time fix, never a task, never a bug record. Tasks (`§T`) live in `PLAN.md`. One-time fixes and bug history live in `CHANGELOG.md` and git. When unsure whether a line is durable, leave it out: an over-full spec drifts, and every session pays to read it. Prefer removing a stale row to keeping it (garnish prunes on evidence).

### Dispatch

Inspect the request and the project state:

1. No `SPEC.md` at repo root AND args describe an idea → **NEW**
2. No `SPEC.md` AND `from-code` in args → **DISTILL**
4. `SPEC.md` exists AND args start `amend` → **AMEND**
5. `SPEC.md` exists, no args → ask which mode

Every mode that writes `SPEC.md` must leave the baked header present. Absent from a legacy file → trigger `encode-header` for the bytes and prepend them in the same write.

### Inputs from other skills

The other skills produce material; this one writes it. Ingest their handoff blocks into the named section, show a diff, write on OK:

- **prep** → drafted §G/§C/§I, sourced §R rows, proposed §V invariants (durable only). Its `PLAN.md` tasks (§T) stay in `PLAN.md`; they are never handed here.
- **review-plan** → drafted §V lines + the risk verdict
- **garnish** → rows to prune, with the evidence that they are stale

Never rewrite a section the handoff did not name. Sectioned ownership.

### NEW — idea to spec

1. Trigger `encode-header` for the SPEC baked header and emit it verbatim as the first bytes of the file.
2. Extract repo goal, one line, encoded → §G
3. Define core repo constraints → §C
4. List external surfaces → §I
5. research result → §R
6. Propose initial critical design spec invariants → §V

Then show the full file and ask: "spec OK? `/review-plan` if the blast radius is large, else `/cook`."

### DISTILL — code to spec

Walk the repo. §G from README/package manifest/entrypoint, §C from the stack, §I from public APIs/CLIs/configs, §V derived from tests and assertions. Baked header first. Flag every uncertain item with `?` so the user can confirm it.

### AMEND — update spec per reports or user request

1. Parse the description.
2. Find the root cause; read the relevant code.
3. Prefer editing or deleting a §V over adding one. If an existing invariant is now violated or the behavior changed, remove or rewrite it.
4. Add a new §V only when it clears the What-belongs-here bar: a durable, standing guarantee, not a one-time fix or a task. A recurrence that a code change already prevents does not need an invariant. When in doubt, do not add.
5. Append any new invariant to §V using the `next:` counter for its id.

### Section skeleton

Pipe table using `|`, Fixed order, fixed headers, addressable, escape a literal `|` as `\|`. Backticks fine. Cells trimmed. Empty cell is `-`. Every header row is followed by a delimiter row carrying one `---` cell per column, as shown below — without it the section renders as a wall of pipes instead of a table.

```
# SPEC

## §G GOAL
one line. what code must do.

## §C CONSTRAINTS
non-negotiable boundary. tech/lang/lib locked in
id|description
|---|---|
C1|run on Linux, macOS, Windows
C2|use Go 1.21

## §I INTERFACES
external surface. what world sees.
id|type|shape → output,purpose,condition
|---|---|---|
I1|cmd|`foo bar` → stdout JSON
I2|api|POST /x → 200 {id}
I3|file|`config.yaml` schema
I4|env|`FOO_KEY` required

## §R RESEARCH
each row ! cite source.
id|claim|source
|---|---|---|
R1|lib X rate-limits @ 100 rps|https://docs.x/limits
R2|`name` 1-64 chars `[a-z0-9-]`, ⊥ lead/trail `-`|https://agentskills.io/specification.md

## §V INVARIANTS
critical design spec. each ! hold.
id|invariant definition
|---|---|
V1|∀ req → auth check before handler
V2|token expiry ≤ ⊥ allowed
```

### Addressing

Item are addressed by section abbriviation + id.

`<Sn>` — `C1` is constrains item 1.
`<Sn>` — `V2` is invariants item 2.

Ids are monotonic and never reused, including after a row is deleted. The baked header carries one `next:` counter per id-keyed section (`§C`/`§I`/`§R`/`§V`) and it is the only source for the next id — scanning for the highest current id is wrong once rows have been pruned, because the highest is no longer the newest.

When prune a stale row, delete the row outright, bump nothing, and leave `next:` where it is. An id whose row is gone stays retired forever.

### Delete or rewrite

Deletes stale §C/§R/§V/§I rows if no longer relevent, with evidence. Rewrites if row is partically relevent but need corrections to steer repo toward users intent　or instruction.

## PLAN.md File

`PLAN.md` is a contract for one cycle. It is replaced wholesale rather than amended, and it is read by an executor who was not present when it was written. So its rules are the opposite of the spec's: nothing here is addressed from outside, nothing needs a stable id, and the whole file is disposable. What it must do instead is be **executable cold** — every phase self-contained enough that an agent can start it with no chat history.

Structure, in this order:

1. one-line goal;
2. ground rules for the run, including the evidence each phase must produce;
3. existing assets already in the repo;
4. a phase-order table;
5. the full section for each phase.
6. multiple task for detailed work instruction in each phase, citing the §V invariants if relevant for reviewer to check.

Phase ids are `F1`, `F2`, ... and stay monotonic within the file. First phase is always research; last phase is always final verification. No coding before the research phase or after the verify phase.

Task ids are `T1`, `T2`, ... and stay monotonic within the phase.

The baked header carries a mutable `planning status: new | work-in-progress | done` line — the one header value that changes through the cycle, like `SPEC.md`'s `next:` counter. It tracks **execution**, not authorship: `prep` writes and expands the plan as `new` and never as `work-in-progress`, `cook` and `cater` alone flip `new` → `work-in-progress` at the moment they start executing, `handoff` sets `done` once every `§T` row is `x` and final verification holds and otherwise leaves the value untouched, and `garnish` resets it to `new` when it blanks the file. `cook` and `cater` run on `work-in-progress` (resume) or on a `new` plan that carries executable phase sections (flip first, then start); a `new` plan with no phase sections is an empty stub and stops for `/prep`, and `done` stops for `/garnish`. The discriminator between the two kinds of `new` is the presence of phase sections, never task status. `prep` may expand or rewrite a plan only while its status is not `work-in-progress`, so an in-flight cycle is never clobbered.

Every phase section names its goal, inputs, and files touched, then one or more `§T` tasks. Each task carries an id, status, touch paths, work details (citing the relevant §V), a verification contract, exit criteria, and the next pointer.

```md
# PLAN

goal: <one line>

## ground rules
- <encoded bullets>

## existing assets
- <repo facts, tests, docs, constraints>

## phase order
id|goal|depends|exit
F1|research unknowns & refine plan|-|facts logged, later phases updated
F2|implement approved work|F1|target tests green
F3|final verify code vs spec & plan|F2|full suite green, drift resolved

## F1 research
goal: <one line>
inputs: <specs, questions, sources, instructions>
files: <paths likely touched>

§T  TASKS:
T.id|status|description
touch: <paths>
details: <how|what to work>
verify: <what proves this phase done>
exit: <state>
next: <F<n>.T<n>>

T.id|status|cites
touch: <paths>
details: <how|what to work>
verify: <what proves this phase done>
exit: <state>
next: <F<n>.T<n>>
```

Keep it compact. `PLAN.md` is a working document, not an RFC. Durable facts belong in `SPEC.md`; if a line would still matter after the cycle closes, it is in the wrong file.

## HANDOFF.md File

`HANDOFF.md` = baton. Overwritten in full ∀ session, read by an agent with ⊥ memory. Records **state, ⊥ intent** — intent → `PLAN.md`, truth → `SPEC.md`. Failure mode it guards: session dies mid-edit & the next cannot tell finished from merely started. ∴ only doc that ! record uncommitted work, exact test state, & precise next action (file + function).

Pointers = `F<n>.T<n>` (phase.task → `PLAN.md`), ⊥ bare step numbers. The `in progress` & `next` lines ! use them. Lean: one line per fact, symbols > words.

```md
# HANDOFF <YYYY-MM-DD>

branch <name> | last commit <sha> | tests <pass N/N | FAIL: file+case> (<cmd>)
uncommitted: <none | files + why>

## done this session
<F<n>.T<n>>: <one line> → <sha>

## in progress (exact stop point)
<F<n>.T<n>>: <status: mid-edit | done>
mid-edit files: <paths | none>

## next
<F<n>.T<n>> | preconditions: <gates | none>

## deviations & decisions
plan said <X> → did <Y> ∵ <Z> (PLAN.md updated: y|n)
user decided: <ruling | none>

## watchouts
<trap: flaky test | env quirk | live-server state | doc half-truth>

## final verification
item|status|evidence|decision
<§V/§I id>|<HOLD | VIOLATE | UNVERIFIABLE>|<file/test>|<code | SPEC | ->
```

Rules:

1. Uncommitted work = first-class fact. Name ∀ file + why. Prefer committing (even a `~` wip §T flip) over a dirty tree.
2. Failing tests named exactly — file + case — ⊥ "some failing".
3. `in progress` ! name the NEXT TASK executable verbatim: action, file, function — ⊥ "continue the phase". Reference done tasks & next as `F<n>.T<n>`.
4. Material deviations already live in `PLAN.md`/`SPEC.md`; baton points at them, ⊥ becomes their only record.
5. Empty section → `-`, ⊥ deleted (the shape is the checklist).
6. Only the final-verify phase fills the result table; else header row alone.

## BAKED HEADERS

Each of the three documents opens with its own baked header, emitted verbatim as the first bytes. When a header is missing, or a header or format update is requested, trigger `encode-header` to supply the bytes and emit them exactly as given — this skill still performs the write.

## BOUNDARIES

- User asks for a prose explanation → switch to normal English.
- Spec documents for external review (RFC, pitch) → normal English.
- Commit message → `encode-commit` owns that format.
- Diff comment in code → normal English.
- No sub-agents. The main thread writes.
- No dashboards, no logs, no state files beyond these three documents.
- No auto-execute after a spec write. The user invokes `/cook` explicitly.

## WHEN UNSURE

If cutting a word loses a fact, keep it. This is compression, not amputation.
