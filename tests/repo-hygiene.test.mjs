import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { REPO_ROOT, loadSkills } from './helpers.mjs';

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
