import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonBaseClass, buttonVariantClass, type ButtonVariant } from "@/lib/buttonStyles";

type ButtonLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}>;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonBaseClass, buttonVariantClass[variant], className)}>
      {children}
    </Link>
  );
}
