import type { ReactNode } from "react";
import { isVideoUrl, type DeskState, type HeroCard } from "@/broadcast/types";

export const plate = "0 2px 10px rgba(0,0,0,0.85)";

export function heroOf(heroes: Map<string, HeroCard>, slug: string | null) {
  if (!slug) return null;
  return heroes.get(slug) ?? null;
}

function Backdrop({ state }: { state: DeskState }) {
  const url = state.theme.backgroundImageUrl;
  if (!url) return null;
  if (isVideoUrl(url)) {
    return (
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  return (
    <img
      src={url}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export function Shell({
  state,
  backdrop = false,
  children,
}: {
  state: DeskState;
  backdrop?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ color: state.theme.ink, fontFamily: "system-ui, sans-serif" }}
    >
      {backdrop && <Backdrop state={state} />}
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

export function SponsorRow({ state }: { state: DeskState }) {
  const visible = (state.sponsors ?? []).filter(
    (sponsor) => sponsor.logoUrl || sponsor.name,
  );
  if (visible.length === 0) return null;
  return (
    <div className="flex items-center justify-center gap-10">
      {visible.map((sponsor) =>
        sponsor.logoUrl ? (
          <img
            key={sponsor.id}
            src={sponsor.logoUrl}
            alt={sponsor.name}
            className="h-12 max-w-36 object-contain"
          />
        ) : (
          <span key={sponsor.id} className="text-3xl">
            {sponsor.name}
          </span>
        ),
      )}
    </div>
  );
}
