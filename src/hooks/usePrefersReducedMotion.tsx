"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ReducedMotionContextValue = Readonly<{
  prefersReducedMotion: boolean;
  ready: boolean;
}>;

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReducedMotion: false,
  ready: false,
});

export function usePrefersReducedMotion(): ReducedMotionContextValue {
  return useContext(ReducedMotionContext);
}

export function ReducedMotionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  const syncPreference = useCallback(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    setReady(true);
  }, []);

  useEffect(() => {
    syncPreference();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => syncPreference();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [syncPreference]);

  const value = useMemo(
    () => ({ prefersReducedMotion, ready }),
    [prefersReducedMotion, ready],
  );

  return (
    <ReducedMotionContext.Provider value={value}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
