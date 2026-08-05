"use client";

import { useQuoteModal } from "@/components/quote/QuoteModalProvider";
import { cn } from "@/lib/cn";
import { buttonBaseClass, buttonVariantClass, type ButtonVariant } from "@/lib/buttonStyles";

type RequestQuoteButtonProps = Readonly<{
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Pre-selects this option in the "type of service" radio group. */
  service?: string;
}>;

export function RequestQuoteButton({
  children,
  variant = "primary",
  className,
  service,
}: RequestQuoteButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => openQuoteModal(service)}
      className={cn(buttonBaseClass, buttonVariantClass[variant], className)}
    >
      {children}
    </button>
  );
}
