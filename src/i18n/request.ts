import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { getDictionary, i18n, LOCALE_COOKIE, type Locale } from '@/lib/i18n';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value as Locale | undefined;
  const locale = cookieLocale && i18n.locales.includes(cookieLocale) ? cookieLocale : i18n.defaultLocale;

  return {
    locale,
    messages: await getDictionary(locale),
  };
});
