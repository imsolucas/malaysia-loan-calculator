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
  const safeData = useMemo(
    () => data.filter((d) => Number.isFinite(d.totalCost)),
    [data]
  );

  return (
    <div className="card rounded-xl shadow p-4 sm:p-6">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-center mb-4">
        Cost of Loan by Year
      </h3>
      <div className="h-[260px] xs:h-[300px] sm:h-[400px] md:h-[500px] min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={safeData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 50,
            }}
          >
            <XAxis
              dataKey="year"
              stroke="var(--foreground)"
              fontSize={12}
              tickMargin={6}
              interval="preserveStartEnd"
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -5,
                fill: "var(--foreground)",
                fontSize: 14,
                dy: 20,
              }}
            />
            <YAxis
              tickFormatter={(v) => `RM ${v}`}
              stroke="var(--foreground)"
              fontSize={12}
              width={60}
              label={{
                value: "Cost of Loan (RM)",
                angle: -90,
                position: "insideLeft",
                fill: "var(--foreground)",
                fontSize: 14,
                dy: 60,
              }}
            />
            <Tooltip
              wrapperStyle={{ zIndex: 10 }}
              contentStyle={{
                backgroundColor: "var(--card-background)",
                color: "var(--foreground)",
                borderRadius: "8px",
                border: "1px solid var(--foreground)",
                fontSize: "12px",
                padding: "6px 10px",
              }}
              formatter={(value: number) => [
                `RM ${value.toFixed(2)}`,
                "Total Cost",
              ]}
              labelFormatter={(year) => `Year: ${year}`}
            />
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke="var(--chart-line)"
              strokeWidth={2}
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
