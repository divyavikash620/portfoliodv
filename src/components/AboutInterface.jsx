import { useEffect, useRef, useState } from "react";
import { ask, suggestions } from "../data/knowledgeBase.js";

export function AboutInterface({ open, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [log, setLog] = useState([]);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const submit = (value) => {
    const q = (value ?? query).trim();
    if (!q) return;
    setLog((l) => [...l, { q, a: ask(q) }]);
    setQuery("");
  };

  if (!open) {
    return (
      <button
        onClick={onOpen}
        className="group flex items-center gap-3 border border-border-strong bg-surface/70 px-5 py-3 backdrop-blur-sm transition-colors hover:bg-surface-elevated"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
          Know about me
        </span>
        <span className="text-subtle transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    );
  }

  return (
    <div className="w-full max-w-md border border-border-strong bg-surface/90 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label">Know about me</span>
        <button onClick={onClose} className="label transition-colors hover:text-foreground">
          Close
        </button>
      </div>

      <div ref={logRef} className="max-h-56 space-y-4 overflow-y-auto px-4 py-4">
        {log.length === 0 ? (
          <p className="text-sm leading-relaxed text-subtle">
            Ask anything about Divya — projects, education, skills, or the coding journey. Answers come
            from a local knowledge base, not an AI model.
          </p>
        ) : (
          log.map((item, i) => (
            <div key={i} className="space-y-1.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{item.q}</p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{item.a}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
        {suggestions.slice(0, 3).map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            className="border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-center gap-3 border-t border-border px-4 py-3"
      >
        <span className="font-mono text-xs text-accent">/</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="type a question…"
          aria-label="Ask about Divya"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="label transition-colors hover:text-foreground">
          Ask
        </button>
      </form>
    </div>
  );
}
