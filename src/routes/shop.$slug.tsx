import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { getProduct, getRelated, fmtKES, waProductOrder, waQuote, products } from "@/data/products";
import { useWishlist, useCart } from "@/hooks/use-wishlist";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    const p = loaderData;
    return {
      meta: p ? [
        { title: `${p.name} — ${fmtKES(p.price)} | Mandela Heritage Nairobi` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Mandela Heritage` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
      ] : [],
    };
  },
  component: ProductPage,
  notFoundComponent: () => <Layout><div className="mx-auto max-w-xl px-6 py-32 text-center"><h1 className="font-display text-4xl">Product not found</h1><Link to="/shop" className="mt-6 inline-block text-accent underline">Back to shop</Link></div></Layout>,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const [tab, setTab] = useState<"desc" | "spec" | "rev">("desc");
  const [color, setColor] = useState(p.colors?.[0] || "");
  const [imgIdx, setImgIdx] = useState(0);
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const saved = has(p.id);

  const gallery = [p.image, ...products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3).map(x => x.image)];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-6">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link> &gt; <Link to="/shop" className="hover:text-accent">Shop</Link> &gt; <span>{p.category}</span> &gt; <span className="text-charcoal">{p.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-surface">
              <img src={gallery[imgIdx]} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`aspect-square overflow-hidden rounded-lg border-2 ${i === imgIdx ? "border-accent" : "border-transparent"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">{p.category}</span>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{p.name}</h1>
            <p className="mt-3 text-sm text-muted-foreground">{"★".repeat(p.rating)} <span className="ml-2">{p.reviews} reviews</span></p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">{fmtKES(p.price)}</span>
              {p.original && <span className="text-lg text-muted-foreground line-through">{fmtKES(p.original)}</span>}
            </div>

            <ul className="mt-6 space-y-1 text-sm">
              <li>✅ In Stock</li>
              <li>🚚 Free Delivery Included</li>
              <li>🔧 Free Installation</li>
            </ul>

            {p.colors && p.colors.length > 1 && (
              <div className="mt-6">
                <p className="text-sm font-semibold">Colour:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.colors.map((c: string) => (
                    <button key={c} onClick={() => setColor(c)} className={`rounded-full border px-4 py-1.5 text-sm ${color === c ? "border-accent bg-accent/10" : "border-border"}`}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-6 border-t border-border pt-6 text-sm text-muted-foreground">{p.description}</p>

            <div className="mt-6 space-y-3">
              <button onClick={() => toggle(p.id)} className="flex w-full items-center justify-center gap-2 rounded-full border border-charcoal py-3 text-sm font-semibold">
                {saved ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
              </button>
              <button onClick={() => add(p.id)} className="w-full rounded-full bg-charcoal py-3 text-sm font-semibold text-cream">Add to Cart</button>
              <a href={waProductOrder(p)} target="_blank" rel="noopener noreferrer" className="block w-full rounded-full bg-accent py-3 text-center text-sm font-semibold text-cream">WhatsApp to Order 💬</a>
              <a href={waQuote} target="_blank" rel="noopener noreferrer" className="block w-full rounded-full border border-border py-3 text-center text-sm font-semibold">Get a Custom Quote</a>
            </div>

            <ul className="mt-6 space-y-1 border-t border-border pt-6 text-sm text-muted-foreground">
              <li>📦 Delivery: 1–3 working days</li>
              <li>🔧 Installation: Included free</li>
              <li>📍 Nairobi-wide delivery</li>
              <li>💳 M-Pesa accepted</li>
              <li>🔄 30-day returns accepted</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex gap-2 border-b border-border">
          {([
            ["desc", "Description"],
            ["spec", "Specifications"],
            ["rev", `Reviews (${p.reviews})`],
          ] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold ${tab === k ? "border-accent text-accent" : "border-transparent text-muted-foreground"}`}>{l}</button>
          ))}
        </div>
        <div className="py-8 text-sm leading-relaxed text-muted-foreground">
          {tab === "desc" && (
            <div className="max-w-3xl space-y-4">
              <p>{p.description}</p>
              <p>Our {p.name} is built right here in Nairobi using premium {p.material?.toLowerCase()} and finished by hand. Delivery and installation are included for any address across Nairobi — Westlands, Karen, Kilimani, Lavington, Runda, Eastern Bypass and beyond.</p>
              <p>Every order includes free assembly by our team. WhatsApp us to confirm availability and arrange delivery — most orders arrive within 1–3 working days.</p>
            </div>
          )}
          {tab === "spec" && (
            <table className="w-full max-w-2xl text-sm">
              <tbody>
                {[
                  ["Dimensions", p.dimensions],
                  ["Material", p.material],
                  ["Frame", p.frame],
                  ["Colour Options", p.colors?.join(", ")],
                  ["Weight", p.weight],
                  ["Warranty", p.warranty],
                  ["Delivery", "1–3 working days"],
                  ["Installation", "Free — Included"],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-border"><td className="py-3 pr-6 font-semibold text-charcoal">{k}</td><td className="py-3">{v}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "rev" && (
            <div className="max-w-2xl space-y-6">
              {[
                { n: "Wanjiru K.", loc: "Karen", t: "Quality is amazing. Delivered in 2 days as promised." },
                { n: "Brian M.", loc: "Westlands", t: "Solid build, looks even better in person. Installation team was professional." },
                { n: "Aisha N.", loc: "Kilimani", t: "Worth every shilling. Will definitely order again." },
              ].map((r) => (
                <div key={r.n} className="border-b border-border pb-4">
                  <p className="text-accent">★★★★★</p>
                  <p className="mt-1 text-sm">"{r.t}"</p>
                  <p className="mt-2 text-xs text-charcoal">{r.n} — {r.loc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 font-display text-3xl font-bold">You may also <span className="italic text-accent">like</span></h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {getRelated(p).map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </div>
      </section>

      {/* Mobile sticky bottom */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-cream p-3 shadow-2xl md:hidden">
        <span className="font-display text-lg font-bold">{fmtKES(p.price)}</span>
        <button onClick={() => toggle(p.id)} className="rounded-full border border-border px-3 py-2 text-xs">{saved ? "♥" : "♡"} Save</button>
        <a href={waProductOrder(p)} target="_blank" rel="noopener noreferrer" className="ml-auto rounded-full bg-accent px-4 py-2 text-sm font-semibold text-cream">WhatsApp to Order</a>
      </div>
    </Layout>
  );
}