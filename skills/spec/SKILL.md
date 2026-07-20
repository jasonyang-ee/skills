---
name: spec
description: |
  Create, amend, or log bugs into SPEC.md at repo root. Sole mutator of the
  project spec. Self-contained: the SPEC format is embedded in this skill, and
  every SPEC.md it writes opens with a baked format header — no per-project
  FORMAT.md file is needed. Triggers when the user asks to write a spec, start a
  new spec, distill a spec from existing code, add invariants, amend sections
  (§G, §C, §I, §R, §V, §T, §B), hand off durable planning material from prep, or
  record a bug via `bug:`. Common phrasings: "write the spec for...", "new
  spec", "bug: ...", "amend §V.3", "distill spec from code", "spec this idea".
license: MIT
---

# spec — spec mutator

Sole mutator of `SPEC.md` at repo root. Format = §FORMAT below. ⊥ FORMAT.md file
needed — this skill carries the rules, and every SPEC.md written gets the baked
header (§BAKED HEADER) so a cold agent reads & amends the file without loading
this skill.

Encoding → `encode-docs` skill; §FORMAT below carries the subset needed to
write SPEC.md correctly.

Legacy repo ∃ `FORMAT.md` → this skill still wins. Offer once to delete it after
the baked header lands; ⊥ delete without user OK.

## DISPATCH

Inspect user request and project state:

1. No `SPEC.md` at repo root AND args describe idea → **NEW**
2. No `SPEC.md` AND `from-code` in args → **DISTILL**
3. `SPEC.md` exists AND args start `bug:` → **BUG**
4. `SPEC.md` exists AND args start `amend` → **AMEND**
5. `SPEC.md` exists, no args → ask user which mode

∀ mode writing `SPEC.md` → ! baked header present. Absent (legacy file) → prepend
it in the same write.

## INPUTS — spec is the sole mutator

The other verbs produce material; spec writes it. Ingest their handoff blocks
into the right section, show a diff, write on OK:

- **prep** → drafted §G/§C/§I, sourced §R rows, proposed §V/§T plan
- **review-plan** → drafted §V lines + the risk verdict

⊥ rewrite a section the handoff did not name. Sectioned ownership.

## NEW — idea → spec

Input: user idea. If it arrived fuzzy, prefer running **prep** first.

Steps:
1. Emit baked header (§BAKED HEADER) verbatim as first bytes of file.
2. Extract goal (1 line, encoded). → §G.
3. List constraints user stated or implied. → §C.
4. List external surfaces user named. → §I.
5. §R only if **prep** research ran — else omit the section (right-size).
6. Propose initial invariants. → §V (numbered V1…).
7. Break goal into ordered tasks. → §T pipe table, all status `.`, ids T1…
8. §B section with header row only (`id|date|cause|fix`).

Write to `SPEC.md`. Show user full file. Ask: "spec OK? `/review-plan` if high-blast-radius, else `/cook`."

## DISTILL — code → spec

Walk repo. Produce §G (infer from README/package.json/main entry), §C (infer from stack), §I (enumerate public APIs/CLIs/configs), §V (derive from tests and assertions), §T (one task per known TODO or missing test), §B (empty). Baked header first.

Encoded everywhere. Flag uncertain items with `?` in text so user can confirm.

## BUG — bug → §B + §V

Input: `bug: <description>`.

Steps:
1. Parse bug description.
2. Find root cause (read relevant code).
3. Decide: would a new invariant catch recurrence? If yes → draft `V<next>`.
4. Append §B row: `B<next>|<date>|<cause>|V<N>`.
5. Append new invariant to §V.
6. If fix also changes behavior → add/update §T rows.
7. Show diff. Apply only on user OK.

Rule: every bug gets a §B entry. Invariant optional but preferred.

## AMEND — targeted edit

Input: `amend §V.3` or `amend §T` etc.

Read that section. Show current. Ask user what changes. Write. Show diff.

Never silently rewrite sections user did not name.

## FORMAT

Single file. Project root. Every cavekit command reads it.

### SECTIONS

