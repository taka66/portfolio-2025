"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/i18n-config";

const LocaleSwitcher: React.FC = () => {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex space-x-4">
      {i18n.locales.map((locale) => {
        const isActive = pathname?.split("/")[1] === locale;
        return (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className={`
              transition-colors
              ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"}
            `}
          >
            {locale === "ja" ? "JA" : "EN"}
          </Link>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
