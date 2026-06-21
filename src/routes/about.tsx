import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { waGeneral } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mandela Heritage — Furniture & Furnishing Nairobi" },
      { name: "description", content: "Mandela Heritage Furnitures has served Nairobi families and businesses for over a decade from our Eastern Bypass showroom. Quality, trust, service." },
      { property: "og:title", content: "About Mandela Heritage" },
      { property: "og:description", content: "Built on Quality. Driven by Trust." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">About Us</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">Built on Quality.<br /><span className="italic text-accent">Driven by Trust.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Mandela Heritage Furnitures has been serving Nairobi families and businesses from our Eastern Bypass showroom. We believe every home and office deserves quality furniture at fair prices — with the service to match. From single pieces to full home furnishing, we handle everything.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-cream py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          {[["500+", "Products In Stock"], ["10+", "Years Experience"], ["100%", "Nairobi Delivery"], ["7 Days", "A Week Open"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl font-bold text-accent">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center font-display text-4xl font-bold">Our <span className="italic text-accent">Values</span></h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            ["🏆", "Quality First", "We source only quality furniture that lasts."],
            ["🤝", "Trust Always", "We are honest about pricing and timelines."],
            ["🚚", "Service Matters", "From purchase to delivery to install we are with you."],
          ].map(([e, t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="text-4xl">{e}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center font-display text-4xl font-bold">Meet the <span className="italic text-accent">Team</span></h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { n: "James Mandela", r: "Owner & Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" },
              { n: "Grace Wanjiku", r: "Sales Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" },
              { n: "Peter Otieno", r: "Head of Delivery & Installation", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
            ].map((m) => (
              <div key={m.n} className="text-center">
                <img src={m.img} alt={m.n} className="mx-auto aspect-square w-56 rounded-2xl object-cover" />
                <h3 className="mt-4 font-display text-xl font-bold">{m.n}</h3>
                <p className="text-sm text-muted-foreground">{m.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <img src="https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80" alt="Showroom" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Visit Our Showroom</p>
            <h2 className="mt-2 font-display text-4xl font-bold">See it in <span className="italic text-accent">person</span></h2>
            <ul className="mt-6 space-y-2 text-sm">
              <li>📍 Eastern Bypass, Nairobi</li>
              <li>🕘 Mon–Sat: 9AM–7PM</li>
              <li>🕘 Sunday: 11AM–4PM</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://maps.google.com/?q=-1.2748849,36.9725608" target="_blank" rel="noopener noreferrer" className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream">Get Directions →</a>
              <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="rounded-full border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal">WhatsApp Before You Visit →</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}