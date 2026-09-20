type ScrollTriggerLike = {
  getAll: () => Array<{ kill: (revert?: boolean) => void }>;
};

let registered: ScrollTriggerLike | null = null;

export function registerScrollTriggerPlugin(plugin: ScrollTriggerLike): void {
  registered = plugin;
}

/**
 * Unwrap GSAP pin-spacers before React commits a route change.
 * useEffect cleanup is too late — React mutates the DOM first, then
 * `removeChild` throws if ScrollTrigger still owns the node.
 */
export function teardownScrollTriggers(): void {
  const plugin = registered;
  if (!plugin) {
    return;
  }
  plugin.getAll().forEach((trigger) => {
    trigger.kill(true);
  });
}

export function shouldTeardownForAnchor(
  anchor: HTMLAnchorElement,
  event: Event,
): boolean {
  if (anchor.target && anchor.target !== "_self") {
    return false;
  }
  if (anchor.hasAttribute("download")) {
    return false;
  }
  if (event instanceof MouseEvent || event instanceof PointerEvent) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return false;
    }
    if (event.button !== 0) {
      return false;
    }
  }

  const raw = anchor.getAttribute("href");
  if (
    !raw ||
    raw.startsWith("#") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:") ||
    raw.startsWith("javascript:")
  ) {
    return false;
  }

  let next: URL;
  try {
    next = new URL(anchor.href);
  } catch {
    return false;
  }

  if (next.origin !== window.location.origin) {
    return false;
  }

  return next.pathname !== window.location.pathname;
}
