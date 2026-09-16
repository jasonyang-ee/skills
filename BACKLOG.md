
Here is a case where review-code is not working automatically. I want this solution be part of the skill. Review-code is suppose to find blockers and suppose to supresse with direct garnish and immediately plan for remediation cycle plan using new prep. Please refine our review-code skill.
```
  $review-code we had one review and some result output from previous session. Please turn directly into garnish and prep for new fix. Here is the output from other session. Verify and confirm and plan new cycle.  NO-GO for the current PLAN.md
  implementation. Found 6 BLOCKs and 1 DIVERGENCE.

    1. BLOCK — Rename breaks legacy order deduplication. Migration 070 (migrations/070_tradovate_identity.sql:298) preserves existing fingerprints, but BrokerLedger (backend/src/trading/brokerLedger.ts:229) includes the broker name in its hash and
  checks
       only the new fingerprint. An equivalent request after upgrade can create a fresh intent despite an existing send_started record. Implement the legacy fingerprint lookup required by F1.T1.

    2. BLOCK — Shutdown discards buffered ticks and throws. backend/src/services/marketData/tradovate/runtime.ts:432 clears chart identities before stream.stop() flushes ticks through an identity lookup. Reproduced: Stale Tradovate market-data
  identity.
       The exception also skips socket closure. Unsubscribe has the same ordering problem. Retain identities through flushing and ensure transport cleanup runs on failure.

    3. BLOCK — Reconnect never adopts replacement chart IDs. backend/src/services/tradovate/marketDataSocket.ts:206 emits chart-ack only while the initial waiter exists. Replay acknowledgements cannot update runtime mappings. Reproduced: server ID
  changed
       to 201, runtime retained 105, and status remained error. Publish every acknowledgement and restore readiness after successful reauthorization/rebinding.

    4. BLOCK — History paging always stops after one response. backend/src/services/marketData/tradovate/runtime.ts:504 converts each chart’s completion marker into page.eoh=true; both history consumers interpret that as exhausted provider history.
       Requests therefore stop at the first 2,000 intraday or 1,000 daily bars. Separate chart completion from history exhaustion and continue until the requested boundary.

    5. BLOCK — Batched acknowledgements lose history. backend/src/services/marketData/tradovate/runtime.ts:546 installs the history collector after awaiting the acknowledgement. When acknowledgement and history arrive in one SockJS frame, history is
       processed first and discarded. Reproduced: Tradovate history chart completion timed out. Register ownership synchronously or buffer events until the collector attaches.

    6. BLOCK — Configuration replacement leaves data consumers using retired sessions. Both the MD runtime (backend/src/services/marketData/tradovate/runtime.ts:603) and live subscription owner (backend/src/services/marketData/
       liveMarketDataRuntime.ts:218) cache the session indefinitely, while configuration changes replace the global owner. Subsequent connections can use old credentials or remain blocked on the retired session. Reacquire the current owner and
  reconnect
       the selected data runtime through its existing transition barrier.

    7. DIVERGENCE — Required idle flushing is absent. backend/src/services/marketData/tradovate/streamProvider.ts:88 advances the buffer only on incoming ticks; flushing occurs only during teardown. A paused stream retains its final ticks indefinitely,
       contrary to §V.133 and F3.T1. Reproduced a tick remaining buffered after the five-second window. Add a generation-fenced idle flush.

    These findings invalidate F1.T1, F2.T1, F3.T1/T2, and F6.T1 completion evidence. The production-runtime test contains only one happy-path case; the live-owner test substitutes a fake provider, so neither proves the required integrated lifecycle.

    Verification passed on Node 25.9.0: ./test.sh—259 files and 2,596 TypeScript tests passed; 52 skipped, 39 todo; Python 45 and ML 32 passed. API catalogue and offline spec manifests passed; spec reproduction skipped because its cache was absent.
    Docker, disposable-DB checks, and pinned Node acceptance were not rerun. Reproductions used fake transport without broker or database requests.

    Reviewed on clean main, HEAD 89e87a4d97986adef689e2ddfb546e4dc7a87721, focused on the current cycle’s implementation since 807650642ef141a487303e3ab831cf816b0ffb12. Release baseline: v1.2.1 / bd362126ed707fd1b72733fd606a0c56708aee92. Working tree
    remains clean; no implementation or cycle documents changed.


› > The findings invalidate the old cycle’s completion evidence, so review-code and garnish prohibit clearing it. Do you explicitly want to supersede that failed cycle, preserving its findings and history in the new remediation plan?

  Supersede with a remediation cycle

```