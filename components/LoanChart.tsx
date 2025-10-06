"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useMemo } from "react";

export default function LoanChart({
  data,
}: {
  data: { year: number; totalCost: number }[];
}) {
  // 🧹 Filter invalid or missing data to prevent gaps
  const safeData = useMemo(
    () => data.filter((d) => Number.isFinite(d.totalCost)),
    [data]
  );

  return (
    <div className="card rounded-xl shadow p-4 sm:p-6">
      {/* 🏷️ Chart Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-center mb-4">
        Total Borrowing Cost by Year
      </h3>

      {/* 🧭 Fixed height container to prevent flex/ResponsiveContainer bugs */}
      <div className="h-[400px] sm:h-[500px] min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={safeData}
            margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
          >
            {/* 📅 X-Axis (Year) */}
            <XAxis
              dataKey="year"
              stroke="var(--foreground)"
              fontSize={12}
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -5,
                fill: "var(--foreground)",
                fontSize: 14,
                dy: 25,
              }}
              padding={{ left: 20, right: 20 }}
            />

            {/* 💰 Y-Axis (Cost of Borrowing) */}
            <YAxis
              tickFormatter={(v) => `RM ${v}`}
              stroke="var(--foreground)"
              fontSize={12}
              width={90}
              label={{
                value: "Cost of Borrowing (RM)",
                angle: -90,
                position: "insideLeft",
                fill: "var(--foreground)",
                fontSize: 14,
                dy: 70, // move it slightly down so it doesn’t overlap
              }}
            />

            {/* 💡 Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-background)",
                color: "var(--foreground)",
                borderRadius: "8px",
                border: "1px solid var(--foreground)",
              }}
              formatter={(value: number) => [
                `RM ${value.toFixed(2)}`,
                "Total Cost",
              ]}
              labelFormatter={(year) => `Year: ${year}`}
            />

            {/* 📈 Line */}
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke="var(--chart-line)"
              strokeWidth={2}
              dot={false}
              connectNulls={true} // 🔗 smooths out null gaps
              isAnimationActive={false} // 🚫 prevent flicker when hovering
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
