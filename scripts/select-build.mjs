import { execSync } from "node:child_process";

const mode = process.env.TS_MODE || "bundler";
if (mode !== "bundler" && mode !== "nodeNext") {
  console.error(`[build] Invalid TS_MODE=${mode}. Use bundler|nodeNext`);
  process.exit(2);
}
console.log(`[build] Using TS mode: ${mode}`);
execSync(`node ./node_modules/typescript/lib/tsc.js -p tsconfig.${mode}.json`, {
  stdio: "inherit"
});