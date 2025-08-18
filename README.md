# automation-HPC-Api-Multi-disciplinary-meta-automation

A repository made for the purpose, solely of managing APIs, cross-pollination of AI models, extensions, appa &amp; meta-automation of it.

## Combo Lab: Bun vs Node, pnpm vs bun, TS modes

This repository hosts a comparison lab for:
- Runtimes: Node (20/22) vs Bun (latest)
- Package managers: pnpm vs bun (npm intentionally excluded)
- TypeScript resolver modes: `bundler` vs `nodeNext`
- OS: Windows and Linux (via CI matrix)

## Quick start (local)

1. Choose your package manager:
   - pnpm:
     ```sh
     pnpm install
     ```
   - bun:
     ```sh
     bun install
     ```

2. Build with a TS mode:
   ```sh
   # bundler (default)
   TS_MODE=bundler pnpm build
   # or nodeNext
   TS_MODE=nodeNext pnpm build
   ```

3. Run the server:
   ```sh
   # Node
   pnpm start:node
   # Bun
   pnpm start:bun
   ```

4. Bench (writes JSON to ./results):
   ```sh
   # Use current runtime (node)
   pnpm bench
   # Or force bun
   pnpm bench:bun
   ```

5. Tests:
   - Node: `pnpm test:node`
   - Bun: `pnpm test:bun`

## CI

The workflow `compare-combos.yml` runs the full matrix and uploads benchmark JSON files as artifacts:
- OS: ubuntu, windows
- Runtime: node20, node22, bun
- PM: pnpm, bun
- TS mode: bundler, nodeNext

## Firebase (optional proto env)

- Configure `.firebaserc` with your project id.
- Start emulators: `pnpm firebase:emulators`
- This is separate from the server bench; it's for quick hosting prototyping.

## Security notes

- npm is intentionally not used. Prefer pnpm or bun.
- Separate lockfiles (`pnpm-lock.yaml`, `bun.lockb`) ensure reproducible installs per PM.
- Consider registry pinning and provenance if desired.

## Strategy (fast vs safe lanes)

- Local dev: Bun for speed; Node when debugging native addons.
- CI: Matrix validates both. Ship Node by default unless a service is certified on Bun.
- TS config: `bundler` for Bun/bundlers; `nodeNext` for pure-Node workflows.

## Extending

- Add GPU benchmarks later (CUDA via onnxruntime-node) behind a flag, plus WebGPU fallback.
- Integrate Google Jules by connecting this GitHub repo in Jules UI (no code changes required). Jules will open PRs with changes.
