# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-07-15

### Added

- `handoff` skill — writes HANDOFF.md, the session-to-session baton for
  multi-phase PLAN.md execution.
- `workonplan` skill — executes PLAN.md phases one at a time as a single main
  agent, ending every session with a handoff.
- Contract test suite validating both skills against the
  [Agent Skills specification](https://agentskills.io/specification.md), plus a
  discovery test that runs the real `skills` CLI against this repo.
- CI workflow (Node 20/22/24 on Linux, Node 22 on Windows) and a tag-triggered
  release workflow that derives release notes from this file.

[Unreleased]: https://github.com/jasonyang-ee/skills/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/jasonyang-ee/skills/releases/tag/v0.1.0
