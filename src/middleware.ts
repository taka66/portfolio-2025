import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// i18n
import { i18n } from "@/i18n/i18n-config";

// plugin
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

// Get best locale by using negotiator and intl-localematcher
function getLocale(request: NextRequest): string {
  // Check for cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as (typeof i18n.locales)[number])) {
    return cookieLocale;
  }

  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales = i18n.locales;

    // Accept-Languageヘッダーがあるか確認
    const acceptLanguage = negotiatorHeaders["accept-language"];
    if (!acceptLanguage || acceptLanguage === "*") {
      // Accept-Languageヘッダーが無いか不適切な場合はデフォルトロケールを返す
      return i18n.defaultLocale;
    }

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // negotiatorが有効な言語を返さない場合にエラーを避ける
    if (!languages || languages.length === 0) {
      return i18n.defaultLocale;
    }

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    console.error("Locale detection error:", error);
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // If locale is the default locale, don't redirect
    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
    }

    // For non-default locales, redirect with the locale prefix
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|configs|sitemap.xml|robots.txt|favicon.ico|.*\\.jpg|.*\\.webp|.*\\.png).*)"],
};
