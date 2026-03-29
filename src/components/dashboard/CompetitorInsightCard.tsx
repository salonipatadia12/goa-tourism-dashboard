"use client";

interface CompetitorInsightCardProps {
  title: string;
  description: string;
  icon: string;
  type: "positive" | "negative" | "warning";
}

export function CompetitorInsightCard({ title, description, icon, type }: CompetitorInsightCardProps) {
  const colorMap = {
    positive: {
      border: "border-[#10B981]/20",
      bg: "bg-[#10B981]/5",
      title: "text-[#10B981]",
    },
    negative: {
      border: "border-[#EF4444]/20",
      bg: "bg-[#EF4444]/5",
      title: "text-[#EF4444]",
    },
    warning: {
      border: "border-[#F59E0B]/20",
      bg: "bg-[#F59E0B]/5",
      title: "text-[#F59E0B]",
    },
  };

  const colors = colorMap[type];

  return (
    <div className={`card p-6 ${colors.border} ${colors.bg}`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${colors.title} mb-2 uppercase tracking-wider`}>
            {title}
          </h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
