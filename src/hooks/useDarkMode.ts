"use client";

import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    // Check for stored preference first
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      setIsDarkMode(stored === "true");
      setIsManual(true);
      document.documentElement.classList.toggle("dark", stored === "true");
      return;
    }

    // Fall back to system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    document.documentElement.classList.toggle("dark", mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      if (!isManual) {
        setIsDarkMode(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [isManual]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setIsManual(true);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  const resetToSystem = () => {
    localStorage.removeItem("darkMode");
    setIsManual(false);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    document.documentElement.classList.toggle("dark", mediaQuery.matches);
  };

  return { isDarkMode, toggleDarkMode, resetToSystem, isManual };
};
