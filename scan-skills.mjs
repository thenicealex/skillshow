// scan-codex-skills.mjs
// Scans the three default skill directories on this machine and injects the
// extracted data into codex-skills-explorer.html so it shows them by default.
//
// Usage:  node scan-codex-skills.mjs
// Re-run any time your skills change to refresh the snapshot.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const HOME = os.homedir();
const DEFAULT_DIRS = [
  path.join(HOME, ".codex", "skills"),
  path.join(HOME, ".agent", "skills"),
  path.join(HOME, ".claude", "skills"),
];

// ---------- parsers (mirror the in-page logic) ----------
const stripQuotes = (v) => v.replace(/^["']|["']$/g, "");
function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  const re = /([A-Za-z0-9_-]+):\s*([\s\S]*?)(?=\n[A-Za-z0-9_-]+:|\n---|$)/g;
  let r;
  while ((r = re.exec(m[1])) !== null) fm[r[1].trim()] = stripQuotes(r[2].replace(/\s+/g, " ").trim());
  return fm;
}

function extractKeywords(text) {
  const sec = text.match(/#{1,4}\s*(triggers?|触发\w*)\b[\s\S]*?\n([\s\S]*?)(?=\n#{1,4}\s|$)/i);
  if (sec) {
    const list = sec[2].split("\n").map((s) => s.replace(/^[\s*>\-#]+/, "").trim()).filter(Boolean);
    if (list.length) return list.slice(0, 12);
  }
  const inline = text.match(/(?:triggers?|keywords?|触发[：:])\s*[:：]\s*(.+)/i);
  if (inline) {
    const parts = inline[1].split(/[，,、|]/).map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts.slice(0, 12);
  }
  const fm = parseFrontmatter(text);
  if (fm.keywords) {
    return fm.keywords.split(/[，,、]/).map((s) => s.trim()).filter(Boolean).slice(0, 12);
  }
  const noCode = text.replace(/```[\s\S]*?```/g, "");
  const tags = [...noCode.matchAll(/#([A-Za-z0-9_\u4e00-\u9fa5\-]+)/g)].map((m) => m[1]);
  if (tags.length) return [...new Set(tags)].slice(0, 12);
  return [];
}

function parseSkill(text, fallbackName) {
  const fm = parseFrontmatter(text);
  let name = (fm.name || "").trim() || fallbackName;
  let description = (fm.description || "").trim();
  if (!description) {
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (t && !t.startsWith("#") && !t.startsWith("---") && !t.startsWith("```")
          && !/^[A-Za-z0-9_-]+:/.test(t)) {
        description = t; break;
      }
    }
  }
  return { name, description, keywords: extractKeywords(text) };
}

// ---------- filesystem helpers ----------
function walk(dir) {
  const out = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile()) out.push(full);
  }
  return out;
}
const toTilde = (p) => (p.startsWith(HOME) ? "~" + p.slice(HOME.length) : p);

// ---------- scan ----------
const skills = [];
for (const root of DEFAULT_DIRS) {
  if (!fs.existsSync(root)) { console.log("· 跳过（不存在）:", toTilde(root)); continue; }
  const allFiles = walk(root);
  const skillMds = allFiles.filter((f) => path.basename(f) === "SKILL.md");
  for (const mdPath of skillMds) {
    const skillDir = path.dirname(mdPath);
    const folderName = path.basename(skillDir);
    let content = "";
    try { content = fs.readFileSync(mdPath, "utf8"); } catch { continue; }
    const parsed = parseSkill(content, folderName);
    const sub = allFiles.filter((f) => f === skillDir || f.startsWith(skillDir + path.sep));
    let size = 0, lastMod = 0, count = 0;
    for (const f of sub) {
      try {
        const st = fs.statSync(f);
        size += st.size; count++;
        if (st.mtimeMs > lastMod) lastMod = st.mtimeMs;
      } catch { /* ignore */ }
    }
    skills.push({
      dir: toTilde(skillDir),
      folderName,
      name: parsed.name,
      description: parsed.description,
      keywords: parsed.keywords,
      size,
      fileCount: count,
      lastModified: lastMod,
      content,
    });
  }
  console.log(`· 已扫描 ${toTilde(root)}`);
}

// ---------- inject into HTML ----------
const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "codex-skills-explorer.html");
let html = fs.readFileSync(htmlPath, "utf8");
const marker = /(<script id="embedded-skills"[^>]*>)([\s\S]*?)(<\/script>)/;
if (!marker.test(html)) {
  console.error("✗ 未在 HTML 中找到 embedded-skills 占位符");
  process.exit(1);
}
const json = JSON.stringify(skills).replace(/</g, "\\u003c"); // safe inside <script>
html = html.replace(marker, (_, open, __, close) => open + "\n" + json + "\n" + close);
fs.writeFileSync(htmlPath, html);
console.log(`\n✓ 共 ${skills.length} 个 skills 已写入 ${path.basename(htmlPath)}`);
