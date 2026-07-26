import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/images";

type SiteImageViewProps = Readonly<{
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}>;

export function SiteImageView({
  image,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
  fill = false,
}: SiteImageViewProps) {
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className={cn("h-auto w-full object-cover", imgClassName)}
      />
    </div>
  );
}
