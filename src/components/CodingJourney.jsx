import { coding } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

export function CodingJourney() {
  return (
    <section id="coding" className="ambient-bg grain relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label">04 — Coding journey</p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
            Problem solving, kept up daily.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="grain relative flex h-full flex-col justify-between overflow-hidden border border-border-strong bg-surface px-7 py-8 md:px-10 md:py-12">
              <p className="label">Across platforms</p>
              <div className="mt-10">
                <p className="text-[clamp(4.5rem,15vw,11rem)] font-light leading-[0.82] tracking-[-0.05em] text-foreground">
                  {coding.headline}
                </p>
                <p className="mt-6 text-lg font-light text-subtle">{coding.headlineLabel}</p>
                <p className="mt-1 text-sm text-muted-foreground">{coding.headlineNote}</p>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -bottom-14 h-56 w-56 rounded-full border border-border-strong opacity-40"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full border border-border opacity-30"
              />
            </div>
          </Reveal>

          {coding.cards.map((c, i) => (
            <Reveal key={c.title} delay={80 + i * 70} className={i === 2 ? "md:col-start-3" : ""}>
              <div className="flex h-full flex-col justify-between border border-border bg-surface/60 px-6 py-7 transition-colors hover:border-border-strong">
                <p className="label">{c.platform}</p>
                <div className="mt-8">
                  <p className="text-2xl font-light leading-tight tracking-[-0.02em] text-foreground">
                    {c.title}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {c.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
