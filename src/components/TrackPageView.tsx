"use client";

import { useEffect } from "react";
import type { Variant } from "@/lib/constants";
import { trackEvent } from "@/lib/tracking";

export function TrackPageView({ variant }: { variant: Variant }) {
  useEffect(() => {
    trackEvent("page_view", variant, {
      path: typeof window !== "undefined" ? window.location.pathname : variant,
    });
  }, [variant]);

  return null;
}
