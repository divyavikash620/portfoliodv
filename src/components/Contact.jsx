import { useState } from "react";
import { motion } from "motion/react";
import { SiGithub, SiGooglemaps, SiGmail } from "react-icons/si";
import { FiPhone, FiCopy, FiCheck, FiArrowUpRight, FiLinkedin } from "react-icons/fi";
import { profile } from "../data/portfolio.js";
import { Reveal } from "./Reveal.jsx";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="ambient-bg grain relative border-t border-border py-28 md:py-44"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="label">06 — Contact</p>
            <div className="inline-flex items-center gap-2 border border-border-strong bg-surface/70 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">
                Available for internships & collaborations
              </span>
            </div>
          </div>

          <h2 className="mt-8 max-w-4xl text-[clamp(2.5rem,7.5vw,5.5rem)] font-light leading-[0.94] tracking-[-0.04em] text-foreground">
            Let's build something
            <br />
            <span className="italic text-subtle" style={{ fontFamily: "var(--font-display)" }}>
              exceptional together.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-subtle md:text-lg">
            Have a project in mind, an opportunity to discuss, or just want to connect? My inbox is
            always open.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Main Primary Action: Featured Email Box */}
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="relative flex h-full flex-col justify-between overflow-hidden border border-border-strong bg-surface/80 p-8 backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
                      <SiGmail className="h-3.5 w-3.5" />
                      Direct Email
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      data-cursor="Copy"
                      className="inline-flex items-center gap-1.5 border border-border bg-surface-elevated/70 px-3 py-1 text-xs font-mono text-muted-foreground transition-all hover:border-border-strong hover:text-foreground"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="h-3.5 w-3.5 text-accent" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Primary address</p>
                    <a
                      href={profile.gmailCompose}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Gmail"
                      className="mt-2 block break-all text-[clamp(1.25rem,2.8vw,2rem)] font-light tracking-tight text-foreground transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 pt-6 border-t border-border">
                  <motion.a
                    href={profile.gmailCompose}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Compose"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-2.5 border border-border-strong bg-foreground px-6 py-3 text-xs font-medium text-background transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                  >
                    <span>Open in Gmail</span>
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${profile.email}`}
                    data-cursor="Mail Client"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 border border-border bg-surface px-5 py-3 text-xs font-light text-foreground transition-colors hover:border-border-strong hover:bg-surface-elevated"
                  >
                    Default Mail Client
                  </motion.a>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Secondary Details: Phone, Location & Socials */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <Reveal delay={120}>
              <motion.a
                href={profile.phoneHref}
                data-cursor="Call"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group flex flex-col justify-between gap-4 border border-border bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 label">
                    <FiPhone className="h-3.5 w-3.5 text-accent" />
                    Phone
                  </span>
                  <span className="font-mono text-[11px] text-accent opacity-80 transition-transform duration-300 group-hover:translate-x-0.5">
                    Call ↗
                  </span>
                </div>
                <div>
                  <span className="text-base font-light text-foreground md:text-lg">
                    {profile.phone}
                  </span>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    Mon — Sat · IST
                  </p>
                </div>
              </motion.a>
            </Reveal>

            <Reveal delay={160}>
              <motion.a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="Maps"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group flex flex-col justify-between gap-4 border border-border bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 label">
                    <SiGooglemaps className="h-3.5 w-3.5 text-accent" />
                    Location
                  </span>
                  <span className="font-mono text-[11px] text-accent opacity-80 transition-transform duration-300 group-hover:translate-x-0.5">
                    Maps ↗
                  </span>
                </div>
                <div>
                  <span className="text-base font-light text-foreground md:text-lg">
                    {profile.address}
                  </span>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    Punjab, India · Open to relocate
                  </p>
                </div>
              </motion.a>
            </Reveal>
          </div>
        </div>

        {/* Social Networks & Links Row */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={200}>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="LinkedIn"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group flex items-center justify-between border border-border bg-surface/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-surface"
            >
              <div className="flex items-center gap-3.5">
                <FiLinkedin className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-light text-foreground">LinkedIn</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Professional network
                  </p>
                </div>
              </div>
              <FiArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </motion.a>
          </Reveal>

          <Reveal delay={240}>
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GitHub"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group flex items-center justify-between border border-border bg-surface/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-surface"
            >
              <div className="flex items-center gap-3.5">
                <SiGithub className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-light text-foreground">GitHub</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Open source & projects
                  </p>
                </div>
              </div>
              <FiArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </motion.a>
          </Reveal>

          <Reveal delay={280}>
            <motion.a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              data-cursor="LeetCode"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group flex items-center justify-between border border-border bg-surface/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-surface sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs font-bold text-accent">LC</span>
                <div>
                  <p className="text-sm font-light text-foreground">LeetCode</p>
                  <p className="font-mono text-[11px] text-muted-foreground">Competitive coding</p>
                </div>
              </div>
              <FiArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
