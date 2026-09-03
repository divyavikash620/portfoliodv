import { useEffect, useState } from "react";
import { profile } from "../data/portfolio.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

const links = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "coding", label: "Coding" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            onClick={go("top")}
            data-cursor="Home"
            className="font-mono text-sm tracking-[0.25em] text-foreground"
          >
            {profile.initials}
          </a>

          <div className="hidden items-center gap-7 md:flex lg:gap-8">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                data-cursor={l.label}
                className="link-underline text-sm text-subtle transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className="block h-px w-5 bg-foreground transition-transform duration-300"
                style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-px w-5 bg-foreground transition-transform duration-300"
                style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background transition-[opacity,visibility] duration-400 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="ambient-bg flex h-full flex-col justify-between px-6 pb-12 pt-28">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className="flex items-baseline gap-4 border-b border-border py-4"
                  style={{
                    transition: `opacity 500ms ${i * 45}ms, transform 500ms ${i * 45}ms`,
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(10px)",
                  }}
                >
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-3xl font-light text-foreground">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label">{profile.email}</p>
        </div>
      </div>
    </>
  );
}
