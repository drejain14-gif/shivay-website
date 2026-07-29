"use client";

import { useEffect, useState, type RefObject } from "react";

type UseSectionObserverOptions = Readonly<{
  /** Root margin for earlier/later triggers. Default pulls in slightly early. */
  rootMargin?: string;
  threshold?: number | number[];
  /** Once true, stay visible (default true). */
  once?: boolean;
  enabled?: boolean;
}>;

/**
 * IntersectionObserver-driven visibility for section reveals.
 * Defaults to visible when disabled (SSR / reduced motion / webdriver).
 */
export function useSectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  {
    rootMargin = "0px 0px -12% 0px",
    threshold = 0.15,
    once = true,
    enabled = true,
  }: UseSectionObserverOptions = {},
): boolean {
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let seen = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        if (entry.isIntersecting) {
          seen = true;
          setVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once && !seen) {
          setVisible(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);

    // Fail-safe: never leave content invisible if observer stalls.
    const failSafe = window.setTimeout(() => {
      setVisible(true);
    }, 700);

    return () => {
      window.clearTimeout(failSafe);
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold, once, enabled]);

  return visible;
}
