interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  width?: number;
}

export function ProgressBar({ value, max = 100, color = "var(--cyan)", width }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="progress-bar" style={width ? { width } : undefined}>
      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