Fixed order. Fixed headers. Addressable.

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
optional. only if /prep research ran. pipe table. each row ! cite source.
id|claim|source
R1|lib X rate-limits @ 100 rps|https://docs.x/limits

## §V INVARIANTS
numbered. testable. each ! MUST hold.
V1: ∀ req → auth check before handler
V2: token expiry ≤ ⊥ allowed
V3: DB write ! in transaction

## §T TASKS
pipe table. ids monotonic (never reused). status: `x` done / `~` wip / `.` todo.
id|status|task|cites
T1|.|scaffold repo|-
T2|.|impl §I.api POST /x|V2
T3|x|add §V.1 middleware|V1,I.api

## §B BUGS
pipe table. bug log. each row = bug + invariant that catches recurrence.
id|date|cause|fix
B1|2026-04-20|token `<` not `≤`|V2
B2|2026-04-21|race on write|V3
```

**Table cell rules**: literal `|` → escape as `\|`. Backticks OK. Cells trimmed. Empty = `-`.

### ADDRESSING

`§<S>.<n>` = section.item. `§V.2` = invariants section, item 2.
Commands, commits, PRs all reference by §. Zero ambiguity.

### ENCODING

Default for every section. Rules:

- Drop articles (a, an, the). Drop filler.
- Drop aux verbs (is, are, was) where fragment works.
- Short synonyms (fix > implement).
- Fragments fine.

**Preserve verbatim**: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.

**Symbols** (save tokens, machine-readable):

```
→   leads to / becomes / triggers
∴   therefore / fix
∀   for all / every
∃   exists / some
!   must
?   may / optional
⊥   never / impossible / forbidden
≠   not equal / differs from
∈   in / member of
∉   not in
≤   at most
≥   at least
&   and
|   or
§   section reference
```

**Bad** (prose):

> The authentication middleware must verify the token expiry on every request before allowing the handler to execute.

**Good** (encoded):

> V1: ∀ req → auth check before handler

**Bad** (prose bug note):

> Fixed a bug where token expiry comparison used strict less-than instead of less-than-or-equal, causing tokens to be rejected exactly at their expiry timestamp.

**Good** (encoded):

> B1: token `<` not `≤` ∴ tokens rejected @ expiry. §V.2 now ! `≤`.

### WHY ENCODE SPECS

Spec loaded every invocation. 75% fewer tokens = 75% fewer dollars & faster reads.
Human skims fast too. Symbols unambiguous.

### ONE FILE RULE

Big project → more sections, not more files. grep ceremony kills agent speed.
If SPEC.md > 500 lines, compact §B (old bugs drop oldest) before splitting.

### WRITES

| command | writes | section |
|---|---|---|
| `/spec new` | creates | all |
| `/spec amend` | edits | chosen |
| `/spec bug` | appends | §B + §V |
| `/cook` | flips | §T status cell `.` → `~` → `x` |

## BAKED HEADER

Emit verbatim as the first bytes of every `SPEC.md`. HTML comment ∴ ⊥ renders on
GitHub, but agents read raw ∴ file self-describes. ⊥ reword per project.

```
<!-- SPEC FORMAT (baked by /spec — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants | §T tasks | §B bugs
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Tables (§R,§T,§B): pipe-delimited. ids monotonic, never reused. Escape literal \| . Empty cell = -
§T status: x done | ~ wip | . todo
One file rule: >500 lines → compact §B oldest-first, ⊥ split into more files.
Full rules: /spec skill (§FORMAT). Cutting a word that loses a fact ⊥ allowed.
-->
```

## OUTPUT RULES

- Encoded per §FORMAT. Baked header ! present.
- Preserve identifiers, paths, code verbatim.
- Numbering monotonic — never reuse §V.N or §B.N.
- §T row `cites` column ! list §V/§I deps: `T5|.|impl auth mw|V2,I.api`.

## NON-GOALS

- No sub-agents. Main thread writes.
- No dashboards, no logs, no state files beyond SPEC.md itself.
- No auto-execute after spec. User invokes `/cook` explicitly.
- ⊥ write FORMAT.md. Format lives here + baked header.
