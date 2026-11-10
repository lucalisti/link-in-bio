/*
  ============================================================
   YOUR LINK-IN-BIO PAGE — edit this file only.
  ============================================================
   How to edit:
     • Change any text between the "quotes".
     • Keep the commas at the end of lines.
     • To preview: save, then double-click index.html (same folder).
     • To publish: drag this whole "site" folder onto your site's
       Deploys page on Netlify.
   If the page shows "config.js has a typo", a quote or comma is missing.
  ============================================================
*/
window.CONFIG = {

  // ---------- About you ----------
  name:   "Luca Listi",
  handle: "@lifeoflucalisti",
  bio:    "Data & AI engineer in Chicago. Training for my first full Ironman.",
  photo:  "",                          // optional: put photo.jpg in this folder and write "photo.jpg"
  email:  "collabs@YOUR_DOMAIN.com",   // collab email; set to "" to hide it


  // ---------- Links (shown top to bottom) ----------
  // "sub" is an optional small line under the title. Delete a line to remove a link.
  links: [
    { title: "Instagram", href: "https://instagram.com/lifeoflucalisti" },
    { title: "TikTok",    href: "https://tiktok.com/@lifeoflucalisti" },
    { title: "YouTube",   href: "https://youtube.com/@lifeoflucalisti" },
    { title: "Strava",    href: "https://strava.com/athletes/YOUR_ID" },
    { title: "Coach Claude training-plan prompt", sub: "Free — DM me \"PLAN\"", href: "https://ig.me/m/lifeoflucalisti" },
  ],


  // ---------- Races ----------
  // date: "YYYY-MM-DD".  Put them in order, soonest first.
  // approx: true  → date not confirmed yet (shows "~Feb 2027"). Remove it once you know the date.
  // hour: 8       → optional start hour (24h). Otherwise uses raceHour below.
  // Races disappear on their own once they're over.
  raceHour: 7,
  races: [
    { date: "2026-11-26", name: "Turkey Trot 5K" },
    { date: "2027-02-15", name: "HYROX Doubles",         approx: true },
    { date: "2027-04-25", name: "Illinois Marathon",     approx: true },
    { date: "2027-06-13", name: "Ironman 70.3 Rockford", approx: true },
    { date: "2027-09-12", name: "Ironman Wisconsin",     approx: true },
  ],

};
