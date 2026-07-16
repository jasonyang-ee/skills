import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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
const RETIRED_SKILLS = ['backprop', 'build', 'caveman-help', 'check', 'deepen', 'grill', 'research', 'review'];

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

describe('cold sessions can decode repository encoding', () => {
  const agents = readFileSync(join(REPO_ROOT, 'AGENTS.md'), 'utf8');

  it('documents caveman-encode symbols and table rules', () => {
    assert.match(agents, /## Caveman symbols/);
    assert.match(agents, /`→` leads to/);
    assert.match(agents, /`§` section reference/);
    assert.match(agents, /escape literal `\|`/);
  });
});

describe('prep bootstraps the six-step workflow safely', () => {
  const prep = readFileSync(join(SKILLS_DIR, 'prep', 'SKILL.md'), 'utf8');
  const commandOrder = [
    '/prep',
    '/cook',
    '/review-plan',
    '/workonplan',
    '/garnish',
    '/review-implementation',
  ];

  it('declares the six lifecycle commands in order', () => {
    let previous = -1;
    for (const command of commandOrder) {
      const position = prep.indexOf(command);
      assert.ok(position > previous, `${command} must follow the prior lifecycle command`);
      previous = position;
    }
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
    assert.match(prep, /separate from\s+the six core truth-workflow steps/i);
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

  // V53 — the generated AGENTS.md lists support skills outside the six
  // lifecycle commands (V46); a missing one is a skill the bootstrapped repo
  // never learns exists.
  it('lists every support skill in the generated support line', () => {
    const support = prep.split('\n').find((line) => line.startsWith('support:'));
    assert.ok(support, 'prep template declares no support line');
    for (const command of ['/spec', '/handoff', '/caveman-encode', '/caveman-commit']) {
      assert.ok(support.includes(command), `support line omits ${command}`);
    }
  });

  it('keeps this repository CLAUDE import exact', () => {
    assert.equal(readFileSync(join(REPO_ROOT, 'CLAUDE.md'), 'utf8').trim(), '@AGENTS.md');
  });
});

const WORKFLOW_STEPS = [
  'Cook',
  'Encode',
  'Review the plan',
  'Work on the plan',
  'Garnish',
  'Review the implementation',
];

describe('README explains the core truth workflow', () => {
  const readme = readFileSync(join(REPO_ROOT, 'README.md'), 'utf8');
  const sixSteps = readme.slice(readme.indexOf('## The six core workflow steps'));

  it('separates prep bootstrap from the six core steps', () => {
    assert.match(readme, /## The six core workflow steps/);
    assert.match(readme, /`\/prep` prepares[\s\S]*not one of its six\s+steps/);
    for (const phrase of WORKFLOW_STEPS) {
      assert.match(readme, new RegExp(`\\b${phrase}\\b`));
    }
    assert.match(readme, /order and safety gates remain\s+mandatory/i);
  });

  // V52 — Encode is a discipline the writing skills apply, not a command. A
  // reader who thinks it is a command looks for one, fails to find it, and
  // concludes the step is optional.
  it('describes Encode as an automatic discipline, not a command', () => {
    const encode = sixSteps.slice(sixSteps.indexOf('2. **Encode**'), sixSteps.indexOf('3. **Review the plan**'));
    assert.match(encode, /automatically|loaded by/);
    assert.doesNotMatch(encode, /`\/encode`/);
  });

  // V55 — `/workonplan` executes PLAN.md phases, and only `/cook` writes that
  // file (§R.17), so a documented `/spec` → `/workonplan` path cannot run.
  it('routes the small-task path through cook before workonplan', () => {
    const shortcut = readme.slice(readme.indexOf('For a small'), readme.indexOf('### What they expect'));
    assert.match(shortcut, /`\/cook`[\s\S]*`\/workonplan`/);
    assert.doesNotMatch(readme, /`\/spec`\s*→\s*`\/workonplan`/);
  });

  // V57 — the row must describe the modes `skills/caveman/SKILL.md` ships.
  it('lists the caveman modes the skill actually ships', () => {
    const row = readme.split('\n').find((line) => line.startsWith('| [`caveman`]'));
    assert.ok(row, 'README has no caveman skill row');
    assert.match(row, /\bfull\b/);
    assert.match(row, /\bultra\b/);
    assert.doesNotMatch(row, /\blite\b|\bwenyan\b/i);
  });

  // V59 — every skill that writes PLAN.md/HANDOFF.md loads the encoding.
  it('credits every caveman-encode loader', () => {
    const row = readme.split('\n').find((line) => line.startsWith('| [`caveman-encode`]'));
    assert.ok(row, 'README has no caveman-encode skill row');
    for (const loader of ['/spec', '/cook', '/review-plan', '/handoff', '/workonplan']) {
      assert.ok(row.includes(loader), `caveman-encode row omits ${loader}`);
    }
  });

  // V58 — the tree is the roster a reader trusts. Derived from disk, so a
  // renamed or added skill fails here instead of drifting silently.
  it('lists every shipped skill exactly once in the layout tree', () => {
    const tree = readme.match(/## Layout\s+```\n([\s\S]*?)```/);
    assert.ok(tree, 'README has no Layout tree');
    const entries = tree[1]
      .split(/[\s├└─│]+/)
      .filter(Boolean)
      .filter((entry) => entry !== 'skills/');
    const shipped = loadSkills().map((skill) => `${skill.dirName}/`);

    for (const dir of shipped) {
      const count = entries.filter((entry) => entry === dir).length;
      assert.equal(count, 1, `Layout tree lists ${dir} ${count} times — expected exactly once`);
    }
    const strays = entries.filter((entry) => !shipped.includes(entry));
    assert.deepEqual(strays, [], `Layout tree lists skills that do not exist: ${strays.join(', ')}`);
  });
});

describe('workflow docs agree with the spec', () => {
  // V51 — truth-workflow.md is the canonical narrative (§I); its step names
  // must be the same six the README teaches.
  it('names all six workflow steps in truth-workflow.md', () => {
    const workflow = readFileSync(join(REPO_ROOT, 'truth-workflow.md'), 'utf8');
    for (const step of WORKFLOW_STEPS) {
      assert.ok(workflow.includes(step), `truth-workflow.md omits the "${step}" step`);
    }
  });

  // V56 — the format is embedded in the spec skill and baked into SPEC.md.
  it('points encoding guidance at the embedded spec format', () => {
    const contributing = readFileSync(join(REPO_ROOT, 'CONTRIBUTING.md'), 'utf8');
    assert.match(contributing, /skills\/spec\/SKILL\.md/);
    assert.match(contributing, /## FORMAT/);
    assert.doesNotMatch(contributing, /FORMAT\.md/);
  });

  // V60 — V13 is enforced by release.yml, not the test run, so a green suite
  // must not be read as proof of every invariant.
  it('separates the automated oracle from release-only checks', () => {
    const spec = readFileSync(join(REPO_ROOT, 'SPEC.md'), 'utf8');
    const oracle = spec.split('\n').find((line) => line.startsWith('- cmd:') && line.includes('`npm test`'));
    assert.ok(oracle, 'SPEC §I declares no npm test oracle');
    assert.match(oracle, /automated/);
    assert.match(oracle, /release\/manual/);
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

describe('review and garnish workflow stays coherent', () => {
  const reviewPlan = readFileSync(join(SKILLS_DIR, 'review-plan', 'SKILL.md'), 'utf8');
  const implementation = readFileSync(join(SKILLS_DIR, 'review-implementation', 'SKILL.md'), 'utf8');
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
    assert.match(garnish, /review-implementation/);
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
