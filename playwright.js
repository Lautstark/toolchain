/**
 * The Playwright configuration the Lautstark apps share.
 *
 *     // playwright.config.ts
 *     import { playwrightConfig } from '@lautstark/toolchain/playwright';
 *     export default playwrightConfig({ port: 4174 });
 *
 * What is here is what bildhaft, mitreden and vorlaut-editor had each written
 * for themselves with a different port number: the built page served by
 * `vite preview` on a strict port, a desktop project and a mobile one (Pixel
 * 7) split by the spec's file name, one retry on CI and none at a desk, the
 * GitHub reporter on CI, a trace on the first retry, German as the locale.
 *
 * An app passes its port and, where it differs, the rest: `use`, `projects`,
 * `webServer` and anything else Playwright accepts are merged over these
 * defaults one level deep, so `{ use: { colorScheme: 'light' } }` keeps the
 * locale and the trace setting. 2026-09-16.
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * @param {{ port: number, host?: string, base?: string } & import('@playwright/test').PlaywrightTestConfig} options
 */
export function playwrightConfig({ port, host = 'localhost', base = '/', ...over }) {
  const origin = `http://${host}:${port}`;
  const ci = !!process.env.CI;
  return defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: ci,
    retries: ci ? 1 : 0,
    workers: ci ? 2 : undefined,
    reporter: ci ? [['github'], ['list']] : [['list']],
    ...over,
    use: {
      baseURL: `${origin}${base}`,
      trace: 'on-first-retry',
      locale: 'de-DE',
      ...over.use,
    },
    projects: over.projects ?? [
      { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile\.spec\.ts/ },
      { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /mobile\.spec\.ts/ },
    ],
    webServer: {
      command: `npx vite preview --port ${port} --strictPort --host ${host}`,
      url: `${origin}${base}`,
      reuseExistingServer: !ci,
      timeout: 60_000,
      ...over.webServer,
    },
  });
}
