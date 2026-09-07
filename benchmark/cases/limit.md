# limit

Executor: `cook`. Starting fixture: one module and one visible test file. Test command: `npm test` (`npm.cmd test` in Windows PowerShell).

## Exact task prompt

Fix parseLimit(text): undefined or a blank string returns 20. Otherwise accept only trimmed strings of decimal digits representing 1 through 100; throw RangeError for everything else. Preserve the export.

## Starting files

### file: limit.mjs

```js
export function parseLimit(text) {
  if (text === undefined) return 20;
  const value = Number.parseInt(text, 10);
  if (Number.isNaN(value) || value < 1 || value > 100) {
    throw new RangeError('Invalid limit');
  }
  return value;
}
```

### file: visible.test.mjs

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLimit } from './limit.mjs';

test('default and ordinary limit', () => {
  assert.equal(parseLimit(undefined), 20);
  assert.equal(parseLimit('42'), 42);
});

test('limits outside the supported range', () => {
  assert.throws(() => parseLimit('0'), RangeError);
  assert.throws(() => parseLimit('101'), RangeError);
});
```
