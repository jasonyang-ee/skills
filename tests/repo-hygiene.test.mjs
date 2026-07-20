import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import * as yaml from 'js-yaml';
import { REPO_ROOT, SKILLS_DIR, loadSkills } from './helpers.mjs';

const WORKFLOWS_DIR = join(REPO_ROOT, '.github', 'workflows');

/**
 * These skills were extracted from a private codebase. This repo is public, so
 * any of these strings reappearing in a published skill means internal
 * conventions leaked back in — and that the skill stopped being usable by
 * anyone who does not share that layout.
 */
const PRIVATE_REFS = [
  /\btrading\b/i,
  /StrategyBacktestConfig/,
  /\btest\.sh\b/,
  /\bV52\b/,
  /money math/i,
];
const RETIRED_SKILLS = [
  'backprop',
  'build',
  'caveman',
  'caveman-help',
  'check',
  'deepen',
  'grill',
  'research',
  'review',
  'review-implementation',
  'spec',
];

/**
 * Files that must speak of the skill by its current name. CHANGELOG.md is
 * excluded on purpose: released entries record what shipped under the old
 * name, and rewriting history would make the log lie. SPEC.md §T rows are
 * likewise a record of tasks as they were performed.
 */
const LIVE_REF_FILES = ['README.md', 'AGENTS.md', 'NOTICE.md', '.github/CONTRIBUTING.md'];

describe('published skills carry no private-codebase references', () => {
  // V9
  it('leaks no internal reference from the private codebase', () => {
    const offenders = [];
    for (const skill of loadSkills()) {
      for (const pattern of PRIVATE_REFS) {
        if (pattern.test(skill.raw)) offenders.push(`skills/${skill.dirName}/SKILL.md: ${pattern}`);
      }
    }
    assert.deepEqual(offenders, [], `leaked internal reference(s): ${offenders.join(', ')}`);
  });
});

