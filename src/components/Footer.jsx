import { profile } from "../data/portfolio.js";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
        <span className="font-mono tracking-[0.25em] text-foreground">{profile.initials}</span>
        <p className="text-subtle">Designed and built by {profile.name}</p>
        <span className="label">2026</span>
      </div>
    </footer>
  );
}
