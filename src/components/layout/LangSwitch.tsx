"use client";

import { useFormStatus } from "react-dom";
import { switchLocale } from "@/lib/locale-actions";
import { LOCALE_FIELD, type Locale } from "@/lib/i18n";

type LangSwitchProps = {
  locale: Locale;
  label: string;
  accessibleLabel: string;
};

function SwitchButton({ target, label, accessibleLabel }: { target: Locale } & Omit<LangSwitchProps, "locale">) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="lang-switch link link--plain"
      lang={target}
      aria-label={accessibleLabel}
      /* Not `disabled`: a disabled button drops keyboard focus to the page. */
      aria-disabled={pending}
      aria-busy={pending}
      onClick={(event) => {
        if (pending) event.preventDefault();
      }}
    >
      {label}
    </button>
  );
}

/**
 * A form that posts to the server action, so the switch works before hydration and
 * without script, and the button keeps focus while the page re-renders in the new language.
 */
export default function LangSwitch({ locale, label, accessibleLabel }: LangSwitchProps) {
  const target: Locale = locale === "es" ? "en" : "es";

  return (
    <form action={switchLocale} className="lang-form">
      <input type="hidden" name={LOCALE_FIELD} value={target} />
      <SwitchButton target={target} label={label} accessibleLabel={accessibleLabel} />
    </form>
  );
}
