"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function LoanChart({ data }: { data: { year: number; totalCost: number }[] }) {
  return (
    <div className="card rounded-xl shadow p-4 sm:p-6 h-[250px] sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="year" stroke="var(--foreground)" fontSize={12} />
          <YAxis
            tickFormatter={(v) => `RM ${v}`}
            stroke="var(--foreground)"
            fontSize={12}
            width={80}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--card-background)", color: "var(--foreground)" }}
            formatter={(value: number) => [`RM ${value.toFixed(2)}`, 'Total Cost']}
            labelFormatter={(year) => `Year: ${year}`}
          />
          <Line type="monotone" dataKey="totalCost" stroke="var(--chart-line)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
