/* All content lives in config.js — edit that file, not this one. */
const CONFIG = window.CONFIG;
if (!CONFIG) {
  document.querySelector("main").innerHTML = '<p class="draft">config.js has a typo (or is missing). Check for a missing quote or comma near the line you last changed.</p>';
  throw new Error("CONFIG missing");
}

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const live = x => x && x.href && !String(x.href).includes("YOUR_");

/* ---- Icons (24×24) ---- */
const ICONS = {
  mail: '<path fill="currentColor" d="M2 6.5A1.5 1.5 0 0 1 3.5 5h17A1.5 1.5 0 0 1 22 6.5v.4l-10 6.2L2 6.9v-.4zm0 2.8v8.2A1.5 1.5 0 0 0 3.5 19h17a1.5 1.5 0 0 0 1.5-1.5V9.3l-10 6.2L2 9.3z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" stroke-width="2.1"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2.1"/><circle cx="17.4" cy="6.6" r="1.35" fill="currentColor"/>',
  youtube: '<path fill="currentColor" fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.1V8.9l5.3 3.1L10 15.1z"/>',
  tiktok: '<path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" transform="translate(2.4 2.4) scale(.8)"/>',
  strava: '<path fill="currentColor" d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>',
};
const LABELS = { mail: "Email", instagram: "Instagram", youtube: "YouTube", tiktok: "TikTok", strava: "Strava" };
const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

/* ---- Profile ---- */
$("name").textContent = CONFIG.name;
$("bio").textContent = CONFIG.bio || "";
if (CONFIG.photo) { $("avatar").src = CONFIG.photo; $("avatar").alt = CONFIG.name; $("avatar").hidden = false; }

$("socials").innerHTML = (CONFIG.socials || []).filter(live).map(s => {
  const ext = !s.href.startsWith("mailto:");
  return `<li><a href="${esc(s.href)}"${ext ? ' target="_blank" rel="noopener"' : ""} aria-label="${esc(LABELS[s.icon] || s.icon)}">${svg(s.icon)}</a></li>`;
}).join("");

/* ---- Link cards ---- */
$("links").innerHTML = (CONFIG.links || []).filter(live).map(l => {
  const thumb = l.image
    ? `<span class="thumb"><img src="${esc(l.image)}" alt=""></span>`
    : l.icon ? `<span class="thumb ${esc(l.icon)}">${svg(l.icon)}</span>` : `<span></span>`;
  return `<li><a href="${esc(l.href)}" target="_blank" rel="noopener">${thumb}<span class="t">${esc(l.title)}${l.sub ? `<span class="s">${esc(l.sub)}</span>` : ""}</span><span aria-hidden="true"></span></a></li>`;
}).join("");

/* ---- Flip tiles ---- */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const face = (half, v) => { half.firstChild.textContent = v; };
function mkFlap(v) {
  const f = document.createElement("span"); f.className = "flap"; f.setAttribute("aria-hidden", "true");
  f.innerHTML = '<span class="half t"><span></span></span><span class="half b"><span></span></span>';
  setFlap(f, v); return f;
}
function setFlap(f, v, delay = 0) {
  const old = f.dataset.v; if (old === v) return; f.dataset.v = v;
  const t = f.children[0], b = f.children[1];
  if (old === undefined || reduce) { face(t, v); face(b, v); return; }
  face(t, v);
  const ft = t.cloneNode(true); face(ft, old); ft.classList.add("ft"); ft.style.animationDelay = delay + "ms";
  const fb = b.cloneNode(true); face(fb, v); fb.classList.add("fb"); fb.style.animationDelay = (delay + 220) + "ms";
  f.append(ft, fb);
  fb.addEventListener("animationend", () => { face(b, v); ft.remove(); fb.remove(); }, { once: true });
}
/* A clock = groups of tiles, e.g. [[3,"d"],[2,"h"],[2,"m"]] */
function mkClock(el, spec) {
  el.innerHTML = "";
  const flaps = [];
  spec.forEach(([n, unit]) => {
    const g = document.createElement("span"); g.className = "grp";
    for (let i = 0; i < n; i++) { const f = mkFlap("0"); flaps.push(f); g.append(f); }
    g.insertAdjacentHTML("beforeend", `<span class="unit" aria-hidden="true">${unit}</span>`);
    el.append(g);
  });
  return flaps;
}

