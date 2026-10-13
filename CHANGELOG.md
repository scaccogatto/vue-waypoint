# Changelog

All notable changes to this project are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/). Releases are published by pushing a `vX.Y.Z` tag that matches `package.json`: the Release workflow verifies it, runs the full check suite and publishes to npm with provenance through trusted publishing.

## [Unreleased]

### Changed

- **BREAKING**: `engines.node` is now `>=24`, the only Node version CI tests (Node 20 is end-of-life). Installs with `engine-strict` on older Node versions now fail.
- `peerDependencies.vue` is now `^3.3.0`. Since 5.1.0 the build imports `toValue` (Vue 3.3) and `getCurrentScope`/`onScopeDispose` (Vue 3.2), so Vue 3.0 to 3.2 already failed at import time: the old `^3.0.0` range never worked for this code. CI now runs the test suite against Vue 3.3.0.
- The `exports` map now has separate `import` and `require` branches, each with its own `types` condition listed first.
- `useWaypoint` and `<Waypoint>` rebuild the `IntersectionObserver` only when the options change value (`root` by identity, `threshold` as a number or an array, other keys by value). In-place mutations still trigger a rebuild.

### Added

- CommonJS type declarations (`dist/*.d.cts`), so `require` consumers under `node16`/`nodenext` resolution get CJS types instead of ESM ones ("masquerading as ESM"). Relative imports in the declarations now carry explicit extensions.

### Fixed

- `useWaypoint` now follows target swaps: it unobserves the previous element and observes the new one (for example after a `v-if` / `v-else` swap), and it unobserves the element when the target becomes `null`.
- `<Waypoint>` observes its new root element when a `tag` change re-renders it, instead of keeping the detached old one.
- An inline `:options="{ ... }"` literal no longer recreates the observer on every parent re-render, which used to reset the direction baseline and re-emit `change`.

## [5.1.0](https://github.com/scaccogatto/vue-waypoint/compare/v5.0.3...v5.1.0) - 2026-07-17

### Added

- `useWaypoint` composable, exported alongside `Waypoint`, for observing a template ref directly without the component wrapper.

### Changed

- CI runs on Node 24 only (latest LTS) instead of a Node 20 / 22 / 24 matrix.

## [5.0.3](https://github.com/scaccogatto/vue-waypoint/compare/v5.0.2...v5.0.3) - 2026-07-17

### Added

- `./package.json` is exposed in the `exports` map.

### Changed

- Publishing skips versions that are already on npm.
- `build.rollupOptions` is renamed to `build.rolldownOptions` (Vite 8).

### Fixed

- The `IntersectionObserver` is rebuilt when the `options` prop changes, instead of reading it only once at mount.

## [5.0.2](https://github.com/scaccogatto/vue-waypoint/compare/v5.0.0...v5.0.2) - 2026-07-17

### Changed

- The UMD bundle is dropped: `require` now resolves to a plain CommonJS build at `dist/vue-waypoint.cjs`.
- Releases are published with token-less npm trusted publishing (OIDC) and provenance.

### Fixed

- The `IntersectionObserver` is disconnected when the component unmounts.

## [5.0.0](https://github.com/scaccogatto/vue-waypoint/compare/v4.3.0...v5.0.0) (2026-06-28)

A full toolchain modernization. The public component API is unchanged; the breaking change is the published type-declaration shape and the dropped support for legacy Node versions.

### ⚠ BREAKING CHANGES

- **types**: the package now ships real compiled declarations at `dist/index.d.ts` instead of pointing `typings` at a raw `.ts` source file. Consumers no longer get `vue-tsc` errors from the package's source (closes [#78](https://github.com/scaccogatto/vue-waypoint/issues/78)). `package.json` now exposes a modern `exports` map (ESM `import`, CJS `require`, `types`).
- **engines**: Node.js `>= 20` is now required for development and CI.

### Bug Fixes

