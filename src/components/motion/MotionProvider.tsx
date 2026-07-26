"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import {
  ReducedMotionProvider,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { PreloaderGate } from "@/components/preloader/PreloaderGate";
import { MOTION } from "@/lib/motion";

type MotionContextValue = Readonly<{
  preloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  scrollReady: boolean;
  refreshScroll: () => void;
}>;

const MotionContext = createContext<MotionContextValue>({
  preloaderDone: false,
  setPreloaderDone: () => undefined,
  scrollReady: false,
  refreshScroll: () => undefined,
});

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}

function MotionRuntime({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { prefersReducedMotion, ready } = usePrefersReducedMotion();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const refreshScroll = useCallback(() => {
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (navigator.webdriver) {
      document.documentElement.classList.add("is-automated");
    }

    if (prefersReducedMotion || navigator.webdriver) {
      setPreloaderDone(true);
      setScrollReady(true);
      return;
    }

    if (!preloaderDone) {
      setScrollReady(false);
      return;
    }

    let cancelled = false;
    let removeTicker: (() => void) | null = null;

    const start = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      lenisRef.current?.destroy();
      lenisRef.current = null;

      const instance = new Lenis({
        duration: MOTION.lenis.duration,
        wheelMultiplier: MOTION.lenis.wheelMultiplier,
        smoothWheel: true,
        autoRaf: false,
      });

      instance.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      lenisRef.current = instance;
      removeTicker = () => gsap.ticker.remove(tickerCallback);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (!cancelled) {
          setScrollReady(true);
        }
      });
    };

    void start();

    return () => {
      cancelled = true;
      setScrollReady(false);
      removeTicker?.();
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion, ready, preloaderDone]);

  useEffect(() => {
    if (!scrollReady) {
      return;
    }

    const onLoad = () => refreshScroll();
    window.addEventListener("load", onLoad);
    const timers = [400, 1200].map((ms) => window.setTimeout(refreshScroll, ms));

    return () => {
      window.removeEventListener("load", onLoad);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [scrollReady, refreshScroll, pathname]);

  const value = useMemo(
    () => ({
      preloaderDone,
      setPreloaderDone,
      scrollReady,
      refreshScroll,
    }),
    [preloaderDone, scrollReady, refreshScroll],
  );

  return (
    <MotionContext.Provider value={value}>
      <PreloaderGate />
      {children}
    </MotionContext.Provider>
  );
}

export function MotionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReducedMotionProvider>
      <MotionRuntime>{children}</MotionRuntime>
    </ReducedMotionProvider>
  );
}
