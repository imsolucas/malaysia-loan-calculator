"use client";

import { YearResult, formatRM, formatPercent } from "@/lib/calc";

export default function LoanTable({ results }: { results: YearResult[] }) {
  return (
    <div className="card rounded-xl shadow p-6 sm:p-8">
      <h2 className="text-lg font-semibold mb-4">Loan Results by Year</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="border-gray-100 dark:border-gray-800">
            <tr>
              <th className="p-2 text-left font-semibold">Year</th>
              <th className="p-2 text-left font-semibold">Original Rate</th>
              <th className="p-2 text-left font-semibold">Applied Rate</th>
              <th className="p-2 text-left font-semibold">Principal</th>
              <th className="p-2 text-left font-semibold">Upfront Fee</th>
              <th className="p-2 text-left font-semibold">Interest</th>
              <th className="p-2 text-left font-semibold">Total Cost</th>
              <th className="p-2 text-left font-semibold">Monthly</th>
              <th className="p-2 text-left font-semibold">Total Repayment</th>
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
				<td className="p-2 whitespace-nowrap">{formatRM(r.upfrontFee)}</td>
                <td className="p-2 whitespace-nowrap">{formatRM(r.interestPaid)}</td>
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
