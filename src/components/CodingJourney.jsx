import { useEffect, useState } from "react";
import { SiGeeksforgeeks, SiGithub, SiLeetcode } from "react-icons/si";
import { getCodingStats } from "../lib/coding.functions.js";
import { codingHighlights, profile } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";
import { Heatmap } from "./Heatmap.jsx";

function Stat({ label, value }) {
  return (
    <div>
      <p className="label">{label}</p>
      <p className="mt-1 text-xl font-light tracking-[-0.02em] text-foreground">{value}</p>
    </div>
  );
}

export function CodingJourney() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState("leetcode");

  useEffect(() => {
    let alive = true;
    getCodingStats()
      .then((d) => alive && setData(d))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  const lc = data?.leetcode;
  const gh = data?.github;
  const gfg = data?.gfg;
  const dash = "—";
  const totalSolved = lc && gfg ? lc.solved + gfg.solved : lc?.solved ?? null;

  const cards = [
    {
      key: "leetcode",
      name: "LeetCode",
      Icon: SiLeetcode,
      href: profile.leetcode,
      handle: profile.leetcodeUser,
      stats: [
        { label: "Solved", value: lc ? lc.solved : dash },
        { label: "Active days", value: lc ? lc.activeDays : dash },
        { label: "Easy / Med / Hard", value: lc ? `${lc.easy} / ${lc.medium} / ${lc.hard}` : dash },
      ],
    },
    {
      key: "gfg",
      name: "GeeksforGeeks",
      Icon: SiGeeksforgeeks,
      href: profile.gfg,
      handle: profile.gfgUser,
      stats: [
        { label: "Solved", value: gfg ? gfg.solved : dash },
        { label: "Coding score", value: gfg?.score ?? dash },
        { label: "Monthly score", value: gfg?.monthlyScore ?? dash },
      ],
    },
    {
      key: "github",
      name: "GitHub",
      Icon: SiGithub,
      href: profile.github,
      handle: profile.githubUser,
      stats: [
        { label: "Contributions", value: gh ? gh.total : dash },
        { label: "Active days", value: gh ? gh.activeDays : dash },
        { label: "Window", value: "Last 12 months" },
      ],
    },
  ];

  const heatDays = tab === "leetcode" ? lc?.days ?? [] : gh?.days ?? [];
  const heatLabel =
    tab === "leetcode"
      ? `LeetCode submissions · last 12 months${lc ? ` · ${lc.activeDays} active days` : ""}`
      : `GitHub contributions · last 12 months${gh ? ` · ${gh.total} total` : ""}`;

  return (
    <section id="coding" className="ambient-bg grain relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">04 — Coding journey</p>
              <h2 className="mt-6 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
                Problem solving, kept up daily.
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[clamp(2.6rem,7vw,4.5rem)] font-light leading-none tracking-[-0.04em] text-foreground">
                {totalSolved ?? (error ? dash : "···")}
              </p>
              <p className="mt-2 label">Problems solved · live from profiles</p>
            </div>
          </div>
        </Reveal>

        {/* small per-platform cards */}
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 70}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col gap-5 border border-border bg-surface/60 px-5 py-5 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <c.Icon aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                    <span className="truncate text-sm font-light text-foreground">{c.name}</span>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                    @{c.handle} ↗
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {c.stats.map((s) => (
                    <Stat key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* heatmap with platform toggle */}
        <Reveal delay={120}>
          <div className="mt-4 border border-border bg-surface/50 px-5 py-5 md:px-7 md:py-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <p className="label">Activity heatmap</p>
              <div className="flex border border-border">
                {[
                  { id: "leetcode", label: "LeetCode" },
                  { id: "github", label: "GitHub" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    aria-pressed={tab === t.id}
                    className={`px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      tab === t.id
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            {heatDays.length ? (
              <Heatmap days={heatDays} accentLabel={heatLabel} />
            ) : (
              <p className="py-8 text-sm text-muted-foreground">
                {error ? "Could not reach the profile APIs right now." : "Loading activity…"}
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {codingHighlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 60}>
              <div className="flex h-full items-baseline justify-between gap-4 border border-border px-5 py-4">
                <div>
                  <p className="label">{h.platform}</p>
                  <p className="mt-1.5 text-base font-light text-foreground">{h.title}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {h.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
