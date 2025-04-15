"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Blog", href: "https://note.com/takahirofujii/" }, // 外部リンクの例
];

const Header: React.FC = () => {
  const pathname = usePathname(); // 現在のパスを取得

  return (
    <header className="w-full p-4">
      <div className="container mx-auto flex justify-end">
        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith("http");
              // 外部リンクでない、かつ現在のパスとhrefが一致する場合にアクティブ
              const isActive = !isExternal && pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`
                      transition-colors
                      ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400" // アクティブ時のスタイル
                          : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white" // 非アクティブ時のスタイル
                      }
                    `}
                  >
                    {item.label}
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
