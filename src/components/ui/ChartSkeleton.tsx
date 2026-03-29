// Deterministic bar heights — no Math.random() during render
const BAR_HEIGHTS = [45, 72, 38, 60, 28, 55, 68, 42, 50];

export function ChartSkeleton({ height = 320 }: { height?: number }) {
  return (
    <div className="card p-6">
      <div className="mb-6">
        <div className="h-4 w-48 bg-white/[0.06] rounded animate-pulse" />
        <div className="h-3 w-72 bg-white/[0.04] rounded mt-2 animate-pulse" />
      </div>
      <div
        className="bg-white/[0.03] rounded-lg flex items-end justify-center gap-2 px-8 pb-4"
        style={{ height }}
      >
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="bg-white/[0.06] rounded-t animate-pulse"
            style={{
              width: "8%",
              height: `${h}%`,
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function KPISkeleton() {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/[0.06] animate-pulse" />
        <div className="h-3 w-24 bg-white/[0.06] rounded animate-pulse" />
      </div>
      <div className="h-10 w-32 bg-white/[0.06] rounded animate-pulse mb-3" />
      <div className="h-6 w-20 bg-white/[0.04] rounded animate-pulse" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card p-6">
      <div className="h-4 w-40 bg-white/[0.06] rounded animate-pulse mb-6" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-10 bg-white/[0.04] rounded animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
