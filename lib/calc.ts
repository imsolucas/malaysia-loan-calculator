export type FeeType = "flat" | "percent";
export type FeeTreatment = "upfront" | "financed";

export type LoanInputs = {
  loanAmount: number;
  feeValue: number;
  feeType: FeeType;
  feeTreatment: FeeTreatment;
  bnmAdjustment: boolean;
  months?: number; // optional, defaults to 12
};

export type YearResult = {
  year: number;
  originalRate: number;
  appliedRate: number;
  principalFinanced: number;
  originationFee: number;
  upfrontFee: number;
  monthlyPayment: number;
  totalPayment: number;
  interestFee: number;
  totalRepayment: number;
  totalCost: number;
};

export function computeFeeAmount(
  loanAmount: number,
  feeValue: number,
  feeType: FeeType
): number {
  if (loanAmount < 0) return 0;
  if (feeType === "flat") return Math.max(0, feeValue);
  return (Math.max(0, feeValue) / 100) * loanAmount;
}

export function applyBNM(originalRate: number, bnmAdjustment: boolean): number {
  if (!bnmAdjustment) return originalRate;
  const applied = originalRate - 2.75;
  return Math.max(0, applied);
}

export function monthlyPaymentForPrincipal(
  principal: number,
  annualRatePct: number,
  months = 12
): number {
  if (months <= 0) throw new Error("Invalid months");
  if (principal <= 0) return 0;

  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;

  const payment =
    principal *
    ((r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
  return payment;
}

export function computeYearResult(
  year: number,
  originalRate: number,
  inputs: LoanInputs
): YearResult {
  const months = inputs.months ?? 12;
  const originalLoanAmount = inputs.loanAmount;
  const feeAmount = computeFeeAmount(originalLoanAmount, inputs.feeValue, inputs.feeType);

  const principalFinanced = originalLoanAmount;
  let principalForCalc = originalLoanAmount;
  let originationFee = 0;
  let upfrontFee = 0;

  if (inputs.feeTreatment === "financed") {
    originationFee = feeAmount;
    principalForCalc += originationFee;
  } else if (inputs.feeTreatment === "upfront") {
    upfrontFee = feeAmount;
  }

  const appliedRate = applyBNM(originalRate, inputs.bnmAdjustment);
  const monthlyPayment = monthlyPaymentForPrincipal(principalForCalc, appliedRate, months);
  const totalPayment = monthlyPayment * months;
  const interestFee = totalPayment - principalForCalc;
  const totalRepayment = totalPayment + upfrontFee;
  const totalCost = totalRepayment - originalLoanAmount;

  return {
    year,
    originalRate,
    appliedRate,
    principalFinanced,
    originationFee,
    upfrontFee,
    monthlyPayment,
    totalPayment,
    interestFee,
    totalRepayment,
    totalCost,
  };
}

export function computeAllYears(
  rates: { year: number; rate: number }[],
  inputs: LoanInputs
): YearResult[] {
  return rates
    .map((r) => computeYearResult(r.year, r.rate, inputs))
    .sort((a, b) => a.year - b.year);
}

export function formatRM(amount: number): string {
  return `RM ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(2)}%`;
}
