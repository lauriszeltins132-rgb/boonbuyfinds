/**
 * Strategic-page regression check against `next start`.
 * Fails the build if invite intent collapses into coupons, a hub is
 * noindex, or a redirect/query URL enters the sitemap.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const PORT = process.env.SEO_TEST_PORT || "3456";
const BASE = `http://127.0.0.1:${PORT}`;
const ORIGIN = "https://boonbuyfinds.net";

const PAGES = [
  "/",
  "/boonbuy-spreadsheet",
  "/boonbuy-coupons",
  "/boonbuy-invite-code",
  "/boonbuy-finds",
  "/boonbuy-qc",
  "/boonbuy-stats",
];

const SITEMAP_REQUIRED = PAGES;
const SITEMAP_FORBIDDEN = [
  "/boonbuy-referral-code",
  "/boonbuy-invite",
  "/boonbuy-invitation",
  "/boonbuy-invitation-code",
  "/boonbuy-referral",
  "/invite",
  "/invite-code",
  "/invitation",
  "/invitation-code",
  "/referral",
  "/referral-code",
  "/coupon",
  "/coupons",
];

const INVITE_REDIRECTS = [
  "/boonbuy-referral-code",
  "/boonbuy-invite",
  "/boonbuy-invitation",
  "/boonbuy-invitation-code",
  "/boonbuy-referral",
  "/invite",
  "/invite-code",
  "/referral",
  "/referral-code",
];

const COUPON_REDIRECTS = ["/coupon", "/coupons"];

const failures = [];

function fail(message) {
  failures.push(message);
}

function stripStyles(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "");
}

function textOf(html, pattern) {
  const match = html.match(pattern);
  if (!match) return "";
  return match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function canonicalPath(value) {
  if (!value) return "";
  try {
    const url = new URL(value, ORIGIN);
    if (url.origin !== ORIGIN) return url.href;
    const path = url.pathname.replace(/\/$/, "");
    return path || "/";
  } catch {
    return value;
  }
}

function locationPath(header) {
  if (!header) return "";
  try {
    const url = new URL(header, BASE);
    const path = url.pathname.replace(/\/$/, "");
    return path || "/";
  } catch {
    return header.split("?")[0];
  }
}

async function fetchManual(path, headers) {
  return fetch(`${BASE}${path}`, { redirect: "manual", headers });
}

async function checkPage(path) {
  const response = await fetchManual(path);
  if (response.status !== 200) {
    fail(`${path} status ${response.status}, expected 200`);
    return;
  }
  const html = await response.text();
  const visible = stripStyles(html);
  const title = textOf(html, /<title>([\s\S]*?)<\/title>/i);
  const h1 = textOf(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/i)?.[1] ?? "";
  const robots = html.match(/name="robots" content="([^"]+)"/i)?.[1] ?? "";

  if (!title) fail(`${path} missing title`);
  if (!h1) fail(`${path} missing H1`);
  if (/noindex/i.test(robots) || /noindex/i.test(html)) {
    fail(`${path} is noindex`);
  }
  const expected = path === "/" ? "/" : path;
  if (canonicalPath(canonical) !== expected) {
    fail(`${path} canonical ${canonical || "missing"}`);
  }
  if (visible.includes("45%")) fail(`${path} contains a 45% claim`);
  if (visible.includes("This page hit a temporary error")) {
    fail(`${path} rendered the error fallback`);
  }
  return { title, h1, html: visible };
}

async function checkRedirect(path, destination, headers) {
  const response = await fetchManual(path, headers);
  const loc = locationPath(response.headers.get("location"));
  if (response.status !== 308 && response.status !== 301) {
    fail(`${path} status ${response.status}, expected a permanent redirect`);
    return;
  }
  if (loc !== destination) {
    fail(`${path} redirects to ${loc || "nowhere"}, expected ${destination}`);
  }
}

async function checkSitemap() {
  const response = await fetchManual("/sitemap.xml");
  if (response.status !== 200) {
    fail(`sitemap status ${response.status}`);
    return;
  }
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const paths = new Set(locs.map((loc) => canonicalPath(loc)));

  for (const path of SITEMAP_REQUIRED) {
    if (!paths.has(path)) fail(`sitemap missing ${path}`);
  }
  for (const path of SITEMAP_FORBIDDEN) {
    if (paths.has(path)) fail(`sitemap includes redirect alias ${path}`);
  }
  const queryUrl = locs.find((loc) => loc.includes("?"));
  if (queryUrl) fail(`sitemap includes query URL ${queryUrl}`);
}

async function checkProductAvailability() {
  const home = await fetchManual("/");
  const html = await home.text();
  const href = html.match(/href="(\/find\/[^"#?]+)"/)?.[1];
  if (!href) {
    fail("homepage has no product link to check Product JSON-LD");
    return;
  }
  const response = await fetchManual(href);
  if (response.status !== 200) {
    fail(`${href} status ${response.status}`);
    return;
  }
  const page = await response.text();
  const blocks = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const product = blocks
    .map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    })
    .find((data) => data && data["@type"] === "Product");
  if (!product) {
    fail(`${href} missing Product JSON-LD`);
    return;
  }
  const offer = product.offers;
  if (offer && (offer.availability || offer.seller || offer.shippingDetails)) {
    fail(`${href} Product offer includes availability, seller, or shipping`);
  }
  if (page.includes("schema.org/InStock")) {
    fail(`${href} Product markup claims InStock`);
  }
}

async function main() {
  if (!existsSync(".next/BUILD_ID")) {
    console.error("seo-regression: .next build is missing. Run npm run build first.");
    process.exit(1);
  }

  const server = spawn("node_modules/.bin/next", ["start", "-p", PORT], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });
  let logs = "";
  server.stdout.on("data", (chunk) => {
    logs = (logs + chunk.toString()).slice(-4000);
  });
  server.stderr.on("data", (chunk) => {
    logs = (logs + chunk.toString()).slice(-4000);
  });

  const stop = () => {
    if (!server.killed) server.kill("SIGTERM");
  };

  try {
    const deadline = Date.now() + 60_000;
    let ready = false;
    while (Date.now() < deadline) {
      if (server.exitCode != null) break;
      try {
        const probe = await fetch(`${BASE}/`, { redirect: "manual" });
        if (probe.status > 0) {
          ready = true;
          break;
        }
      } catch {
        // Server is still binding the port.
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    if (!ready) {
      console.error(logs);
      throw new Error("next start did not accept connections");
    }

    const pages = new Map();
    for (const path of PAGES) {
      pages.set(path, await checkPage(path));
    }

    const invite = pages.get("/boonbuy-invite-code");
    const coupons = pages.get("/boonbuy-coupons");
    if (invite) {
      if (!invite.html.includes("JOINUP")) fail("/boonbuy-invite-code missing JOINUP");
      if (invite.h1 && coupons?.h1 && invite.h1 === coupons.h1) {
        fail("invite and coupon H1s are identical");
      }
    }

    for (const path of INVITE_REDIRECTS) {
      await checkRedirect(path, "/boonbuy-invite-code");
    }
    for (const path of COUPON_REDIRECTS) {
      await checkRedirect(path, "/boonbuy-coupons");
    }
    await checkRedirect("/invite", "/boonbuy-invite-code", { host: "boonbuys.com" });
    await checkRedirect("/referral-code", "/boonbuy-invite-code", { host: "boonbuys.com" });
    await checkRedirect("/coupon", "/boonbuy-coupons", { host: "boonbuys.com" });
    await checkRedirect("/coupons", "/boonbuy-coupons", { host: "boonbuys.com" });

    await checkSitemap();
    await checkProductAvailability();
  } finally {
    stop();
  }

  if (failures.length) {
    console.error(`seo-regression: ${failures.length} failure(s)`);
    for (const message of failures) console.error(`- ${message}`);
    process.exit(1);
  }
  console.log("seo-regression: strategic pages, redirects, sitemap, and product schema passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
