import type { PlaywrightTestConfig } from '@playwright/test';
export function playwrightConfig(
  options: { port: number; host?: string; base?: string } & PlaywrightTestConfig,
): PlaywrightTestConfig;
