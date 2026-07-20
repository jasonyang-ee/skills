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
];

/**
 * Files that must speak of the skill by its current name. CHANGELOG.md is
 * excluded on purpose: released entries record what shipped under the old
 * name, and rewriting history would make the log lie. SPEC.md §T rows are
 * likewise a record of tasks as they were performed.
 */
const LIVE_REF_FILES = ['README.md', 'AGENTS.md', 'NOTICE.md', '.github/CONTRIBUTING.md'];

describe('published skills carry no private-codebase references', () => {
  for (const skill of loadSkills()) {
    // V9
    it(`skills/${skill.dirName}/SKILL.md is free of internal references`, () => {
      const hits = PRIVATE_REFS.filter((pattern) => pattern.test(skill.raw)).map(String);
      assert.deepEqual(hits, [], `leaked internal reference(s): ${hits.join(', ')}`);
    });
  }
});

describe('repo is publishable', () => {
  // V10
  it('ships an MIT LICENSE', () => {
    const path = join(REPO_ROOT, 'LICENSE');
    assert.ok(existsSync(path), 'LICENSE missing — nobody may legally use these skills');
    assert.match(readFileSync(path, 'utf8'), /MIT License/);
  });

  // V11 — the release workflow reads sections out of this file.
  it('keeps an Unreleased section in CHANGELOG.md', () => {
    const path = join(REPO_ROOT, 'CHANGELOG.md');
    assert.ok(existsSync(path), 'CHANGELOG.md missing');
    assert.match(readFileSync(path, 'utf8'), /^## \[Unreleased\]/m);
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

  it('loads encoding before AGENTS.md work and ships the symbol legend', () => {
    const preflight = setup.indexOf('## Preflight');
    const load = setup.indexOf('Load `encode-docs`', preflight);
    const read = setup.indexOf('Read existing `AGENTS.md`', preflight);
    assert.ok(preflight >= 0 && load > preflight && load < read);
    for (const phrase of ['leads to', 'therefore', 'every', 'must', 'unknown', 'never', 'section reference']) {
      assert.match(setup, new RegExp(phrase));
    }
    assert.doesNotMatch(setup, /<user fills symbols|keeps repository legend>/i);
  });

  it('defines safe bootstrap outputs and ownership boundaries', () => {
    assert.match(setup, /AGENTS\.md/);
    assert.match(setup, /CLAUDE\.md/);
    assert.match(setup, /@AGENTS\.md/);
    assert.match(setup, /CHANGELOG\.md/);
    assert.match(setup, /SPEC\.md/);
    assert.match(setup, /invoke `spec`/i);
    assert.match(setup, /Never overwrite existing/i);
    assert.match(setup, /preserve it/i);
    assert.match(setup, /## Encoding symbols/);
    assert.match(setup, /## End of Chat Checklist/);
  });

  it('templates the durable AI-file guidance for new users', () => {
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
  });

  // V53 — the generated AGENTS.md lists support skills outside the six
  // lifecycle commands (V46); a missing one is a skill the bootstrapped repo
  // never learns exists.
  it('lists every support skill in the generated support line', () => {
    const support = setup.split('\n').find((line) => line.startsWith('support:'));
    assert.ok(support, 'setup template declares no support line');
    for (const command of ['/spec', '/handoff', '/encode-docs', '/encode-commit', '/encode-pr']) {
      assert.ok(support.includes(command), `support line omits ${command}`);
    }
  });
});

describe('skills stay markdown-only', () => {
  for (const skill of loadSkills()) {
    // V19 — no Python/script-bearing skills. A skill needing a runtime turns
    // `npx skills add` into an install that fails later, on someone else's box.
    it(`skills/${skill.dirName}/ ships no scripts`, () => {
      assert.equal(
        existsSync(join(SKILLS_DIR, skill.dirName, 'scripts')),
        false,
        `skills/${skill.dirName}/scripts/ exists — this repo is markdown-only`,
      );
    });
  }
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
  });

  it('names itself review-code in frontmatter and title', () => {
    const skill = readFileSync(join(SKILLS_DIR, 'review-code', 'SKILL.md'), 'utf8');
    assert.match(skill, /^name: review-code$/m);
    assert.match(skill, /^# review-code /m);
  });

  // The history stays honest: released notes describe what actually shipped.
  it('preserves the old name where it is a historical record', () => {
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
    'handoff', 'prep', 'review-code', 'review-plan', 'setup', 'spec',
  ];
  // Names reused across different skills during the rename: `cook` used to mean
  // planning and now means execution. A stale reference is not a dead link, it
  // points at a real skill that does the wrong thing.
  const RETIRED = [
    'workonplan', 'dispatchplan', 'caveman-encode', 'caveman-commit', 'caveman-pr',
  ];

  // V81
  it('ships exactly the twelve renamed skills', () => {
    assert.deepEqual(loadSkills().map((skill) => skill.dirName).sort(), ROSTER);
  });

  it('claims the right skill count where the count is stated', () => {
    for (const file of ['README.md', 'AGENTS.md']) {
      const text = readFileSync(join(REPO_ROOT, file), 'utf8');
      assert.ok(!/\b13 skills\b/.test(text), `${file} still claims 13 skills`);
      assert.match(text, /\b12 skills\b/, `${file} does not state the current skill count`);
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
    assert.deepEqual(offenders, [], `retired skill names still referenced: ${offenders.join(', ')}`);
  });
});

describe('the terse report discipline lives in the review skills only', () => {
  const REVIEWERS = ['review-plan', 'review-code'];

  // V84 — the conversational `caveman` skill was retired into these two. It
  // earns its keep where output is a report a human reads; the planning and
  // execution skills write files, so terseness there buys nothing.
  it('retires the caveman skill', () => {
    assert.ok(
      !existsSync(join(SKILLS_DIR, 'caveman')),
      'skills/caveman/ must not exist — its rules were baked into the review skills',
    );
  });

  it('bakes the discipline into both review skills', () => {
    for (const name of REVIEWERS) {
      const skill = readFileSync(join(SKILLS_DIR, name, 'SKILL.md'), 'utf8');
      assert.match(skill, /^## Report output$|^## REPORT OUTPUT$/m, `${name} has no report-output section`);
      assert.match(skill, /[Aa]lways on/, `${name} does not make the discipline always-on`);
      for (const rule of ['articles', 'hedging', 'narrate tool calls', 'emoji', 'invent new ones']) {
        assert.ok(skill.includes(rule), `${name} omits the "${rule}" rule`);
      }
    }
  });

  it('gives the discipline to no other skill', () => {
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

  // V63 — one phase goes to one sub-agent, so the phase id names the
  // assignment. A drifting filename breaks the purge step and the baton.
  it('gives every assignment its own dedicated handoff file', () => {
    assert.match(dispatch, /HANDOFF-<phase-id>\.md/);
    assert.match(dispatch, /repo root/i);
  });

  // V64 — concurrent writes to one file are a lost update, and the loser's
  // work disappears with no error.
  it('selects sub-agents by complexity and never overlaps file sets', () => {
    assert.match(dispatch, /complexity/i);
    assert.match(dispatch, /capability/i);
    assert.match(dispatch, /[Ss]hared-file safety/);
    assert.match(dispatch, /disjoint/i);
    assert.match(dispatch, /lost update/i);
  });

  // V65 — the completion block is the finish signal, and the dispatcher's own
  // review of the diff is what makes it true.
  it('takes a completion block, then runs its own acceptance review', () => {
    assert.match(dispatch, /## completion/);
    assert.match(dispatch, /status: <done \| blocked: reason>/);
    assert.match(dispatch, /evidence:/);
    assert.match(dispatch, /tests:/);
    assert.match(dispatch, /[Aa]cceptance review/);
    assert.match(dispatch, /read the FULL diff/i);
    // §R.19 / §R.20 — the two skills a sub-agent must never reach for.
    assert.match(dispatch, /sub-agent must never run `garnish`/);
    assert.match(dispatch, /Never invoke `\/review-code` mid-dispatch/);
  });

  // V66 — parallel work outruns one context; an unwritten baton loses it.
  it('refreshes the main baton at all four points', () => {
    for (const point of [
      'before dispatch',
      'after sub-agent completion',
      'after acceptance review',
      'before stop',
    ]) {
      assert.ok(dispatch.includes(point), `cater omits the "${point}" refresh point`);
    }
  });

  // V67 — the agent roster is the harness's, not this repo's (§R.21). `skills
  // add` installs no agents (§R.12), so a named agent is a silent no-op on
  // every other host.
  it('names no harness-specific agent', () => {
    assert.doesNotMatch(dispatch, /sonnet-implementer/);
    assert.doesNotMatch(dispatch, /\bExplore\b/);
  });

  // V68 — garnish removes only PLAN.md and HANDOFF.md, and refuses to run with
  // unrelated files dirty, so leftovers block the cycle close (§R.19).
  it('purges each assignment file once accepted', () => {
    assert.match(dispatch, /[Pp]urge the assignment file/);
    assert.match(dispatch, /delete\s+`HANDOFF-<phase-id>\.md`/);
    assert.match(dispatch, /no `HANDOFF-<phase-id>\.md` may remain/);
  });
});

describe('retired planning skills stay retired', () => {
  for (const name of RETIRED_SKILLS) {
    it(`does not ship skills/${name}/`, () => {
      assert.equal(existsSync(join(SKILLS_DIR, name)), false, `skills/${name}/ should stay removed`);
    });
  }
});

describe('generated commit messages stay readable without the plan files', () => {
  const encodeCommit = readFileSync(join(SKILLS_DIR, 'encode-commit', 'SKILL.md'), 'utf8');

  // V79 — asserts the RULE is present, not that the file lacks symbols. The
  // skill legitimately contains "≤50 chars" in its own prose; the ban is on
  // what it generates, not on how it is written.
  it('bars encoding symbols and plan identifiers from generated messages', () => {
    const never = encodeCommit.slice(
      encodeCommit.indexOf('**What NEVER goes in:**'),
      encodeCommit.indexOf('## Expanding plan references'),
    );
    assert.ok(never.length > 0, 'encode-commit has no "What NEVER goes in" section');
    assert.match(never, /[Ee]ncoding symbols/, 'no rule barring encoding symbols');
    assert.match(never, /identifiers/, 'no rule barring plan or spec identifiers');
  });

  it('explains how to expand an identifier, with a worked example', () => {
    assert.match(encodeCommit, /^## Expanding plan references$/m);
    const section = encodeCommit.slice(encodeCommit.indexOf('## Expanding plan references'));
    assert.ok(section.includes('❌') && section.includes('✅'), 'no before/after example');
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

  it('requires PLAN.md and HANDOFF.md outputs', () => {
    assert.match(prep, /PLAN\.md/);
    assert.match(prep, /HANDOFF\.md/);
  });

  it('starts with research and ends with final verification', () => {
    assert.match(prep, /first plan phase is always research/i);
    assert.match(prep, /last phase must be final verification/i);
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

  it('hands durable updates to spec and resumes with cook', () => {
    assert.match(prep, /`spec` remains the sole mutator of `SPEC\.md`/);
    assert.match(prep, /\/cook/);
  });

  it('binds every generated phase to a SPEC task', () => {
    assert.match(prep, /every PLAN phase gets one matching/);
    assert.match(prep, /one existing `§T` task id via `task: T<n>`/);
    assert.match(cook, /Read phase `task: T<n>`/);
    assert.match(cook, /absent from SPEC\.md/);
  });

  // V54 — prep expands an in-flight plan instead of replacing it, so a second
  // idea mid-cycle cannot silently discard the phases already planned.
  it('expands an in-flight plan rather than replacing it', () => {
    assert.match(prep, /incomplete phases/);
  });

  it('requires sourced research and per-item final verification', () => {
    assert.match(prep, /External findings require a source/);
    assert.match(prep, /Write sourced findings into `§R`/);
    assert.match(prep, /`HOLD`, `VIOLATE`, or\s+`UNVERIFIABLE`/);
    assert.match(prep, /record the result table in `HANDOFF\.md`/);
    assert.match(prep, /logic correctness/);
    assert.match(prep, /unnecessary complexity/);
    assert.match(prep, /missed reuse/);
  });

  it('gives handoff a final verification result shape', () => {
    const handoff = readFileSync(join(SKILLS_DIR, 'handoff', 'SKILL.md'), 'utf8');
    assert.match(handoff, /## final verification/);
    assert.match(handoff, /item\|status\|evidence\|decision/);
    assert.match(handoff, /HOLD \| VIOLATE \| UNVERIFIABLE/);
    assert.match(handoff, /baseline .* oracle/);
  });
});

describe('cook executes the planned phase set', () => {
  const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');

  // V72 — the description is the trigger surface (§R.25/§R.26); B5 shipped a
  // sentence fragment that weakened it. Both step-4 skills carry the same
  // implementation-quality keywords.
  it('describes implementation with well-formed, keyword-bearing sentences', () => {
    const dispatch = readFileSync(join(SKILLS_DIR, 'cater', 'SKILL.md'), 'utf8');
    for (const [name, skill] of [['cook', cook], ['cater', dispatch]]) {
      const description = skill.slice(skill.indexOf('description:'), skill.indexOf('license:'));
      assert.doesNotMatch(description, /one phase\.\s+at /);
      for (const term of ['production-quality', 'verification-driven', 'evidence-based']) {
        assert.ok(description.includes(term), `${name} description omits "${term}"`);
      }
    }
  });

  it('runs all remaining phases by default and preserves targeted execution', () => {
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

  it('renames the plan reviewer and preserves the explicit gate', () => {
    assert.match(reviewPlan, /^name: review-plan/m);
    assert.match(reviewPlan, /GO or NO-GO/);
    assert.match(reviewPlan, /\/(?:review-plan)/);
  });

  it('reads PLAN.md, runs research gate, and updates plan files', () => { // V36
    assert.match(reviewPlan, /PLAN\.md/);
    assert.match(reviewPlan, /research gate/i);
    assert.match(reviewPlan, /HANDOFF\.md/);
    assert.match(reviewPlan, /research phases remaining/);
  });

  it('requires implementation baseline, evidence, and prep handoff', () => {
    assert.match(implementation, /latest reachable tag/);
    assert.match(implementation, /explicit release commit/);
    assert.match(implementation, /complexity/);
    assert.match(implementation, /reuse/);
    assert.match(implementation, /correctness/);
    assert.match(implementation, /file:line/);
    assert.match(implementation, /invoke `prep`/);
  });

  // V74 — the research gate grounds findings in current primary sources with
  // a checked date, never model memory.
  it('review-plan grounds research in current, dated primary sources', () => {
    assert.match(reviewPlan, /primary web sources/);
    assert.match(reviewPlan, /official docs, changelogs, release notes/);
    assert.match(reviewPlan, /never trust model memory/);
    assert.match(reviewPlan, /date it was checked/);
  });

  // V73 — step 6 owns the security check; the description is the trigger
  // surface for "security check" / "infosec" asks (§R.27).
  it('review-code carries the security dimension and its triggers', () => {
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
    assert.match(garnish, /Invoke `spec` to update/);
    assert.match(garnish, /review-code/);
  });

  it('refreshes the baton after every completed phase', () => {
    assert.match(cook, /after every phase commit/);
    assert.match(cook, /refresh\s+`HANDOFF\.md`/);
    assert.match(cook, /commit the baton/);
  });
});

describe('failure handling routes through spec bug mode', () => {
  const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');

  it('cook no longer references backprop', () => {
    assert.doesNotMatch(cook, /backprop/i);
    assert.match(cook, /`bug:`/);
  });
});

describe('the spec format needs no FORMAT.md', () => {
  const spec = readFileSync(join(SKILLS_DIR, 'spec', 'SKILL.md'), 'utf8');

  // V20 — the format is embedded in the skill…
  it('spec embeds the format and the baked header', () => {
    assert.match(spec, /^## FORMAT$/m, 'spec/SKILL.md must embed the FORMAT section');
    assert.match(spec, /^## BAKED HEADER$/m, 'spec/SKILL.md must define the baked header');
    assert.match(spec, /SPEC FORMAT \(baked by \/spec/, 'baked header template missing');
  });

  // V21 — …so no skill may still demand the file, and the repo must not carry one.
  it('no skill requires a FORMAT.md file', () => {
    const offenders = loadSkills()
      .filter((s) => /(read|load)[^.\n]{0,40}`?FORMAT\.md/i.test(s.raw))
      .map((s) => s.dirName);
    assert.deepEqual(offenders, [], `these skills still require FORMAT.md: ${offenders.join(', ')}`);
  });

  it('repo root carries no FORMAT.md', () => {
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
