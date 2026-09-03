import {
  profile,
  projects,
  education,
  skills,
  codingHighlights,
  certificates,
} from "./portfolio.js";

const list = (arr) => arr.join(", ");

export const entries = [
  // ── Greetings & Small Talk ──────────────────────────────────────────
  {
    id: "greetings",
    keywords: [
      "hello",
      "hi",
      "hey",
      "hey there",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
      "sup",
      "what's up",
      "yo",
      "namaste",
      "hola",
      "hi bot",
    ],
    answer: () => ({
      text: `Hello! 👋 I'm Divya's portfolio companion bot. I'm here to help you explore his projects, education, coding achievements, and technical skillset. What would you like to know?`,
      navigate: "top",
      navLabel: "Go to Top ↑",
    }),
  },
  {
    id: "how_are_you",
    keywords: [
      "how are you",
      "how are you doing",
      "how are you feeling",
      "hows it going",
      "how's it going",
      "are you good",
      "how do you do",
      "what's going on",
      "how are things",
    ],
    answer: () => ({
      text: `I'm running smoothly at 100% efficiency! ⚡\nAlways excited to share Divya's latest projects, DSA streaks, and system designs. How can I assist your tour today?`,
    }),
  },
  {
    id: "bot_identity",
    keywords: [
      "who are you",
      "what are you",
      "are you an ai",
      "are you chatgpt",
      "what is this bot",
      "how do you work",
      "bot info",
      "about the bot",
      "what can you do",
    ],
    answer: () => ({
      text: `I am Divya's interactive 3D portfolio bot! 🤖\nUnlike generic AI models, I run on a deterministic local knowledge matrix with zero network latency. I can guide you through Divya's systems (MiniDB, WDTE, SMS), academics (9.64 CGPA at LPU), coding profiles, and contact details.`,
    }),
  },
  {
    id: "thanks",
    keywords: [
      "thank you",
      "thanks",
      "thx",
      "appreciate it",
      "good job",
      "awesome",
      "cool",
      "nice portfolio",
      "great work",
      "impressive",
      "love this",
      "well done",
      "amazing",
    ],
    answer: () => ({
      text: `Thank you so much! 🎉 Divya poured a lot of engineering craft and attention to detail into this portfolio. Feel free to explore his projects or connect directly via email/LinkedIn!`,
      navigate: "contact",
      navLabel: "Connect with Divya ↓",
    }),
  },
  {
    id: "goodbye",
    keywords: [
      "bye",
      "goodbye",
      "see you",
      "cya",
      "exit",
      "quit",
      "have a good day",
      "take care",
      "later",
      "catch you later",
      "farewell",
    ],
    answer: () => ({
      text: `Thanks for dropping by! 👋 Have an amazing day ahead, and don't hesitate to reach out if you'd like to collaborate or discuss an opportunity.`,
    }),
  },
  {
    id: "help",
    keywords: [
      "help",
      "commands",
      "menu",
      "options",
      "what can i ask",
      "how to use",
      "questions",
      "guide",
    ],
    answer: () => ({
      text: `Here are some popular things you can ask me:\n• "Tell me about yourself" (Bio & Overview)\n• "What projects have you built?" (MiniDB, WDTE, SMS)\n• "What is your CGPA & Education?" (LPU CSE)\n• "Show coding stats" (LeetCode & GfG totals)\n• "What are your technical skills?" (C++, Java, React, SQL)\n• "Are you available for hire?" (2026 Internships)\n• "How can I contact Divya?" (Email, Phone, LinkedIn)`,
    }),
  },
  {
    id: "hiring",
    keywords: [
      "hire",
      "hiring",
      "internship",
      "intern",
      "job",
      "full time",
      "full-time",
      "summer 2026",
      "open to work",
      "can i hire you",
      "recruit",
      "opportunity",
      "availability",
      "available",
    ],
    answer: () => ({
      text: `Yes! 🚀 Divya is actively seeking Software Engineering / Developer internships for Summer 2026.\n\nKey Highlights:\n• Strong foundations in C++, Java, Data Structures & Algorithms\n• Experience building database engines & full-stack applications\n• 9.64 CGPA in B.Tech CSE at Lovely Professional University\n• 500+ problems solved on LeetCode & GeeksforGeeks`,
      navigate: "contact",
      navLabel: "Contact Divya for Opportunities ↓",
    }),
  },
  {
    id: "resume",
    keywords: [
      "resume",
      "cv",
      "curriculum vitae",
      "download resume",
      "view resume",
      "profile document",
    ],
    answer: () => ({
      text: `Divya's portfolio is a live interactive resume showcasing his real-time GitHub/LeetCode stats, 3 core engineering projects (MiniDB, WDTE, SMS), and academic background (9.64 CGPA).\n\nYou can reach out directly at divyavikash620@gmail.com for the official PDF resume!`,
      navigate: "contact",
      navLabel: "Get in touch for Resume ↓",
    }),
  },
  {
    id: "hobbies",
    keywords: [
      "hobbies",
      "hobby",
      "interests",
      "free time",
      "what do you do for fun",
      "outside coding",
      "fun fact",
      "passion",
    ],
    answer: () => ({
      text: `Outside core academics and coursework, Divya enjoys:\n• Deep-diving into system internals and database storage mechanisms\n• Competitive problem solving & algorithmic streak challenges on LeetCode/GfG\n• Exploring low-level architecture and AI reverse-engineering\n• Crafting high-polish, tactile web experiences with fluid motion design`,
    }),
  },

  // ── Core Portfolio Sections ──────────────────────────────────────────
  {
    id: "intro",
    keywords: [
      "about",
      "yourself",
      "about you",
      "about divya",
      "intro",
      "bio",
      "who is divya",
      "divya vikash",
      "tell me about divya",
      "background",
    ],
    answer: () => ({
      text: `Divya Vikash is a computer science undergraduate at Lovely Professional University (9.64 CGPA).\n\nHe builds small systems to understand how large-scale architecture functions — from custom C++ database engines to records management systems and AI reverse-engineering tools.`,
      navigate: "top",
      navLabel: "Go to Top ↑",
    }),
  },
  {
    id: "education",
    keywords: [
      "study",
      "education",
      "college",
      "university",
      "cgpa",
      "school",
      "degree",
      "lpu",
      "academics",
      "marks",
      "grades",
      "btech",
      "b.tech",
      "lovely professional university",
      "matriculation",
      "intermediate",
    ],
    answer: () => ({
      text: education
        .map(
          (e) =>
            `• ${e.place} — ${e.degree}${e.field ? ` (${e.field})` : ""} · ${e.score} · ${e.period}`,
        )
        .join("\n"),
      navigate: "education",
      navLabel: "Jump to Education section ↓",
    }),
  },
  {
    id: "projects",
    keywords: [
      "project",
      "built",
      "building",
      "work on",
      "working on",
      "selected work",
      "portfolio work",
      "apps",
      "systems",
      "what have you made",
      "show projects",
    ],
    answer: () => ({
      text: `Three core systems built from scratch:\n${projects.map((p) => `• ${p.number} ${p.flat} (${p.date}) — ${p.tech.slice(0, 3).join(", ")}`).join("\n")}\n\nAsk specifically about "MiniDB", "WDTE", or "Student Management System"!`,
      navigate: "work",
      navLabel: "Explore Projects section ↓",
    }),
  },
  {
    id: "minidb",
    keywords: [
      "minidb",
      "database",
      "mini db",
      "variant",
      "c++ project",
      "db engine",
      "storage engine",
      "parser",
      "buffer pool",
      "table scan",
    ],
    answer: () => {
      const p = projects[1];
      return {
        text: `【${p.flat}】(${p.date})\n${p.summary}\n\nHighlights:\n${p.points.map((x) => `— ${x}`).join("\n")}\n\nTech: ${list(p.tech)}`,
        navigate: "work",
        navLabel: "View MiniDB in Projects ↓",
      };
    },
  },
  {
    id: "wdte",
    keywords: [
      "wdte",
      "why does this exist",
      "gemini",
      "ui reverse",
      "ai project",
      "reverse engineer",
      "multimodal",
      "design system",
      "component map",
    ],
    answer: () => {
      const p = projects[2];
      return {
        text: `【${p.flat}】(${p.date})\n${p.summary}\n\nHighlights:\n${p.points.map((x) => `— ${x}`).join("\n")}\n\nTech: ${list(p.tech)}`,
        navigate: "work",
        navLabel: "View WDTE in Projects ↓",
      };
    },
  },
  {
    id: "sms",
    keywords: [
      "student management",
      "sms",
      "java project",
      "student records",
      "mysql database",
      "swing",
      "jdbc",
      "auth",
    ],
    answer: () => {
      const p = projects[0];
      return {
        text: `【${p.flat}】(${p.date})\n${p.summary}\n\nHighlights:\n${p.points.map((x) => `— ${x}`).join("\n")}\n\nTech: ${list(p.tech)}`,
        navigate: "work",
        navLabel: "View Student Management System ↓",
      };
    },
  },
  {
    id: "skills",
    keywords: [
      "skill",
      "technolog",
      "language",
      "stack",
      "tools",
      "know",
      "toolkit",
      "frontend",
      "backend",
      "languages",
      "cpp",
      "c++",
      "java",
      "python",
      "javascript",
      "react",
      "sql",
      "git",
    ],
    answer: () => {
      const byGroup = {};
      skills.forEach((s) => {
        byGroup[s.group] = byGroup[s.group] || [];
        byGroup[s.group].push(s.name);
      });
      return {
        text: Object.entries(byGroup)
          .map(([g, items]) => `${g}: ${list(items)}`)
          .join("\n"),
        navigate: "skills",
        navLabel: "Inspect Skills toolkit ↓",
      };
    },
  },
  {
    id: "coding",
    keywords: [
      "coding",
      "leetcode",
      "problem solving",
      "dsa",
      "contest",
      "codechef",
      "stats",
      "statistics",
      "gfg",
      "geeksforgeeks",
      "streak",
      "problems solved",
      "heatmap",
      "daily streak",
    ],
    answer: () => ({
      text: `500+ problems solved across platforms with active daily streaks.\n${codingHighlights
        .map((c) => `— ${c.title} · ${c.note} (${c.platform})`)
        .join("\n")}`,
      navigate: "coding",
      navLabel: "See Coding Journey & Heatmap ↓",
    }),
  },
  {
    id: "certificates",
    keywords: [
      "certificate",
      "course",
      "udemy",
      "infosys",
      "neocolab",
      "abdul bari",
      "certifications",
      "archive",
      "credentials",
      "licenses",
    ],
    answer: () => ({
      text: certificates.map((c) => `• ${c.title} — ${c.issuer} (${c.meta})`).join("\n"),
      navigate: "certificates",
      navLabel: "View Certificates archive ↓",
    }),
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "email",
      "reach",
      "linkedin",
      "github",
      "connect",
      "phone",
      "address",
      "location",
      "message",
      "talk",
      "gmail",
      "phone number",
      "where do you live",
      "call",
    ],
    answer: () => ({
      text: `Email: ${profile.email}\nPhone: ${profile.phone}\nLocation: ${profile.location}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}`,
      navigate: "contact",
      navLabel: "Jump to Contact section ↓",
    }),
  },
];

export const suggestions = [
  "hello!",
  "tell me about yourself",
  "what projects have you built?",
  "tell me about MiniDB",
  "show coding stats & streaks",
  "are you open for internships?",
  "how can I contact Divya?",
];

export function ask(rawQuery) {
  const q = (rawQuery || "").toLowerCase().trim();
  if (!q) {
    return {
      text: "Ask me anything — greetings, projects (MiniDB, WDTE, SMS), education, skills, or coding journey!",
    };
  }

  // Token-based and keyword scoring algorithm
  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    let score = 0;
    for (const k of entry.keywords) {
      if (q === k) {
        score += 100; // exact match bonus
      } else if (q.includes(k)) {
        score += k.length * 4;
      } else {
        // Check partial token overlap
        const words = k.split(" ");
        for (const w of words) {
          if (w.length > 2 && q.includes(w)) {
            score += w.length;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 4) {
    return {
      text: "I don't have an exact record for that in my local knowledge matrix yet. Try asking greetings, about projects (MiniDB, WDTE, SMS), education, skills, coding stats, or internship availability!",
    };
  }

  return best.answer();
}
