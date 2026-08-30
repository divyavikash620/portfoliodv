import { useState } from "react";
import { profile, heroStats } from "../data/portfolio.js";
import { HeroScene } from "./HeroScene.jsx";
import { AboutInterface } from "./AboutInterface.jsx";

export function Hero() {
  const [open, setOpen] = useState(false);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="ambient-bg grain relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 lg:pb-20 lg:pt-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
          {/* ── left: the statement ───────────────────────────── */}
          <div className="relative z-10">
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
              style={{ animation: "rise 900ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <span className="flex w-fit items-center gap-2.5 border border-border-strong bg-surface/60 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="label">Open to internships · 2026</span>
              </span>
              <p className="label">
                {profile.role} · {profile.location}
              </p>
            </div>

            <h1
              className="mt-9 text-[clamp(3rem,9vw,7rem)] font-light leading-[0.88] tracking-[-0.04em] text-foreground"
              style={{ animation: "rise 1000ms 80ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              Divya
              <br />
              <span className="italic" style={{ fontFamily: "var(--font-display)" }}>
                Vikash
              </span>
            </h1>

            <div
              className="mt-9 flex max-w-xl gap-5"
              style={{ animation: "rise 1000ms 180ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <span aria-hidden className="mt-2 h-auto w-px shrink-0 bg-border-strong" />
              <p className="text-[clamp(1rem,1.9vw,1.3rem)] font-light leading-[1.5] text-subtle">
                I build small systems to learn how big ones work — a database engine in C++, a records
                system in Java, an AI tool that reverse-engineers interfaces.{" "}
                <span className="text-foreground">Currently studying CSE at LPU with a 9.64 CGPA.</span>
              </p>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animation: "rise 1000ms 260ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <a
                href="#work"
                onClick={go("work")}
                className="group flex items-center gap-3 border-b border-border-strong pb-1 text-sm text-foreground"
              >
                View my work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-subtle hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-subtle hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={profile.gmailCompose}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-subtle hover:text-foreground"
              >
                Email
              </a>
            </div>

            {/* meaningful fill: a factual strip instead of decoration */}
            <dl
              className="mt-12 grid grid-cols-2 gap-px border-t border-border md:grid-cols-4"
              style={{ animation: "rise 1000ms 340ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {heroStats.map((s) => (
                <div key={s.label} className="border-b border-border py-5 pr-4 md:border-b-0">
                  <dd className="text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-none tracking-[-0.03em] text-foreground">
                    {s.value}
                  </dd>
                  <dt className="mt-2 label">{s.label}</dt>
                  <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                </div>
              ))}
            </dl>
          </div>

          {/* ── right: the bot + the ask console ──────────────── */}
          <div className="relative">
            <div className="relative h-[320px] sm:h-[380px] lg:h-[440px]">
              <HeroScene active={open} />
            </div>

            <div className="mt-2 border border-border-strong bg-surface/70 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="label">Ask the bot</span>
                <span className="label">Local knowledge base</span>
              </div>
              <div className="p-4">
                <AboutInterface
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
