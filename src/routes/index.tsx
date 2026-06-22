import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { Reveal, RevealStagger, revealItem } from "@/components/reveal";
import { products, fmtKES, waLink, waQuote, waGeneral } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mandela Heritage — Premium Furniture & Furnishing in Nairobi" },
      { name: "description", content: "Handcrafted furniture and full furnishing services for Nairobi homes and offices. Eastern Bypass. Free delivery over KES 30,000. M-Pesa accepted." },
      { property: "og:title", content: "Mandela Heritage — Premium Furniture & Furnishing in Nairobi" },
      { property: "og:description", content: "Handcrafted furniture and full furnishing services for Nairobi homes and offices." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80" },
    ],
  }),
  component: Index,
});

const heroSlides = [
  { tag: "SOFAS & SEATING", name: "3-Seater Fabric Sofa Set", price: "KES 45,000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80", wa: waLink("Hi, I'm interested in the 3-Seater Fabric Sofa Set at KES 45,000. Is it available?") },
  { tag: "BEDROOM", name: "Queen Size Bedroom Suite", price: "KES 85,000", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80", wa: waLink("Hi, I'm interested in the Queen Size Bedroom Suite at KES 85,000. Is it available?") },
  { tag: "DINING", name: "6-Seater Dining Table Set", price: "KES 55,000", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80", wa: waLink("Hi, I'm interested in the 6-Seater Dining Table Set at KES 55,000. Is it available?") },
  { tag: "OFFICE", name: "Executive Office Package", price: "KES 85,000", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80", wa: waLink("Hi, I'm interested in the Executive Office Package at KES 85,000. Is it available?") },
  { tag: "FULL PACKAGES", name: "Complete Living Room Package", price: "KES 150,000", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80", wa: waLink("Hi, I'm interested in the Complete Living Room Package at KES 150,000. Is it available?") },
  { tag: "FURNISHING SERVICES", name: "We Transform Your Space", price: "From KES 50,000", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80", wa: waQuote },
];

function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, [paused]);
  const s = heroSlides[i];
  return (
    <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden lg:h-[calc(100vh-4rem)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="sync">
        <motion.img
          key={s.image}
          src={s.image}
          alt={s.name}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-6 py-16 text-cream lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{s.tag}</p>
          </motion.div>
        </AnimatePresence>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
          Timeless<br />
          <span className="italic text-accent">Furniture</span> for Nairobi
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-5 max-w-xl text-base text-cream/85 sm:text-lg">
          Handcrafted pieces and full furnishing services for Nairobi homes and offices. Free delivery over KES 30,000.
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.name + "-card"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 hidden w-fit rounded-2xl border border-cream/20 bg-charcoal/40 p-5 backdrop-blur-md sm:block"
          >
            <p className="text-xs uppercase tracking-widest text-cream/70">Featured</p>
            <h3 className="mt-1 font-display text-xl font-bold">{s.name}</h3>
            <p className="mt-0.5 text-sm font-semibold text-accent">{s.price}</p>
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-cream transition hover:bg-accent/90">Shop Collection →</Link>
          <a href={s.wa} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream/40 bg-cream/10 px-7 py-3 text-sm font-semibold text-cream backdrop-blur transition hover:bg-cream hover:text-charcoal">Order on WhatsApp</a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-2 bg-cream/50"}`} />
        ))}
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-accent">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionHeading({ pre, accent, link }: { pre: string; accent: string; link?: { to: string; label: string } }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
        {pre} <span className="italic text-accent">{accent}</span>
      </h2>
      {link && <Link to={link.to} className="hidden text-sm font-medium text-charcoal underline-offset-4 hover:text-accent hover:underline sm:block">{link.label}</Link>}
    </div>
  );
}

function Index() {
  const [tab, setTab] = useState("All");
  const bestSellers = products.filter((p) => p.bestSeller || p.badge === "BEST SELLER" || p.badge === "NEW" || p.badge === "SALE").slice(0, 12);
  const filtered = tab === "All" ? bestSellers.slice(0, 6) : bestSellers.filter((p) => p.category === tab).slice(0, 6);
  const newArrivals = [products[24], products[6], products[12], products[27]];
  const offers = products.filter((p) => p.badge === "SALE");

  return (
    <Layout>
      {/* HERO — full-width carousel */}
      <section className="bg-charcoal">
        <HeroCarousel />
        <div className="border-t border-border bg-cream">
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6 px-6 py-8">
            <Stat n="2.4K+" label="Happy Clients" />
            <Stat n="340+" label="Unique Pieces" />
            <Stat n="15yr" label="Craftsmanship" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF TICKER */}
      <div className="overflow-hidden bg-accent py-2.5 text-xs font-medium text-charcoal">
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
          {Array(4).fill("⭐ 4.0 Google Rating · ✅ 500+ Products · 🚚 Nairobi-Wide Delivery · 🔧 Free Installation · 📞 Reply Within 1 Hour · 💳 M-Pesa Accepted ·").map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* CATEGORY SCROLL */}
      <div className="border-b border-border bg-cream py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 overflow-x-auto px-6 text-xs uppercase tracking-widest text-muted-foreground">
          {["Sofas", "Bedroom", "Dining", "Office", "Accent", "Packages", "New In", "Sale"].map((c, i, arr) => (
            <span key={c} className="flex items-center gap-1 whitespace-nowrap">
              <Link to="/shop" className="hover:text-accent">{c}</Link>
              {i < arr.length - 1 && <span className="mx-2 opacity-40">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading pre="Shop by" accent="Category" link={{ to: "/shop", label: "View all categories →" }} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { name: "Living Room", count: "12 items", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80" },
            { name: "Bedroom", count: "6 items", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80" },
            { name: "Dining", count: "6 items", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80" },
            { name: "Office", count: "6 items", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80" },
          ].map((c) => (
            <Link key={c.name} to="/shop" className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={c.img} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-cream">
                <h3 className="font-display text-xl font-bold">{c.name}</h3>
                <p className="text-xs text-cream/70">{c.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading pre="Our" accent="Best Sellers" link={{ to: "/shop", label: "View all products →" }} />
          <div className="mb-8 flex flex-wrap gap-2">
            {["All", "Sofas", "Bedroom", "Dining", "Office", "Accent"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === t ? "bg-accent text-cream" : "border border-border bg-card text-muted-foreground hover:text-charcoal"}`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading pre="New" accent="Arrivals" link={{ to: "/shop", label: "View all →" }} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading pre="Special" accent="Offers" link={{ to: "/shop", label: "View all deals →" }} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {offers.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <p className="mt-6 text-center text-xs italic text-muted-foreground">* Offers valid while stock lasts. WhatsApp to confirm availability.</p>
        </div>
      </section>

      {/* TWO PATH */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { icon: "🛋️", title: "FURNITURE STORE", body: "Browse our full catalogue — sofas, bedroom suites, dining sets, office furniture and accent pieces. Available for immediate purchase and Nairobi-wide delivery.", cta: "Browse Catalogue →", href: "/shop", internal: true },
            { icon: "🏠", title: "FURNISHING SERVICES", body: "We design and furnish entire homes, offices, and commercial spaces. From concept to completion. Tell us your space — we handle everything else.", cta: "Get a Quote →", href: waQuote, internal: false },
          ].map((c) => (
            <div key={c.title} className="flex flex-col rounded-2xl border border-border bg-card p-10">
              <div className="text-5xl">{c.icon}</div>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">{c.title}</p>
              <p className="mt-4 flex-1 text-base text-charcoal/80">{c.body}</p>
              {c.internal ? (
                <Link to={c.href} className="mt-6 inline-block w-fit rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream">{c.cta}</Link>
              ) : (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-cream">{c.cta}</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80" alt="Craftsman" className="aspect-[4/5] w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=500&q=80" alt="Wood grain" className="absolute -bottom-8 -right-4 hidden h-48 w-48 rounded-xl object-cover shadow-2xl ring-8 ring-surface md:block" />
            <div className="absolute -left-4 top-8 rounded-2xl bg-accent p-5 text-cream shadow-xl">
              <div className="font-display text-3xl font-black">15 YRS</div>
              <div className="text-xs uppercase tracking-wider">Working<br />Craftsmanship</div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Furniture should<br /><span className="italic text-accent">tell a story</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              At Mandela Heritage, we believe a room is only as meaningful as the pieces within it. Each piece is crafted from sustainably sourced materials and hand-finished details built to grow more beautiful with time, not less.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                ["Sustainably sourced", "Every piece is responsibly crafted and sourced"],
                ["Never mass-produced", "Built with decades of experience in every piece"],
                ["Free returns within 30 days", "No questions asked with full refund guarantee"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-cream">✓</span>
                  <div>
                    <div className="font-semibold">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FURNISHING SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading pre="Furnishing" accent="Services" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { icon: "🏠", title: "Full Home Furnishing", price: "Starting from KES 150,000", body: "Moving into a new home? We handle furniture selection, delivery, placement and styling." },
            { icon: "🛋️", title: "Single Room Makeover", price: "Starting from KES 50,000", body: "Transform one room at a time. We source, deliver, and style everything perfectly." },
            { icon: "🏢", title: "Office Furnishing", price: "Custom Quote", body: "Complete office solutions for startups, corporates and commercial spaces." },
            { icon: "🚚", title: "Delivery & Installation", price: "WhatsApp for Rates", body: "Professional delivery and installation across all Nairobi neighbourhoods." },
          ].map((s) => (
            <div key={s.title} className="flex flex-col rounded-2xl border border-border bg-card p-8">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-4 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{s.price}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.body}</p>
              <a href={waQuote} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block w-fit rounded-full border border-charcoal px-5 py-2 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-cream">WhatsApp to Discuss →</a>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSFORMATIONS — before/after sliders */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading pre="" accent="Transformations" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { before: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", loc: "Kilimani", type: "Full Home Furnishing" },
              { before: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", loc: "Westlands", type: "Office Setup" },
              { before: "https://images.unsplash.com/photo-1560185009-5bf9f2849488?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", loc: "Karen", type: "Room Transformation" },
            ].map((t, i) => <BeforeAfter key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* PROJECTS TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading pre="Our" accent="Projects" link={{ to: "/projects", label: "View all projects →" }} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { loc: "Kilimani", type: "3-Bedroom Apartment", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" },
            { loc: "Westlands", type: "Corporate Office", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
            { loc: "Karen", type: "Family Living Room", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80" },
          ].map((p) => (
            <Link key={p.loc} to="/projects" className="group relative aspect-[4/5] overflow-hidden rounded-xl">
              <img src={p.img} alt={p.loc} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-cream">
                <p className="text-xs uppercase tracking-widest text-accent">{p.loc}</p>
                <h3 className="font-display text-xl font-bold">{p.type}</h3>
              </div>
              <div className="absolute inset-0 grid place-items-center bg-charcoal/0 opacity-0 transition-opacity group-hover:bg-charcoal/40 group-hover:opacity-100">
                <span className="font-semibold text-cream">View Project →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="font-display text-xl">Have a space to transform?</p>
          <a href={waQuote} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-cream">WhatsApp Us to Discuss Your Project →</a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-charcoal py-20 text-cream">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold sm:text-5xl">What people <span className="italic text-accent">say</span></h2>
            <p className="text-sm text-cream/70">4.8/5 average across 2,400+ Nairobi reviews</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { q: "Absolutely love my new dining set. The walnut finish is stunning and fits perfectly in our Karen home. Delivery was seamless.", n: "Samuel Otieno", loc: "Karen", featured: false },
              { q: "The quality exceeded all my expectations. The sofa is very stylish and feels far more expensive than what we paid. Will definitely order again — absolutely stunning.", n: "Olivia Martinez", loc: "Kilimani", featured: true },
              { q: "They transformed our Westlands office completely. From empty space to fully furnished in 3 days. Our team loves it.", n: "David Otieno", loc: "Westlands", featured: false },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl p-8 ${t.featured ? "bg-accent text-cream" : "bg-cream text-charcoal"}`}>
                <p className="text-sm leading-relaxed">"{t.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-full font-bold ${t.featured ? "bg-cream text-accent" : "bg-accent text-cream"}`}>{t.n[0]}</div>
                  <div>
                    <div className="text-sm font-semibold">{t.n}</div>
                    <div className={`text-xs ${t.featured ? "text-cream/80" : "text-muted-foreground"}`}>{t.loc} · ★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MANDELA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold sm:text-5xl">Why Mandela <span className="italic text-accent">Heritage?</span></h2>
          <p className="max-w-xs text-sm text-muted-foreground">Your satisfaction drives every piece we make</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "📦", "Premium Materials", "Solid hardwoods, performance fabrics and high-quality finishes to last decades"],
            ["02", "🌿", "Sustainable Craft", "Eco-friendly and sustainable production methods ensure responsible manufacturing"],
            ["03", "✏️", "Timeless Design", "Contemporary designs that complement any Nairobi home or office"],
            ["04", "⭐", "Customer First", "Dedicated support, white-glove delivery and a flexible returns policy"],
          ].map(([n, e, t, d]) => (
            <div key={n} className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
              <div className="pointer-events-none absolute -right-4 -top-6 font-display text-7xl font-black text-accent/15">{n}</div>
              <div className="text-3xl">{e}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Follow us on <span className="italic text-accent">Instagram</span></h2>
            <span className="text-sm text-accent">@mandelaheritage</span>
          </div>
          <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-6">
            {[1,2,3,4,5,6].map((i) => (
              <img key={i} src={products[i * 3].image} alt="" className="aspect-square w-40 shrink-0 rounded-lg object-cover md:w-auto" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream">Follow Us on Instagram →</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Stay in the <span className="italic text-accent">loop</span></h2>
            <p className="mt-4 max-w-md text-muted-foreground">New arrivals, limited-run and exclusive discounts delivered to your inbox. No spam — only good things.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! We'll be in touch."); }} className="flex flex-col gap-3 sm:flex-row">
            <input required placeholder="First name" className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-accent" />
            <input required type="email" placeholder="Email address" className="flex-[2] rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-accent" />
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-cream">Subscribe</button>
          </form>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-t border-border bg-cream py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center text-sm md:grid-cols-5">
          {[
            ["🔒", "Secure Shopping"],
            ["💳", "M-Pesa Accepted"],
            ["🚚", "Free Delivery Over KES 30K"],
            ["🔧", "Free Installation"],
            ["⭐", "Trusted In Nairobi"],
          ].map(([e, t]) => (
            <div key={t}>
              <div className="text-2xl">{e}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function BeforeAfter({ before, after, loc, type }: { before: string; after: string; loc: string; type: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div className="relative aspect-[4/3] select-none overflow-hidden rounded-xl">
        <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={before} alt="Before" className="h-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }} />
        </div>
        <input
          type="range" min="0" max="100" value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
        <div className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-cream shadow-lg" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-charcoal shadow-xl">⇆</div>
        </div>
        <span className="absolute left-3 top-3 rounded bg-charcoal/70 px-2 py-1 text-[10px] font-bold uppercase text-cream">Before</span>
        <span className="absolute right-3 top-3 rounded bg-accent px-2 py-1 text-[10px] font-bold uppercase text-cream">After</span>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-display font-semibold">📍 {loc}</span>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{type}</span>
      </div>
    </div>
  );
}
