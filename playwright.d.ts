import type { PlaywrightTestConfig, TestConfigWebServer } from '@playwright/test';
/**
 * `webServer` is merged over the base's own, which already has the command,
 * the url and the timeout - so a caller passes only what differs, such as the
 * `env` a base path is read from. Typed as the whole of Playwright's would
 * demand a command the base then throws away.
 */
export function playwrightConfig(
  options: { port: number; host?: string; base?: string } & Omit<PlaywrightTestConfig, 'webServer'> & {
    webServer?: Partial<TestConfigWebServer>;
  },
): PlaywrightTestConfig;
