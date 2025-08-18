import test from "node:test";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import server from "../../dist/server.js";

async function get(addr: any, path: string) {
  const url = `http://127.0.0.1:${addr.port}${path}`;
  const res = await fetch(url);
  return res;
}

test("server responds to /api/health (node)", async () => {
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address();
  assert.ok(addr && typeof addr === "object");

  const res = await get(addr, "/api/health");
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.ok, true);

  server.close();
  await delay(10);
});