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

    // CSV Headers — matching LoanTable columns
    const headers = [
      "Year",
      "World Bank Annual Lending Interest Rate (MSIA) (%)",
      "Net Annual Lending Interest Rate p.a (incl. BNM adjustment if applied) (%)",
      "Loan Principal (RM)",
      "Origination Fee (RM)",
      "Upfront Fee (RM)",
      "Interest Cost (RM)",
      "Cost of Loan (Interest + Origination / Upfront Fee) (RM)",
      "Monthly Repayment of Loan (Principal + Interest + Fees) (RM)",
      "Total Payment (Principal + Cost of Loan) (RM)",
    ];

    // Format each row with fixed decimal precision
    const rows = results.map((r) => [
      r.year,
      r.originalRate.toFixed(3),
      r.appliedRate.toFixed(3),
      r.principalFinanced.toFixed(2),
      r.originationFee.toFixed(2),
      r.upfrontFee.toFixed(2),
      r.interestFee.toFixed(2),
      r.totalCost.toFixed(2),
      r.monthlyPayment.toFixed(2),
      r.totalRepayment.toFixed(2),
    ]);

    // Build CSV content
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    // Create downloadable CSV blob
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "loan_analysis_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };

  // Theme styling
  const buttonClass =
    theme === "light"
      ? "flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fffeb5] hover:bg-[#fff79a] text-gray-800 font-medium shadow transition"
      : "flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium shadow transition";

  return (
    <button
      onClick={exportToCsv}
      className={buttonClass}
      disabled={!results || results.length === 0}
      title={!results?.length ? "No data to export" : "Export results as CSV"}
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
      Export Loan Data to CSV
    </button>
  );
}
