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
    { title: "Coach Claude: IRONMAN Training Plan Prompt", sub: "Free for followers — DM me \"COACH\"", image: "coach-claude.png", href: "https://ig.me/m/lifeoflucalisti" },
  ],


  // ---------- December challenge calendar ----------
  // Shows Dec 1–31 above your races (gone Jan 1). Runs on Chicago time for everyone.
  //   • Doors you haven't filled in show "?". Door 24 shows a star.
  //   • Today's door is a wrapped gift counting down to dropTime.
  //   • Tapping an opened door shows the challenge, your result and watch buttons.
  // Each day, once the episode is up, add a line (only title is required):
  //   { day: 1, title: "100 burpees for time", result: "7:42",
  //     ig: "https://instagram.com/reel/...", yt: "https://youtube.com/shorts/...", tt: "https://tiktok.com/@lifeoflucalisti/video/..." },
  // You can fill in days early — a door stays shut until its date.
  // Preview any day: add ?day=8 to the URL (add &time=17:58 to pick the time).
  advent: {
    title:    "24 Days of Challenges",
    start:    "2026-12-01",
    dropTime: "18:00",                                // when a new episode goes up (24h, Chicago time)
    suggest:  "https://ig.me/m/lifeoflucalisti",      // "Got a challenge for me?" button ("" to hide)
    playlist: "",                                     // optional: "Watch every episode" link
    snow:     true,                                   // light snowfall behind the header
    days: [
    ],
  },


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
