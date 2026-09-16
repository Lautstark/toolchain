import type { ViteUserConfig } from 'vitest/config';
export function vitestConfig(
  test?: ViteUserConfig['test'],
  rest?: Omit<ViteUserConfig, 'test'>,
): ViteUserConfig;
