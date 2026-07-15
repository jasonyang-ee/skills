import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS_DIR = join(REPO_ROOT, 'skills');

/**
 * Split YAML frontmatter from the markdown body.
 * Mirrors the delimiter handling in the skills CLI: the file must open with
 * `---` and the block is terminated by the next `---` on its own line.
 */
export function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(raw);
  if (!match) return null;
  return { data: yaml.load(match[1]), body: raw.slice(match[0].length) };
}

/**
 * Collapse a frontmatter string the way the CLI's sanitizeMetadata does
 * (dist/cli.mjs: `[\r\n]+` -> " ", then trim), so length assertions measure
 * what an agent actually sees rather than the YAML block scalar's newlines.
 */
export function collapse(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

/** Every skills/<name>/SKILL.md in the repo, with frontmatter parsed. */
export function loadSkills() {
  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => {
      const dir = join(SKILLS_DIR, entry.name);
      const path = join(dir, 'SKILL.md');
      statSync(path); // throws if a skill directory has no SKILL.md
      const raw = readFileSync(path, 'utf8');
      return { dirName: entry.name, path, raw, parsed: parseFrontmatter(raw) };
    });
}

/** Strip ANSI escape sequences so CLI stdout can be asserted on. */
export function stripAnsi(text) {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\[[0-9;?]*[A-Za-z]/g, '');
}
