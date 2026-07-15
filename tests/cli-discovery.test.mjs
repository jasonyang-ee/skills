import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT, loadSkills, stripAnsi } from './helpers.mjs';

/**
 * The real `skills` CLI is the only authority on whether `npx skills add` can
 * see these skills. Contract tests check the spec; this checks the tool. It is
 * spawned through process.execPath rather than node_modules/.bin so it behaves
 * identically on Windows and POSIX.
 */
const CLI = join(REPO_ROOT, 'node_modules', 'skills', 'bin', 'cli.mjs');

describe('skills CLI discovers this repo', () => {
  const available = existsSync(CLI);

  it('has the skills CLI installed', { skip: available ? false : 'run npm install first' }, () => {
    assert.ok(available);
  });

  it('lists every skill in skills/', { skip: available ? false : 'run npm install first' }, () => {
    const stdout = execFileSync(process.execPath, [CLI, 'add', REPO_ROOT, '--list'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 60_000,
      env: { ...process.env, NO_COLOR: '1', CI: '1' },
    });

    const output = stripAnsi(stdout);
    // V8 — a skill missing here is invisible to `npx skills add`, however
    // valid its frontmatter looks.
    for (const skill of loadSkills()) {
      assert.match(output, new RegExp(`\\b${skill.dirName}\\b`), `CLI did not list "${skill.dirName}"`);
    }
  });
});
