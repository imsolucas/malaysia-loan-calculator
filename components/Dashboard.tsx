"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoanForm from "./LoanForm";
import LoanTable from "./LoanTable";
import LoanChart from "./LoanChart";
import { computeAllYears, LoanInputs } from "@/lib/calc";
import { LendingRate, fetchLendingRates } from "@/lib/fetchRates";
import { useTheme } from "@/contexts/ThemeContext";

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
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
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
          {loading && <div className="text-center py-10">Loading historical rates...</div>}
          {error && <div className="text-center text-red-500 py-10">Error: {error.message}</div>}

          {!loading && !error && results.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <LoanChart data={results.map((r) => ({ year: r.year, totalCost: r.totalCost }))} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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
