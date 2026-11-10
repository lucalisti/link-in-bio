// Validates site/config.js before deploy. Run locally: node scripts/check-config.js
const fs = require("fs"), vm = require("vm"), path = require("path");
const file = path.join(__dirname, "..", "site", "config.js");
const errors = [], warnings = [];
const ctx = { window: {} };
try {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), ctx, { filename: "site/config.js" });
} catch (e) {
  console.error("✗ config.js has a syntax error (missing quote or comma?)\n\n" + e.stack.split("\n").slice(0, 4).join("\n"));
  process.exit(1);
}
const c = ctx.window.CONFIG;
if (!c) { console.error("✗ config.js must set window.CONFIG = { ... }"); process.exit(1); }

// Everything in site/ is public (including comments in config.js). Block private links from leaking.
const raw = fs.readFileSync(file, "utf8");
if (/docs\.google\.com|drive\.google\.com/.test(raw))
  errors.push("config.js contains a Google Docs/Drive link — everything in site/ is public, so the doc would be readable by anyone. Remove it (keep it in your notes instead).");

const siteDir = path.join(__dirname, "..", "site");
const ICONS = ["mail", "instagram", "youtube", "tiktok", "strava"];
const fileExists = f => fs.existsSync(path.join(siteDir, f));

for (const k of ["name", "bio"]) if (typeof c[k] !== "string" || !c[k].trim()) errors.push(`"${k}" is missing or empty`);
if (c.photo && !fileExists(c.photo)) errors.push(`photo "${c.photo}" not found in site/`);

(c.socials || []).forEach((s, i) => {
  if (!ICONS.includes(s.icon)) errors.push(`social #${i + 1} icon must be one of: ${ICONS.join(", ")}`);
  if (!/^(https:\/\/|mailto:)/.test(s.href || "")) errors.push(`social "${s.icon}" href must start with https:// or mailto:`);
  if (String(s.href).includes("YOUR_")) warnings.push(`social "${s.icon}" is still a placeholder (hidden on the site)`);
});

if (!Array.isArray(c.links) || !c.links.length) errors.push(`"links" needs at least one link`);
(c.links || []).forEach((l, i) => {
  if (!l.title) errors.push(`link #${i + 1} has no title`);
  if (!/^https:\/\//.test(l.href || "")) errors.push(`link "${l.title || i + 1}" href must start with https://`);
  if (String(l.href).includes("YOUR_")) warnings.push(`link "${l.title}" is still a placeholder (hidden on the site)`);
  if (l.icon && !ICONS.includes(l.icon)) errors.push(`link "${l.title}" icon must be one of: ${ICONS.join(", ")}`);
  if (l.image && !fileExists(l.image)) errors.push(`link "${l.title}" image "${l.image}" not found in site/`);
});
let prev = 0;
(c.races || []).forEach(r => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date || "") || isNaN(new Date(r.date))) return errors.push(`race "${r.name}" date must look like 2027-04-25`);
  const t = +new Date(r.date);
  if (t < prev) warnings.push(`race "${r.name}" is out of order (list soonest first)`);
  prev = t;
  if (r.approx) warnings.push(`race "${r.name}" date is approximate`);
});

warnings.forEach(w => console.log("⚠ " + w));
if (errors.length) { errors.forEach(e => console.error("✗ " + e)); process.exit(1); }
console.log(`✓ config.js OK — ${(c.socials || []).length} icons, ${c.links.length} links, ${(c.races || []).length} races`);
