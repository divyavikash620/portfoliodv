import { education } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

export function AboutEducation() {
  return (
    <section id="about" className="ambient-bg relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="label">03 — About</p>
            <p className="mt-6 text-[clamp(1.3rem,2.6vw,1.9rem)] font-light leading-[1.35] tracking-[-0.02em] text-foreground">
              I'm a Computer Science student who prefers building the thing over reading about it.
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-subtle">
              Most of what I know came from writing small systems end to end — a database engine, a
              records application, an analysis tool — and then finding out where they break. Right
              now I'm at Lovely Professional University, solving problems daily and keeping the
              projects going.
            </p>
            <div className="mt-10 flex gap-10">
              <div>
                <p className="font-mono text-2xl text-foreground">9.64</p>
                <p className="label mt-1">Current CGPA</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-foreground">3</p>
                <p className="label mt-1">Systems built</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="label">The path so far</p>
            </Reveal>
            <div className="relative mt-10 pl-8 md:pl-14">
              <span
                aria-hidden
                className="absolute left-[3px] top-2 bottom-8 w-px bg-gradient-to-b from-border-strong via-border to-transparent md:left-[9px]"
              />
              {education.map((e, i) => (
                <Reveal key={e.place} delay={i * 90} className="relative pb-14 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-accent md:-left-14 md:ml-[6px]"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="text-[clamp(1.4rem,3.2vw,2.3rem)] font-light leading-tight tracking-[-0.02em] text-foreground">
                      {e.place}
                    </h3>
                    <span className="font-mono text-sm text-accent">{e.score}</span>
                  </div>
                  <p className="mt-2 text-sm text-subtle">
                    {e.degree}
                    {e.field ? ` · ${e.field}` : ""}
                  </p>
                  <p className="label mt-3">
                    {e.location} — {e.period}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
