"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
    if (locale === i18n.defaultLocale) {
      return segments.join("/") || "/";
    }

    // For other locales, add the locale to the path
    segments.splice(1, 0, locale);
    return segments.join("/");
  };

  // Get current locale from pathname or use default
  const segments = pathname?.split("/") || [];
  const currentLocale = i18n.locales.find((loc) => segments[1] === loc) || i18n.defaultLocale;

  return (
    <div className="flex space-x-4">
      {i18n.locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className={`
              transition-colors px-3 py-2 rounded-md
              ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"}
              active:bg-gray-100 dark:active:bg-gray-800 active:scale-95 transition-transform tap-highlight-transparent
            `}
          >
            {locale === "ja" ? "あ" : "A"}
          </Link>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
