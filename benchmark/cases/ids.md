# ids

Executor: `cook`. Starting fixture: one module and one visible test file. Test command: `npm test` (`npm.cmd test` in Windows PowerShell).

## Exact task prompt

Fix uniqueIds(ids) to return each string ID's first occurrence in input order, case-sensitive, without mutating the input. Empty strings are valid IDs. Reject non-arrays and any non-string element with TypeError. Preserve the export.

## Starting files

### file: ids.mjs

```js
export function uniqueIds(ids) {
  return [...new Set(ids)].sort();
}
```

### file: visible.test.mjs

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { uniqueIds } from './ids.mjs';

test('empty and repeated ordinary IDs', () => {
  assert.deepEqual(uniqueIds([]), []);
  assert.deepEqual(uniqueIds(['a', 'a', 'b']), ['a', 'b']);
});
```
