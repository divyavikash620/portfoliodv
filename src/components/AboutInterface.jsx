import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiMessageSquare,
  FiSend,
  FiX,
  FiNavigation,
  FiCpu,
  FiCornerDownRight,
} from "react-icons/fi";
import { ask, suggestions } from "../data/knowledgeBase.js";

function StreamedText({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      index += 3;
      if (index >= text.length) {
        setDisplayed(text);
        clearInterval(interval);
      } else {
        setDisplayed(text.slice(0, index));
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="whitespace-pre-line text-xs font-light leading-relaxed text-foreground md:text-sm">
      {displayed}
    </p>
  );
}

export function AboutInterface({ open, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [log, setLog] = useState([]);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [log]);

  const submit = (value) => {
    const q = (value ?? query).trim();
    if (!q) return;
    const res = ask(q);
    setLog((l) => [
      ...l,
      {
        id: Date.now(),
        q,
        text: res.text,
        navigate: res.navigate,
        navLabel: res.navLabel,
      },
    ]);
    setQuery("");
  };

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="closed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={onOpen}
            type="button"
            data-cursor="Deploy"
            className="group relative flex w-full items-center justify-between border border-border-strong bg-surface/85 px-6 py-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-accent/80 hover:bg-surface-elevated hover:shadow-[0_10px_30px_rgba(168,162,116,0.18)]"
          >
            <div className="flex items-center gap-3.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <div className="text-left">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
                  Ask the Bot · Local Knowledge Base
                </p>
                <p className="mt-0.5 text-xs text-subtle">
                  Click bot or bar to spit down live terminal
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-all group-hover:border-accent/60 group-hover:text-foreground">
              <span>Eject Panel</span>
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="deployed-panel"
            initial={{ opacity: 0, scaleY: 0, y: -35, scaleX: 0.8, filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleY: 1, y: 0, scaleX: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scaleY: 0, y: -25, scaleX: 0.9, filter: "blur(4px)" }}
            transition={{ type: "spring", damping: 18, stiffness: 320, mass: 0.55 }}
            style={{ transformOrigin: "top center" }}
            className="relative w-full overflow-hidden border border-border-strong bg-surface/95 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            {/* Mechanical top latch brackets */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-3">
              <span className="h-1.5 w-4 bg-accent/80" />
              <span className="h-1.5 w-8 bg-accent/40" />
              <span className="h-1.5 w-4 bg-accent/80" />
            </div>

            {/* Holographic Projection Laser Bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-95 shadow-[0_0_12px_var(--color-accent)] animate-pulse" />

            {/* Header bar with live HUD visualizer */}
            <div className="flex items-center justify-between border-b border-border bg-surface-elevated/80 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <FiCpu className="h-4 w-4 text-accent" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                  Bot Terminal // Knowledge Matrix
                </span>
                {/* Visual frequency bars */}
                <div className="hidden items-center gap-0.5 sm:flex">
                  {[4, 8, 14, 6, 12, 7, 10, 5].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [4, h, 3, h + 2, 4] }}
                      transition={{ duration: 1 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                      className="w-0.5 rounded-full bg-accent/60"
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                type="button"
                data-cursor="Fold"
                aria-label="Fold Bot Console"
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Fold</span>
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Message Stream with typewriter animation */}
            <div ref={logRef} className="max-h-72 space-y-4 overflow-y-auto p-5 md:max-h-80">
              <div className="border border-accent/25 bg-accent/5 p-3.5 text-left backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    ● Bot Deployed · Knowledge Stream Ready
                  </p>
                  <span className="font-mono text-[9px] text-muted-foreground">LATENCY: 0.0ms</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-subtle">
                  Ask anything about Divya — projects (MiniDB, WDTE, SMS), education, skills, or
                  coding journey. Answers are served from the local dataset.
                </p>
              </div>

              {log.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <FiMessageSquare className="h-3 w-3 shrink-0" />
                    <p className="font-mono text-xs font-medium uppercase tracking-wider">
                      {item.q}
                    </p>
                  </div>
                  <div className="border-l-2 border-accent bg-surface/80 pl-3.5 pr-2 py-2.5 shadow-sm">
                    <StreamedText text={item.text} />
                    {item.navigate ? (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mt-3"
                      >
                        <button
                          onClick={() => handleNavigate(item.navigate)}
                          type="button"
                          data-cursor="Jump"
                          className="group inline-flex items-center gap-1.5 border border-border-strong bg-foreground px-3.5 py-1 text-[11px] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <FiNavigation className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          <span>{item.navLabel || "Go to section →"}</span>
                        </button>
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggested quick queries */}
            <div className="border-t border-border bg-surface/50 px-4 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Quick queries:
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => submit(s)}
                    type="button"
                    data-cursor="Query"
                    className="border border-border bg-surface/70 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-all hover:border-accent/80 hover:bg-surface hover:text-foreground"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex items-center gap-2.5 border-t border-border bg-surface-elevated/80 px-4 py-3"
            >
              <span className="font-mono text-xs text-accent">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question (e.g. tell me about MiniDB, or coding stats)..."
                aria-label="Ask about Divya"
                className="w-full bg-transparent text-xs font-light text-foreground outline-none placeholder:text-muted-foreground md:text-sm"
              />
              <button
                type="submit"
                data-cursor="Send"
                aria-label="Submit question"
                className="inline-flex items-center gap-1.5 border border-border-strong bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span>Ask</span>
                <FiSend className="h-3 w-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
