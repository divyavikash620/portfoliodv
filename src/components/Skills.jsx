import { useState } from "react";
import { skills } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

export function Skills() {
  const [hover, setHover] = useState(null);
  const current = skills.find((s) => s.name === hover);

  return (
    <section id="skills" className="relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="label">Technical toolkit</p>
            <h2 className="mt-6 max-w-xl text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
              The tools I reach for, and what they built.
            </h2>
          </Reveal>
          <Reveal delay={120} className="min-h-[3.5rem] max-w-sm">
            <p className="label">{current ? current.group : "Hover a technology"}</p>
            <p className="mt-2 text-sm leading-relaxed text-subtle">
              {current ? current.note : "Each one is tied to something actually built."}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:gap-x-14">
          {skills.map((s) => {
            const dim = hover && hover !== s.name;
            return (
              <button
                key={s.name}
                onMouseEnter={() => setHover(s.name)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.name)}
                onBlur={() => setHover(null)}
                className="relative text-[clamp(1.8rem,5.5vw,4rem)] font-light leading-[1.15] tracking-[-0.03em] transition-all duration-500"
                style={{
                  color: dim ? "var(--muted-text)" : "var(--foreground)",
                  opacity: dim ? 0.35 : 1,
                  fontStyle: hover === s.name ? "italic" : "normal",
                  fontFamily: hover === s.name ? "var(--font-display)" : "var(--font-sans)",
                }}
              >
                {s.name}
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
