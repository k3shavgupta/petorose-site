"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";

interface Props {
  products: { slug: string; name: string }[];
  email: string;
  initialProduct?: string;
}

type Status = { kind: "idle" | "sending" | "sent" | "mail" | "error"; message?: string };

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/**
 * Enquiry form. With NEXT_PUBLIC_FORMSPREE_ID set it posts to Formspree (emails the address configured there);
 * otherwise it opens the visitor's email app addressed to the company, so it works on any static host.
 */
export function EnquiryForm({ products, email, initialProduct = "" }: Props) {
  const id = useId();
  const [product, setProduct] = useState(initialProduct);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const productName = products.find((p) => p.slug === data.get("product"))?.name ?? "General enquiry";
    const type = String(data.get("type"));
    const subject = `${type}: ${productName}`;

    if (FORMSPREE_ID) {
      setStatus({ kind: "sending" });
      data.set("_subject", `Website enquiry — ${subject}`);
      data.set("product", productName);
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setProduct("");
        setStatus({ kind: "sent", message: "Thank you. Your enquiry has been sent; we will reply by email." });
      } catch {
        setStatus({ kind: "error", message: `Sorry, the enquiry could not be sent. Please email us at ${email}.` });
      }
      return;
    }

    const lines = [
      `Enquiry type: ${type}`,
      `Product: ${productName}`,
      data.get("quantity") ? `Quantity: ${data.get("quantity")}` : null,
      "",
      String(data.get("message")),
      "",
      `Name: ${data.get("name")}`,
      data.get("company") ? `Company: ${data.get("company")}` : null,
      `Email: ${data.get("email")}`,
      data.get("phone") ? `Phone: ${data.get("phone")}` : null,
      data.get("country") ? `Country: ${data.get("country")}` : null,
    ].filter((l) => l !== null);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Website enquiry — ${subject}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus({ kind: "mail", message: `Your email app should now open with the enquiry addressed to ${email}. Press send there to finish.` });
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-white/15 bg-noir-bg px-3.5 py-2.5 text-base text-noir-text placeholder:text-noir-muted/60 focus:border-noir-orchid focus:outline-none";
  const label = "text-sm font-medium text-noir-text";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-product`} className={label}>
          Product
        </label>
        <select id={`${id}-product`} name="product" value={product} onChange={(e) => setProduct(e.target.value)} className={field}>
          <option value="">General enquiry / not listed</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>I would like</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Quotation", "Sample", "Technical information", "Other"].map((t, i) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm text-noir-muted has-[:checked]:border-noir-orchid has-[:checked]:text-noir-text"
            >
              <input type="radio" name="type" value={t} defaultChecked={i === 0} className="accent-[#e384ea]" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          Name <span aria-hidden className="text-noir-orchid">*</span>
        </label>
        <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-company`} className={label}>
          Company
        </label>
        <input id={`${id}-company`} name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Email <span aria-hidden className="text-noir-orchid">*</span>
        </label>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          Phone / WhatsApp
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-country`} className={label}>
          Country
        </label>
        <input id={`${id}-country`} name="country" autoComplete="country-name" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-quantity`} className={label}>
          Quantity (optional)
        </label>
        <input id={`${id}-quantity`} name="quantity" placeholder="e.g. 25 kg" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          Message <span aria-hidden className="text-noir-orchid">*</span>
        </label>
        <textarea id={`${id}-message`} name="message" required rows={5} className={field} />
      </div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="rounded-full bg-noir-saffron px-6 py-3 font-semibold text-noir-bg transition hover:bg-[#ffc56b] disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-noir-muted">
          <span aria-hidden className="text-noir-orchid">*</span> Required
        </p>
      </div>
      <p role="status" aria-live="polite" className={`min-h-5 text-sm sm:col-span-2 ${status.kind === "error" ? "text-noir-saffron" : "text-noir-orchid"}`}>
        {status.message}
      </p>
    </form>
  );
}

/** Pre-fills the product from product pages (/contact/?product=<slug>). Render inside <Suspense> with a plain <EnquiryForm> fallback. */
export function EnquiryFormFromUrl(props: Omit<Props, "initialProduct">) {
  const slug = useSearchParams().get("product") ?? "";
  return <EnquiryForm {...props} initialProduct={props.products.some((p) => p.slug === slug) ? slug : ""} />;
}
