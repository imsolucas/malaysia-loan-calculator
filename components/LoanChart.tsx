"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function LoanChart({
  data,
}: {
  data: { year: number; totalCost: number }[];
}) {
  return (
    <div className="card rounded-xl shadow p-4 sm:p-6 h-[400px] sm:h-[500px]">
      <h3 className="text-lg font-semibold text-center mb-3">
        Total Borrowing Cost By Year
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 60 }}>

          {/* X-Axis */}
          <XAxis
            dataKey="year"
            stroke="var(--foreground)"
            fontSize={12}
            label={{
              value: "Year",
              position: "insideBottom",
              offset: -5,
              fill: "var(--foreground)",
              fontSize: 16,
			  dy: 20,
            }}
			padding={{ left: 20, right: 20 }}
          />

          {/* Y-Axis */}
          <YAxis
            tickFormatter={(v) => `RM ${v}`}
            stroke="var(--foreground)"
            fontSize={12}
            width={80}
            label={{
              value: "Cost of Borrowing (RM)",
              angle: -90,
              position: "insideLeft",
              fill: "var(--foreground)",
              fontSize: 16,
              dy: 80,
            }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card-background)",
              color: "var(--foreground)",
            }}
            formatter={(value: number) => [
              `RM ${value.toFixed(2)}`,
              "Total Cost",
            ]}
            labelFormatter={(year) => `Year: ${year}`}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="totalCost"
            stroke="var(--chart-line)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
