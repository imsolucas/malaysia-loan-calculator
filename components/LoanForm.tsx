"use client";

import React, { useState, useEffect } from "react";

type FeeType = "flat" | "percent";
type FeeTreatment = "upfront" | "financed";

export type LoanFormValues = {
  loanAmount: string;
  feeValue: string;
  feeType: FeeType;
  feeTreatment: FeeTreatment;
  bnmAdjustment: boolean;
  months?: number;
};

export default function LoanForm({
  onChange,
}: {
  onChange: (values: {
    loanAmount: number;
    feeValue: number;
    feeType: FeeType;
    feeTreatment: FeeTreatment;
    bnmAdjustment: boolean;
    months?: number;
  }) => void;
}) {
  const [values, setValues] = useState<LoanFormValues>({
    loanAmount: "10000",
    feeValue: "1",
    feeType: "percent",
    feeTreatment: "financed",
    bnmAdjustment: false,
    months: 12,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    onChange({
      ...values,
      loanAmount: Number(values.loanAmount) || 0,
      feeValue: Number(values.feeValue) || 0,
    });
  }, [values, onChange]);

  const updateField = <K extends keyof LoanFormValues>(
    key: K,
    val: LoanFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: val }));

    if (key === "loanAmount" && typeof val === "string") {
      const num = Number(val);
      setError(val !== "" && num <= 0);
    }
  };

  const years = values.months ? (values.months / 12).toFixed(0) : "1";

  return (
    <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
      {/* Loan Amount Card */}
      <div
        className={`card rounded-lg sm:rounded-xl shadow-lg transition-all duration-200 overflow-hidden ${
          error ? "ring-2 ring-red-500" : ""
        }`}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <label
                className="block text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Loan Amount
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <span
                  className="text-xl sm:text-2xl font-semibold flex-shrink-0"
                  style={{ color: "var(--card-foreground)" }}
                >
                  RM
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="text-2xl sm:text-4xl font-bold bg-transparent border-none outline-none w-full focus:ring-0 min-w-0"
                  style={{ color: "var(--card-foreground)" }}
                  value={values.loanAmount}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, ""); // remove non-digits
                    updateField("loanAmount", cleaned);
                  }}
                  placeholder="0"
                />
              </div>
              {error && (
                <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm mt-2 sm:mt-3 flex items-center gap-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Please enter an amount greater than RM0
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loan Duration Card */}
      <div className="card rounded-lg sm:rounded-xl shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <label
                className="block text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Loan Duration
              </label>
              <div className="flex items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                <span
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: "var(--card-foreground)" }}
                >
                  {years}
                </span>
                <span
                  className="text-lg sm:text-xl font-medium"
                  style={{ color: "var(--card-foreground)" }}
                >
                  Year{years !== "1" ? "s" : ""}
                </span>
                <span
                  className="text-xs sm:text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  ({values.months ?? 12} months)
                </span>
              </div>
              <select
                className="input w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 focus:outline-none transition-all border-0"
                value={values.months ?? 12}
                onChange={(e) =>
                  updateField(
                    "months",
                    Number(e.target.value) as LoanFormValues["months"]
                  )
                }
              >
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
                <option value={24}>24 months</option>
                <option value={36}>36 months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Value Card */}
      <div className="card rounded-lg sm:rounded-xl shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <label
                className="block text-xs font-medium uppercase tracking-wide mb-1 sm:mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Origination Fee
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                {values.feeType === "flat" && (
                  <span
                    className="text-xl sm:text-2xl font-semibold flex-shrink-0"
                    style={{ color: "var(--card-foreground)" }}
                  >
                    RM
                  </span>
                )}
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="text-2xl sm:text-4xl font-bold bg-transparent border-none outline-none w-24 sm:w-32 focus:ring-0 min-w-0"
                  style={{ color: "var(--card-foreground)" }}
                  value={values.feeValue}
                  onChange={(e) => {
                    // Remove non-digit characters
                    let cleaned = e.target.value.replace(/\D/g, "");

                    if (values.feeType === "percent") {
                      // Limit percentage between 0 and 100
                      let num = Number(cleaned);
                      if (num > 100) num = 100;
                      cleaned = num.toString();
                    }

                    // Only update as string (since your state uses string)
                    updateField("feeValue", cleaned.toString());
                  }}
                  placeholder="0"
                />
                <span
                  className="text-2xl sm:text-3xl font-bold flex-shrink-0"
                  style={{ color: "var(--card-foreground)" }}
                >
                  {values.feeType === "percent" ? "%" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings Card */}
      <div className="card rounded-lg sm:rounded-xl shadow-lg transition-all duration-200">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              style={{ color: "var(--foreground)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <h3
              className="text-xs sm:text-sm font-bold uppercase tracking-wide"
              style={{ color: "var(--card-foreground)" }}
            >
              Additional Settings
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* Fee Type */}
            <div>
              <label
                className="block text-xs sm:text-sm font-medium mb-2"
                style={{ color: "var(--card-foreground)" }}
              >
                Fee Type
              </label>
              <select
                className="input w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 focus:outline-none transition-all border-0"
                value={values.feeType}
                onChange={(e) =>
                  updateField("feeType", e.target.value as FeeType)
                }
              >
                <option value="flat">Flat Amount (RM)</option>
                <option value="percent">Percentage of Loan (%)</option>
              </select>
            </div>

            {/* Fee Treatment */}
            <div>
              <label
                className="block text-xs sm:text-sm font-medium mb-2"
                style={{ color: "var(--card-foreground)" }}
              >
                Fee Payment Method
              </label>
              <select
                className="input w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 focus:outline-none transition-all border-0"
                value={values.feeTreatment}
                onChange={(e) =>
                  updateField("feeTreatment", e.target.value as FeeTreatment)
                }
              >
                <option value="upfront">
                  Pay Upfront (separate from loan)
                </option>
                <option value="financed">Add to Loan (financed)</option>
              </select>
            </div>

            {/* BNM Adjustment */}
            <div
              className="pt-2 sm:pt-2"
              style={{ borderTop: "1px solid var(--foreground)" }}
            >
              <label className="flex items-start gap-2 sm:gap-3 cursor-pointer group pt-2 sm:pt-3">
                <div className="flex items-center h-5 sm:h-6 mt-0.5 sm:mt-0">
                  <input
                    id="bnmAdjustment"
                    type="checkbox"
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 text-green-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-offset-0 transition-all cursor-pointer"
                    style={{ borderColor: "var(--foreground)" }}
                    checked={values.bnmAdjustment}
                    onChange={(e) =>
                      updateField(
                        "bnmAdjustment",
                        e.target.checked as LoanFormValues["bnmAdjustment"]
                      )
                    }
                  />
                </div>
                <div className="flex-grow">
                  <span
                    className="text-xs sm:text-sm font-medium transition-colors"
                    style={{ color: "var(--card-foreground)" }}
                  >
                    Apply BNM Adjustment
                  </span>
                  <p
                    className="text-xs mt-0.5 sm:mt-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Reduces effective rate by 2.75%
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
