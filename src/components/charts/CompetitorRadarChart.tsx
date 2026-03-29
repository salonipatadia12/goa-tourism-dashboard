"use client";

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";

const radarAxes = ["Affordability", "Connectivity", "Visa Ease", "Infrastructure", "Nightlife", "Marketing"];

const radarData = radarAxes.map((axis) => {
  const values: Record<string, Record<string, number>> = {
    Affordability: { Goa: 25, Thailand: 85, Bali: 70, Vietnam: 90 },
    Connectivity: { Goa: 30, Thailand: 95, Bali: 60, Vietnam: 65 },
    "Visa Ease": { Goa: 35, Thailand: 90, Bali: 75, Vietnam: 70 },
    Infrastructure: { Goa: 45, Thailand: 90, Bali: 65, Vietnam: 50 },
    Nightlife: { Goa: 60, Thailand: 85, Bali: 55, Vietnam: 45 },
    Marketing: { Goa: 20, Thailand: 95, Bali: 75, Vietnam: 60 },
  };
  return { axis, ...values[axis] };
});

export default function CompetitorRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="var(--border-default)" />
        <PolarAngleAxis dataKey="axis" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} />
        <Radar name="Goa" dataKey="Goa" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.15} strokeWidth={2} isAnimationActive={false} />
        <Radar name="Thailand" dataKey="Thailand" stroke="var(--crimson)" fill="var(--crimson)" fillOpacity={0.08} strokeWidth={1.5} isAnimationActive={false} />
        <Radar name="Bali" dataKey="Bali" stroke="var(--amber)" fill="var(--amber)" fillOpacity={0.08} strokeWidth={1.5} isAnimationActive={false} />
        <Radar name="Vietnam" dataKey="Vietnam" stroke="var(--emerald)" fill="var(--emerald)" fillOpacity={0.08} strokeWidth={1.5} isAnimationActive={false} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
