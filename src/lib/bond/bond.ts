/**
 * Bond arithmetic ported from andrest04/finance-app
 * (src/lib/calculations/francesMetod.ts, tceaCalculator.ts, newtonRaphsonUtils.ts).
 *
 * Same conventions as the source: French amortization (constant instalment),
 * period rate = annual coupon / payments per year, issuer and investor commissions
 * charged on the face value at issue, and rates solved by Newton-Raphson.
 *
 * Deliberate differences from the source, because its results there are wrong:
 * - A zero coupon repays face / n per period; the source divides 0 by 0 and yields NaN.
 * - An unsolved rate is null; the source returns its last iterate as if it had converged.
 */

export type BondTerms = {
  faceValue: number;
  termYears: number;
  /** Nominal annual coupon, percent. */
  couponRatePct: number;
  issuerCostPct: number;
  investorCostPct: number;
  paymentsPerYear: number;
};

export type SchedulePeriod = {
  period: number;
  interest: number;
  amortization: number;
  cashFlow: number;
  balance: number;
};

export type BondResult = {
  terms: BondTerms;
  schedule: SchedulePeriod[];
  netProceeds: number;
  investorOutlay: number;
  /** Effective annual cost to the issuer, percent; null when it cannot be solved. */
  tcea: number | null;
  /** Effective annual yield to the investor, percent; null when it cannot be solved. */
  trea: number | null;
};

export const BOND_LIMITS = {
  faceValue: { min: 1000, max: 1_000_000 },
  termYears: { min: 1, max: 30 },
  couponRatePct: { min: 0, max: 30 },
  costPct: { min: 0, max: 10 },
  paymentsPerYear: { min: 1, max: 12 },
} as const;

const clamp = (value: number, { min, max }: { min: number; max: number }) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export function clampTerms(terms: BondTerms): BondTerms {
  return {
    faceValue: clamp(terms.faceValue, BOND_LIMITS.faceValue),
    termYears: Math.round(clamp(terms.termYears, BOND_LIMITS.termYears)),
    couponRatePct: clamp(terms.couponRatePct, BOND_LIMITS.couponRatePct),
    issuerCostPct: clamp(terms.issuerCostPct, BOND_LIMITS.costPct),
    investorCostPct: clamp(terms.investorCostPct, BOND_LIMITS.costPct),
    paymentsPerYear: Math.round(clamp(terms.paymentsPerYear, BOND_LIMITS.paymentsPerYear)),
  };
}

function buildSchedule({
  faceValue,
  termYears,
  couponRatePct,
  paymentsPerYear,
}: BondTerms): SchedulePeriod[] {
  const periods = termYears * paymentsPerYear;
  const periodRate = couponRatePct / 100 / paymentsPerYear;
  const instalment =
    periodRate === 0
      ? faceValue / periods
      : faceValue * (periodRate / (1 - (1 + periodRate) ** -periods));

  const schedule: SchedulePeriod[] = [];
  let balance = faceValue;
  for (let period = 1; period <= periods; period++) {
    const interest = balance * periodRate;
    const amortization = instalment - interest;
    balance -= amortization;
    schedule.push({
      period,
      interest,
      amortization,
      cashFlow: instalment,
      balance: Math.abs(balance) < 1e-6 ? 0 : balance,
    });
  }
  return schedule;
}

/**
 * Solves the periodic rate of a cash flow by Newton-Raphson and annualizes it as
 * (1 + r)^m - 1. `flows[i]` falls at period i. Returns a percent, or null when
 * the iteration does not converge to a rate above -100%.
 */
export function solveAnnualRate(
  flows: number[],
  paymentsPerYear: number,
  precision = 1e-6,
  maxIterations = 100,
): number | null {
  // A rate only exists when money moves in both directions.
  if (!flows.some((flow) => flow > 0) || !flows.some((flow) => flow < 0)) return null;

  let rate = 0.08 / paymentsPerYear;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let npv = 0;
    let derivative = 0;
    for (let t = 0; t < flows.length; t++) {
      const factor = (1 + rate) ** t;
      npv += flows[t] / factor;
      derivative -= (t * flows[t]) / (factor * (1 + rate));
    }

    if (Math.abs(npv) < precision) {
      return ((1 + rate) ** paymentsPerYear - 1) * 100;
    }
    if (Math.abs(derivative) < precision) return null;

    rate -= npv / derivative;
    if (!Number.isFinite(rate) || rate <= -1) return null;
  }
  return null;
}

export function calculateBond(input: BondTerms): BondResult {
  const terms = clampTerms(input);
  const schedule = buildSchedule(terms);
  const payments = schedule.map((row) => row.cashFlow);

  const netProceeds = terms.faceValue - (terms.faceValue * terms.issuerCostPct) / 100;
  const investorOutlay = terms.faceValue + (terms.faceValue * terms.investorCostPct) / 100;

  return {
    terms,
    schedule,
    netProceeds,
    investorOutlay,
    tcea: solveAnnualRate([netProceeds, ...payments.map((p) => -p)], terms.paymentsPerYear),
    trea: solveAnnualRate([-investorOutlay, ...payments], terms.paymentsPerYear),
  };
}
