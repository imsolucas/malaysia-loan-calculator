"use client";

import { YearResult, formatRM, formatPercent } from "@/lib/calc";

export default function LoanTable({ results }: { results: YearResult[] }) {
  return (
    <div className="card rounded-xl shadow p-6 sm:p-8">
      <h2 className="text-lg font-semibold mb-4">Analysis Loan by Year</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="border-gray-100 dark:border-gray-800">
            <tr>
              <th className="p-2 text-left font-semibold">Year</th>
              <th className="p-2 text-left font-semibold">World Bank Annual Lending Interest Rate<br/>(MSIA)</th>
              <th className="p-2 text-left font-semibold">Net Annual Lending Interest rate p.a<br/>(incl. BNM adjustment, if applied)</th>
              <th className="p-2 text-left font-semibold">Loan Principal</th>
              <th className="p-2 text-left font-semibold">Origination Fee</th>
              <th className="p-2 text-left font-semibold">Total Interest Cost</th>
              <th className="p-2 text-left font-semibold">Total Borrowing Cost</th>
              <th className="p-2 text-left font-semibold">Monthly Repayment of Loan (Principal + Interest + Origination(if any))</th>
              <th className="p-2 text-left font-semibold">Total Payment (Principal + Borrowing Cost)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr
                key={r.year}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="p-2 whitespace-nowrap">{r.year}</td>
                <td className="p-2 whitespace-nowrap">{formatPercent(r.originalRate)}</td>
                <td className="p-2 whitespace-nowrap">{formatPercent(r.appliedRate)}</td>
                <td className="p-2 whitespace-nowrap">{formatRM(r.principalFinanced)}</td>
				<td className="p-2 whitespace-nowrap">{formatRM(r.originationFee)}</td>
                <td className="p-2 whitespace-nowrap">{formatRM(r.interestFee)}</td>
                <td className="p-2 whitespace-nowrap">{formatRM(r.totalCost)}</td>
                <td className="p-2 whitespace-nowrap">{formatRM(r.monthlyPayment)}</td>
                <td className="p-2 whitespace-nowrap">{formatRM(r.totalRepayment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
