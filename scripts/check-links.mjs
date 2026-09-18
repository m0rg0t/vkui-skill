import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkedHosts = new Set([
  "code.visualstudio.com",
  "cursor.com",
  "developers.openai.com",
  "docs.anthropic.com",
  "github.com",
  "opencode.ai",
  "vkui.io",
]);

async function markdownFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const entryPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(entryPath)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(entryPath);
  }
  return files;
}

const urls = new Set();
for (const file of await markdownFiles(repositoryRoot)) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/https:\/\/[^\s)"<>]+/g)) {
    const value = match[0].replace(/[.,;:`]+$/, "");
    const url = new URL(value);
    if (!checkedHosts.has(url.hostname)) continue;
    if (url.hostname === "github.com" && url.pathname.startsWith("/m0rg0t/vkui-skill")) continue;
    urls.add(url.href);
  }
}

async function checkUrl(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "vkui-skill-link-check/1.0" },
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
      });

      if (response.status === 404 || response.status === 410) {
        throw new Error(`permanently broken (${response.status})`);
      }
      if (response.status >= 400 && ![401, 403, 429].includes(response.status)) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log(`ok ${response.status} ${url}`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolveDelay) => setTimeout(resolveDelay, 1_000 * attempt));
    }
  }
  throw new Error(`${url}: ${lastError?.message ?? "request failed"}`);
}

const results = await Promise.allSettled([...urls].sort().map((url) => checkUrl(url)));
const failures = results
  .filter((result) => result.status === "rejected")
  .map((result) => result.reason?.message ?? String(result.reason));

if (failures.length > 0) {
  console.error("Official link check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Checked ${urls.size} official links.`);
