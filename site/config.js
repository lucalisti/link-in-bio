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
    { title: "Strava",    href: "https://www.strava.com/athletes/160897892" },
    { title: "Coach Claude training-plan prompt V1", sub: "Free — DM me \"COACH\"", href: "https://docs.google.com/document/d/1S1IjwXbVosZH6rVW1UKh2BS1z2Ut5tj0mwdY0LZweVo/edit?tab=t.0" },
  ],


  // ---------- Races ----------
  // date: "YYYY-MM-DD".  Put them in order, soonest first.
  // approx: true  → add to a race if the date isn't confirmed yet (shows "~Feb 2027").
  // hour: 8       → optional start hour (24h). Otherwise uses raceHour below.
  // Races disappear on their own once they're over.
  raceHour: 7,
  races: [
    { date: "2026-11-25", name: "Turkey Trot 5K Eating Challenge"},
    { date: "2027-02-13", name: "Chicago HYROX Doubles"},
    { date: "2027-04-24", name: "Illinois Marathon"},
    { date: "2027-06-13", name: "Ironman Rockford 70.3"},
    { date: "2027-09-12", name: "Ironman Wisconsin"},
  ],

};
