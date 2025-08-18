import http from "node:http";

// Tiny server using Node's HTTP API (Bun emulates this).
// Returns JSON and performs a little CPU work to simulate load.

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

const server = http.createServer((req, res) => {
  const url = req.url || "/";
  if (url.startsWith("/api/health")) {
    const body = JSON.stringify({
      ok: true,
      runtime: (globalThis as any).Bun ? "bun" : "node",
      node: process.version,
      tsMode: process.env.TS_MODE || ""
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(body);
    return;
  }

  if (url.startsWith("/api/work")) {
    const n = Number(new URL(req.url ?? "/", "http://localhost").searchParams.get("n") ?? "20");
    const result = fib(Math.min(n, 25));
    const body = JSON.stringify({ ok: true, result });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(body);
    return;
  }

  res.writeHead(200, { "content-type": "text/plain" });
  res.end("OK");
});

const port = Number(process.env.PORT) || 3131;

if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(port, () => {
    console.log(`[server] listening on http://localhost:${port}`);
  });
}

export default server;