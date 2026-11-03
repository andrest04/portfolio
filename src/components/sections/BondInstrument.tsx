"use client";

import { useId, useState } from "react";
import { calculateBond } from "@/lib/bond/bond";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/i18n";

const FINANCE_APP_REPOSITORY = "https://github.com/andrest04/finance-app";
const CURRENCY = "PEN";
const PAYMENTS_PER_YEAR = 2;

// Face value, term and coupon ranges follow the Finance App's own form validation.
const RANGES = {
  faceValue: { min: 1000, max: 100000, step: 1000 },
  termYears: { min: 3, max: 10, step: 1 },
  couponRatePct: { min: 2, max: 10, step: 0.25 },
  costPct: { min: 0, max: 5, step: 0.25 },
} as const;

const NUMBER_LOCALE: Record<Locale, string> = { en: "en-US", es: "es-PE" };

type RangeFieldProps = {
  label: string;
  value: number;
  display: string;
  range: { min: number; max: number; step: number };
  onChange: (value: number) => void;
};

function RangeField({ label, value, display, range, onChange }: RangeFieldProps) {
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{display}</output>
      <input
        id={id}
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        aria-valuetext={display}
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
    </div>
  );
}

type BondInstrumentProps = {
  t: Dictionary["instrument"];
  locale: Locale;
};

export default function BondInstrument({ t, locale }: BondInstrumentProps) {
  const [faceValue, setFaceValue] = useState(10000);
  const [termYears, setTermYears] = useState(5);
  const [couponRatePct, setCouponRatePct] = useState(8);
  const [costPct, setCostPct] = useState(1);

  const { schedule, tcea, trea } = calculateBond({
    faceValue,
    termYears,
    couponRatePct,
    issuerCostPct: costPct,
    investorCostPct: costPct,
    paymentsPerYear: PAYMENTS_PER_YEAR,
  });

  const numberLocale = NUMBER_LOCALE[locale];
  const money = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const whole = new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 0 });
  const percent = (value: number | null) => (value === null ? "–" : `${money.format(value)}%`);

  return (
    <div data-ui className="instrument" role="group" aria-label={t.label}>
      <dl className="readouts" aria-live="polite" data-load style={{ "--load": 0 } as React.CSSProperties}>
        <div>
          <dt>{t.tcea}</dt>
          <dd>{percent(tcea)}</dd>
          <dd className="readouts__note">{t.tceaNote}</dd>
        </div>
        <div>
          <dt>{t.trea}</dt>
          <dd>{percent(trea)}</dd>
          <dd className="readouts__note">{t.treaNote}</dd>
        </div>
      </dl>

      <div className="fields" data-load style={{ "--load": 1 } as React.CSSProperties}>
        <RangeField
          label={t.faceValue}
          value={faceValue}
          display={`${CURRENCY} ${whole.format(faceValue)}`}
          range={RANGES.faceValue}
          onChange={setFaceValue}
        />
        <RangeField
          label={t.term}
          value={termYears}
          display={`${termYears} ${t.years}`}
          range={RANGES.termYears}
          onChange={setTermYears}
        />
        <RangeField
          label={t.coupon}
          value={couponRatePct}
          display={percent(couponRatePct)}
          range={RANGES.couponRatePct}
          onChange={setCouponRatePct}
        />
        <RangeField
          label={t.costs}
          value={costPct}
          display={percent(costPct)}
          range={RANGES.costPct}
          onChange={setCostPct}
        />
      </div>

      <div data-load style={{ "--load": 2 } as React.CSSProperties}>
        {/* The scroller takes focus so keyboard users can reach every row of a long schedule. */}
        <div className="schedule" role="region" aria-label={t.scheduleLabel} tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">{t.period}</th>
                <th scope="col">{t.interest}</th>
                <th scope="col">{t.amortization}</th>
                <th scope="col">{t.cashFlow}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.period}>
                  <th scope="row">{row.period}</th>
                  <td>{money.format(row.interest)}</td>
                  <td>{money.format(row.amortization)}</td>
                  <td>{money.format(row.cashFlow)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="instrument__foot">
          {t.caption}{" "}
          <a href={FINANCE_APP_REPOSITORY} target="_blank" rel="noreferrer" className="link">
            {t.repository}
          </a>
        </p>
      </div>
    </div>
  );
}
