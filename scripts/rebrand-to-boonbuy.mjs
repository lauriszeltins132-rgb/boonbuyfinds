#!/usr/bin/env node
/**
 * Rebrand BoonBuy Finds fork → BoonBuy Finds
 * Run from project root: node scripts/rebrand-to-boonbuy.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "processed",
]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".md",
  ".css",
  ".html",
  ".webmanifest",
  ".svg",
  ".txt",
]);

const CONTENT_REPLACEMENTS = [
  ["https://boonbuyfinds.net", "https://boonbuyfinds.net"],
  ["boonbuyfinds.net", "boonbuyfinds.net"],
  ["hello@boonbuyfinds.net", "hello@boonbuyfinds.net"],
  ["BoonBuy Finds", "BoonBuy Finds"],
  ["BOONBUY_", "BOONBUY_"],
  ["BoonBuyMember", "BoonBuyMember"],
  ["BoonBuyMicro", "BoonBuyMicro"],
  ["NewToBoonBuy", "NewToBoonBuy"],
  ["HomepageWhyBoonBuy", "HomepageWhyBoonBuy"],
  ["HomepageBoonBuyResources", "HomepageBoonBuyResources"],
  ["boonbuy-seo-guides", "boonbuy-seo-guides"],
  ["BoonBuy", "BoonBuy"],
  ["https://boonbuy.com", "https://boonbuy.com"],
  ["boonbuy.com", "boonbuy.com"],
  ["inviteCode=BOONFINDS", "inviteCode=32IJIHM6P"],
  ["boonbuyfinds", "boonbuyfinds"],
  ["boonbuy", "boonbuy"],
];

function shouldSkipDir(name) {
  return SKIP_DIRS.has(name);
}

function walkDirs(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".well-known") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      callback(full, entry.name, true);
      walkDirs(full, callback);
    } else {
      callback(full, entry.name, false);
    }
  }
}

function renamePaths() {
  const renames = [];

  walkDirs(ROOT, (full, name, isDir) => {
    const lower = name.toLowerCase();
    if (!lower.includes("boonbuy")) return;
    const newName = name
      .replace(/BoonBuy/g, "BoonBuy")
      .replace(/boonbuy/g, "boonbuy")
      .replace(/LITBUY/g, "BOONBUY");
    if (newName === name) return;
    renames.push({ from: full, to: path.join(path.dirname(full), newName), isDir });
  });

  renames.sort((a, b) => b.from.length - a.from.length);

  for (const { from, to } of renames) {
    if (!fs.existsSync(from)) continue;
    if (fs.existsSync(to)) {
      console.warn("skip rename (exists):", to);
      continue;
    }
    fs.renameSync(from, to);
    console.log("renamed:", path.relative(ROOT, from), "→", path.relative(ROOT, to));
  }
}

function replaceContent(filePath) {
  const ext = path.extname(filePath);
  if (!TEXT_EXTENSIONS.has(ext)) return;

  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  for (const [from, to] of CONTENT_REPLACEMENTS) {
    content = content.split(from).join(to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("updated:", path.relative(ROOT, filePath));
  }
}

function patchSiteConfig() {
  const sitePath = path.join(ROOT, "src/lib/site.ts");
  fs.writeFileSync(
    sitePath,
    `export const SITE_URL = "https://boonbuyfinds.net";

/** Alternate marketing domain — redirect configured in next.config.ts */
export const SITE_ALT_URL = "https://boonbuys.com";
`
  );

  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = "boonbuyfinds";
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

function patchAgents() {
  const agentsPath = path.join(ROOT, "src/lib/agents.ts");
  let content = fs.readFileSync(agentsPath, "utf8");

  // Ensure boonbuy is the only recommended agent with affiliate links from catalog
  content = content.replace(
    /if \(agent\.affiliateEnabled && \/boonbuy\\.com\/i\.test\(affiliateLink\)\)/,
    "if (agent.affiliateEnabled && /boonbuy\\.com/i.test(affiliateLink))"
  );

  fs.writeFileSync(agentsPath, content);
}

function patchNextConfig() {
  const configPath = path.join(ROOT, "next.config.ts");
  let content = fs.readFileSync(configPath, "utf8");

  if (!content.includes("boonbuys.com")) {
    const insert = `      {
        source: "/:path*",
        has: [{ type: "host", value: "boonbuys.com" }],
        destination: "https://boonbuyfinds.net/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.boonbuys.com" }],
        destination: "https://boonbuyfinds.net/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.boonbuyfinds.net" }],
        destination: "https://boonbuyfinds.net/:path*",
        permanent: true,
      },
`;

    content = content.replace(
      "async redirects() {\n    return [",
      `async redirects() {\n    return [\n${insert}`
    );
    fs.writeFileSync(configPath, content);
    console.log("patched next.config.ts with domain redirects");
  }
}

function copyAgentLogo() {
  const boonbuyLogo = path.join(ROOT, "public/agents/boonbuy.png");
  const boonbuyLogo = path.join(ROOT, "public/agents/boonbuy.png");
  if (fs.existsSync(boonbuyLogo) && !fs.existsSync(boonbuyLogo)) {
    fs.copyFileSync(boonbuyLogo, boonbuyLogo);
    console.log("copied agent logo placeholder");
  }
}

function writeReadme() {
  const readme = [
    "# BoonBuy Finds",
    "",
    "Independent finds catalog for **BoonBuy** — cloned from the BoonBuy Finds stack with BoonBuy branding, domains, and agent links.",
    "",
    "## Domains",
    "",
    "- **Primary:** https://boonbuyfinds.net",
    "- **Redirect:** https://boonbuys.com → boonbuyfinds.net",
    "",
    "## Agent",
    "",
    "- Recommended agent: **BoonBuy** (https://boonbuy.com)",
    "- Update BOONBUY_SIGNUP_URL in src/lib/constants.ts when you have a referral code",
    "",
    "## Develop",
    "",
    "npm install && npm run dev",
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, "README.md"), `${readme}\n`);
}

console.log("=== BoonBuy rebrand ===\n");

renamePaths();

walkDirs(ROOT, (full, _name, isDir) => {
  if (!isDir) replaceContent(full);
});

patchSiteConfig();
patchAgents();
patchNextConfig();
copyAgentLogo();
writeReadme();

console.log("\n=== Rebrand complete ===");
