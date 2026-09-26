"use client";

import type { FunnelEventName, Variant } from "./constants";

export function trackEvent(
  eventName: FunnelEventName,
  variant: Variant,
  metadata?: Record<string, unknown>
) {
  const payload = {
    event_name: eventName,
    variant,
    metadata: metadata ?? {},
  };

  const body = JSON.stringify(payload);

  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/events", blob);
      if (ok) return;
    }
  } catch {
    // fall through to fetch
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // tracking must never break UX
  });
}
