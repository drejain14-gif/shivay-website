"use client";

import { useLayoutEffect, useRef } from "react";

type ContextFactory = () => void;

export function useGsapContext(
  factory: ContextFactory,
  deps: ReadonlyArray<unknown>,
  enabled = true,
): void {
  const factoryRef = useRef(factory);
  factoryRef.current = factory;

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    let reverted = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (reverted) {
        return;
      }
      const ctx = gsap.context(() => {
        factoryRef.current();
      });
      revert = () => ctx.revert();
    };

    void run();

    return () => {
      reverted = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps provided by caller
  }, [enabled, ...deps]);
}
