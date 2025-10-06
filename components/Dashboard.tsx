"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoanForm from "./LoanForm";
import LoanTable from "./LoanTable";
import LoanChart from "./LoanChart";
import { computeAllYears, LoanInputs } from "@/lib/calc";
import { LendingRate, fetchLendingRates } from "@/lib/fetchRates";
import { useTheme } from "@/contexts/ThemeContext";
import ExportButton from "./ExportButton";
import MalaysiaOverview from "./MalaysiaOverview";

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [rates, setRates] = useState<LendingRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [inputs, setInputs] = useState<LoanInputs>({
    loanAmount: 10000,
    feeValue: 1,
    feeType: "percent",
    feeTreatment: "financed",
    bnmAdjustment: false,
    months: 12,
  });

  useEffect(() => {
    setLoading(true);
    fetchLendingRates()
      .then(setRates)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const results = computeAllYears(rates, inputs);

  return (
    <main className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-semibold">Loan Calculator</h1>
        <div className="flex items-center gap-4">
          <ExportButton results={results} theme={theme} />
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition ${
              theme === "light"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-[#fffeb5] text-black hover:bg-[#fff79a]"
            }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          className="lg:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LoanForm onChange={setInputs} />
        </motion.div>

        <div className="lg:w-2/3 space-y-6">
          {loading && (
            <div className="text-center py-10">Loading historical rates...</div>
          )}
          {error && (
            <div className="text-center text-red-500 py-10">
              Error: {error.message}
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <>
              {/* 🇲🇾 Malaysia Overview Section - ABOVE Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MalaysiaOverview theme={theme} />
              </motion.div>

              {/* Loan Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <LoanChart
                  data={results.map((r) => ({
                    year: r.year,
                    totalCost: r.totalCost,
                  }))}
                />
              </motion.div>

              {/* Loan Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <LoanTable results={results} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
