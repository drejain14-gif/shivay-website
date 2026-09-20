type ScrollController = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; force?: boolean },
  ) => void;
};

function nativeScrollToTop(): void {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function resetPageScroll(lenis?: ScrollController | null): void {
  if (typeof window === "undefined") {
    return;
  }

  const hash = window.location.hash.slice(1);
  if (hash) {
    let target: HTMLElement | null = null;
    try {
      target = document.getElementById(decodeURIComponent(hash));
    } catch {
      target = document.getElementById(hash);
    }
    if (target) {
      lenis?.scrollTo(target, { immediate: true, force: true });
      target.scrollIntoView({ block: "start" });
      return;
    }
  }

  lenis?.scrollTo(0, { immediate: true, force: true });
  nativeScrollToTop();
}
