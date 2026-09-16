# Releasing

The same flow as every package in the family — `@lautstark/sicherung`'s
RELEASING.md has it in full. On a push to `main`, `.github/workflows/release.yml`
runs the gate and semantic-release decides from the commit subjects: `fix:`
(including a Renovate `fix(deps):` bump of one of the four dependencies) is a
patch, `feat:` a minor, `feat!:` a major. There is no build and no tag by hand.

What is particular here: a **patch of this package is a toolchain bump for
every app**. That is intended, and it is safe for the reason every automerge
in the family is safe — each app's own tests run on the branch Renovate
pushes, and the branch merges only when they pass.