- **types**: emit bundled `.d.ts` via `vite-plugin-dts` and repoint `types`/`typings`, fixing consumer `vue-tsc` failures ([#78](https://github.com/scaccogatto/vue-waypoint/issues/78))

### Features

- declare `emits: ['change']` on the component for accurate typing and devtools introspection

### Build / Tooling

- upgrade Vite 3 → 8, `@vitejs/plugin-vue` 3 → 6
- upgrade Vitest 0.21 → 4 (config moved to `vitest.config.ts`)
- upgrade TypeScript 4.7 → 6 and `vue-tsc` 0.39 → 3, align with `@vue/tsconfig` 0.9 (`moduleResolution: bundler`)
- migrate ESLint 8 → 10 flat config (`eslint.config.js`), drop `.eslintrc.cjs`
- replace deprecated `standard-version` with `release-it` + `@release-it/conventional-changelog`
- upgrade Husky 8 → 9, `lint-staged`, `commitlint`, and Vue to 3.5
- emit dual ESM (`vue-waypoint.js`) + UMD (`vue-waypoint.umd.cjs`) bundles

### Tests

- replace the legacy placeholder mock with a controllable `IntersectionObserver` double
- add coverage for the `active` toggle, `disableCssHelpers`, `change` emission, the `going`/`direction` matrix, and the observer callback paths (23 tests)

### Continuous Integration

- new `ci.yml` running lint + type-check + test + build on Node 20 and 22
- bump `actions/checkout` v2 → v4 and `actions/setup-node` v1 → v4; publish with npm provenance

## [4.3.0](https://github.com/scaccogatto/vue-waypoint/compare/v4.2.5...v4.3.0) (2023-08-28)

### Features

- added support for SSR environments ([#77](https://github.com/scaccogatto/vue-waypoint/issues/77)) ([1ae537b](https://github.com/scaccogatto/vue-waypoint/commit/1ae537bbfa86d6096b6c45e47d65a704ba833f4a))

### [4.2.5](https://github.com/scaccogatto/vue-waypoint/compare/v4.2.4...v4.2.5) (2022-09-12)

### Bug Fixes

- typing export ([612fd4c](https://github.com/scaccogatto/vue-waypoint/commit/612fd4c8e4c6efdbdc42a06a3c1c5a47ad7a0b49))

### [4.2.4](https://github.com/scaccogatto/vue-waypoint/compare/v4.2.3...v4.2.4) (2022-08-15)

### [4.2.3](https://github.com/scaccogatto/vue-waypoint/compare/v4.2.2...v4.2.3) (2022-08-13)

### Bug Fixes

- node version on build ([f5944df](https://github.com/scaccogatto/vue-waypoint/commit/f5944df31e90ac6ea19a6474aa183ffc7f834814))

### [4.2.2](https://github.com/scaccogatto/vue-waypoint/compare/v4.2.1...v4.2.2) (2022-08-13)

### Bug Fixes

- intermediate states cleanup ([2766be8](https://github.com/scaccogatto/vue-waypoint/commit/2766be8d583ac546e81576e11add97879e4db0c1))

### [4.2.1](https://github.com/scaccogatto/vue-waypoint/compare/v4.2.0...v4.2.1) (2021-09-07)

## [4.2.0](https://github.com/scaccogatto/vue-waypoint/compare/v4.1.1...v4.2.0) (2021-08-17)

### Features

- disableCssHelpers ([3ff1e45](https://github.com/scaccogatto/vue-waypoint/commit/3ff1e458a3d4e519c031a0ce72e21454bff51673))

### [4.1.1](https://github.com/scaccogatto/vue-waypoint/compare/v4.1.0...v4.1.1) (2021-08-10)

## [4.1.0](https://github.com/scaccogatto/vue-waypoint/compare/v4.0.0...v4.1.0) (2021-07-09)

### Features

- adds el as example ([09cdc71](https://github.com/scaccogatto/vue-waypoint/commit/09cdc716873ac0711a2078f248aa2749d31e2629))

## [4.0.0](https://github.com/scaccogatto/vue-waypoint/compare/v3.5.0...v4.0.0) (2021-06-21)

### ⚠ BREAKING CHANGES

- vue2 support is over

- feat: waypoint bind/unbind

- feat: tag selection

- feat: export ts types

- fix: lib target

- chore: remove roadmap since it is done

- build: standard version

- docs: generally improved and vue2 refs

- build: release on tag push

- chore: license and private to false

- fix: aligned version

- docs: dev steps

- docs: move CSS helpers on top

CSS helpers will probably be the most used feature, so we move it to the top

- docs: CSS features list

- fix: remove impossible path

- feat: final decorations

### Features

- vue3 support ([#46](https://github.com/scaccogatto/vue-waypoint/issues/46)) ([2fe79ee](https://github.com/scaccogatto/vue-waypoint/commit/2fe79ee0e1c30bc314b5c66fc3eadbdbca536d4f))
