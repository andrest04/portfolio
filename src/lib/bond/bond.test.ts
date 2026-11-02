import assert from "node:assert/strict";
import { describe, it } from "node:test";
// @ts-expect-error Node's type stripping needs the explicit extension; the app's tsconfig does not enable it.
import { calculateBond, clampTerms, solveAnnualRate, type BondTerms } from "./bond.ts";

const base: BondTerms = {
  faceValue: 1000,
  termYears: 5,
  couponRatePct: 8,
  issuerCostPct: 0,
  investorCostPct: 0,
  paymentsPerYear: 2,
};

const close = (actual: number | null, expected: number, tolerance = 1e-6) => {
  assert.notEqual(actual, null);
  assert.ok(
    Math.abs((actual as number) - expected) < tolerance,
    `expected ${expected}, got ${actual}`,
  );
};

/** Present value of the payments, discounted at the period rate implied by an annual percent rate. */
const presentValue = (cashFlows: number[], annualPct: number, paymentsPerYear: number) => {
  const periodRate = (1 + annualPct / 100) ** (1 / paymentsPerYear) - 1;
  return cashFlows.reduce((sum, flow, i) => sum + flow / (1 + periodRate) ** (i + 1), 0);
};

describe("schedule", () => {
  it("pays a constant French instalment derived from the annuity formula", () => {
    const { schedule } = calculateBond(base);
    // 1000 * 0.04 / (1 - 1.04^-10), worked by hand.
    const instalment = 123.29094;
    assert.equal(schedule.length, 10);
    for (const row of schedule) close(row.cashFlow, instalment, 1e-4);
  });

  it("splits the first period into interest on the full balance and the remainder as amortization", () => {
    const [first] = calculateBond(base).schedule;
    close(first.interest, 40);
    close(first.amortization, 83.29094, 1e-4);
    close(first.balance, 916.70906, 1e-4);
  });

  it("amortizes exactly the face value and ends at a zero balance", () => {
    const { schedule } = calculateBond(base);
    const repaid = schedule.reduce((sum, row) => sum + row.amortization, 0);
    close(repaid, 1000);
    assert.equal(schedule.at(-1)?.balance, 0);
  });
});

describe("TCEA and TREA", () => {
  it("equal the effective annual coupon when there are no costs", () => {
    const { tcea, trea } = calculateBond(base);
    // (1 + 0.08 / 2)^2 - 1 = 8.16%
    close(tcea, 8.16);
    close(trea, 8.16);
  });

  it("match the coupon on an annual-pay bond with no costs", () => {
    const { tcea } = calculateBond({ ...base, paymentsPerYear: 1 });
    close(tcea, 8);
  });

  it("TCEA discounts the schedule back to the issuer's net proceeds", () => {
    const result = calculateBond({ ...base, issuerCostPct: 2.5 });
    const flows = result.schedule.map((row) => row.cashFlow);
    assert.equal(result.netProceeds, 975);
    close(presentValue(flows, result.tcea as number, 2), 975, 1e-5);
  });

  it("TREA discounts the schedule back to the investor's outlay", () => {
    const result = calculateBond({ ...base, investorCostPct: 1.5 });
    const flows = result.schedule.map((row) => row.cashFlow);
    assert.equal(result.investorOutlay, 1015);
    close(presentValue(flows, result.trea as number, 2), 1015, 1e-5);
  });

  it("costs push TCEA above and TREA below the effective coupon", () => {
    const { tcea, trea } = calculateBond({ ...base, issuerCostPct: 1, investorCostPct: 1 });
    assert.ok((tcea as number) > 8.16);
    assert.ok((trea as number) < 8.16);
  });

  it("each side only feels its own cost", () => {
    assert.ok(Math.abs((calculateBond({ ...base, issuerCostPct: 3 }).trea as number) - 8.16) < 1e-6);
    assert.ok(Math.abs((calculateBond({ ...base, investorCostPct: 3 }).tcea as number) - 8.16) < 1e-6);
  });
});

describe("edge cases", () => {
  it("a zero coupon repays the face in equal parts at a zero rate", () => {
    const { schedule, tcea, trea } = calculateBond({ ...base, couponRatePct: 0 });
    for (const row of schedule) {
      assert.equal(row.interest, 0);
      close(row.cashFlow, 100);
    }
    close(tcea, 0);
    close(trea, 0);
  });

  it("a zero coupon with an investor cost yields a negative TREA", () => {
    const { schedule, trea } = calculateBond({ ...base, couponRatePct: 0, investorCostPct: 2 });
    assert.ok((trea as number) < 0);
    close(presentValue(schedule.map((row) => row.cashFlow), trea as number, 2), 1020, 1e-5);
  });

  it("returns null when the rate cannot be solved", () => {
    assert.equal(solveAnnualRate([100, 100, 100], 2), null);
    assert.equal(solveAnnualRate([0, 0], 2), null);
  });

  it("clamps out-of-range and non-numeric input", () => {
    const clamped = clampTerms({
      faceValue: -5,
      termYears: 500.4,
      couponRatePct: Number.NaN,
      issuerCostPct: 99,
      investorCostPct: -1,
      paymentsPerYear: 2,
    });
    assert.equal(clamped.faceValue, 1000);
    assert.equal(clamped.termYears, 30);
    assert.equal(clamped.couponRatePct, 0);
    assert.equal(clamped.issuerCostPct, 10);
    assert.equal(clamped.investorCostPct, 0);
  });

  it("rounds the term to a whole number of years", () => {
    assert.equal(calculateBond({ ...base, termYears: 3.4 }).schedule.length, 6);
  });
});
