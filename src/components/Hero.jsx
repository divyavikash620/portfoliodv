import { useState } from "react";
import { profile } from "../data/portfolio.js";
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
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-20 pt-28 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-28 lg:pt-40">
        <div className="relative z-10 flex flex-col justify-center">
          <div
            className="flex items-center gap-3"
            style={{ animation: "rise 900ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <span className="h-px w-8 bg-border-strong" />
            <p className="label">
              {profile.role} · {profile.school}
            </p>
          </div>

          <h1
            className="mt-8 text-[clamp(3.2rem,10vw,7.5rem)] font-light leading-[0.88] tracking-[-0.04em] text-foreground"
            style={{ animation: "rise 1000ms 80ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            Divya
            <br />
            <span className="italic" style={{ fontFamily: "var(--font-display)" }}>
              Vikash
            </span>
          </h1>

          <p
            className="mt-10 max-w-lg text-[clamp(1.05rem,2.1vw,1.45rem)] font-light leading-[1.45] text-subtle"
            style={{ animation: "rise 1000ms 180ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            I like understanding how things work beneath the surface —{" "}
            <span className="text-foreground">so I learn by building.</span>
          </p>

          <div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animation: "rise 1000ms 280ms cubic-bezier(0.22,1,0.36,1) both" }}
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
          </div>
        </div>

        <div className="relative min-h-[420px] lg:min-h-[600px]">
          <div className="absolute inset-0">
            <HeroScene active={open} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:justify-end lg:pr-4">
            <div className="pointer-events-auto w-full max-w-md">
              <AboutInterface open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
