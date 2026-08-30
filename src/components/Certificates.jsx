import { certificates } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

export function Certificates() {
  return (
    <section id="certificates" className="relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="label">Archive</p>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
              Certificates
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-subtle">
              Courses completed alongside the coursework — mostly systems and algorithms.
            </p>
          </Reveal>

          <div className="border-t border-border">
            {certificates.map((c, i) => (
              <Reveal key={c.number} delay={i * 80}>
                <div className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-border py-7 transition-colors hover:bg-surface/50 md:grid-cols-[auto_1fr_auto] md:py-9">
                  <span className="label pt-1">{c.number}</span>
                  <div>
                    <h3 className="max-w-xl text-[clamp(1.15rem,2.4vw,1.75rem)] font-light leading-snug tracking-[-0.02em] text-foreground transition-transform duration-500 group-hover:translate-x-1">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-subtle">{c.issuer}</p>
                  </div>
                  <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:col-start-3">
                    {c.meta}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
