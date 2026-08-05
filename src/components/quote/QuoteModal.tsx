"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SERVICES } from "@/content/services";
import { SITE, getMailtoHref, getTelHref } from "@/content/site";

type QuoteModalProps = Readonly<{
  open: boolean;
  initialService?: string;
  onClose: () => void;
}>;

const SERVICE_OPTIONS: ReadonlyArray<string> = [
  ...SERVICES.map((service) => service.title),
  "Other / not sure",
];

function buildQuoteMailto(form: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}): string {
  const subject = encodeURIComponent(
    `Quote request${form.service ? ` — ${form.service}` : ""} | ${SITE.shortName}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Service interested in: ${form.service || "Not specified"}`,
      "",
      form.message || "(No message provided)",
    ]
      .filter((line) => line !== null)
      .join("\n"),
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export function QuoteModal({ open, initialService, onClose }: QuoteModalProps) {
  const titleId = useId();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService ?? "");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setService(initialService ?? "");
    setSubmitted(false);
  }, [open, initialService]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 10);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) {
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const canSubmit = useMemo(
    () => name.trim().length > 1 && phone.trim().length > 6 && service.length > 0,
    [name, phone, service],
  );

  if (!open) {
    return null;
  }

  const fieldClass =
    "mt-1 w-full border border-line bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-lenis-prevent
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blue-900/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-xl text-muted transition-colors hover:text-dusky-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
        >
          <span aria-hidden>×</span>
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <p id={titleId} className="font-display text-xl font-bold text-blue-900">
              Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
            </p>
            <p className="mt-3 text-sm text-muted">
              Your email app should be opening now with a pre-filled request to{" "}
              {SITE.email}.
            </p>
            <p className="mt-1 text-sm text-muted">
              Prefer to talk directly? Reach us here:
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
              <a
                href={getTelHref()}
                className="font-medium text-blue-700 hover:text-dusky-red"
              >
                {SITE.phone}
              </a>
              <span className="text-muted" aria-hidden>
                ·
              </span>
              <a
                href={getMailtoHref()}
                className="font-medium text-blue-700 hover:text-dusky-red"
              >
                {SITE.email}
              </a>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-dusky-red px-6 py-3 text-sm font-medium text-white transition-[transform,background-color] duration-hover hover:-translate-y-0.5 hover:bg-[#7a3239] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p
              id={titleId}
              className="font-display text-xl font-bold text-blue-900"
            >
              Request a quote
            </p>
            <p className="mt-2 text-sm text-muted">
              Share a few details and we&rsquo;ll get back to you with next
              steps.
            </p>

            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSubmit) {
                  return;
                }
                window.location.href = buildQuoteMailto({
                  name: name.trim(),
                  phone: phone.trim(),
                  email: email.trim(),
                  service,
                  message: message.trim(),
                });
                setSubmitted(true);
              }}
            >
              <label className="block text-sm text-ink/80">
                Name
                <input
                  ref={nameInputRef}
                  name="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm text-ink/80">
                Phone number
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm text-ink/80">
                Email <span className="text-muted">(optional)</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={fieldClass}
                />
              </label>

              <fieldset>
                <legend className="text-sm text-ink/80">
                  Type of service interested in
                </legend>
                <div className="mt-3 space-y-2.5">
                  {SERVICE_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex items-start gap-2.5 text-sm text-ink/80"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={option}
                        checked={service === option}
                        onChange={() => setService(option)}
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 border-line text-dusky-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm text-ink/80">
                Message <span className="text-muted">(optional)</span>
                <textarea
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={fieldClass}
                />
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className="min-h-11 w-full rounded-sm bg-dusky-red px-5 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
              >
                Send request
              </button>
              <p className="text-center text-xs text-muted">
                Opens your email app with a pre-filled message. Prefer to
                call? {SITE.phone}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
