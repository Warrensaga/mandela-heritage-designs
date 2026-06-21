import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products, fmtKES, waLink } from "@/data/products";
import { useWishlist } from "@/hooks/use-wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Mandela Heritage" },
      { name: "description", content: "Your saved furniture from Mandela Heritage. Send your wishlist directly to us via WhatsApp." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));
  const total = saved.reduce((s, p) => s + p.price, 0);

  const msg = () => {
    if (!saved.length) return waLink("Hi, I'd like help building a wishlist.");
    const list = saved.map((p, i) => `${i + 1}. ${p.name} — ${fmtKES(p.price)}`).join("\n");
    return waLink(`Hi, I'd like to order from my wishlist:\n\n${list}\n\nTotal: ${fmtKES(total)}\n\nPlease confirm availability and delivery.`);
  };

  return (
    <Layout>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">My Wishlist</p>
          <h1 className="mt-2 font-display text-5xl font-bold">My Saved <span className="italic text-accent">Items</span></h1>
          <p className="mt-3 text-muted-foreground">{saved.length} {saved.length === 1 ? "item" : "items"}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        {saved.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-16 text-center">
            <p className="font-display text-2xl">Your wishlist is empty</p>
            <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-cream">Browse Furniture →</Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            <div className="mt-12 rounded-2xl bg-charcoal p-10 text-center text-cream">
              <p className="text-sm uppercase tracking-widest text-cream/70">Wishlist Total</p>
              <p className="mt-2 font-display text-4xl font-bold text-accent">{fmtKES(total)}</p>
              <a href={msg()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-cream">WhatsApp Us Your Wishlist →</a>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}