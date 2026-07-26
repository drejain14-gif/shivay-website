import { cn } from "@/lib/cn";

type ContainerProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}>;

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-5 md:px-8", className)}>
      {children}
    </Tag>
  );
}
