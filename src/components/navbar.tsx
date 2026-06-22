import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useWishlist, useCart } from "@/hooks/use-wishlist";
import { CartDrawer } from "./cart-drawer";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Catalogue", to: "/shop" as const },
  { label: "Contact Us", to: "/contact" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count: wishCount } = useWishlist();
  const { count: cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b border-border bg-cream/95 backdrop-blur transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-xl font-black tracking-tight text-charcoal sm:text-2xl">
            MANDELA <span className="text-accent">HERITAGE</span>
          </Link>

          <ul className="hidden items-center gap-8 text-sm font-medium text-charcoal lg:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-accent" activeOptions={{ exact: l.to === "/" }} activeProps={{ className: "text-accent" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <span>Eastern Bypass, Nairobi</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="relative hidden p-2 sm:block" aria-label="Wishlist">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-cream">{wishCount}</span>}
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative p-2" aria-label="Cart">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-cream">{cartCount}</span>}
            </button>
            <button onClick={() => setOpen(true)} className="p-2 lg:hidden" aria-label="Menu">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-black">MANDELA <span className="text-accent">HERITAGE</span></span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
          </div>
          <ul className="mt-12 space-y-6 font-display text-2xl">
            {navLinks.map((l) => (
              <li key={l.label}><Link to={l.to} onClick={() => setOpen(false)} className="hover:text-accent">{l.label}</Link></li>
            ))}
            <li><Link to="/wishlist" onClick={() => setOpen(false)} className="hover:text-accent">Wishlist</Link></li>
          </ul>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <span>Eastern Bypass, Nairobi</span>
          </div>
          <a href="https://wa.me/254701333358" className="mt-auto block rounded-full bg-accent py-4 text-center text-lg font-semibold text-cream">WhatsApp Us →</a>
          <a href="tel:+254701333358" className="mt-4 block text-center text-charcoal">📞 +254 701 333358</a>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}