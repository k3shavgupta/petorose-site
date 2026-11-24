// Local harness: runs the Cloudflare preview Worker's fetch handler under Node for testing.
import http from "node:http";
import { Readable } from "node:stream";
import worker from "../deploy/cloudflare-preview-worker.js";

const port = Number(process.argv[2] ?? 4200);
http
  .createServer(async (req, res) => {
    const request = new Request(`http://localhost:${port}${req.url}`, { method: req.method, headers: req.headers });
    const response = await worker.fetch(request);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) Readable.fromWeb(response.body).pipe(res);
    else res.end();
  })
  .listen(port, () => console.log(`worker harness on :${port}`));
