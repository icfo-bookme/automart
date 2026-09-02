"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pushPageView } from "@/datalayer";

/**
 * Fires the `page_view` data layer event on every page load and route change.
 * Add this once in the root layout.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Run after the browser paints so the GTM container is ready.
    const id = window.requestAnimationFrame(() => pushPageView());
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}