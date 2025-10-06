"use client";

import { YearResult } from "@/lib/calc";

type Props = {
  results?: YearResult[]; // make it optional to handle undefined
  theme: "light" | "dark";
};

export default function ExportButton({ results, theme }: Props) {
  const exportToCsv = () => {
    if (!results || results.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "Year",
      "Original Rate (%)",
      "Applied Rate (%)",
      "Principal Financed (RM)",
      "Upfront Fee (RM)",
      "Interest Paid (RM)",
      "Total Cost (RM) (Upfront + Interest)",
      "Monthly Payment (RM)",
      "Total Repayment (RM)",
    ];

    const rows = results.map((r) => [
      r.year,
      r.originalRate.toFixed(3),
      r.appliedRate.toFixed(3),
      r.principalFinanced.toFixed(3),
      r.originationFee.toFixed(3),
      r.interestFee.toFixed(3),
      r.totalCost.toFixed(3),
      r.monthlyPayment.toFixed(3),
      r.totalRepayment.toFixed(3),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loan_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const buttonClass =
    theme === "light"
      ? "flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fffeb5] hover:bg-[#fff79a] text-gray-800 font-medium shadow transition"
      : "flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium shadow transition";

  return (
    <button
      onClick={exportToCsv}
      className={buttonClass}
      disabled={!results || results.length === 0}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v16h16V4M4 12h16M12 4v16"
        />
      </svg>
      Export Results to CSV
    </button>
  );
}