describe('repo is publishable', () => {
  // V10, V11 — without the licence nobody may legally use these skills, and
  // the release workflow reads its notes out of the changelog section.
  it('ships an MIT LICENSE and an Unreleased changelog section', () => {
    const license = join(REPO_ROOT, 'LICENSE');
    assert.ok(existsSync(license), 'LICENSE missing — nobody may legally use these skills');
    assert.match(readFileSync(license, 'utf8'), /MIT License/);

    const changelog = join(REPO_ROOT, 'CHANGELOG.md');
    assert.ok(existsSync(changelog), 'CHANGELOG.md missing');
    assert.match(readFileSync(changelog, 'utf8'), /^## \[Unreleased\]/m);
  });
});

describe('setup bootstraps the workflow safely', () => {
  const setup = readFileSync(join(SKILLS_DIR, 'setup', 'SKILL.md'), 'utf8');
  // V42 — /cater is a peer entry, not a footnote under /cook.
  const commandOrder = [
    '/setup',
    '/prep',
    '/review-plan',
    '/cook',
    '/cater',
    '/garnish',
    '/review-code',
  ];

  // Read the numbered entries themselves rather than scanning the whole file
  // for each name: prose that merely mentions a command is not a list entry,
  // and an indexOf sweep cannot tell the two apart.
  //
  // setup states the list twice — once as its own documentation, once inside the
  // AGENTS.md template it generates. Both are asserted, because a template that
  // drifts from the documented list bootstraps every new repo wrong.
  it('declares the seven lifecycle commands in order, in both copies', () => {
    const listed = setup
      .split('\n')
      .map((line) => line.match(/^\d+\. `(\/[a-z-]+)`/))
      .filter(Boolean)
      .map((match) => match[1]);
    assert.deepEqual(listed, [...commandOrder, ...commandOrder]);
  });

  it('uses explicit triggers and distinguishes bootstrap from core workflow', () => {
    for (const trigger of [
      '/setup',
      'bootstrap this repo',
      'set up workflow files',
      'prepare a new project for prep',
      'initialize agent guidance',
    ]) {
      const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      assert.match(setup, new RegExp(escaped));
    }
    assert.match(setup, /Bootstrap command list/);
    assert.match(setup, /separate from\s+the six core workflow steps/i);
  });

  // V43, V44, V45, V49 — safety and ordering. The encoding loads before any
  // AGENTS.md read or write, existing files are preserved rather than
  // overwritten, and the symbol legend ships filled in rather than as a
  // placeholder the user is expected to complete.
  it('loads encoding first and never overwrites existing guidance', () => {
    const preflight = setup.indexOf('## Preflight');
    const load = setup.indexOf('Load `encode-docs`', preflight);
    const read = setup.indexOf('Read existing `AGENTS.md`', preflight);
    assert.ok(preflight >= 0 && load > preflight && load < read);
    for (const phrase of ['leads to', 'therefore', 'every', 'must', 'unknown', 'never', 'section reference']) {
      assert.match(setup, new RegExp(phrase));
    }
    assert.doesNotMatch(setup, /<user fills symbols|keeps repository legend>/i);
    for (const file of [/AGENTS\.md/, /CLAUDE\.md/, /@AGENTS\.md/, /CHANGELOG\.md/, /SPEC\.md/]) {
      assert.match(setup, file);
    }
    assert.match(setup, /invoke `encode-docs`/i);
    assert.match(setup, /Never overwrite existing/i);
    assert.match(setup, /preserve it/i);
  });

  // V46, V53, V69 — the generated template's own contents. A section missing
  // here bootstraps every new repository wrong, and a missing support command
  // is a skill that repo never learns exists.
  it('templates every required AGENTS.md section and support command', () => {
    for (const section of [
      '## AI File Purpose',
      '## Skills',
      '## Project Scripts',
      '## Encoding symbols',
      '## End of Chat Checklist',
    ]) {
      assert.match(setup, new RegExp(section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
    assert.match(setup, /`PLAN\.md` \+ `HANDOFF\.md` = short-lived cycle files/);
    assert.match(setup, /<user fills test command>/);
    assert.match(setup, /Ensure ∀ lint \+ tests pass/);
    assert.match(setup, /Update `CHANGELOG\.md` `## \[Unreleased\]`/);
    assert.match(setup, /Update `SPEC\.md` ∀ code change/);
    assert.match(setup, /Commit directly .*⊥ push \| tag without explicit ask/);

    const support = setup.split('\n').find((line) => line.startsWith('support:'));
    assert.ok(support, 'setup template declares no support line');
    for (const command of ['/handoff', '/encode-docs', '/encode-commit', '/encode-pr']) {
      assert.ok(support.includes(command), `support line omits ${command}`);
    }
  });
});

describe('skills stay markdown-only', () => {
  // V19 — no Python/script-bearing skills. A skill needing a runtime turns
  // `npx skills add` into an install that fails later, on someone else's box.
  it('ships no scripts directory in any skill', () => {
    const offenders = loadSkills()
      .map((skill) => skill.dirName)
      .filter((name) => existsSync(join(SKILLS_DIR, name, 'scripts')));
    assert.deepEqual(offenders, [], `these skills ship scripts/: ${offenders.join(', ')}`);
  });
});

describe('the code reviewer ships as review-code', () => {
  // V61 — a rename is only done when nothing live still points at the old
  // name; a stale command in the docs is one a user types and never gets.
  it('leaves no live reference to review-implementation', () => {
    const offenders = [];
    for (const file of LIVE_REF_FILES) {
      if (readFileSync(join(REPO_ROOT, file), 'utf8').includes('review-implementation')) {
        offenders.push(file);
      }
    }
    for (const skill of loadSkills()) {
      if (skill.raw.includes('review-implementation')) offenders.push(`skills/${skill.dirName}/SKILL.md`);
    }
    assert.deepEqual(offenders, [], `these files still name review-implementation: ${offenders.join(', ')}`);

    const skill = readFileSync(join(SKILLS_DIR, 'review-code', 'SKILL.md'), 'utf8');
    assert.match(skill, /^name: review-code$/m);
    assert.match(skill, /^# review-code /m);

    // The history stays honest: released notes describe what actually shipped,
    // so the old name must survive there and only there.
    const changelog = readFileSync(join(REPO_ROOT, 'CHANGELOG.md'), 'utf8');
    assert.ok(
      changelog.includes('review-implementation'),
      'CHANGELOG.md released entries must keep the name the skill shipped under',
    );
  });
});

describe('the renamed roster is the only one referenced', () => {
  const ROSTER = [
    'cater', 'cook', 'encode-commit', 'encode-docs', 'encode-pr', 'garnish',
    'handoff', 'prep', 'review-code', 'review-plan', 'setup',
  ];
  // Names reused across different skills during the rename: `cook` used to mean
  // planning and now means execution. A stale reference is not a dead link, it
  // points at a real skill that does the wrong thing.
  const RETIRED = [
    'workonplan', 'dispatchplan', 'caveman-encode', 'caveman-commit', 'caveman-pr',
  ];
  // The merged `spec` skill needs a narrower rule than the rest: the bare word
  // is still ordinary English here ("spec-driven", "the Agent Skills spec"),
  // and `SPEC.md` is a live filename. Only the skill path and the command are
  // retired, so only those two are matched.
  const RETIRED_SPEC_FORMS = [/skills\/spec\//, /`\/spec`/];

  // V81 — the roster on disk and the count the docs advertise are the same
  // fact stated twice, so they are checked together.
  it('ships exactly the eleven skills the docs advertise', () => {
    assert.deepEqual(loadSkills().map((skill) => skill.dirName).sort(), ROSTER);
    for (const file of ['README.md', 'AGENTS.md']) {
      const text = readFileSync(join(REPO_ROOT, file), 'utf8');
      assert.ok(!/\b1[23] skills\b/.test(text), `${file} still claims a stale skill count`);
      assert.match(text, /\b11 skills\b/, `${file} does not state the current skill count`);
    }
  });

  // V82 — CHANGELOG.md and the SPEC §T/§R/§B rows are excluded on purpose:
  // released notes and task records must keep the names things shipped under.
  // NOTICE.md is checked only for local paths: its "Upstream name" column names
  // the skills as they exist in JuliusBrussee's repos, and that must stay exact
  // or the attribution stops being true.
  it('leaves no live reference to a retired skill name', () => {
    const offenders = [];
    for (const file of LIVE_REF_FILES) {
      const text = readFileSync(join(REPO_ROOT, file), 'utf8');
      for (const name of RETIRED) {
        const pattern = file === 'NOTICE.md'
          ? new RegExp(`skills/${name}/`)
          : new RegExp(`\\b${name}\\b`);
        if (pattern.test(text)) offenders.push(`${file}: ${name}`);
      }
    }
    for (const skill of loadSkills()) {
      for (const name of RETIRED) {
        if (new RegExp(`\\b${name}\\b`).test(skill.raw)) {
          offenders.push(`skills/${skill.dirName}/SKILL.md: ${name}`);
        }
      }
    }
    for (const pattern of RETIRED_SPEC_FORMS) {
      for (const file of LIVE_REF_FILES) {
        if (pattern.test(readFileSync(join(REPO_ROOT, file), 'utf8'))) {
          offenders.push(`${file}: ${pattern.source}`);
        }
      }
      for (const skill of loadSkills()) {
        if (pattern.test(skill.raw)) offenders.push(`skills/${skill.dirName}/SKILL.md: ${pattern.source}`);
      }
    }
    // The deleted skill was named `caveman`, which is also the upstream repo
    // the encoders came from. Pointing a reader at "the caveman skill" now
    // sends them to nothing, so it may appear as provenance but never as
    // something to load.
    const dangling = loadSkills()
      .filter((skill) => /`caveman`\s+skill|the\s+caveman\s+skill/i.test(skill.raw))
      .map((skill) => skill.dirName);
    assert.deepEqual(dangling, [], `these skills point at the deleted caveman skill: ${dangling.join(', ')}`);

    assert.deepEqual(offenders, [], `retired skill names still referenced: ${offenders.join(', ')}`);
  });

  // The deleted skill was named `caveman`, which is also the name of the
  // upstream repo the encoders came from. Pointing a user at "the caveman
  // skill" now sends them to nothing, so skills may only mention the word as
  // upstream provenance — never as something to load.

  // V88 — each header is copied verbatim into every consumer repo, so the
  // templates and this repo's own three documents must not drift apart. This
  // repo is the only place the drift is visible, since consumer copies are
  // written once and never revisited.
  it('keeps all three baked header templates in step with this repo', () => {
    const encoder = readFileSync(join(SKILLS_DIR, 'encode-docs', 'SKILL.md'), 'utf8');
    // PLAN.md and HANDOFF.md are short-lived cycle state — garnish purges them
    // once a plan closes, so only check the docs actually present.
    for (const doc of ['SPEC', 'PLAN', 'HANDOFF']) {
      const path = join(REPO_ROOT, `${doc}.md`);
      if (!existsSync(path)) continue;
      const lines = readFileSync(path, 'utf8').split('\n');
      const open = lines.indexOf(`<!-- ${doc} FORMAT (baked by /encode-docs — keep; makes this file self-describing)`);
      assert.ok(open === 0, `${doc}.md does not open with its baked header`);
      const close = lines.indexOf('-->');
      // The next: counter is per-repo state, so it is the one line allowed to
      // differ from the template.
      const body = lines.slice(open + 1, close).filter((line) => !line.startsWith('next:'));
      for (const line of body) {
        assert.ok(encoder.includes(line), `${doc} header line absent from encode-docs template: ${line}`);
      }
    }

    // V89 — pruning deletes rows, so the highest surviving id is no longer the
    // newest. The counter is the only safe source for the next one, and it is
    // only useful if it stays ahead of everything in use.
    const spec = readFileSync(join(REPO_ROOT, 'SPEC.md'), 'utf8');
    const counter = spec.split('\n').find((line) => line.startsWith('next:'));
    assert.ok(counter, 'SPEC.md baked header has no next: counter');
    for (const [prefix, declared] of counter.replace('next:', '').trim().split(/\s+/)
      .map((token) => [token[0], Number(token.slice(1))])) {
      const highest = [...spec.matchAll(new RegExp(`^${prefix}(\\d+)`, 'gm'))]
        .map((match) => Number(match[1]))
        .reduce((a, b) => Math.max(a, b), 0);
      assert.ok(declared > highest, `next: ${prefix}${declared} is not ahead of ${prefix}${highest} in use`);
    }
  });
});

describe('skill files and tests stay free of emoji', () => {
  // V91, V92 — matched by codepoint range, not by listing the ones in use.
  // An enumerated list only ever catches the emoji someone already removed.
  // Ranges cover pictographs, dingbats, arrows/symbols and the variation
  // selector that turns a plain glyph into an emoji.
  const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;

  it('uses the words good and bad rather than tick and cross marks', () => {
    const offenders = [];
    for (const skill of loadSkills()) {
      for (const [index, line] of skill.raw.split('\n').entries()) {
        if (EMOJI.test(line)) offenders.push(`skills/${skill.dirName}/SKILL.md:${index + 1}`);
      }
    }
    for (const file of readdirSync(join(REPO_ROOT, 'tests'))) {
      const text = readFileSync(join(REPO_ROOT, 'tests', file), 'utf8');
      for (const [index, line] of text.split('\n').entries()) {
        if (EMOJI.test(line)) offenders.push(`tests/${file}:${index + 1}`);
      }
    }
    assert.deepEqual(offenders, [], `emoji found: ${offenders.join(', ')}`);

    // V94 — attribution belongs in NOTICE.md for the same reason: a skill body
    // is loaded every session, and NOTICE.md is not, so provenance prose here
    // is a cost paid over and over.
    const attributed = loadSkills()
      .filter((skill) => /^>\s*(Vendored from|.*Copyright \(c\))/m.test(skill.raw))
      .map((skill) => skill.dirName);
    assert.deepEqual(attributed, [], `these skills carry an attribution block: ${attributed.join(', ')}`);
  });
});

describe('the terse report discipline lives in the review skills only', () => {
  const REVIEWERS = ['review-plan', 'review-code'];

  // V84 — the conversational `caveman` skill was retired into these two. It
  // earns its keep where output is a report a human reads; the planning and
  // execution skills write files, so terseness there buys nothing.
  it('lives in both reviewers and nowhere else', () => {
    assert.ok(
      !existsSync(join(SKILLS_DIR, 'caveman')),
      'skills/caveman/ must not exist — its rules were baked into the review skills',
    );
    for (const name of REVIEWERS) {
      const skill = readFileSync(join(SKILLS_DIR, name, 'SKILL.md'), 'utf8');
      assert.match(skill, /^## Report output$|^## REPORT OUTPUT$/m, `${name} has no report-output section`);
      assert.match(skill, /[Aa]lways on/, `${name} does not make the discipline always-on`);
      for (const rule of ['articles', 'hedging', 'narrate tool calls', 'emoji', 'invent new ones']) {
        assert.ok(skill.includes(rule), `${name} omits the "${rule}" rule`);
      }
    }
    const offenders = loadSkills()
      .filter((skill) => !REVIEWERS.includes(skill.dirName))
      .filter((skill) => /^#+ Report output$/im.test(skill.raw))
      .map((skill) => skill.dirName);
    assert.deepEqual(offenders, [], `these skills must not carry the report discipline: ${offenders.join(', ')}`);
  });

  // V85 — the carve-out is the point of the bake, not decoration. Terse output
  // that swallows a security finding or a BLOCK has destroyed the report.
  it('exempts security, irreversible actions, and BLOCK items from compression', () => {
    for (const name of REVIEWERS) {
      const skill = readFileSync(join(SKILLS_DIR, name, 'SKILL.md'), 'utf8');
      for (const exempt of ['Security findings', 'irreversible', '`BLOCK` item', 'file:line']) {
        assert.ok(skill.includes(exempt), `${name} does not exempt ${exempt} from compression`);
      }
    }
  });
});

describe('cater runs phases in parallel without racing', () => {
  const dispatch = readFileSync(join(SKILLS_DIR, 'cater', 'SKILL.md'), 'utf8');

  // V62 — the description is all an agent reads when deciding to load a skill.
  it('declares itself the parallel dispatch front door', () => {
    assert.match(dispatch, /^name: cater$/m);
    const description = dispatch.slice(dispatch.indexOf('description:'), dispatch.indexOf('license:'));
    for (const term of ['sub-agent', 'dispatch', 'parallel']) {
      assert.ok(description.includes(term), `cater description omits "${term}"`);
    }
  });

  // V63, V64, V67 — the isolation rules. One phase to one sub-agent, named by
  // phase id; overlapping file sets are a lost update where the loser's work
  // disappears with no error; and the agent roster belongs to the harness, so
  // naming one makes this skill a silent no-op on every other host.
  it('isolates assignments by file set and names no harness-specific agent', () => {
    assert.match(dispatch, /HANDOFF-<phase-id>\.md/);
    assert.match(dispatch, /repo root/i);
    assert.match(dispatch, /complexity/i);
    assert.match(dispatch, /capability/i);
    assert.match(dispatch, /[Ss]hared-file safety/);
    assert.match(dispatch, /disjoint/i);
    assert.match(dispatch, /lost update/i);
    assert.doesNotMatch(dispatch, /sonnet-implementer/);
    assert.doesNotMatch(dispatch, /\bExplore\b/);
  });

  // V65, V66, V68 — the accounting rules. A completion block is the finish
  // signal and the dispatcher's own diff review is what makes it true; the
  // baton is refreshed at all four points because parallel work outruns one
  // context; and assignment files are purged, since garnish refuses to close
  // a cycle with unrelated files dirty (§R.19, §R.20).
  it('accepts work only after review, refreshes the baton, and purges', () => {
    assert.match(dispatch, /## completion/);
    assert.match(dispatch, /status: <done \| blocked: reason>/);
    assert.match(dispatch, /evidence:/);
    assert.match(dispatch, /tests:/);
    assert.match(dispatch, /[Aa]cceptance review/);
    assert.match(dispatch, /read the FULL diff/i);
    assert.match(dispatch, /sub-agent must never run `garnish`/);
    assert.match(dispatch, /Never invoke `\/review-code` mid-dispatch/);
    for (const point of [
      'before dispatch',
      'after sub-agent completion',
      'after acceptance review',
      'before stop',
    ]) {
      assert.ok(dispatch.includes(point), `cater omits the "${point}" refresh point`);
    }
    assert.match(dispatch, /[Pp]urge the assignment file/);
    assert.match(dispatch, /delete\s+`HANDOFF-<phase-id>\.md`/);
    assert.match(dispatch, /no `HANDOFF-<phase-id>\.md` may remain/);
  });
});

describe('retired planning skills stay retired', () => {
  it('ships none of the removed skill directories', () => {
    const resurrected = RETIRED_SKILLS.filter((name) => existsSync(join(SKILLS_DIR, name)));
    assert.deepEqual(resurrected, [], `these retired skills came back: ${resurrected.join(', ')}`);
  });
});

describe('generated commit messages stay readable without the plan files', () => {
  const encodeCommit = readFileSync(join(SKILLS_DIR, 'encode-commit', 'SKILL.md'), 'utf8');

  // V79 — asserts the RULE is present, not that the file lacks symbols. The
  // skill legitimately contains "≤50 chars" in its own prose; the ban is on
  // what it generates, not on how it is written.
  it('bars encoding symbols and plan identifiers, and says how to expand them', () => {
    const never = encodeCommit.slice(
      encodeCommit.indexOf('**What NEVER goes in:**'),
      encodeCommit.indexOf('## Expanding plan references'),
    );
    assert.ok(never.length > 0, 'encode-commit has no "What NEVER goes in" section');
    assert.match(never, /[Ee]ncoding symbols/, 'no rule barring encoding symbols');
    assert.match(never, /identifiers/, 'no rule barring plan or spec identifiers');

    assert.match(encodeCommit, /^## Expanding plan references$/m);
    const section = encodeCommit.slice(encodeCommit.indexOf('## Expanding plan references'));
    assert.ok(section.includes('bad:') && section.includes('good:'), 'no before/after example');
    assert.match(section, /purged|deleted|outlives/, 'does not say why the identifiers go stale');
  });

  // V77, V78 — the two skills that generate commits must delegate here rather
  // than carry their own drifting copy of the rules.
  it('has the executing and handoff skills delegate to it', () => {
    const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');
    assert.match(cook, /`encode-commit`/, 'cook does not route its commit through encode-commit');
    assert.match(cook, /never the phase id/i, 'cook does not bar the phase id from the scope');

    const handoff = readFileSync(join(SKILLS_DIR, 'handoff', 'SKILL.md'), 'utf8');
    assert.match(handoff, /`encode-commit`/, 'handoff does not route its commit through encode-commit');
    assert.match(handoff, /bare `docs: handoff`/, 'handoff still permits a bare docs: handoff subject');
  });

  // V80 — editing a vendored skill forks it, and NOTICE.md is where that is
  // recorded. A stale "No" here misrepresents what was taken and what changed.
  it('records the fork in NOTICE.md', () => {
    const notice = readFileSync(join(REPO_ROOT, 'NOTICE.md'), 'utf8');
    const row = notice.split('\n').find((line) => line.includes('`skills/encode-commit/`'));
    assert.ok(row, 'NOTICE.md has no row for skills/encode-commit/');
    assert.ok(!/\|\s*No\s*\|/.test(row), 'NOTICE.md still calls encode-commit unmodified');
    assert.match(row, /commit messages|identifiers/, 'NOTICE.md does not say what changed');
  });
});

describe('prep stays the planning front door', () => {
  const prep = readFileSync(join(SKILLS_DIR, 'prep', 'SKILL.md'), 'utf8');
  const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');

  // V24, V25, V27, V54 — the shape of what prep emits: both files, research
  // first, verification last, one SPEC task per phase, and expansion rather
  // than replacement when a plan is already in flight.
  it('emits both files, research first, verify last, one task per phase', () => {
    assert.match(prep, /PLAN\.md/);
    assert.match(prep, /HANDOFF\.md/);
    assert.match(prep, /first plan phase is always research/i);
    assert.match(prep, /last phase must be final verification/i);
    assert.match(prep, /every PLAN phase gets one matching/);
    assert.match(prep, /one existing `§T` task id via `task: T<n>`/);
    assert.match(cook, /Read phase `task: T<n>`/);
    assert.match(cook, /absent from SPEC\.md/);
    assert.match(prep, /incomplete phases/);
    assert.match(prep, /`encode-docs` remains the sole mutator of `SPEC\.md`/);
    assert.match(prep, /\/cook/);
  });

  // V28, V29 — research is sourced and the final phase classifies per item;
  // the handoff carries the shape that result lands in.
  it('requires sourced research and a per-item final verification table', () => {
    assert.match(prep, /External findings require a source/);
    assert.match(prep, /Write sourced findings into `§R`/);
    assert.match(prep, /`HOLD`, `VIOLATE`, or\s+`UNVERIFIABLE`/);
    assert.match(prep, /record the result table in `HANDOFF\.md`/);
    assert.match(prep, /logic correctness/);
    assert.match(prep, /unnecessary complexity/);
    assert.match(prep, /missed reuse/);

    const handoff = readFileSync(join(SKILLS_DIR, 'handoff', 'SKILL.md'), 'utf8');
    assert.match(handoff, /## final verification/);
    assert.match(handoff, /item\|status\|evidence\|decision/);
    assert.match(handoff, /HOLD \| VIOLATE \| UNVERIFIABLE/);
    assert.match(handoff, /baseline .* oracle/);
  });

  it('uses observable quality cues instead of role language alone', () => {
    assert.match(prep, /production-quality,\s+verification-driven,\s+evidence-based\s+implementation/i);
    for (const cue of [
      'Plan:',
      'Encode:',
      'Review the plan:',
      'Implement:',
      'Close:',
      'Review the implementation:',
    ]) {
      assert.match(prep, new RegExp(`\\b${cue.replace(':', '\\:')}`));
    }
    const completionRule = prep.match(/Do not use[\s\S]{0,160}?as completion\s+criteria/);
    assert.ok(completionRule, 'prep lacks the completion-criteria ban');
    for (const banned of ['best effort', 'looks good', 'principal engineer']) {
      assert.ok(completionRule[0].includes(banned), `completion-criteria ban omits "${banned}"`);
    }
  });

  // V75 — each workflow step's canonical focus keywords live in the skill
  // that owns the step (§R.27); prep's quality contract mirrors them and is
  // not their sole carrier.
  it('keeps each step\'s focus keywords in the owning description', () => {
    assert.match(prep, /this\s+contract mirrors them, it is not their sole carrier/i);
    const expectations = {
      prep: ['production-quality', 'evidence-based'],
      'encode-docs': ['lossless compression'],
      'review-plan': ['gap', 'latest web data'],
      cook: ['production-quality', 'verification-driven', 'evidence-based'],
      cater: ['production-quality', 'verification-driven', 'evidence-based'],
      garnish: ['evidence-gated closure'],
      'review-code': ['security check', 'infosec', 'evidence-based'],
    };
    for (const [name, terms] of Object.entries(expectations)) {
      const skill = readFileSync(join(SKILLS_DIR, name, 'SKILL.md'), 'utf8');
      const description = skill.slice(skill.indexOf('description:'), skill.indexOf('license:')).toLowerCase();
      for (const term of terms) {
        assert.ok(description.includes(term), `${name} description omits "${term}"`);
      }
    }
  });

});

describe('cook executes the planned phase set', () => {
  const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');

  // V72 — the description is the trigger surface (§R.25/§R.26); B5 shipped a
  // sentence fragment that weakened it. Both step-4 skills carry the same
  // implementation-quality keywords.
  // V70 — no argument runs every remaining phase; an explicit one targets a
  // single phase. The default is what makes a cold session finish the plan.
  it('describes itself well and runs all remaining phases by default', () => {
    const dispatch = readFileSync(join(SKILLS_DIR, 'cater', 'SKILL.md'), 'utf8');
    for (const [name, skill] of [['cook', cook], ['cater', dispatch]]) {
      const description = skill.slice(skill.indexOf('description:'), skill.indexOf('license:'));
      assert.doesNotMatch(description, /one phase\.\s+at /);
      for (const term of ['production-quality', 'verification-driven', 'evidence-based']) {
        assert.ok(description.includes(term), `${name} description omits "${term}"`);
      }
    }
    assert.match(cook, /No arg → start at the `HANDOFF\.md` "next" pointer/);
    assert.match(cook, /No arg → after each completed phase and committed handoff, continue with the\s+next eligible phase/);
    assert.match(cook, /Explicit phase arg → execute only that phase, then invoke `handoff` and stop/);
    assert.match(cook, /A `next` pointer identifies the starting phase, not a default one-phase limit/);
  });
});

describe('review and garnish workflow stays coherent', () => {
  const reviewPlan = readFileSync(join(SKILLS_DIR, 'review-plan', 'SKILL.md'), 'utf8');
  const implementation = readFileSync(join(SKILLS_DIR, 'review-code', 'SKILL.md'), 'utf8');
  const garnish = readFileSync(join(SKILLS_DIR, 'garnish', 'SKILL.md'), 'utf8');
  const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');

  // V36, V74 — the plan reviewer reads both plan files, opens with a research
  // gate grounded in dated primary sources rather than model memory, and ends
  // in an explicit gate rather than a shrug.
  it('review-plan gates on dated primary sources and an explicit verdict', () => {
    assert.match(reviewPlan, /^name: review-plan/m);
    assert.match(reviewPlan, /GO or NO-GO/);
    assert.match(reviewPlan, /\/(?:review-plan)/);
    assert.match(reviewPlan, /PLAN\.md/);
    assert.match(reviewPlan, /research gate/i);
    assert.match(reviewPlan, /HANDOFF\.md/);
    assert.match(reviewPlan, /research phases remaining/);
    assert.match(reviewPlan, /primary web sources/);
    assert.match(reviewPlan, /official docs, changelogs, release notes/);
    assert.match(reviewPlan, /never trust model memory/);
    assert.match(reviewPlan, /date it was checked/);
  });

  // V37, V73 — the code reviewer works from a real baseline, cites evidence,
  // owns the security dimension, and ends by handing findings to prep. The
  // description is the trigger surface for security asks (§R.27).
  it('review-code sweeps from a baseline, cites evidence, checks security', () => {
    assert.match(implementation, /latest reachable tag/);
    assert.match(implementation, /explicit release commit/);
    assert.match(implementation, /complexity/);
    assert.match(implementation, /reuse/);
    assert.match(implementation, /correctness/);
    assert.match(implementation, /file:line/);
    assert.match(implementation, /invoke `prep`/);
    const description = implementation.slice(implementation.indexOf('description:'), implementation.indexOf('license:'));
    assert.ok(description.includes('security check'), 'description omits "security check"');
    assert.ok(description.includes('infosec'), 'description omits "infosec"');
    assert.match(implementation, /\*\*Security\*\*/);
    for (const term of ['secrets', 'injection', 'authn/authz', 'untrusted input', 'supply-chain']) {
      assert.ok(implementation.includes(term), `review-code security dimension omits "${term}"`);
    }
  });

  it('garnish protects durable state and gates deletion', () => {
    assert.match(garnish, /every PLAN phase/i);
    assert.match(garnish, /final verification/);
    assert.match(garnish, /no unrelated changes/);
    assert.match(garnish, /Remove exactly `PLAN\.md` and `HANDOFF\.md`/);
    assert.match(garnish, /Never purge `SPEC\.md`/);
    assert.match(garnish, /Invoke `encode-docs` to update/);
    assert.match(garnish, /review-code/);
  });

  // V90 — pruning is the one step here that destroys durable state, so all
  // four properties are asserted together. Dropping any one of them turns a
  // context saving into a silently lost guarantee.
  it('prunes stale spec rows only on evidence, and never reuses an id', () => {
    assert.match(garnish, /Prune only on evidence/, 'prune step is not evidence-gated');
    assert.match(garnish, /uncertain row is kept and reported, never deleted/i, 'no keep-when-unsure rule');
    assert.match(garnish, /Delete the row outright rather than leaving a retired marker/, 'no hard-delete rule');
    assert.match(garnish, /never reuse the id/i, 'ids are not protected from reuse');
    // Routed, not written: garnish holds no mutator rights over SPEC.md.
    assert.match(garnish, /Hand the\s+prunes to `encode-docs`/, 'prune does not route through the mutator');
    for (const field of ['pruned:', 'kept:']) {
      assert.ok(garnish.includes(field), `output block omits ${field}`);
    }
  });

  // V40, V26 — the baton is refreshed and committed after every phase, and
  // spec-memory failures route through the bug mode rather than the retired
  // backprop skill.
  it('refreshes the baton every phase and routes failures through bug mode', () => {
    assert.match(cook, /after every phase commit/);
    assert.match(cook, /refresh\s+`HANDOFF\.md`/);
    assert.match(cook, /commit the baton/);
    assert.doesNotMatch(cook, /backprop/i);
    assert.match(cook, /`bug:`/);
  });
});

describe('the spec format needs no FORMAT.md', () => {
  const encoder = readFileSync(join(SKILLS_DIR, 'encode-docs', 'SKILL.md'), 'utf8');

  // V20, V87 — the format is embedded in the skill, one tailored section per
  // document, so no project needs a FORMAT.md of its own…
  it('encode-docs embeds a section set and a baked header per document', () => {
    for (const section of ['## SPEC.md FILE', '## PLAN.md FILE', '## HANDOFF.md FILE']) {
      assert.ok(encoder.includes(section), `encode-docs must embed ${section}`);
    }
    assert.match(encoder, /^## BAKED HEADERS$/m, 'encode-docs must define the baked headers');
    for (const doc of ['SPEC', 'PLAN', 'HANDOFF']) {
      assert.ok(
        encoder.includes(`<!-- ${doc} FORMAT (baked by /encode-docs`),
        `no baked header template for ${doc}.md`,
      );
    }
  });

  // V86 — the spec skill was folded in here. If another skill starts claiming
  // the mutator role, two skills write SPEC.md and the sectioned ownership
  // that keeps concurrent edits from clobbering each other is gone.
  it('is the only skill claiming the SPEC.md mutator role', () => {
    assert.match(encoder, /[Ss]ole mutator/, 'encode-docs does not claim the mutator role');
    // Other skills may name the owner; they may not be it. Any line stating
    // the role must point at encode-docs, so a stale name here (the role used
    // to belong to a `spec` skill) fails rather than quietly misdirecting.
    const offenders = [];
    for (const skill of loadSkills()) {
      if (skill.dirName === 'encode-docs') continue;
      for (const line of skill.raw.split('\n')) {
        if (/sole mutator/i.test(line) && !line.includes('encode-docs')) {
          offenders.push(`skills/${skill.dirName}/SKILL.md: ${line.trim()}`);
        }
      }
    }
    assert.deepEqual(offenders, [], `mutator role misattributed: ${offenders.join(' | ')}`);
  });

  // V21 — …so no skill may still demand the file, and the repo must not carry
  // one. Both halves matter: a skill asking for a file the repo does not ship
  // fails at read time, and a file nobody reads drifts silently.
  it('needs no FORMAT.md, and the repo carries none', () => {
    const offenders = loadSkills()
      .filter((s) => /(read|load)[^.\n]{0,40}`?FORMAT\.md/i.test(s.raw))
      .map((s) => s.dirName);
    assert.deepEqual(offenders, [], `these skills still require FORMAT.md: ${offenders.join(', ')}`);
    assert.equal(
      existsSync(join(REPO_ROOT, 'FORMAT.md')),
      false,
      'FORMAT.md is superseded by the baked SPEC.md header',
    );
  });
});

describe('dependabot opens no version-update pull requests', () => {
  const path = join(REPO_ROOT, '.github', 'dependabot.yml');

  // V22 — this repo is public, so every version-update PR is public noise.
  // Security updates stay on via a repo setting, deliberately out of this file.
  it('caps every ecosystem at zero open pull requests', () => {
    assert.ok(existsSync(path), '.github/dependabot.yml missing');
    const { updates } = yaml.load(readFileSync(path, 'utf8'));
    assert.ok(updates?.length > 0, 'dependabot.yml declares no updates entries');

    const offenders = updates
      .filter((entry) => entry['open-pull-requests-limit'] !== 0)
      .map((entry) => entry['package-ecosystem']);
    assert.deepEqual(
      offenders,
      [],
      `these ecosystems would open version-update PRs: ${offenders.join(', ')}`,
    );
  });
});

describe('workflows are least-privilege', () => {
  const files = existsSync(WORKFLOWS_DIR)
    ? readdirSync(WORKFLOWS_DIR).filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'))
    : [];

  it('has at least one workflow', () => {
    assert.ok(files.length > 0, 'no workflows found under .github/workflows/');
  });

  for (const file of files) {
    // V12 — without an explicit block, a workflow inherits the repo default,
    // which may be read/write on every scope.
    it(`${file} declares top-level permissions`, () => {
      const workflow = yaml.load(readFileSync(join(WORKFLOWS_DIR, file), 'utf8'));
      assert.ok(workflow.permissions, `${file} must declare a top-level permissions: block`);
    });
  }
});
