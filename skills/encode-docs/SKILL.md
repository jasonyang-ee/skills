---
name: encode-docs
description: |
  Owns the format and the writing of the three project documents: SPEC.md,
  PLAN.md, and HANDOFF.md. Sole mutator of SPEC.md. Lossless compression:
  cuts tokens ~75% vs prose while staying precise, using the symbol set
  (arrow, therefore, for-all, never, must) those documents are written in.
  Each document gets its own section rules and its own baked header, so a
  cold agent can read or extend any of them without loading this skill.
  Triggers on any write to SPEC.md, PLAN.md, or HANDOFF.md; when the user
  asks to write a spec, start a new spec, distill a spec from existing code,
  add invariants, amend sections (G, C, I, R, V, T, B), or record a bug via
  `bug:`; and on "encode docs", "encode the spec", "compress this spec",
  "write the spec for...", "new spec", "amend V.3", "distill spec from code".
  Applies to these three files only, never to chat replies or commit messages.
license: MIT
---

# encode-docs

Owns three documents and nothing else:

| doc | lifetime | written by | this skill supplies |
| --- | --- | --- | --- |
| `SPEC.md` | durable | this skill only | format + all mutation |
| `PLAN.md` | one cycle | `prep`, executed by `cook`/`cater` | format only |
| `HANDOFF.md` | one session | `handoff` | format only |

Sole mutator of `SPEC.md`. Other skills produce material and hand it here;
they never write that file themselves. `PLAN.md` and `HANDOFF.md` are written
by their owning skills, which load this one for the format.

Applies to those three files, spec-referencing prose, and bug rows. Does NOT
apply to code, error strings, commit messages, or PR descriptions.

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

`SPEC.md` is the durable one. It outlives every plan, every session, and most
of the code it describes. It is appended to far more often than rewritten, and
its identifiers are cited from commits and pull requests that will still exist
when the rows are gone. So its rules are about **stable addressing and
sectioned ownership**: never renumber, never reuse an id, never rewrite a
section nobody asked you to touch.

### Dispatch

Inspect the request and the project state:

1. No `SPEC.md` at repo root AND args describe an idea → **NEW**
2. No `SPEC.md` AND `from-code` in args → **DISTILL**
3. `SPEC.md` exists AND args start `bug:` → **BUG**
4. `SPEC.md` exists AND args start `amend` → **AMEND**
5. `SPEC.md` exists, no args → ask which mode

Every mode that writes `SPEC.md` must leave the baked header present. Absent
from a legacy file → prepend it in the same write.

### Inputs from other skills

The other skills produce material; this one writes it. Ingest their handoff
blocks into the named section, show a diff, write on OK:

- **prep** → drafted §G/§C/§I, sourced §R rows, proposed §V/§T plan
- **review-plan** → drafted §V lines + the risk verdict
- **garnish** → rows to prune, with the evidence that they are stale

Never rewrite a section the handoff did not name. Sectioned ownership.

### NEW — idea to spec

1. Emit the SPEC baked header verbatim as the first bytes of the file.
2. Extract goal, one line, encoded → §G.
3. List constraints the user stated or implied → §C.
4. List external surfaces the user named → §I.
5. §R only if research ran — else omit the section entirely.
6. Propose initial invariants → §V, numbered from V1.
7. Break the goal into ordered tasks → §T table, all status `.`, ids from T1.
8. §B with the header row only.

Then show the full file and ask: "spec OK? `/review-plan` if the blast radius
is large, else `/cook`."

### DISTILL — code to spec

Walk the repo. §G from README/package manifest/entrypoint, §C from the stack,
§I from public APIs/CLIs/configs, §V derived from tests and assertions, §T one
row per known TODO or missing test, §B empty. Baked header first. Flag every
uncertain item with `?` so the user can confirm it.

### BUG — bug to §B and §V

1. Parse the description.
2. Find the root cause; read the relevant code.
3. Decide whether a new invariant would catch a recurrence. If yes, draft it.
4. Append a §B row: `B<next>|<date>|<cause>|<fix or V<n>>`.
5. Append the invariant to §V.
6. If the fix changes behavior, add or update §T rows.
7. Show the diff. Apply only on user OK.

Every bug gets a §B row. The invariant is optional but preferred.

### AMEND — targeted edit

