interface PriorityBadgeProps {
  level: "critical" | "high" | "medium";
}

export function PriorityBadge({ level }: PriorityBadgeProps) {
  return <span className={`badge-${level}`}>{level.toUpperCase()}</span>;
}
