---
name: encode-header
description: |
  Supplies the baked header that opens SPEC.md, PLAN.md, and HANDOFF.md — the self-describing HTML comment that teaches a cold agent the file's format without loading the full encoder. Use it when one of those three documents is being created, when its header is missing from a legacy file, or when a header or format update is requested. This skill supplies the header text; encode-docs performs every write. Triggers: "/encode-header".
---

# encode-header — baked document headers

Each of the three encoded documents opens with its own header, emitted verbatim as the first bytes of the file. They are HTML comments, so they do not render on GitHub, but an agent reading the raw file learns the format without loading any skill. Do not reword them per project.

This skill **supplies** the header text. It never writes a file: `encode-docs` is the sole mutator of `SPEC.md`, `PLAN.md`, and `HANDOFF.md`, and it performs the write that carries these bytes.

Two values inside the templates are placeholders the writer fills in, and everything else is copied exactly: the SPEC header's `next:` counter takes one id per id-keyed section, and the PLAN header's `planning status:` takes the current cycle state. When a document already exists and its header is absent or stale, the fix is to replace the header alone — never to rewrite the body around it.

## `SPEC.md`

```
<!-- SPEC FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Sections, fixed order: §G goal | §C constraints | §I interfaces | §R research? | §V invariants
Symbols: → leads to | ∴ therefore | ∀ every | ∃ some | ! must | ? may/unknown | ⊥ never | ≠ | ∈ | ∉ | ≤ | ≥ | & and | § section
Durable truth only. Mutable: add sparingly (high bar), prune freely on evidence.
Address §<S>.<n> — §V.2 = invariants item 2. Commits/PRs cite by §.
Encoding: drop articles/filler/aux verbs. Fragments fine. Short synonyms (fix > implement).
Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.
Tables (§C/§I/§R/§V): pipe-delimited, id-keyed; header row + GFM delimiter row (|---|---|), one cell per column. Escape literal \| . Empty cell = -
ids: monotonic, never reused — take the next from `next:` below, ⊥ from the highest row (rows get pruned)
next: C<n> I<n> R<n> V<n>
One file rule: >1000 lines → prune stale §V, ⊥ split into more files.
Full rules: /encode-docs skill. Cutting a word that loses a fact ⊥ allowed.
-->
```

## `PLAN.md`

```
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
planning status: <new | work-in-progress | done>
-->
```

## `HANDOFF.md`

```
<!-- HANDOFF FORMAT (baked by /encode-docs — keep; makes this file self-describing)
Session baton. Overwritten in full ∀ session. Records STATE, ⊥ intent (intent → PLAN.md, truth → SPEC.md).
Sections: header | done this session | in progress (exact stop point) | next | deviations & decisions | watchouts | final verification. Empty section → `-`, ⊥ deleted.
Header ! carry: branch | last commit sha (⊥ subject) | tests pass N/N \| FAIL: file+case + command | uncommitted files + why
Pointers = F<n>.T<n> (phase.task → PLAN.md), ⊥ bare step numbers. "in progress" & "next" ! use them.
"in progress" ! name current working task precisely: action, file, function. mid-edit files ! listed | `none`.
Failing tests ! named exactly (file + case), ⊥ "some failing".
final verification table ! filled only by the final verify phase; else header row alone.
Encoding: same symbol set as SPEC.md.
Full rules: /encode-docs skill.
-->
```

## Boundaries

- Never write `SPEC.md`, `PLAN.md`, or `HANDOFF.md`; hand the header bytes to `encode-docs`, which writes them.
- Never reword a template to suit a project. The headers are identical across repositories on purpose — that is what makes a raw file readable to an agent that has loaded nothing.
- Never invent a fourth header. These three documents are the whole scope.
