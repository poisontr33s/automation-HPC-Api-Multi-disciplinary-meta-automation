import { test, expect } from "bun:test";
import server from "../../dist/server.js";

test("server responds to /api/health (bun)", async () => {
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address();
  if (!addr || typeof addr !== "object") throw new Error("no address");

  const url = `http://127.0.0.1:${addr.port}/api/health`;
  const res = await fetch(url);
  expect(res.status).toBe(200);
  const json = await res.json();
  expect(json.ok).toBe(true);

  server.close();
});