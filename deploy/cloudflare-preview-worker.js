// Cloudflare Worker for the shareable preview: serves the static `next build` export
// from the build branch on GitHub, with correct content types and edge caching.
// Used while the Cloudflare connection can't upload static assets directly; the
// long-term deploy is `npm run deploy:cloudflare` (wrangler, static assets).
const ORIGIN =
  "https://raw.githubusercontent.com/k3shavgupta/petorose-site/refs/heads/hoplite/polyrhen-2f681c2e--cf-site";

const TYPES = {
  html: "text/html; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  mp4: "video/mp4",
  vtt: "text/vtt; charset=utf-8",
  pdf: "application/pdf",
  woff2: "font/woff2",
  ttf: "font/ttf",
};

const upstream = (path, init) =>
  fetch(ORIGIN + path.split("/").map(encodeURIComponent).join("/"), {
    ...init,
    cf: { cacheTtl: 300, cacheEverything: true },
  });

const worker = {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });

    let path = decodeURIComponent(url.pathname);
    if (path.includes("..")) return new Response("Bad request", { status: 400 });
    if (path === "/") return Response.redirect(`${url.origin}/design-preview/`, 302);
    if (path.endsWith("/")) path += "index.html";
    else if (!/\.[a-z0-9]+$/i.test(path)) return Response.redirect(`${url.origin}${url.pathname}/${url.search}`, 308);

    const range = request.headers.get("range");
    let res = await upstream(path, range ? { headers: { range } } : {});
    let status = res.status;
    if (status === 404) {
      res = await upstream("/404.html");
      status = 404;
      path = "/404.html";
    }

    const ext = path.split(".").pop().toLowerCase();
    const headers = new Headers();
    headers.set("content-type", TYPES[ext] ?? "application/octet-stream");
    // fetch() hands back a decoded body, so an upstream content-length is only valid when nothing was encoded.
    const encoded = res.headers.has("content-encoding");
    for (const h of [encoded ? null : "content-length", "content-range", "accept-ranges", "etag"]) {
      const v = h && res.headers.get(h);
      if (v) headers.set(h, v);
    }
    headers.set("x-content-type-options", "nosniff");
    headers.set("referrer-policy", "strict-origin-when-cross-origin");
    headers.set(
      "cache-control",
      path.startsWith("/_next/static/") || path.startsWith("/_img/") ? "public, max-age=31536000, immutable" : "public, max-age=300",
    );
    return new Response(request.method === "HEAD" ? null : res.body, { status, headers });
  },
};

export default worker;
