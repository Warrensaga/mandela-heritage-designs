import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { products, categories, Product } from "@/data/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Furniture — Mandela Heritage Nairobi" },
      { name: "description", content: "Browse our full catalogue of sofas, bedroom suites, dining sets, office furniture, accent pieces and full packages — delivered Nairobi-wide." },
      { property: "og:title", content: "Shop Furniture — Mandela Heritage Nairobi" },
      { property: "og:description", content: "Browse our full catalogue of sofas, bedroom suites, dining sets, office furniture, accent pieces and full packages." },
    ],
  }),
  component: Shop,
});

const rooms = ["Living Room", "Bedroom", "Dining Room", "Home Office"] as const;
const types = ["Individual", "Sets", "Packages"] as const;
const sorts = [
  ["featured", "Featured"],
  ["price-asc", "Price: Low to High"],
  ["price-desc", "Price: High to Low"],
  ["best", "Best Sellers First"],
  ["new", "Newest First"],
  ["name", "Name: A to Z"],
] as const;

function Shop() {
  const [search, setSearch] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(350000);
  const [inStock, setInStock] = useState(false);
  const [selRooms, setSelRooms] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<string[]>([]);
  const [bestOnly, setBestOnly] = useState(false);
  const [sort, setSort] = useState<string>("featured");
  const [drawer, setDrawer] = useState(false);

  const toggle = (list: string[], v: string, set: (x: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    let r: Product[] = products.filter((p) => {
      if (search && !`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (selRooms.length && !selRooms.includes(p.room)) return false;
      if (selTypes.length && !selTypes.includes(p.type)) return false;
      if (bestOnly && !p.bestSeller) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "best": r = [...r].sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0)); break;
      case "new": r = [...r].sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0)); break;
      case "name": r = [...r].sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return r;
  }, [search, cats, maxPrice, selRooms, selTypes, bestOnly, sort]);

  const clearAll = () => { setSearch(""); setCats([]); setMaxPrice(350000); setSelRooms([]); setSelTypes([]); setBestOnly(false); };

  const Sidebar = () => (
    <aside className="space-y-7 text-sm">
      <FilterGroup title="Category">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c).length;
          return (
            <label key={c} className="flex cursor-pointer items-center justify-between">
              <span className="flex items-center gap-2">
                <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, c, setCats)} className="accent-accent" />
                {c}
              </span>
              <span className="text-xs text-muted-foreground">({count})</span>
            </label>
          );
        })}
      </FilterGroup>
      <FilterGroup title="Price Range">
        <div className="text-xs text-muted-foreground">KES 0 — KES {maxPrice.toLocaleString()}</div>
        <input type="range" min={10000} max={350000} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full accent-accent" />
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="flex cursor-pointer items-center gap-2"><input type="radio" name="stock" checked={inStock} onChange={() => setInStock(true)} className="accent-accent" /> In Stock</label>
        <label className="flex cursor-pointer items-center gap-2"><input type="radio" name="stock" checked={!inStock} onChange={() => setInStock(false)} className="accent-accent" /> All Items</label>
      </FilterGroup>
      <FilterGroup title="Room Type">
        {rooms.map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={selRooms.includes(r)} onChange={() => toggle(selRooms, r, setSelRooms)} className="accent-accent" /> {r}</label>
        ))}
      </FilterGroup>
      <FilterGroup title="Product Type">
        {types.map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={selTypes.includes(t)} onChange={() => toggle(selTypes, t, setSelTypes)} className="accent-accent" /> {t}</label>
        ))}
      </FilterGroup>
      <FilterGroup title="Best Sellers">
        <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={bestOnly} onChange={(e) => setBestOnly(e.target.checked)} className="accent-accent" /> Only show best sellers</label>
      </FilterGroup>
      <div className="flex gap-2">
        <button onClick={clearAll} className="flex-1 rounded-full border border-border px-4 py-2 text-sm">Clear All</button>
        <button onClick={() => setDrawer(false)} className="flex-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-cream">Apply ✓</button>
      </div>
    </aside>
  );

  const activeTags: { label: string; clear: () => void }[] = [
    ...cats.map((c) => ({ label: c, clear: () => setCats(cats.filter((x) => x !== c)) })),
    ...(maxPrice < 350000 ? [{ label: `Up to KES ${maxPrice.toLocaleString()}`, clear: () => setMaxPrice(350000) }] : []),
    ...(inStock ? [{ label: "In Stock", clear: () => setInStock(false) }] : []),
    ...selRooms.map((r) => ({ label: r, clear: () => setSelRooms(selRooms.filter((x) => x !== r)) })),
    ...selTypes.map((t) => ({ label: t, clear: () => setSelTypes(selTypes.filter((x) => x !== t)) })),
    ...(bestOnly ? [{ label: "Best Sellers", clear: () => setBestOnly(false) }] : []),
  ];

  return (
    <Layout>
      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Furniture Catalogue</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">All <span className="italic text-accent">Products</span></h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Quality furniture for every room and every budget.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search products..."
            className="w-full rounded-full border border-border bg-card px-5 py-3 outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button onClick={() => setDrawer(true)} className="rounded-full border border-border px-4 py-2 text-sm lg:hidden">⚙️ Filters</button>
                <span className="text-sm text-muted-foreground">Showing {filtered.length} of {products.length} products</span>
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                {sorts.map(([v, l]) => <option key={v} value={v}>Sort by: {l}</option>)}
              </select>
            </div>

            {activeTags.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Active:</span>
                {activeTags.map((t) => (
                  <button key={t.label} onClick={t.clear} className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">{t.label} ×</button>
                ))}
                <button onClick={clearAll} className="text-xs underline text-muted-foreground">Clear all</button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <p className="font-display text-2xl">No products found for "{search}"</p>
                <p className="mt-2 text-sm text-muted-foreground">Try: sofas, bedroom, dining, office</p>
                <a href="https://wa.me/254701333358" className="mt-4 inline-block rounded-full bg-accent px-6 py-2 text-sm font-semibold text-cream">WhatsApp Us — we may have it</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-cream p-6">
            <Sidebar />
          </div>
        </div>
      )}
    </Layout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}