import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiCpu, FiUser, FiArrowRight, FiZap } from "react-icons/fi";
import { Sparkles, Bot } from "lucide-react";
import { profile, heroStats } from "../data/portfolio.js";
import { HeroScene } from "./HeroScene.jsx";
import { AboutInterface } from "./AboutInterface.jsx";

export function Hero() {
  const [showBot, setShowBot] = useState(false);
  const [open, setOpen] = useState(false);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const awakenBot = () => {
    setShowBot(true);
    setOpen(true);
  };

  const switchToPortrait = () => {
    setShowBot(false);
    setOpen(false);
  };

  return (
    <section id="top" className="ambient-bg grain relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 lg:pb-20 lg:pt-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
          {/* ── left: the statement ───────────────────────────── */}
          <div className="relative z-10">
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
              style={{ animation: "rise 900ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <span className="flex w-fit items-center gap-2.5 border border-border-strong bg-surface/60 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="label">Open to internships · 2026</span>
              </span>
              <p className="label">
                {profile.role} · {profile.location}
              </p>
            </div>

            <h1
              className="mt-9 text-[clamp(2.8rem,7.5vw,5.8rem)] font-light leading-[0.92] tracking-[-0.035em] text-foreground"
              style={{ animation: "rise 1000ms 80ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              Divya{" "}
              <span className="italic font-normal" style={{ fontFamily: "var(--font-display)" }}>
                Vikash
              </span>
            </h1>

            <div
              className="mt-9 flex max-w-xl gap-5"
              style={{ animation: "rise 1000ms 180ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <span aria-hidden className="mt-2 h-auto w-px shrink-0 bg-border-strong" />
              <p className="text-[clamp(1rem,1.9vw,1.3rem)] font-light leading-[1.5] text-subtle">
                I build small systems to learn how big ones work — a database engine in C++, a
                records system in Java, an AI tool that reverse-engineers interfaces.{" "}
                <span className="text-foreground">
                  Currently studying Computer Science at LPU, focused on systems programming and core software engineering.
                </span>
              </p>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animation: "rise 1000ms 260ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <a
                href="#work"
                onClick={go("work")}
                data-cursor="Scroll"
                className="group flex items-center gap-3 border-b border-border-strong pb-1 text-sm text-foreground transition-colors hover:border-accent"
              >
                View my work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="GitHub"
                className="link-underline text-sm text-subtle hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="LinkedIn"
                className="link-underline text-sm text-subtle hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={profile.gmailCompose}
                target="_blank"
                rel="noreferrer"
                data-cursor="Gmail"
                className="link-underline text-sm text-subtle hover:text-foreground"
              >
                Email
              </a>
            </div>

            {/* meaningful fill: a factual strip instead of decoration */}
            <dl
              className="mt-12 grid grid-cols-2 gap-px border-t border-border md:grid-cols-4"
              style={{ animation: "rise 1000ms 340ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="border-b border-border py-5 pr-4 transition-colors hover:bg-surface/30 md:border-b-0"
                >
                  <dd className="text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-none tracking-[-0.03em] text-foreground">
                    {s.value}
                  </dd>
                  <dt className="mt-2 label">{s.label}</dt>
                  <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                </div>
              ))}
            </dl>
          </div>

          {/* ── right: encapsulated profile pic + interactive 3D bot console ──────────────── */}
          <div className="relative">
            {/* Visual View Switcher (Portrait vs 3D Bot) */}
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {showBot ? "3D Interactive Bot Mode" : "Portfolio Portrait Mode"}
                </span>
              </div>

              {/* Segmented Switcher Pill */}
              <div className="inline-flex rounded-full border border-border-strong bg-surface/80 p-0.5 backdrop-blur-md shadow-sm">
                <button
                  onClick={switchToPortrait}
                  type="button"
                  data-cursor="Portrait"
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    !showBot
                      ? "bg-accent font-semibold text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FiUser className="h-3 w-3" />
                  <span>Photo</span>
                </button>
                <button
                  onClick={awakenBot}
                  type="button"
                  data-cursor="3D Bot"
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    showBot
                      ? "bg-accent font-semibold text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FiCpu className="h-3 w-3" />
                  <span>3D Bot</span>
                </button>
              </div>
            </div>

            {/* Main Visual Capsule with Smooth Morph Transition */}
            <div className="relative min-h-[430px] sm:min-h-[470px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                {!showBot ? (
                  /* ── Professional Portfolio Profile Card ── */
                  <motion.div
                    key="portrait-card"
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={awakenBot}
                    role="button"
                    tabIndex={0}
                    data-cursor="Click to Wake Bot"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        awakenBot();
                      }
                    }}
                    title="Click profile photo to awaken the 3D Bot & Terminal"
                    className="group relative mx-auto flex h-[430px] w-full max-w-[420px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border-strong bg-surface/90 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:border-accent/80 hover:shadow-[0_25px_60px_rgba(168,162,116,0.22)] focus:outline-none sm:h-[470px] lg:h-[500px]"
                  >
                    {/* Ambient Glow backing */}
                    <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent/15 via-transparent to-accent/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Mechanical Corner Bracket Accents */}
                    <div className="pointer-events-none absolute inset-0 z-20">
                      <span className="absolute left-2.5 top-2.5 h-3 w-3 border-l-2 border-t-2 border-accent/60" />
                      <span className="absolute right-2.5 top-2.5 h-3 w-3 border-r-2 border-t-2 border-accent/60" />
                      <span className="absolute bottom-2.5 left-2.5 h-3 w-3 border-b-2 border-l-2 border-accent/60" />
                      <span className="absolute bottom-2.5 right-2.5 h-3 w-3 border-b-2 border-r-2 border-accent/60" />
                    </div>

                    {/* Profile Image with centered face framing */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-deep">
                      <img
                        src="/profile.png"
                        alt="Divya Vikash — Computer Science Student"
                        style={{ objectPosition: "50% 68%" }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle gradient overlays: keeps face bright & clear while ensuring badge contrast */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    {/* Top Overlay Badge */}
                    <div className="relative z-10 flex items-center justify-between p-4">
                      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 shadow-lg backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                        <span className="font-mono text-[10.5px] font-medium uppercase tracking-wider text-foreground">
                          Divya Vikash
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/20 px-2.5 py-1 text-accent shadow-md backdrop-blur-md">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        <span className="font-mono text-[9.5px] uppercase tracking-wider font-semibold">
                          AI Inside
                        </span>
                      </div>
                    </div>

                    {/* Bottom Interactive Capsule CTA - sleek HUD bar over chest leaving face fully visible */}
                    <div className="relative z-10 p-3.5">
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-accent/80 group-hover:bg-black/80">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                            <Sparkles className="h-3.5 w-3.5" />
                          </span>
                          <div className="text-left">
                            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-foreground">
                              Awaken 3D Bot & Terminal
                            </p>
                            <p className="font-mono text-[9px] text-muted-foreground">
                              Interactive AI Knowledge Console
                            </p>
                          </div>
                        </div>
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                          <FiArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* ── 3D Interactive Bot Scene ── */
                  <motion.div
                    key="bot-scene"
                    initial={{ opacity: 0, scale: 0.96, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    {/* Clickable 3D floating bot */}
                    <div
                      onClick={() => setOpen((prev) => !prev)}
                      role="button"
                      tabIndex={0}
                      data-cursor="Click Bot"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpen((prev) => !prev);
                        }
                      }}
                      title={open ? "Click bot to fold console" : "Click bot to deploy console"}
                      className="group relative h-[430px] cursor-pointer sm:h-[470px] lg:h-[500px] focus:outline-none"
                    >
                      <HeroScene active={open} />

                      {/* Floating hint chip */}
                      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border-strong bg-surface/90 px-4 py-1.5 text-center shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-accent/80">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                          {open
                            ? "▲ Active Projector — Click bot to fold"
                            : "✦ Click bot to deploy terminal"}
                        </span>
                      </div>
                    </div>

                    {/* Holographic Data Beam Connector when active */}
                    {open ? (
                      <div className="relative mx-auto -my-1.5 flex h-4 w-32 items-center justify-center overflow-hidden">
                        <div className="h-full w-0.5 bg-gradient-to-b from-accent via-accent/80 to-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent blur-sm" />
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Console Panel (Always available beneath, or opens when bot awakened) */}
            <div className="mt-3">
              <AboutInterface open={open} onOpen={awakenBot} onClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
