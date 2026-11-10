/*
  ============================================================
   YOUR LINK-IN-BIO PAGE — edit this file only.
  ============================================================
   How to edit:
     • Change any text between the "quotes".
     • Keep the commas at the end of lines.
     • Preview: VS Code → Go Live (bottom-right) → http://127.0.0.1:5500
     • Publish: Source Control → Commit → Sync Changes
   If the page shows "config.js has a typo", a quote or comma is missing.
  ============================================================
*/
window.CONFIG = {

  // ---------- About you ----------
  name:  "Luca Listi",
  bio:   "Senior Data & AI Engineer · Ironman & Hybrid Athlete · Chicago, IL",
  photo: "avatar.jpg",               // square photo in this folder


  // ---------- Icon row under your name ----------
  // icon options: "mail", "instagram", "youtube", "tiktok", "strava"
  // For mail, href is "mailto:" + your email.
  socials: [
    { icon: "mail",      href: "mailto:lifeoflucalisti@gmail.com" },
    { icon: "instagram", href: "https://instagram.com/lifeoflucalisti" },
    { icon: "youtube",   href: "https://youtube.com/@lifeoflucalisti" },
    { icon: "tiktok",    href: "https://tiktok.com/@lifeoflucalisti" },
  ],


  // ---------- Link cards (shown top to bottom) ----------
  // The small square on the left of each card is either
  //   icon: "strava"          (built-in logo), or
  //   image: "file.png"       (a square image in this folder)
  // "sub" is an optional small line under the title.
  links: [
    { title: "Follow me on Strava", icon: "strava", href: "https://www.strava.com/athletes/160897892" },
    { title: "Coach Claude: IRONMAN Training Plan Prompt", sub: "Free for followers — DM me \"COACH\"", image: "coach-claude.png", href: "https://ig.me/m/lifeoflucalisti" }, // doc: "https://docs.google.com/document/d/1S1IjwXbVosZH6rVW1UKh2BS1z2Ut5tj0mwdY0LZweVo/edit?tab=t.0"
  ],


  // ---------- Races ----------
  // date: "YYYY-MM-DD".  Put them in order, soonest first.
  // approx: true  → add to a race if the date isn't confirmed yet (shows "~Feb 2027").
  // hour: 8       → optional start hour (24h). Otherwise uses raceHour below.
  // Races disappear on their own once they're over.
  raceHour: 7,
  races: [
    { date: "2026-11-25", name: "Turkey Trot 5K Eating Challenge" },
    { date: "2027-02-13", name: "Chicago HYROX Doubles" },
    { date: "2027-04-24", name: "Illinois Marathon" },
    { date: "2027-06-13", name: "Ironman Rockford 70.3" },
    { date: "2027-09-12", name: "Ironman Wisconsin" },
  ],

};
