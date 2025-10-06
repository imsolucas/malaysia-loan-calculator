"use client";

import { YearResult } from "@/lib/calc";

type Props = {
  results?: YearResult[];
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
      "World Bank Annual Lending Interest Rate (MSIA)",
      "Net Annual Lending Interest Rate p.a (incl. BNM adjustment if applied)",
      "Loan Principal (RM)",
      "Origination Fee (Added to Loan) (RM)",
      "Upfront Payment (of Origination Fee) (RM)",
      "Interest Cost (RM)",
      "Cost of Loan (Interest Charges & Origination Fee) (RM)",
      "Monthly Repayment (Principal & Interest Charges & Origination Fee) (RM)",
      "Total Payment (Principal & Cost of Loan) (RM)",
    ];

    const clean = (val: number | string) =>
      String(val).replace(/,/g, "");

    const rows = results.map((r) => [
      clean(r.year),
      clean(r.originalRate.toFixed(3)),
      clean(r.appliedRate.toFixed(3)),
      clean(r.principalFinanced.toFixed(2)),
      clean(r.originationFee.toFixed(2)),
      clean(r.upfrontFee.toFixed(2)),
      clean(r.interestFee.toFixed(2)),
      clean(r.totalCost.toFixed(2)),
      clean(r.monthlyPayment.toFixed(2)),
      clean(r.totalRepayment.toFixed(2)),
    ]);

    // Convert to CSV format
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    // Trigger CSV download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loan_analysis_by_year.csv";
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
      Export to CSV
    </button>
  );
}
