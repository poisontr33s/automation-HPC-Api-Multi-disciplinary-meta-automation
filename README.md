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
=======
A repository for managing APIs, cross-pollination of AI models, extensions, apps & meta-automation of it.

## Overview

This repository provides a structured starting point for a system that handles API management, AI model integration, and other automation tasks. It is designed to be modular and extensible.

## Repository Structure

The repository is organized as follows:

- `src/`: Contains the main source code.
  - `src/api/`: Code for interacting with or implementing APIs.
  - `src/models/`: Code related to AI models.
  - `src/extensions/`: Code for extensions to the core functionality.
- `config/`: Contains configuration files.
  - `config/config.json`: The main configuration file.
- `requirements.txt`: Python dependencies.
- `AGENTS.md`: Instructions for AI agents working on this repository.

## Getting Started

### Prerequisites

- Python 3.8+

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/automation-HPC-Api-Multi-disciplinary-meta-automation.git
    cd automation-HPC-Api-Multi-disciplinary-meta-automation
    ```

2.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Configuration

1.  Open `config/config.json` and replace the placeholder API keys with your actual keys.
2.  For sensitive data, it is recommended to use environment variables instead of hardcoding values in the configuration file.

## Usage

(Usage instructions will be added as the project develops.)
main
