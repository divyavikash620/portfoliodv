import { profile, projects, education, skills, coding, certificates } from "./portfolio.js";

const list = (arr) => arr.join(", ");

const entries = [
  {
    id: "intro",
    keywords: ["who are you", "yourself", "about you", "about divya", "intro", "hello", "hi", "hey", "name"],
    answer: () =>
      `I'm ${profile.name} — a ${profile.role.toLowerCase()} at ${profile.school}. ${profile.statement}`,
  },
  {
    id: "education",
    keywords: ["study", "education", "college", "university", "cgpa", "school", "degree", "lpu"],
    answer: () =>
      education
        .map((e) => `${e.place} — ${e.degree}${e.field ? `, ${e.field}` : ""} · ${e.score} · ${e.period}`)
        .join("\n"),
  },
  {
    id: "projects",
    keywords: ["project", "built", "building", "work on", "working on", "selected work"],
    answer: () =>
      `Three things so far:\n${projects.map((p) => `${p.number} · ${p.flat} (${p.date}) — ${p.tech[0]}`).join("\n")}\nAsk about any one of them.`,
  },
  {
    id: "minidb",
    keywords: ["minidb", "database", "mini db", "variant"],
    answer: () => {
      const p = projects[1];
      return `${p.flat} · ${p.date}\n${p.summary}\n${p.points.map((x) => `— ${x}`).join("\n")}\nTech: ${list(p.tech)}`;
    },
  },
  {
    id: "wdte",
    keywords: ["wdte", "why does this exist", "gemini", "ui reverse"],
    answer: () => {
      const p = projects[2];
      return `${p.flat} · ${p.date}\n${p.summary}\n${p.points.map((x) => `— ${x}`).join("\n")}\nTech: ${list(p.tech)}`;
    },
  },
  {
    id: "sms",
    keywords: ["student management", "sms", "java project", "student"],
    answer: () => {
      const p = projects[0];
      return `${p.flat} · ${p.date}\n${p.summary}\n${p.points.map((x) => `— ${x}`).join("\n")}\nTech: ${list(p.tech)}`;
    },
  },
  {
    id: "skills",
    keywords: ["skill", "technolog", "language", "stack", "tools", "know"],
    answer: () => {
      const byGroup = {};
      skills.forEach((s) => {
        byGroup[s.group] = byGroup[s.group] || [];
        byGroup[s.group].push(s.name);
      });
      return Object.entries(byGroup)
        .map(([g, items]) => `${g}: ${list(items)}`)
        .join("\n");
    },
  },
  {
    id: "coding",
    keywords: ["coding", "leetcode", "problem solving", "dsa", "contest", "codechef", "stats", "statistics"],
    answer: () =>
      `${coding.headline} ${coding.headlineLabel.toLowerCase()} across platforms.\n${coding.cards
        .map((c) => `— ${c.title} · ${c.note} (${c.platform})`)
        .join("\n")}`,
  },
  {
    id: "certificates",
    keywords: ["certificate", "course", "udemy", "infosys", "neocolab", "abdul bari"],
    answer: () => certificates.map((c) => `${c.title} — ${c.issuer} · ${c.meta}`).join("\n"),
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "linkedin", "github", "hire", "connect"],
    answer: () => `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}`,
  },
];

export const suggestions = [
  "who are you?",
  "what do you study?",
  "tell me about MiniDB",
  "coding stats",
  "show your skills",
];

export function ask(rawQuery) {
  const q = (rawQuery || "").toLowerCase().trim();
  if (!q) return "Ask me something — projects, education, skills, or coding journey.";

  let best = null;
  let bestScore = 0;
  for (const entry of entries) {
    let score = 0;
    for (const k of entry.keywords) {
      if (q.includes(k)) score += k.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  if (!best) {
    return "I don't have an answer for that yet. Try asking about my projects, education, skills, or coding journey.";
  }
  return best.answer();
}
