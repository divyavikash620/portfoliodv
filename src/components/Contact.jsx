import { profile } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/divya-vikash-518776384", href: profile.linkedin },
  { label: "GitHub", value: "github.com/divyavikash620", href: profile.github },
];

export function Contact() {
  return (
    <section id="contact" className="ambient-bg grain relative border-t border-border py-28 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label">Contact</p>
          <h2 className="mt-8 text-[clamp(2.6rem,9vw,7rem)] font-light leading-[0.92] tracking-[-0.045em] text-foreground">
            Let's build something
            <br />
            <span className="italic text-subtle" style={{ fontFamily: "var(--font-display)" }}>
              interesting.
            </span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-px border-t border-border md:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 80}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-8 border-b border-border py-8 md:border-b-0 md:border-r md:pr-8 md:last:border-r-0"
              >
                <span className="label">{l.label}</span>
                <span className="flex items-center justify-between gap-4 text-base font-light text-foreground md:text-lg">
                  <span className="break-all">{l.value}</span>
                  <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
