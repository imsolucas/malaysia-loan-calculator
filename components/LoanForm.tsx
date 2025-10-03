"use client";

import React, { useState, useEffect } from "react";
import type { FeeTreatment, FeeType } from "@/lib/calc";

export type LoanFormValues = {
  loanAmount: number;
  feeValue: number;
  feeType: FeeType;
  feeTreatment: FeeTreatment;
  bnmAdjustment: boolean;
  months?: number;
};

export default function LoanForm({ onChange }: { onChange: (values: LoanFormValues) => void }) {
  // Local state (controlled inputs)
  const [values, setValues] = useState<LoanFormValues>({
    loanAmount: 10000,
    feeValue: 1,
    feeType: "percent",
    feeTreatment: "financed",
    bnmAdjustment: false,
    months: 12,
  });

  // Sync state upwards whenever it changes
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  // Helper to update fields
  const updateField = <K extends keyof LoanFormValues>(key: K, val: LoanFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="card rounded-xl shadow p-4 sm:p-6 space-y-4">
      <h2 className="text-lg font-semibold">Loan Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Loan Amount */}
        <div className="md:col-span-2">
          <label htmlFor="loanAmount" className="block text-sm font-medium">
            Loan Amount (RM)
          </label>
          <input
            id="loanAmount"
            type="number"
            className="input mt-1 w-full rounded border px-2 py-1"
            value={values.loanAmount}
            onChange={(e) => updateField("loanAmount", Number(e.target.value))}
          />
        </div>

        {/* Fee Value */}
        <div>
          <label htmlFor="feeValue" className="block text-sm font-medium">
            Fee Value
          </label>
          <input
            id="feeValue"
            type="number"
            className="input mt-1 w-full rounded border px-2 py-1"
            value={values.feeValue}
            onChange={(e) => updateField("feeValue", Number(e.target.value))}
          />
        </div>

        {/* Fee Type */}
        <div>
          <label htmlFor="feeType" className="block text-sm font-medium">
            Origination Fee
          </label>
          <select
            id="feeType"
            className="input mt-1 w-full rounded border px-2 py-1"
            value={values.feeType}
            onChange={(e) => updateField("feeType", e.target.value as FeeType)}
          >
            <option value="flat">Flat (RM)</option>
            <option value="percent">% of Loan</option>
          </select>
        </div>

        {/* Fee Treatment */}
        <div className="md:col-span-2">
          <label htmlFor="feeTreatment" className="block text-sm font-medium">
            Fee Treatment
          </label>
          <select
            id="feeTreatment"
            className="input mt-1 w-full rounded border px-2 py-1"
            value={values.feeTreatment}
            onChange={(e) => updateField("feeTreatment", e.target.value as FeeTreatment)}
          >
            <option value="upfront">Upfront (not financed)</option>
            <option value="financed">Financed (added to loan)</option>
          </select>
        </div>

        {/* Loan Duration */}
        <div className="md:col-span-2">
          <label htmlFor="months" className="block text-sm font-medium">
            Loan Duration (months)
          </label>
          <select
            id="months"
            className="input mt-1 w-full rounded border px-2 py-1"
            value={values.months ?? 12}
            onChange={(e) => updateField("months", Number(e.target.value))}
          >
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
            <option value={24}>24 months</option>
            <option value={36}>36 months</option>
          </select>
        </div>
      </div>

      {/* BNM Adjustment */}
      <div className="flex items-center gap-2 pt-2">
        <input
          id="bnmAdjustment"
          type="checkbox"
          className="h-4 w-4 rounded"
          checked={values.bnmAdjustment}
          onChange={(e) => updateField("bnmAdjustment", e.target.checked)}
        />
        <label htmlFor="bnmAdjustment" className="text-sm">
          Apply BNM Adjustment (−2.75%)
        </label>
      </div>
    </div>
  );
}
