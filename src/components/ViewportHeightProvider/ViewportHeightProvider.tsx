"use client";

import { useViewportHeight } from "@/hooks/useViewportHeight";

export const ViewportHeightProvider = ({ children }: { children: React.ReactNode }) => {
  useViewportHeight();
  return <>{children}</>;
};
