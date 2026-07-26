---
name: encode-agent
description: |
  Generate a compact, self-contained sub-agent assignment prompt from bounded facts supplied by an orchestrator. Use before delegation when a worker needs the same quality, scope, verification, stop, and completion contracts as the parent workflow without loading the parent's planning or session state.
---

# encode-agent — compact sub-agent prompt

Turn caller-supplied assignment facts into one executable prompt. Preserve paths, identifiers, commands, invariant text, errors, and user rulings verbatim. Drop narrative, history, and facts the worker cannot act on.

## INPUT

Require the caller to supply:

- assignment id + one-line objective;
- allowed implementation files, any reporting file writable only for completion, and explicit forbidden scope;
- relevant requirements, invariant definitions, user rulings, and existing patterns;
- exact verification commands, test files, and case names;
- commit policy;
- stop conditions and required completion evidence.

Missing objective, writable scope, or verification contract → stop and request that field. Do not inspect parent planning, spec, backlog, or session-state files to fill gaps. Do not invent model, effort, permissions, tools, or repository rules.

## QUALITY CONTRACT

Encode these outcomes into every implementation assignment:

1. Read every allowed file needed for the change in full before editing. Search for existing helpers and neighbouring patterns before adding one.
2. Make the smallest coherent diff. Prefer codebase consistency and reuse over novel abstraction or convenience.
3. Establish the verification contract before edits. Write a failing test first where logic is pure and the assignment requires changed behavior.
4. Run every named test and oracle. Classify failures as implementation defect, wrong requirement, unspecified edge, or red baseline; retry only after naming the cause.
5. Read the full assignment-scoped diff before completion. Remove debug code, dead code, drive-by edits, secrets, unvalidated input paths, and narration comments; rerun checks after fixes.
6. Report evidence, never confidence. A passing command without the named case or relevant assertion does not prove completion.

## STOP CONTRACT

Stop without improvising when requirements contradict repository reality, scope must expand, a named test is absent or red before the change, or an irreversible/security-sensitive choice is unspecified. Return the exact conflict, evidence, and smallest decision needed. Never edit outside allowed scope, alter parent cycle state, run cycle-closing workflows, push, tag, or perform destructive live-system actions unless the assignment explicitly authorizes them.

## OUTPUT

Emit only this filled prompt:

```md
# assignment <id>
objective: <one line>
scope: <allowed implementation + reporting paths with per-path authority>
forbidden: <paths/actions>

## authority
- <requirement | invariant definition | user ruling | existing pattern>

## work
1. <ordered executable action>

## verify
- <command> → <test file + exact case | oracle result>

## quality
- read required allowed files in full; reuse house patterns; smallest coherent diff
- classify failures before retry; self-review full scoped diff; rerun checks after fixes

## stop
- <assignment-specific stop condition>
- contract conflict | scope expansion | red baseline | missing proof → report evidence, ⊥ improvise

## commit
<commit | do not commit> using <convention>

## completion
status: <done | blocked: reason>
evidence: <file:line + decision/deviation>
tests: <command> → <green | exact failing cases>
```

Keep sections even when short. Use `none` for an optional empty field; never delete required fields. The result must be sufficient for a worker with no parent conversation history.

## BOUNDARIES

- Generate prompt text only; do not execute the assignment or mutate files.
- Do not load another skill to supply omitted quality rules; this skill carries its own complete assignment contract.
- Do not choose the worker, model, effort, or concurrency. The orchestrator owns selection and disclosure.
