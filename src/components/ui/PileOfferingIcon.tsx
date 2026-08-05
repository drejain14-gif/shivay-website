import type { JSX } from "react";
import type { PileOffering } from "@/content/pile-offerings";

type IconProps = Readonly<{ className?: string }>;

function PlateIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M10 34h28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="14"
        y="28"
        width="20"
        height="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M24 10v14M20 16l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PulloutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 38V18M20 22l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="18"
        y="10"
        width="12"
        height="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 38h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LateralIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 12v26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 38h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 24h14M18 20l-4 4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DynamicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 14v24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 38h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 10h12v6H18z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 22c2 2 4 3 10 3s8-1 10-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 28c1.5 1.5 3 2 8 2s6.5-.5 8-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StaticIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M12 38h24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="18"
        y="28"
        width="12"
        height="8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="16"
        y="20"
        width="16"
        height="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="12"
        width="20"
        height="6"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

const ICONS: Record<PileOffering["icon"], (props: IconProps) => JSX.Element> = {
  plate: PlateIcon,
  pullout: PulloutIcon,
  lateral: LateralIcon,
  dynamic: DynamicIcon,
  static: StaticIcon,
};

export function PileOfferingIcon({
  name,
  className,
}: Readonly<{ name: PileOffering["icon"]; className?: string }>) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}
