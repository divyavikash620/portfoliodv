import { useState } from "react";
import { projects } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

export function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <section id="work" className="relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="max-w-3xl">
          <p className="label">Selected work</p>
          <h2 className="mt-6 text-[clamp(2.2rem,5.5vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em] text-foreground">
            Things I built to understand
            <br />
            <span className="italic text-subtle" style={{ fontFamily: "var(--font-display)" }}>
              how things work.
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <div className="flex gap-6 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-r lg:border-border lg:pr-6">
            {projects.map((p) => {
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="group shrink-0 py-3 text-left lg:border-b lg:border-border"
                >
                  <span className="label block">{p.number}</span>
                  <span
                    className={`mt-1 block text-lg font-light transition-colors ${
                      on ? "text-foreground" : "text-muted-foreground group-hover:text-subtle"
                    }`}
                  >
                    {p.flat}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[440px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 right-0 select-none font-light leading-none tracking-tighter text-foreground/[0.04]"
              style={{ fontSize: "clamp(9rem,24vw,20rem)" }}
            >
              {active.number}
            </span>

            <div key={active.id} style={{ animation: "rise 700ms cubic-bezier(0.22,1,0.36,1) both" }}>
              <p className="label">{active.date}</p>
              <h3 className="mt-4 text-[clamp(2rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.035em] text-foreground">
                {active.title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_1fr]">
                <p className="max-w-xl text-base leading-relaxed text-subtle">{active.summary}</p>
                <ul className="space-y-3 border-l border-border pl-5">
                  {active.points.map((pt) => (
                    <li key={pt} className="text-sm leading-relaxed text-subtle">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
                {active.tech.map((t) => (
                  <span key={t} className="font-mono text-[11px] tracking-wide text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
