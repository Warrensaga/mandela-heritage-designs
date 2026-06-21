import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/layout";
import { waGeneral, waLink } from "@/data/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Mandela Heritage — Eastern Bypass, Nairobi" },
      { name: "description", content: "Visit our Eastern Bypass showroom or WhatsApp +254 701 333358. Open Mon–Sat 9AM–7PM, Sun 11AM–4PM." },
      { property: "og:title", content: "Contact Mandela Heritage" },
      { property: "og:description", content: "Eastern Bypass, Nairobi. WhatsApp +254 701 333358." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", type: "Furniture Purchase", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = waLink(`Name: ${form.name}\nPhone: ${form.phone}\nEnquiry: ${form.type}\nMessage: ${form.message}`);
    window.open(link, "_blank");
  };

  return (
    <Layout>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Contact Us</p>
          <h1 className="mt-3 font-display text-5xl font-bold">Let's <span className="italic text-accent">talk</span></h1>
          <p className="mt-4 text-muted-foreground">We reply on WhatsApp within 1 hour.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <ul className="space-y-3 text-base">
              <li>📍 Eastern Bypass, Nairobi, Kenya</li>
              <li>📞 +254 701 333358</li>
              <li>🕘 Mon–Sat: 9AM–7PM</li>
              <li>🕘 Sunday: 11AM–4PM</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-cream">Chat on WhatsApp →</a>
              <a href="tel:+254701333358" className="rounded-full border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal">Call Us →</a>
              <a href="https://maps.google.com/?q=-1.2748849,36.9725608" target="_blank" rel="noopener noreferrer" className="rounded-full border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal">Get Directions →</a>
            </div>
          </div>
          <div>
            <iframe
              title="Mandela Heritage Map"
              src="https://www.google.com/maps?q=-1.2748849,36.9725608&z=15&output=embed"
              className="h-[400px] w-full rounded-2xl border border-border"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="mt-12 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold">Send an enquiry</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
            <input required placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
          </div>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 text-sm">
            <option>Furniture Purchase</option>
            <option>Furnishing Services</option>
            <option>Delivery & Installation</option>
            <option>General Enquiry</option>
          </select>
          <textarea required placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
          <button className="w-full rounded-full bg-accent py-3 font-semibold text-cream sm:w-fit sm:px-8">Send Enquiry →</button>
        </form>
      </section>
    </Layout>
  );
}