"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonBaseClass, buttonVariantClass } from "@/lib/buttonStyles";
import { cn } from "@/lib/cn";

function isDomUnmountCrash(error: Error): boolean {
  const message = error.message || "";
  return (
    error.name === "NotFoundError" ||
    message.includes("removeChild") ||
    message.includes("insertBefore")
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (isDomUnmountCrash(error)) {
      window.location.replace(window.location.href);
    }
  }, [error]);

  if (isDomUnmountCrash(error)) {
    return (
      <section className="bg-white">
        <Container className="section-y">
          <p className="text-muted">Loading…</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <Container className="section-y">
        <h1 className="display-title text-display-lg">Something went wrong</h1>
        <p className="mt-4 max-w-measure text-muted">
          The page hit an unexpected error. You can retry or return home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className={cn(buttonBaseClass, buttonVariantClass.primary)}
          >
            Try again
          </button>
          <Link
            href="/"
            className={cn(buttonBaseClass, buttonVariantClass.ghost)}
          >
            Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
