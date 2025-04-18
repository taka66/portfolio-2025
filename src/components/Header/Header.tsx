"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { i18n } from "@/i18n/i18n-config";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Blog", href: "https://note.com/takahirofujii/" }, // 外部リンクの例
];

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1">
    <path d="M18 11.66V21C18 21.55 17.55 22 17 22H3C2.45 22 2 21.55 2 21V7C2 6.45 2.45 6 3 6H12.34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L10 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 8V2H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname?.split("/") || [];
  const currentLocale = i18n.locales.find((loc) => segments[1] === loc) || i18n.defaultLocale;

  const getLocalizedHref = (href: string) => {
    if (href.startsWith("http")) return href;
    if (currentLocale === i18n.defaultLocale) return href;
    return `/${currentLocale}${href.startsWith("/") ? "" : "/"}${href}`;
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <LocaleSwitcher />
        <nav className="h-full">
          <ul className="flex space-x-6 h-full items-center">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith("http");
              const localizedHref = isExternal ? item.href : getLocalizedHref(item.href);
              const isActive = !isExternal && pathname === localizedHref;

              return (
                <li key={item.label} className="h-full flex items-center">
                  <Link
                    href={localizedHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`
                      transition-colors flex items-center px-3 py-4
                      ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"}
                      active:bg-gray-100 dark:active:bg-gray-800 active:scale-95 transition-transform
                      rounded-md tap-highlight-transparent
                    `}
                  >
                    {item.label}
                    {isExternal && <ExternalLinkIcon />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
