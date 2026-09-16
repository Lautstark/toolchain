import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { playwrightConfig } from '../playwright.js';
import { vitestConfig } from '../vitest.js';

/* This suite runs under the vitest this package depends on, which is the
 * first thing it proves: the runner an app inherits from here starts. */

describe('the vitest base', () => {
  it('is node by default, and what an app passes wins', () => {
    const base = vitestConfig();
    expect(base.test?.environment).toBe('node');
    expect(base.test?.restoreMocks).toBe(true);
    const own = vitestConfig({ environment: 'jsdom', include: ['x/**'] });
    expect(own.test?.environment).toBe('jsdom');
    expect(own.test?.include).toEqual(['x/**']);
    expect(own.test?.restoreMocks).toBe(true);
  });
});

describe('the playwright base', () => {
  it('serves the built page on the port it is given, split desktop from mobile', () => {
    const c = playwrightConfig({ port: 4174 });
    expect(c.use?.baseURL).toBe('http://localhost:4174/');
    expect(c.webServer).toMatchObject({ command: expect.stringContaining('--port 4174 --strictPort') });
    expect(c.projects?.map((p) => p.name)).toEqual(['desktop', 'mobile']);
    expect(c.use?.locale).toBe('de-DE');
  });

  it('merges what an app passes one level deep', () => {
    const c = playwrightConfig({ port: 4175, host: '127.0.0.1', use: { colorScheme: 'light' }, retries: 0 });
    expect(c.use?.colorScheme).toBe('light');
    expect(c.use?.locale).toBe('de-DE');
    expect(c.use?.baseURL).toBe('http://127.0.0.1:4175/');
    expect(c.retries).toBe(0);
  });
});

describe('the versions', () => {
  it('are the four the family builds with, declared as dependencies and nothing else', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    expect(Object.keys(pkg.dependencies).sort()).toEqual(['@playwright/test', 'typescript', 'vite', 'vitest']);
  });
});
