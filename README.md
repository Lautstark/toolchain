# @lautstark/toolchain

The versions of vite, vitest, typescript and Playwright the Lautstark apps
build and test with, and the configuration they share — declared once, here,
so the apps cannot drift apart.

Until 2026-09-16 each app pinned the four itself, and they had: vite 6 beside
vite 8, vitest 2 beside 4. Two of those were held back by a real reason
(`vite-node` in a Python harness) and the other two by nobody looking. This
package is the "nobody looking" half: an app that extends it has whatever
version this package declares, and Renovate moves the version *here*, once,
as a `fix(deps):` that ships as a patch and reaches every app through the
family's shared-packages rule.

## Use

```
npm install -D @lautstark/toolchain
```

and drop `vite`, `vitest`, `typescript` and `@playwright/test` from your own
`devDependencies`: they arrive through this package, and their binaries land
in `node_modules/.bin` the same as before.

```jsonc
// tsconfig.json
{ "extends": "@lautstark/toolchain/tsconfig.json", "compilerOptions": { "types": ["vite/client", "node"] }, "include": ["src", "tests", "e2e"] }
```

```ts
// vitest.config.ts
import { vitestConfig } from '@lautstark/toolchain/vitest';
export default vitestConfig({ include: ['tests/unit/**/*.test.ts'], setupFiles: ['./tests/unit/setup.ts'] });
```

```ts
// playwright.config.ts
import { playwrightConfig } from '@lautstark/toolchain/playwright';
export default playwrightConfig({ port: 4174 });
```

Anything an app passes wins over the default, one level deep. What is *not*
here is deliberate: a `vite.config.ts` is product identity — plugins, entry
points, the base path — and stays with the product.

## Releasing

Like every package in the family: from the commit subjects, on push to
`main`, by CI. A dependency bump is `fix(deps):` and a patch; a change to one
of the shared configs that an app has to react to is `feat!:`. See
`@lautstark/sicherung`'s RELEASING.md for the flow and the one-time account
setup, which are the same here.
