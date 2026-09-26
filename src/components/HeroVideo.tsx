"use client";

import { useRef, useState } from "react";
import { PARENTS_REEL_CDN, PARENTS_REEL_LOCAL, type Variant } from "@/lib/constants";
import { trackEvent } from "@/lib/tracking";

type Props = {
  variant: Variant;
  localSrc?: string;
  cdnSrc?: string;
  posterLabel?: string;
};

export function HeroVideo({
  variant,
  localSrc = PARENTS_REEL_LOCAL,
  cdnSrc = PARENTS_REEL_CDN,
  posterLabel = "Watch a short story",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [played, setPlayed] = useState(false);
  const [failedLocal, setFailedLocal] = useState(false);

  const src = failedLocal ? cdnSrc : localSrc;

  function onPlay() {
    if (!played) {
      setPlayed(true);
      trackEvent("video_play", variant, { src });
    }
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-[280px]">
      <div className="overflow-hidden rounded-2xl border border-border bg-ink shadow-lg aspect-[9/16]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          onPlay={onPlay}
          onError={() => {
            if (!failedLocal) setFailedLocal(true);
          }}
          aria-label={posterLabel}
        >
          <source src={src} type="video/mp4" />
          {!failedLocal ? <source src={cdnSrc} type="video/mp4" /> : null}
        </video>
      </div>
      <p className="mt-2 text-center text-xs text-muted">{posterLabel}</p>
    </div>
  );
}
