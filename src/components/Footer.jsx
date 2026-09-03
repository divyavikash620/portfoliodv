import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowUp } from "react-icons/fi";
import { profile } from "../data/portfolio.js";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="border-t border-border bg-surface/30">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-4">
            <span className="font-mono tracking-[0.25em] text-foreground">{profile.initials}</span>
            <span className="text-border">/</span>
            <p className="text-subtle">Designed & built by {profile.name}</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="label">2026</span>
            <button
              onClick={scrollToTop}
              type="button"
              data-cursor="Top"
              aria-label="Scroll to top of page"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-subtle transition-colors hover:text-foreground"
            >
              <span>Back to Top</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface transition-all group-hover:border-accent group-hover:text-accent group-hover:-translate-y-0.5">
                <FiArrowUp className="h-3 w-3" />
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Go To Top Little Icon at bottom-right */}
      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            type="button"
            data-cursor="Top"
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface/90 text-foreground shadow-2xl backdrop-blur-md transition-colors hover:border-accent hover:bg-surface-elevated hover:text-accent focus:outline-none"
          >
            <FiArrowUp className="h-4 w-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
