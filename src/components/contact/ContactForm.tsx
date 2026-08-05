"use client";

import { useMemo, useState } from "react";
import { SERVICES } from "@/content/services";
import { SITE, getWhatsAppHref } from "@/content/site";

function buildWhatsAppMessage(form: {
  name: string;
  phone: string;
  service: string;
  message: string;
}): string {
  return [
    `Inquiry | ${SITE.shortName}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.service ? `Service: ${form.service}` : null,
    "",
    form.message || "(No message provided)",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(
    () => name.trim().length > 1 && phone.trim().length > 6,
    [name, phone],
  );

  const fieldClass =
    "mt-1 w-full border border-line bg-white px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red";

  return (
    <form
      className="space-y-4 rounded-sm border border-line bg-slate-50 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canSubmit) {
          return;
        }
        const waMessage = buildWhatsAppMessage({
          name: name.trim(),
          phone: phone.trim(),
          service,
          message: message.trim(),
        });
        window.open(getWhatsAppHref(waMessage), "_blank", "noopener,noreferrer");
      }}
    >
      <p className="text-sm text-muted">
        Opens WhatsApp with a pre-filled message to {SITE.phone}. Or call us
        directly for a faster response.
      </p>
      <label className="block text-sm">
        Name
        <input
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="block text-sm">
        Phone
        <input
          type="tel"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="block text-sm">
        Service interest
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={fieldClass}
        >
          <option value="" disabled>
            Select an option
          </option>
          {SERVICES.map((item) => (
            <option key={item.slug} value={item.title}>
              {item.title}
            </option>
          ))}
          <option value="Engineering consultation">
            Engineering consultation
          </option>
        </select>
      </label>
      <label className="block text-sm">
        Message
        <textarea
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={fieldClass}
        />
      </label>
      <button
        type="submit"
        disabled={!canSubmit}
        className="min-h-11 rounded-sm bg-dusky-red px-5 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}
