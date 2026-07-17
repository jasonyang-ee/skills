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

describe('prep bootstraps the workflow safely', () => {
  const prep = readFileSync(join(SKILLS_DIR, 'prep', 'SKILL.md'), 'utf8');
  // V42 — /dispatchplan is a peer entry, not a footnote under /workonplan.
  const commandOrder = [
    '/prep',
    '/cook',
    '/review-plan',
    '/workonplan',
    '/dispatchplan',
    '/garnish',
    '/review-code',
  ];

  // Read the numbered entries themselves rather than scanning the whole file
  // for each name: prose that merely mentions a command is not a list entry,
  // and an indexOf sweep cannot tell the two apart.
  //
  // prep states the list twice — once as its own documentation, once inside the
  // AGENTS.md template it generates. Both are asserted, because a template that
  // drifts from the documented list bootstraps every new repo wrong.
  it('declares the seven lifecycle commands in order, in both copies', () => {
    const listed = prep
      .split('\n')
      .map((line) => line.match(/^\d+\. `(\/[a-z-]+)`/))
      .filter(Boolean)
      .map((match) => match[1]);
    assert.deepEqual(listed, [...commandOrder, ...commandOrder]);
  });

  it('uses explicit triggers and distinguishes bootstrap from core workflow', () => {
    for (const trigger of [
      '/prep',
      'bootstrap this repo',
      'set up workflow files',
      'prepare a new project for cook',
      'initialize agent guidance',
    ]) {
      const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      assert.match(prep, new RegExp(escaped));
    }
    assert.match(prep, /Bootstrap command list/);
    assert.match(prep, /separate from\s+the six core workflow steps/i);
  });

  it('loads encoding before AGENTS.md work and ships the symbol legend', () => {
    const preflight = prep.indexOf('## Preflight');
    const load = prep.indexOf('Load `caveman-encode`', preflight);
    const read = prep.indexOf('Read existing `AGENTS.md`', preflight);
    assert.ok(preflight >= 0 && load > preflight && load < read);
    for (const phrase of ['leads to', 'therefore', 'every', 'must', 'unknown', 'never', 'section reference']) {
      assert.match(prep, new RegExp(phrase));
    }
    assert.doesNotMatch(prep, /<user fills symbols|keeps repository legend>/i);
  });

  it('defines safe bootstrap outputs and ownership boundaries', () => {
    assert.match(prep, /AGENTS\.md/);
    assert.match(prep, /CLAUDE\.md/);
    assert.match(prep, /@AGENTS\.md/);
    assert.match(prep, /CHANGELOG\.md/);
    assert.match(prep, /SPEC\.md/);
    assert.match(prep, /invoke `spec`/i);
    assert.match(prep, /Never overwrite existing/i);
    assert.match(prep, /preserve it/i);
    assert.match(prep, /## Caveman symbols/);
    assert.match(prep, /## End of Chat Checklist/);
  });

  it('templates the durable AI-file guidance for new users', () => {
    for (const section of [
      '## AI File Purpose',
      '## Skills',
      '## Project Scripts',
      '## Caveman symbols',
      '## End of Chat Checklist',
    ]) {
      assert.match(prep, new RegExp(section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
    assert.match(prep, /`PLAN\.md` \+ `HANDOFF\.md` = short-lived cycle files/);
    assert.match(prep, /<user fills test command>/);
    assert.match(prep, /Ensure ∀ lint \+ tests pass/);
    assert.match(prep, /Update `CHANGELOG\.md` `## \[Unreleased\]`/);
    assert.match(prep, /Update `SPEC\.md` ∀ code change/);
    assert.match(prep, /Commit directly .*⊥ push \| tag without explicit ask/);
  });

  // V53 — the generated AGENTS.md lists support skills outside the six
  // lifecycle commands (V46); a missing one is a skill the bootstrapped repo
  // never learns exists.
  it('lists every support skill in the generated support line', () => {
    const support = prep.split('\n').find((line) => line.startsWith('support:'));
    assert.ok(support, 'prep template declares no support line');
    for (const command of ['/spec', '/handoff', '/caveman-encode', '/caveman-commit', '/caveman-pr']) {
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

describe('dispatchplan runs phases in parallel without racing', () => {
  const dispatch = readFileSync(join(SKILLS_DIR, 'dispatchplan', 'SKILL.md'), 'utf8');

  // V62 — the description is all an agent reads when deciding to load a skill.
  it('declares itself the parallel dispatch front door', () => {
    assert.match(dispatch, /^name: dispatchplan$/m);
    const description = dispatch.slice(dispatch.indexOf('description:'), dispatch.indexOf('license:'));
    for (const term of ['sub-agent', 'dispatch', 'parallel']) {
      assert.ok(description.includes(term), `dispatchplan description omits "${term}"`);
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
      assert.ok(dispatch.includes(point), `dispatchplan omits the "${point}" refresh point`);
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

describe('cook stays the planning front door', () => {
  const cook = readFileSync(join(SKILLS_DIR, 'cook', 'SKILL.md'), 'utf8');
  const workonplan = readFileSync(join(SKILLS_DIR, 'workonplan', 'SKILL.md'), 'utf8');

  it('requires PLAN.md and HANDOFF.md outputs', () => {
    assert.match(cook, /PLAN\.md/);
    assert.match(cook, /HANDOFF\.md/);
  });

  it('starts with research and ends with final verification', () => {
    assert.match(cook, /first plan phase is always research/i);
    assert.match(cook, /last phase must be final verification/i);
  });

  it('hands durable updates to spec and resumes with workonplan', () => {
    assert.match(cook, /`spec` remains the sole mutator of `SPEC\.md`/);
    assert.match(cook, /\/workonplan/);
  });

  it('binds every generated phase to a SPEC task', () => {
    assert.match(cook, /every PLAN phase gets one matching/);
    assert.match(cook, /one existing `§T` task id via `task: T<n>`/);
    assert.match(workonplan, /Read phase `task: T<n>`/);
    assert.match(workonplan, /absent from SPEC\.md/);
  });

  // V54 — cook expands an in-flight plan instead of replacing it, so a second
  // idea mid-cycle cannot silently discard the phases already planned.
  it('expands an in-flight plan rather than replacing it', () => {
    assert.match(cook, /incomplete phases/);
  });

  it('requires sourced research and per-item final verification', () => {
    assert.match(cook, /External findings require a source/);
    assert.match(cook, /Write sourced findings into `§R`/);
    assert.match(cook, /`HOLD`, `VIOLATE`, or\s+`UNVERIFIABLE`/);
    assert.match(cook, /record the result table in `HANDOFF\.md`/);
    assert.match(cook, /logic correctness/);
    assert.match(cook, /unnecessary complexity/);
    assert.match(cook, /missed reuse/);
  });

  it('gives handoff a final verification result shape', () => {
    const handoff = readFileSync(join(SKILLS_DIR, 'handoff', 'SKILL.md'), 'utf8');
    assert.match(handoff, /## final verification/);
    assert.match(handoff, /item\|status\|evidence\|decision/);
    assert.match(handoff, /HOLD \| VIOLATE \| UNVERIFIABLE/);
    assert.match(handoff, /baseline .* oracle/);
  });
});

describe('workonplan executes the planned phase set', () => {
  const workonplan = readFileSync(join(SKILLS_DIR, 'workonplan', 'SKILL.md'), 'utf8');

  it('runs all remaining phases by default and preserves targeted execution', () => {
    assert.match(workonplan, /No arg → start at the `HANDOFF\.md` "next" pointer/);
    assert.match(workonplan, /No arg → after each completed phase and committed handoff, continue with the\s+next eligible phase/);
    assert.match(workonplan, /Explicit phase arg → execute only that phase, then invoke `handoff` and stop/);
    assert.match(workonplan, /A `next` pointer identifies the starting phase, not a default one-phase limit/);
  });
});

describe('review and garnish workflow stays coherent', () => {
  const reviewPlan = readFileSync(join(SKILLS_DIR, 'review-plan', 'SKILL.md'), 'utf8');
  const implementation = readFileSync(join(SKILLS_DIR, 'review-code', 'SKILL.md'), 'utf8');
  const garnish = readFileSync(join(SKILLS_DIR, 'garnish', 'SKILL.md'), 'utf8');
  const workonplan = readFileSync(join(SKILLS_DIR, 'workonplan', 'SKILL.md'), 'utf8');

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

  it('requires implementation baseline, evidence, and cook handoff', () => {
    assert.match(implementation, /latest reachable tag/);
    assert.match(implementation, /explicit release commit/);
    assert.match(implementation, /complexity/);
    assert.match(implementation, /reuse/);
    assert.match(implementation, /correctness/);
    assert.match(implementation, /file:line/);
    assert.match(implementation, /invoke `cook`/);
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
    assert.match(workonplan, /after every phase commit/);
    assert.match(workonplan, /refresh\s+`HANDOFF\.md`/);
    assert.match(workonplan, /commit the baton/);
  });
});

describe('failure handling routes through spec bug mode', () => {
  const workonplan = readFileSync(join(SKILLS_DIR, 'workonplan', 'SKILL.md'), 'utf8');

  it('workonplan no longer references backprop', () => {
    assert.doesNotMatch(workonplan, /backprop/i);
    assert.match(workonplan, /`bug:`/);
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
