export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark";

export const buttonBaseClass =
  "inline-flex min-h-11 items-center justify-center rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-[transform,background-color,border-color,color] duration-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red";

export const buttonVariantClass: Record<ButtonVariant, string> = {
  primary: "bg-dusky-red text-white hover:-translate-y-0.5 hover:bg-[#7a3239]",
  secondary:
    "border border-white/70 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white/10",
  ghost:
    "border border-blue-900/15 bg-white text-blue-900 hover:-translate-y-0.5 hover:border-dusky-red/40",
  "on-dark": "border border-white/25 bg-white text-blue-900 hover:-translate-y-0.5",
};