Read the named section. Show it. Ask what changes. Write. Show the diff.
Never silently rewrite a section the user did not name.

### Section skeleton

Fixed order, fixed headers, addressable.

```
# SPEC

## §G GOAL
one line. what code must do.

## §C CONSTRAINTS
- bullet. non-negotiable boundary.
- bullet. tech/lang/lib locked in.

## §I INTERFACES
external surface. what world sees.
- cmd: `foo bar` → stdout JSON
- api: POST /x → 200 {id}
- file: `config.yaml` schema …
- env: `FOO_KEY` required

## §R RESEARCH
optional. only if research ran. pipe table. each row ! cite source.
id|claim|source
R1|lib X rate-limits @ 100 rps|https://docs.x/limits

## §V INVARIANTS
numbered. testable. each ! MUST hold.
V1: ∀ req → auth check before handler
V2: token expiry ≤ ⊥ allowed

## §T TASKS
pipe table. status: `x` done / `~` wip / `.` todo.
id|status|task|cites
T1|.|scaffold repo|-
T2|x|add §V.1 middleware|V1,I.api

## §B BUGS
pipe table. each row = bug + what catches recurrence.
id|date|cause|fix
B1|2026-04-20|token `<` not `≤`|V2
```

Row shapes:

```
V<n>: <subject> <relation> <condition>
<kind>: <name> → <shape>          api: POST /x → 200 {id:string}
                                  cmd: `foo bar <arg>` → stdout JSON
                                  env: FOO_KEY ! set
```

**Table cells**: escape a literal `|` as `\|`. Backticks fine. Cells trimmed.
Empty cell is `-`.

### Addressing

`§<S>.<n>` is section.item — `§V.2` is invariants item 2. Commits, commit
messages and PRs cite by section. Zero ambiguity.

### Ids never move

Ids are monotonic and never reused, including after a row is deleted. The
baked header carries a `next:` counter and it is the only source for the next
id — scanning for the highest current id is wrong once rows have been pruned,
because the highest is no longer the newest.

When `garnish` prunes a stale §V or §T row, delete the row outright, bump
nothing, and leave `next:` where it is. An id whose row is gone stays retired
forever, so an old commit citing `V18` never resolves to some later invariant.

### One file rule

A big project gets more sections, not more files; grep ceremony kills agent
speed. Past 500 lines, compact §B oldest-first before splitting anything.

### Writes

| command | writes | section |
| --- | --- | --- |
| `/encode-docs new` | creates | all |
| `/encode-docs amend` | edits | chosen |
| `/encode-docs bug:` | appends | §B + §V |
| `/cook`, `/cater` | flips | §T status `.` → `~` → `x` |
| `/garnish` | deletes | stale §V/§T rows, with evidence |

### Output rules

- Encoded per this section. Baked header present.
- Identifiers, paths, code verbatim.
- Numbering monotonic; never reuse a §V, §T or §B id.
- §T `cites` lists the §V/§I deps: `T5|.|impl auth mw|V2,I.api`.

## PLAN.md FILE

`PLAN.md` is a contract for one cycle. It is replaced wholesale rather than
amended, and it is read by an executor who was not present when it was
written. So its rules are the opposite of the spec's: nothing here is
addressed from outside, nothing needs a stable id, and the whole file is
disposable. What it must do instead is be **executable cold** — every phase
self-contained enough that an agent can start it with no chat history.

Structure, in this order:

1. one-line goal;
2. ground rules for the run, including the evidence each phase must produce;
3. existing assets already in the repo;
4. a phase-order table;
5. the full section for each phase.

Phase ids are `F1`, `F2`, ... and stay monotonic within the file. First phase
is always research; last phase is always final verification. No coding before
the research phase or after the verify phase.

Every phase section names: goal, inputs, files touched, numbered steps, a
verification contract, exit criteria, the next phase, and exactly one `§T` id
via `task: T<n>`. No two phases share a task id.

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
task: T<n>
goal: <one line>
inputs: <paths, questions, sources>
files: <paths likely touched>
steps:
1. <...>
verify: <what proves this phase done>
exit: <state>
next: F2
```

Keep it compact. `PLAN.md` is a working document, not an RFC. Durable facts
belong in `SPEC.md`; if a line would still matter after the cycle closes, it
is in the wrong file.

## HANDOFF.md FILE

`HANDOFF.md` is a baton. It is overwritten in full every session and read by
an agent with no memory of what happened. It records **state, not intent** —
intent is in `PLAN.md`, truth is in `SPEC.md`. Its rules exist because the
failure mode is specific: a session dies mid-edit and the next one cannot tell
what was finished from what was merely started.

So it is the only one of the three that must record uncommitted work, exact
test state, and the precise next action including file and function.

```md
# HANDOFF <YYYY-MM-DD>

