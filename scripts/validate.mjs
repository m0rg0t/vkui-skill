import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const validatorPath = fileURLToPath(import.meta.url);
const repositoryRoot = resolve(dirname(validatorPath), "..");
const skillRoot = join(repositoryRoot, "skills", "vkui");
const failures = [];
const unfinishedMarker = new RegExp(`\\[(?:TO${"DO"})|(?:TO${"DO"}):|PLACE${"HOLDER"}`, "i");

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const entryPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    if (entry.isFile()) files.push(entryPath);
  }

  return files;
}

const requiredFiles = [
  join(repositoryRoot, "README.md"),
  join(repositoryRoot, "LICENSE"),
  join(skillRoot, "SKILL.md"),
  join(skillRoot, "agents", "openai.yaml"),
  join(skillRoot, "assets", "q-mascot.png"),
  join(skillRoot, "references", "official-sources.md"),
  join(skillRoot, "references", "mcp-setup.md"),
  join(skillRoot, "references", "migration.md"),
  join(repositoryRoot, "site", "package.json"),
  join(repositoryRoot, "site", "package-lock.json"),
  join(repositoryRoot, "site", "src", "App.jsx"),
  join(repositoryRoot, "site", "public", "favicon.svg"),
  join(repositoryRoot, ".github", "workflows", "pages.yml"),
];

for (const file of requiredFiles) {
  check(await exists(file), `Missing required file: ${relative(repositoryRoot, file)}`);
}

const skillText = await readFile(join(skillRoot, "SKILL.md"), "utf8");
const frontmatter = skillText.match(/^---\n([\s\S]*?)\n---/);
check(frontmatter, "SKILL.md must begin with YAML frontmatter");

if (frontmatter) {
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  check(name === "vkui", `Skill name must be vkui, received ${name ?? "nothing"}`);
  check(Boolean(description && description.length >= 80), "Skill description must be specific and non-empty");
  check(!description?.includes("TODO"), "Skill description still contains a placeholder");
}

const openaiYaml = await readFile(join(skillRoot, "agents", "openai.yaml"), "utf8");
check(openaiYaml.includes("$vkui"), "agents/openai.yaml default_prompt must mention $vkui");

for (const match of openaiYaml.matchAll(/^\s*icon_(?:small|large):\s*"([^"]+)"/gm)) {
  const iconPath = resolve(skillRoot, match[1]);
  check(await exists(iconPath), `Configured icon does not exist: ${match[1]}`);
}

const mascot = await readFile(join(skillRoot, "assets", "q-mascot.png"));
check(mascot.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", "Mascot must be a valid PNG");
check(mascot.length > 10_000, "Mascot PNG is unexpectedly small");

const repositoryFiles = await walk(repositoryRoot);
const textFiles = repositoryFiles.filter((file) => /\.(?:md|ya?ml|mjs|json|toml)$/i.test(file));

for (const file of textFiles) {
  const text = await readFile(file, "utf8");
  if (resolve(file) !== validatorPath) {
    check(!unfinishedMarker.test(text), `Scaffold marker found in ${relative(repositoryRoot, file)}`);
  }

  if (!file.endsWith(".md")) continue;

  const targets = [
    ...[...text.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]),
    ...[...text.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]),
  ];

  for (const target of targets) {
    if (/^(?:https?:|mailto:|data:|#)/.test(target)) continue;
    const pathPart = decodeURIComponent(target.split("#", 1)[0]);
    if (!pathPart) continue;
    const linkedPath = resolve(dirname(file), pathPart);
    check(
      await exists(linkedPath),
      `Broken local link in ${relative(repositoryRoot, file)}: ${target}`,
    );
  }
}

check(
  !(await exists(join(skillRoot, "references", "llms.txt"))),
  "Do not vendor a snapshot of VKUI llms.txt",
);

const readme = await readFile(join(repositoryRoot, "README.md"), "utf8");
check(
  readme.includes("npx skills add m0rg0t/vkui-skill --skill vkui"),
  "README must include the canonical Skills CLI install command",
);

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated VKUI skill (${repositoryFiles.length} repository files).`);
