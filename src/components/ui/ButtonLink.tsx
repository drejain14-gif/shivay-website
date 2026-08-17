import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonBaseClass, buttonVariantClass, type ButtonVariant } from "@/lib/buttonStyles";

type ButtonLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Set for external links (e.g. WhatsApp) that should open in a new tab. */
  external?: boolean;
}>;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonBaseClass, buttonVariantClass[variant], className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
