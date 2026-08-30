import { useState } from "react";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
} from "react-icons/si";
import { skills } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

const icons = {
  c: SiC,
  cplusplus: SiCplusplus,
  java: SiOpenjdk,
  javascript: SiJavascript,
  python: SiPython,
  html: SiHtml5,
  css: SiCss,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  git: SiGit,
  github: SiGithub,
};

const groups = ["Languages", "Web", "Data", "Tooling"];

export function Skills() {
  const [active, setActive] = useState(null);
  const current = skills.find((s) => s.name === active);

  return (
    <section id="skills" className="relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <p className="label">02 — Toolkit</p>
            <h2 className="mt-6 max-w-sm text-[clamp(1.8rem,3.6vw,2.6rem)] font-light leading-[1.08] tracking-[-0.03em] text-foreground">
              Eleven tools, each tied to something actually built.
            </h2>
            <div className="mt-8 min-h-[5rem] border-l border-border pl-5">
              <p className="label">{current ? current.group : "Hover a tool"}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-subtle">
                {current
                  ? current.note
                  : "Nothing here is listed for the sake of listing — every entry shipped inside a project or a course."}
              </p>
            </div>
          </Reveal>

          <div className="space-y-10">
            {groups.map((g, gi) => {
              const items = skills.filter((s) => s.group === g);
              if (!items.length) return null;
              return (
                <Reveal key={g} delay={gi * 70}>
                  <div className="flex items-center gap-4">
                    <p className="label shrink-0">{g}</p>
                    <span className="rule-line w-full" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {items.map((s, i) => {
                      const Icon = icons[s.icon];
                      const dim = active && active !== s.name;
                      return (
                        <button
                          key={s.name}
                          onMouseEnter={() => setActive(s.name)}
                          onMouseLeave={() => setActive(null)}
                          onFocus={() => setActive(s.name)}
                          onBlur={() => setActive(null)}
                          className={`float-chip group flex items-center gap-2.5 border px-4 py-2.5 transition-all duration-500 ${
                            dim
                              ? "border-border opacity-40"
                              : "border-border-strong bg-surface/60 opacity-100"
                          }`}
                          style={{ animationDelay: `${(gi * 3 + i) * 240}ms` }}
                        >
                          {Icon ? (
                            <Icon
                              aria-hidden
                              className="h-4 w-4 shrink-0 text-accent transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : null}
                          <span className="text-sm font-light tracking-tight text-foreground">
                            {s.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