branch <name> | last commit <sha> <subject> | tests <green | RED: named failures>
baseline <green | RED: file + test name> | oracle <command>
uncommitted: <none | exact files + why>

## done this session
<phase>: <one line> → <sha>

## in progress (exact stop point)
<phase> ~: steps done <n1,n2> | NEXT STEP: <precise action, file, function>
mid-edit files: <paths | none>

## next
<phase per PLAN.md sequence> | preconditions: <gates | none>

## deviations & decisions
plan said <X> → did <Y> because <Z> (PLAN.md updated: y|n)
user decided: <anything the user ruled this session>

## watchouts
<traps: flaky test, env quirk, live-server state, half-truths in docs>

## final verification
item|status|evidence|decision
<§V/§I/§T item>|<HOLD | VIOLATE | UNVERIFIABLE>|<file/test>|<code | SPEC | ->
```

Rules:

1. Uncommitted work is a first-class fact. Name every file and why it was left
   that way. Prefer committing, even a `~` wip §T flip, over a dirty tree.
2. Red tests are named exactly — file plus test name — never "some failing".
3. Baseline and current oracle are distinguished, each with its exact command.
4. Material deviations already live in `PLAN.md`/`SPEC.md`; the baton points at
   them, it does not become their only record.
5. Only the final verification phase fills the result table; other sessions
   leave it with the header row.

## BAKED HEADERS

Each document opens with its own header, emitted verbatim as the first bytes.
HTML comments, so they do not render on GitHub, but an agent reading the raw
file learns the format without loading this skill. Do not reword per project.

`SPEC.md`:

```
<!-- SPEC FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants | §T tasks | §B bugs
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Tables (§R,§T,§B): pipe-delimited. Escape literal \| . Empty cell = -
§T status: x done | ~ wip | . todo
ids: monotonic, never reused — take the next from `next:` below, ⊥ from the highest row (rows get pruned)
next: V<n> T<n> B<n>
One file rule: >500 lines → compact §B oldest-first, ⊥ split into more files.
Full rules: /encode-docs skill. Cutting a word that loses a fact ⊥ allowed.
-->
```

`PLAN.md`:

```
<!-- PLAN FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Short-lived: one cycle. Replaced wholesale, ⊥ amended. Durable facts → SPEC.md.
Order: goal | ground rules | existing assets | phase order table | one section per phase.
Phase ids F1..Fn monotonic. F1 ! research. Fn ! final verify. ⊥ coding outside that span.
∀ phase names: goal | inputs | files | numbered steps | verify | exit | next | task: T<n>
`task:` = exactly one §T id from SPEC.md; ⊥ two phases share one id.
Encoding: same symbol set as SPEC.md. Preserve code/paths/ids verbatim.
Executable cold: a phase ⊥ readable without chat history is ⊥ finished.
Full rules: /encode-docs skill.
-->
```

`HANDOFF.md`:

```
<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header line | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification
Header ! carry: branch | last commit | tests | baseline + oracle command | uncommitted files + why
"in progress" ! name the NEXT STEP precisely: action, file, function. mid-edit files ! listed | `none`.
Red tests ! named exactly (file + test name), ⊥ "some failing".
final verification table ! filled only by the final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->
```

## BOUNDARIES

- User asks for a prose explanation → switch to normal English.
- Spec documents for external review (RFC, pitch) → normal English.
- Commit message → normal English; `encode-commit` owns that format.
- Diff comment in code → normal English.
- No sub-agents. The main thread writes.
- No dashboards, no logs, no state files beyond these three documents.
- No auto-execute after a spec write. The user invokes `/cook` explicitly.
- Never write a `FORMAT.md`. The format lives here and in the baked headers.

## WHEN UNSURE

If cutting a word loses a fact, keep it. This is compression, not amputation.
