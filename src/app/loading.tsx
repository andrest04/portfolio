import { getLocale } from "next-intl/server";
import { getDictionary, type Locale } from "@/lib/i18n";

export default async function Loading() {
  const locale = (await getLocale()) as Locale;
  const t = await getDictionary(locale);

  return (
    <div className="grid min-h-[60svh] place-items-center px-5">
      <p role="status" className="text-small text-muted">
        {t.meta.loading}
      </p>
    </div>
  );
}
