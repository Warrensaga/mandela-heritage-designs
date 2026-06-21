import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Mandela Heritage Furnitures Nairobi" },
      { name: "description", content: "Answers to common questions about delivery, installation, payment, custom furniture, returns, warranty and ordering from Mandela Heritage in Nairobi." },
      { property: "og:title", content: "FAQ — Mandela Heritage" },
      { property: "og:description", content: "Common questions about furniture delivery, installation and ordering in Nairobi." },
    ],
  }),
  component: FAQ,
});

const faqs: [string, string][] = [
  ["Do you deliver across Nairobi?", "Yes — we deliver to every Nairobi neighbourhood including Westlands, Karen, Kilimani, Lavington, Runda, Eastern Bypass and surrounding areas. Delivery is free on orders over KES 30,000."],
  ["Is installation included?", "Yes. Free professional installation is included with every order, regardless of order size."],
  ["Can I see furniture before buying?", "Absolutely — visit our showroom on the Eastern Bypass, Nairobi. We are open Mon–Sat 9AM–7PM and Sun 11AM–4PM. WhatsApp us before you visit."],
  ["What payment methods do you accept?", "We accept M-Pesa, bank transfer, and cash on delivery for Nairobi orders."],
  ["Can you furnish my entire home or office?", "Yes — full home and office furnishing is one of our specialities. WhatsApp us with photos or dimensions of your space and we will design a complete package."],
  ["Do you offer custom furniture?", "Yes — we build custom pieces to fit your space and style. Share your idea via WhatsApp and we will quote within 24 hours."],
  ["How long does delivery take?", "Standard delivery is 1–3 working days. Same-day delivery is available on select in-stock items."],
  ["Can I return or exchange furniture?", "Yes — we accept returns within 30 days with full refund. No questions asked."],
  ["Do you offer a warranty?", "Yes — most pieces carry a 1–2 year warranty on craftsmanship and structural integrity."],
  ["How do I place an order?", "The easiest way is WhatsApp +254 701 333358 — we reply within 1 hour. You can also use the order buttons on our product pages."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">FAQ</p>
          <h1 className="mt-3 font-display text-5xl font-bold">Frequently asked <span className="italic text-accent">questions</span></h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-3">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="overflow-hidden rounded-xl border border-border bg-card">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
                  <span>❓ {q}</span>
                  <span className={`text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </button>
                <div className={`grid transition-all ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}