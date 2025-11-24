"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted ? resolvedTheme === "dark" : false;

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const resetToSystem = () => {
    setTheme("system");
  };

  return { isDarkMode, toggleDarkMode, resetToSystem, isManual: theme !== "system" };
};