/* ---- Races ---- */
const races = (CONFIG.races || []).map(r => {
  const [y, m, d] = r.date.split("-").map(Number);
  const t = new Date(y, m - 1, d, r.hour ?? CONFIG.raceHour ?? 7);
  const when = (r.approx ? "~" : "") + t.toLocaleDateString("en-US", r.approx ? {month:"short", year:"numeric"} : {weekday:"short", month:"short", day:"numeric", year:"numeric"});
  return { ...r, t, when };
});
const parts = ms => { const mins = Math.floor(ms / 6e4); return { d: Math.floor(mins / 1440), h: Math.floor(mins / 60) % 24, m: mins % 60 }; };
const pad = (n, w) => String(Math.min(n, 10 ** w - 1)).padStart(w, "0");
const dayWidth = ms => Math.max(2, String(parts(ms).d).length);   // 2 tiles, or 3 when 100+ days out

let heroKey = null, heroFlaps = null, listKey = null, listRows = [];

function render(stagger) {
  const now = Date.now();
  const upcoming = races.filter(r => r.t - now > -12 * 36e5);   // keep race day visible until ~evening
  const hero = upcoming[0], later = upcoming.slice(1);

  /* Next race */
  $("next").hidden = !hero;
  if (hero) {
    const ms = hero.t - now, dw = dayWidth(ms);
    const hk = hero.name + "|" + (ms <= 0) + "|" + dw;
    if (heroKey !== hk) {
      heroKey = hk;
      $("next-name").textContent = hero.name;
      $("next-date").textContent = hero.when;
      heroFlaps = ms <= 0 ? null : mkClock($("next-clock"), [[dw, "d"], [2, "h"], [2, "m"]]);
      if (!heroFlaps) $("next-clock").innerHTML = '<span class="status">Race day</span>';
    }
    if (heroFlaps && stagger !== null) {
      const p = parts(ms), s = pad(p.d, dw) + pad(p.h, 2) + pad(p.m, 2);
      heroFlaps.forEach((f, i) => setFlap(f, s[i], stagger ? i * 60 : 0));
      $("next-clock").setAttribute("aria-label", `${p.d} days, ${p.h} hours, ${p.m} minutes to go`);
    }
  }

  /* Later races */
  $("later-wrap").hidden = !later.length;
  const key = later.map(r => r.name).join("|");
  if (key !== listKey) {
    listKey = key;
    $("races").innerHTML = "";
    listRows = later.map(r => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="n">${esc(r.name)}<span class="d">${esc(r.when)}</span></span><span class="clock" role="img"></span>`;
      $("races").append(li);
      const clock = li.querySelector(".clock"), dw = dayWidth(r.t - now);
      return { r, clock, dw, flaps: mkClock(clock, [[dw, "d"], [2, "h"]]) };
    });
  }
  if (stagger !== null) listRows.forEach((row, ri) => {
    const dw = dayWidth(row.r.t - now);
    if (dw !== row.dw) { row.dw = dw; row.flaps = mkClock(row.clock, [[dw, "d"], [2, "h"]]); }  // e.g. 100 → 99 days
    const p = parts(row.r.t - now), s = pad(p.d, dw) + pad(p.h, 2);
    row.flaps.forEach((f, i) => setFlap(f, s[i], stagger ? 300 + ri * 90 + i * 45 : 0));
    row.clock.setAttribute("aria-label", `${p.d} days, ${p.h} hours to go`);
  });
}

render(null);                         // first frame: build tiles at zero
setTimeout(() => render(true), 350);  // flip to the real countdown, cascading
setInterval(() => render(false), 1000);
