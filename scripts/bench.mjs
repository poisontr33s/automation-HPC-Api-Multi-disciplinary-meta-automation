import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { writeFileSync, mkdirSync } from "node:fs";
import { performance } from "node:perf_hooks";
import os from "node:os";

const runtime = process.env.RUNTIME || (globalThis.Bun ? "bun" : "node");
const pm = process.env.PM || (process.env.npm_config_user_agent?.includes("pnpm") ? "pnpm" : "bun");
const tsMode = process.env.TS_MODE || "bundler";

const resultsDir = "results";
mkdirSync(resultsDir, { recursive: true });

async function main() {
  // start server
  const serverCmd = runtime === "bun" ? "bun" : "node";
  const child = spawn(serverCmd, ["dist/server.js"], {
    shell: process.platform === "win32",
    stdio: "inherit",
    env: { ...process.env, TS_MODE: tsMode, PORT: "3132" }
  });

  await delay(200);

  const t0 = performance.now();
  const res = await fetch("http://127.0.0.1:3132/api/health");
  const healthMs = performance.now() - t0;
  const ok = res.ok;

  const m0 = performance.now();
  let sum = 0;
  for (let i = 0; i < 200; i++) {
    const r = await fetch("http://127.0.0.1:3132/api/work?n=22");
    const j = await r.json();
    sum += j.result;
  }
  const microMs = performance.now() - m0;

  child.kill();

  const meta = {
    os: os.platform() + "-" + os.arch(),
    node: process.version,
    bun: globalThis.Bun ? Bun.version : "",
    runtime,
    packageManager: pm,
    tsMode,
    timestamps: new Date().toISOString()
  };

  const data = {
    meta,
    health: { ok, healthMs },
    micro: { requests: 200, ms: microMs }
  };

  const file = `${resultsDir}/${meta.os}-${runtime}-${pm}-${tsMode}.json`;
  writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`[bench] wrote ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});