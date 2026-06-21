import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { waQuote } from "@/data/products";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects — Mandela Heritage Furnishing Nairobi" },
      { name: "description", content: "Spaces we have transformed across Nairobi — Kilimani, Westlands, Karen, Lavington, Runda and Upper Hill. See our furnishing portfolio." },
      { property: "og:title", content: "Our Projects — Mandela Heritage" },
      { property: "og:description", content: "Spaces we have transformed across Nairobi." },
    ],
  }),
  component: Projects,
});

const items = [
  { loc: "Kilimani", type: "3-Bedroom Apartment", sub: "Full Home Furnishing", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80" },
  { loc: "Westlands", type: "Executive Office", sub: "Office Furnishing", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80" },
  { loc: "Karen", type: "Family Living Room", sub: "Room Transformation", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80" },
  { loc: "Lavington", type: "Studio Apartment", sub: "Full Furnishing", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80" },
  { loc: "Upper Hill", type: "Corporate Office", sub: "Office Setup", img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=900&q=80" },
  { loc: "Runda", type: "New Home", sub: "Complete Home Package", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
];

function Projects() {
  return (
    <Layout>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Our Projects</p>
          <h1 className="mt-2 font-display text-5xl font-bold">Spaces we have <span className="italic text-accent">transformed</span></h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">From single rooms to complete homes and offices — see how we have brought Nairobi spaces to life.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article key={p.loc + p.type} className="group relative aspect-[4/5] overflow-hidden rounded-xl">
              <img src={p.img} alt={`${p.loc} ${p.type}`} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-cream">
                <p className="text-xs uppercase tracking-widest text-accent">📍 {p.loc}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{p.type}</h3>
                <p className="text-sm text-cream/80">{p.sub}</p>
              </div>
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 bg-charcoal/40" />
                <span className="relative font-display text-2xl font-semibold text-cream">View Project →</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-charcoal p-12 text-center text-cream">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Have a space to <span className="italic text-accent">transform?</span></h2>
          <a href={waQuote} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-accent px-8 py-3 font-semibold">WhatsApp Us to Discuss Your Project →</a>
        </div>
      </section>
    </Layout>
  );
}