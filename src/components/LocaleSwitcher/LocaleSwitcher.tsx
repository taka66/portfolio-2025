"use client";

import { usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n/i18n-config";

const LocaleSwitcher: React.FC = () => {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";

    // Remove the current locale from pathname if it exists
    const segments = pathname.split("/");
    const currentLocale = i18n.locales.find((loc) => segments[1] === loc);
    if (currentLocale) {
      segments.splice(1, 1);
    }

    // For default locale (ja), don't add locale to the path
    if (locale !== i18n.defaultLocale) {
      segments.splice(1, 0, locale);
    }

    const path = segments.join("/") || "/";
    // "/" + "en" + "" joins to "/en/" — strip the trailing slash
    return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  };

  // Get current locale from pathname or use default
  const segments = pathname?.split("/") || [];
  const currentLocale = i18n.locales.find((loc) => segments[1] === loc) || i18n.defaultLocale;

  return (
    <div className="flex space-x-2 md:space-x-4">
      {i18n.locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          // Deliberately a plain <a>, not <Link>: switching locale must be a
          // full page load. <Link> prefetches the target URL before the
          // NEXT_LOCALE cookie is written, and the router then replays the
          // cached (old-locale) redirect on click, so the switch never happens.
          <a
            key={locale}
            href={redirectedPathname(locale)}
            lang={locale}
            hrefLang={locale}
            aria-label={locale === "ja" ? "日本語に切り替え" : "Switch to English"}
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
            }}
            className={`
              transition-colors px-2 py-1 md:px-3 md:py-2 rounded-md text-sm md:text-base
              ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"}
              active:bg-gray-100 dark:active:bg-gray-800 active:scale-95 transition-transform tap-highlight-transparent
            `}
          >
            {locale === "ja" ? "あ" : "A"}
          </a>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
