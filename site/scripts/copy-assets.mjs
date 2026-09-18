import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(siteRoot, "..", "skills", "vkui", "assets", "q-mascot.png");
const target = resolve(siteRoot, "public", "q-mascot.png");

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
console.log("Prepared Q mascot for the site.");
