import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
            <div className="mt-8 min-h-[5.5rem] border-l border-border pl-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current ? current.name : "default"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <p className="label text-accent">{current ? current.group : "Hover a tool"}</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-subtle">
                    {current
                      ? current.note
                      : "Nothing here is listed for the sake of listing — every entry shipped inside a project or a course."}
                  </p>
                </motion.div>
              </AnimatePresence>
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
                      const isEven = (gi + i) % 2 === 0;
                      return (
                        <motion.button
                          key={s.name}
                          onMouseEnter={() => setActive(s.name)}
                          onMouseLeave={() => setActive(null)}
                          onFocus={() => setActive(s.name)}
                          onBlur={() => setActive(null)}
                          whileHover={{ scale: 1.06, y: -4 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          data-cursor="Inspect"
                          className={`${
                            isEven ? "float-chip" : "float-chip-reverse"
                          } group relative flex items-center gap-2.5 border px-4 py-2.5 backdrop-blur-sm transition-colors duration-300 ${
                            dim
                              ? "border-border opacity-35"
                              : "border-border-strong bg-surface/70 opacity-100 hover:border-accent hover:shadow-[0_4px_20px_rgba(168,162,116,0.18)]"
                          }`}
                          style={{
                            animationDelay: `${(gi * 3 + i) * 320}ms`,
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {Icon ? (
                            <Icon
                              aria-hidden
                              className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                            />
                          ) : null}
                          <span className="text-sm font-light tracking-tight text-foreground">
                            {s.name}
                          </span>
                        </motion.button>
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
