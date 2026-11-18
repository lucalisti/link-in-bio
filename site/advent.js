/* December challenge calendar. All content lives in config.js → advent; edit that, not this.
   Uses helpers from app.js ($, esc, ICONS, svg, LABELS, mkClock, setFlap), so it loads after it.

   Preview any day: add ?day=8 to the URL (Dec 8 at 2pm Chicago time). Add &time=17:58 to pick the time. */
(() => {
const A = CONFIG.advent;
if (!A || !A.start) return;

const TZ = A.timeZone || "America/Chicago";            // everyone sees the same day + drop time
const TOTAL = A.total || 24;
const [SY, SM, SD] = A.start.split("-").map(Number);
const [DH, DM] = String(A.dropTime || "18:00").split(":").map(Number);
const ok = u => typeof u === "string" && /^https:\/\//.test(u) && !u.includes("YOUR_");

/* A wall-clock time in TZ → the real moment (handles any viewer's time zone). */
function zoned(y, mo, d, h = 0, mi = 0) {
  const guess = Date.UTC(y, mo - 1, d, h, mi), p = {};
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
    .formatToParts(guess).forEach(x => { p[x.type] = x.value; });
  return guess - (Date.UTC(+p.year, p.month - 1, +p.day, +p.hour % 24, +p.minute) - guess);
}
const dayStart = n => zoned(SY, SM, SD + n - 1);
const dropAt = n => zoned(SY, SM, SD + n - 1, DH, DM);
const endAt = zoned(SY, 13, 1);                         // Jan 1 → calendar goes away

/* Preview mode: freeze the clock at ?day=N &time=HH:MM (Chicago), then let it tick. */
const q = new URLSearchParams(location.search);
const preview = q.has("day");
let offset = 0;
if (preview) {
  const [th, tm] = (q.get("time") || "14:00").split(":").map(Number);
  offset = zoned(SY, SM, SD + (parseInt(q.get("day"), 10) || 0) - 1, th || 0, tm || 0) - Date.now();
}
const now = () => Date.now() + offset;
const dayOf = t => Math.floor((t - dayStart(1)) / 864e5) + 1;   // 1 = Dec 1 … (≤0 = not started)

/* Small icons */
const SNOW = '<svg class="snow" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5M9.3 4.3 12 6.6l2.7-2.3M9.3 19.7 12 17.4l2.7 2.3M4.6 10.3l3.3-1.2-.6-3.5M19.4 13.7l-3.3 1.2.6 3.5M4.6 13.7l3.3 1.2-.6 3.5M19.4 10.3l-3.3-1.2.6-3.5"/></svg>';
const BOW = '<svg class="bow" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 12C9.6 8.2 4.4 6.3 3.4 8.6 2.5 10.8 6.8 12.6 12 12zm0 0c2.4-3.8 7.6-5.7 8.6-3.4.9 2.2-3.4 4-8.6 3.4zm-1 .4-3 5.6 2.4-.6.9 2.2 1.2-6.8zm2 0 3 5.6-2.4-.6-.9 2.2-1.2-6.8z"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/></svg>';
const STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.7 5.9 6.4.7-4.8 4.3 1.4 6.3L12 16.8 6.3 20l1.4-6.3-4.8-4.3 6.4-.7z"/></svg>';
const PLATFORMS = [["ig", "instagram"], ["yt", "youtube"], ["tt", "tiktok"]];

/* Remember which doors this viewer has already seen open (for the unwrap animation). */
const SEEN_KEY = "advent-seen-" + SY;
const readSeen = () => { try { return JSON.parse(localStorage.getItem(SEEN_KEY)) || null; } catch { return null; } };
const writeSeen = days => { try { localStorage.setItem(SEEN_KEY, JSON.stringify(days)); } catch {} };

const byDay = {};
(A.days || []).forEach(x => { if (x && x.title && x.day >= 1 && x.day <= TOTAL) byDay[x.day] = x; });

let shownDay = null, giftFlaps = null, giftState = null;

function build(today) {
  shownDay = today; giftFlaps = null; giftState = null;
  // A filled-in day only opens once its date arrives, so you can pre-fill without spoiling it.
  const opened = Object.keys(byDay).map(Number).filter(n => n <= today).sort((a, b) => a - b);

  // Which doors unwrap: ones opened since this viewer's last visit (first visit: just the newest).
  const seen = preview ? null : readSeen();
  const fresh = new Set(seen ? opened.filter(n => !seen.includes(n)) : opened.slice(-1));
  if (!preview) writeSeen(opened);

  $("advent-title").innerHTML = SNOW + esc(A.title || "Advent Challenge");
  $("advent-sub").textContent =
    today < 1 ? `${TOTAL} days · starts ${new Date(dayStart(1)).toLocaleDateString("en-US", { timeZone: TZ, month: "short", day: "numeric" })}`
    : today > TOTAL ? `${opened.length} of ${TOTAL} done`
    : `Day ${today} of ${TOTAL}`;

  $("doors").innerHTML = Array.from({ length: TOTAL }, (_, i) => {
    const n = i + 1, c = byDay[n];
    if (opened.includes(n)) {
      const isNew = fresh.has(n);
      return `<li class="door done${isNew ? " fresh" : ""}"><button type="button" data-day="${n}" aria-label="Day ${n}: ${esc(c.title)}${c.result ? ", " + esc(c.result) : ""}">`
        + `<span class="num">${n}</span><span class="ttl">${esc(c.title)}</span>${c.result ? `<span class="res">${esc(c.result)}</span>` : ""}</button>`
        + (isNew ? '<span class="paper" aria-hidden="true"><span class="lid l"></span><span class="lid r"></span></span>' : "")
        + "</li>";
    }
    if (n === today) return `<li class="door shut today" aria-label="Day ${n}: today's challenge, coming soon"><span class="num">${n}</span><span class="tag">Today</span>${BOW}<span class="clock mini" id="gift-clock" role="img"></span></li>`;
    if (n === TOTAL) return `<li class="door shut last" aria-label="Day ${n}: the finale, not revealed yet"><span class="num">${n}</span>${STAR}</li>`;
    return `<li class="door shut" aria-label="Day ${n}: not revealed yet"><span class="num">${n}</span><span class="q" aria-hidden="true">?</span></li>`;
  }).join("");

  // Opened doors flip in one after another (set from JS: the CSP blocks inline style attributes).
  document.querySelectorAll("#doors .done:not(.fresh)").forEach((li, i) => li.style.setProperty("--i", i));
  document.querySelectorAll("#doors .paper").forEach(p => p.addEventListener("animationend", e => { if (e.target.classList.contains("r")) p.remove(); }));

  if (ok(A.playlist)) { $("advent-all").href = A.playlist; $("advent-all").hidden = false; }
  if (ok(A.suggest)) { $("advent-suggest").href = A.suggest; $("advent-suggest").hidden = false; }
}

/* Today's gift counts down to the episode drop. */
function tickGift(t, today) {
  const el = document.getElementById("gift-clock");
  if (!el) return;
  const ms = dropAt(today) - t;
  if (ms <= 0) {
    if (giftState !== "soon") { giftState = "soon"; el.innerHTML = '<span class="soon">Dropping soon</span>'; el.setAttribute("aria-label", "Dropping soon"); }
    return;
  }
  if (giftState !== "clock") { giftState = "clock"; giftFlaps = mkClock(el, [[2, "h"], [2, "m"]]); }
  const mins = Math.ceil(ms / 6e4), h = Math.min(99, Math.floor(mins / 60)), m = mins % 60;
  const s = String(h).padStart(2, "0") + String(m).padStart(2, "0");
  giftFlaps.forEach((f, i) => setFlap(f, s[i], i * 60));
  el.setAttribute("aria-label", `Episode drops in ${h} hours ${m} minutes`);
}

function tick() {
  const t = now(), today = dayOf(t);
  const on = preview || (t >= dayStart(1) && t < endAt);
  $("advent").hidden = !on;
  if (!on) return;
  if (today !== shownDay) build(today);
  tickGift(t, today);
}

/* Episode card (tap an opened door) */
const sheet = $("sheet");
$("doors").addEventListener("click", e => {
  const b = e.target.closest("button[data-day]");
  if (!b) return;
  const n = +b.dataset.day, c = byDay[n];
  $("sheet-day").textContent = `Day ${n} of ${TOTAL}`;
  $("sheet-title").textContent = c.title;
  $("sheet-res").textContent = c.result || "";
  $("sheet-res").hidden = !c.result;
  const links = PLATFORMS.filter(([k]) => ok(c[k])).map(([k, icon]) => [c[k], icon, `Watch on ${LABELS[icon]}`]);
  if (ok(c.href)) links.push([c.href, null, "Watch the episode"]);
  $("sheet-links").innerHTML = links.map(([href, icon, label]) =>
    `<li><a href="${esc(href)}" target="_blank" rel="noopener">${icon ? `<span class="ic ${icon}">${svg(icon)}</span>` : '<span class="ic"></span>'}<span>${esc(label)}</span></a></li>`).join("")
    || '<li class="none">Episode link coming soon</li>';
  sheet.showModal();
});
$("sheet-x").addEventListener("click", () => sheet.close());
sheet.addEventListener("click", e => { if (e.target === sheet) sheet.close(); });   // tap outside the card

/* Light snowfall over the header (December only, off for reduced motion) */
function snowfall() {
  if (A.snow === false || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.className = "snowfall"; layer.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 28; i++) {
    const f = document.createElement("span");
    const r = Math.random;
    f.style.setProperty("--x", (r() * 100).toFixed(1) + "%");
    f.style.setProperty("--s", (2 + r() * 2.5).toFixed(1) + "px");
    f.style.setProperty("--dur", (9 + r() * 9).toFixed(1) + "s");
    f.style.setProperty("--delay", (-r() * 18).toFixed(1) + "s");
    f.style.setProperty("--dx", ((r() - .5) * 60).toFixed(0) + "px");
    f.style.setProperty("--o", (.35 + r() * .5).toFixed(2));
    layer.append(f);
  }
  document.body.prepend(layer);
}

tick();
if (!$("advent").hidden) snowfall();
setInterval(tick, 1000);
})();
