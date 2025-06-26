"use client";

import { useEffect, useState } from "react";

export const useDarkMode = () => {
  // Initialize state based on current DOM state to avoid hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    // Sync state with current DOM state on mount
    const currentIsDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(currentIsDark);

    // Check for stored preference
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      const isDark = stored === "true";
      setIsManual(true);
      // Only update if state doesn't match stored preference
      if (isDark !== currentIsDark) {
        setIsDarkMode(isDark);
        if (isDark) {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
      }
      return;
    }

    // Fall back to system preference if no stored preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemPrefersDark = mediaQuery.matches;
    
    // Only update if current state doesn't match system preference
    if (systemPrefersDark !== currentIsDark) {
      setIsDarkMode(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }

    const handler = (e: MediaQueryListEvent) => {
      if (!isManual) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setIsManual(true);
    localStorage.setItem("darkMode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  const resetToSystem = () => {
    localStorage.removeItem("darkMode");
    setIsManual(false);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    if (mediaQuery.matches) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return { isDarkMode, toggleDarkMode, resetToSystem, isManual };
};
