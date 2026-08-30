const WEEKS = 53;

function buildGrid(days) {
  const map = new Map(days.map((d) => [d.date, d.count]));
  const today = new Date();
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  // walk back to the most recent Saturday so columns align to weeks
  const endDow = end.getUTCDay();
  const gridEnd = new Date(end);
  gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - endDow));

  const cells = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    const week = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date(gridEnd);
      date.setUTCDate(date.getUTCDate() - (w * 7 + d));
      const key = date.toISOString().slice(0, 10);
      week.push({ date: key, count: map.get(key) ?? 0, future: date > end });
    }
    cells.push(week);
  }
  return cells;
}

function level(count, max) {
  if (!count) return 0;
  const r = count / Math.max(max, 1);
  if (r > 0.6) return 4;
  if (r > 0.35) return 3;
  if (r > 0.15) return 2;
  return 1;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function Heatmap({ days = [], accentLabel }) {
  const grid = buildGrid(days);
  const max = days.reduce((m, d) => Math.max(m, d.count), 0);

  let lastMonth = -1;
  const monthLabels = grid.map((week) => {
    const m = new Date(`${week[0].date}T00:00:00Z`).getUTCMonth();
    if (m !== lastMonth) {
      lastMonth = m;
      return MONTHS[m];
    }
    return "";
  });

  return (
    <div className="overflow-x-auto pb-1">
      <div className="min-w-[720px]">
        <div className="flex gap-[3px]">
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="w-[10px] font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              {m}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex gap-[3px]">
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => {
                const l = day.future ? 0 : level(day.count, max);
                return (
                  <span
                    key={day.date}
                    title={`${day.count} on ${day.date}`}
                    className="h-[10px] w-[10px] border border-border"
                    style={{
                      backgroundColor: l
                        ? `color-mix(in oklab, var(--accent) ${l * 24 + 12}%, transparent)`
                        : "transparent",
                      opacity: day.future ? 0.3 : 1,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="label">{accentLabel}</p>
          <div className="flex items-center gap-1.5">
            <span className="label">Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className="h-[10px] w-[10px] border border-border"
                style={{
                  backgroundColor: l
                    ? `color-mix(in oklab, var(--accent) ${l * 24 + 12}%, transparent)`
                    : "transparent",
                }}
              />
            ))}
            <span className="label">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
