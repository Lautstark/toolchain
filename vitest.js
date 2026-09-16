/**
 * The vitest configuration the Lautstark apps share.
 *
 *     // vitest.config.ts
 *     import { vitestConfig } from '@lautstark/toolchain/vitest';
 *     export default vitestConfig({ include: ['tests/unit/**\/*.test.ts'], setupFiles: ['./tests/unit/setup.ts'] });
 *
 * What is here is what every app had written for itself: a node environment
 * by default - the DOM comes in per file with `@vitest-environment jsdom`
 * where a test needs one - and mocks and stubbed globals put back between
 * tests, so one suite cannot leak into the next. An app passes its own
 * `include` and `setupFiles`; anything it passes wins over the default.
 *
 * vitest itself is a dependency of this package rather than of the app, which
 * is the point: the version is declared once, here, and Renovate moves it
 * once, here. 2026-09-16.
 */
import { defineConfig } from 'vitest/config';

/**
 * @param {import('vitest/config').ViteUserConfig['test']} [test]
 * @param {Omit<import('vitest/config').ViteUserConfig, 'test'>} [rest]
 */
export function vitestConfig(test = {}, rest = {}) {
  return defineConfig({
    ...rest,
    test: {
      environment: 'node',
      restoreMocks: true,
      unstubGlobals: true,
      ...test,
    },
  });
}
