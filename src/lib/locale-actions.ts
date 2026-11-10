'use server';

import { cookies } from 'next/headers';
import { i18n, LOCALE_COOKIE, LOCALE_FIELD, type Locale } from '@/lib/i18n';

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Stores the language a form asks for. Setting the cookie makes the page render again. */
export async function switchLocale(form: FormData) {
  const asked = form.get(LOCALE_FIELD);
  const locale = i18n.locales.find((candidate): candidate is Locale => candidate === asked);
  if (!locale) return;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, { path: '/', maxAge: ONE_YEAR });
}
