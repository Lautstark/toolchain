## [4.1.0](https://github.com/Lautstark/toolchain/compare/v4.0.0...v4.1.0) (2026-10-01)

### Features

* **playwright:** take a partial webServer, the way the base merges it ([382ddca](https://github.com/Lautstark/toolchain/commit/382ddca1cdf5a5e56897e7069a92f84d4100d101))

## [4.0.0](https://github.com/Lautstark/toolchain/compare/v3.0.0...v4.0.0) (2026-10-01)

### ⚠ BREAKING CHANGES

* **deps:** vitest moves from 4 to 5. A suite that reads Node APIs
must name "node" in its tsconfig types; vitest's own types no longer
bring them in.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

### Features

* **deps:** vitest 5 ([32b53b5](https://github.com/Lautstark/toolchain/commit/32b53b5a4c61515081674b8fdd7eca201280512f))

## [3.0.0](https://github.com/Lautstark/toolchain/compare/v2.0.0...v3.0.0) (2026-10-01)

### ⚠ BREAKING CHANGES

* **deps:** typescript moves from 5.9 to 6. An app's own tsconfig may
need rootDir named for an emitting build (TS5011), and lib.dom now declares
the File System Access iterators.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

### Features

* **deps:** TypeScript 6 ([09ad089](https://github.com/Lautstark/toolchain/commit/09ad0891f69692500d642614328664155bc7ddd2))

## [2.0.0](https://github.com/Lautstark/toolchain/compare/v1.0.0...v2.0.0) (2026-10-01)

### ⚠ BREAKING CHANGES

* **renovate:** trailer makes semantic-release cut a major, which the
shared preset holds for a person.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

### Continuous Integration

* **renovate:** a major of a toolchain dependency is a major of the toolchain ([bf01b28](https://github.com/Lautstark/toolchain/commit/bf01b2870b2bc982bc715a39552dd29fd1866575))

## 1.0.0 (2026-09-16)

### Features

* the toolchain the apps share, declared once ([4109f39](https://github.com/Lautstark/toolchain/commit/4109f39316dec55207d916403ccfb561fdbda26f))
