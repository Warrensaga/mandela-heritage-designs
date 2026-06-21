import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Product, fmtKES, waProductOrder } from "@/data/products";
import { useWishlist } from "@/hooks/use-wishlist";

const badgeStyles: Record<string, string> = {
  "BEST SELLER": "bg-accent text-cream",
  "NEW": "bg-charcoal text-cream",
  "SALE": "bg-destructive text-white",
  "POPULAR": "bg-orange-600 text-white",
};

export function ProductCard({ p }: { p: Product }) {
  const { has, toggle } = useWishlist();
  const saved = has(p.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-xl"
    >
      <Link to="/shop/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-secondary">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${badgeStyles[p.badge]}`}>{p.badge}</span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggle(p.id); }}
          aria-label="Save"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream/90 backdrop-blur transition hover:bg-cream"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "#dc2626" : "none"} stroke={saved ? "#dc2626" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <a
          href={waProductOrder(p)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Order on WhatsApp"
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-accent text-cream shadow-lg transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </a>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{p.category}</span>
          <span className="text-accent">{"★".repeat(p.rating)}</span>
        </div>
        <Link to="/shop/$slug" params={{ slug: p.slug }} className="mt-1 font-display text-lg font-semibold leading-snug hover:text-accent">{p.name}</Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-charcoal">{fmtKES(p.price)}</span>
          {p.original && <span className="text-sm text-muted-foreground line-through">{fmtKES(p.original)}</span>}
        </div>
        <Link to="/shop/$slug" params={{ slug: p.slug }} className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-charcoal hover:text-accent">
          Learn More <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}