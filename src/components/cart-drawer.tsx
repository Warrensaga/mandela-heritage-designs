import { Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/use-wishlist";
import { products, fmtKES, waLink } from "@/data/products";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, setQty } = useCart();
  const lines = items.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! })).filter((x) => x.p);
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  const orderMessage = () => {
    const list = lines.map((l, i) => `${i + 1}. ${l.p.name} × ${l.qty} — ${fmtKES(l.p.price * l.qty)}`).join("\n");
    return waLink(`Hi, I'd like to order:\n\n${list}\n\nTotal: ${fmtKES(total)}\n\nPlease confirm availability and delivery.`);
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} />
      <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-xl font-bold">Your Cart ({lines.length})</h2>
          <button onClick={onClose} aria-label="Close" className="p-1">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center text-muted-foreground">
              <div>
                <p>Your cart is empty</p>
                <Link to="/shop" onClick={onClose} className="mt-4 inline-block text-accent underline">Browse furniture →</Link>
              </div>
            </div>
          ) : lines.map((l) => (
            <div key={l.id} className="mb-4 flex gap-3 border-b border-border pb-4">
              <img src={l.p.image} alt={l.p.name} className="h-20 w-20 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{l.p.name}</p>
                <p className="text-sm font-bold text-accent">{fmtKES(l.p.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => setQty(l.id, l.qty - 1)} className="h-7 w-7 rounded border border-border">−</button>
                  <span className="w-6 text-center text-sm">{l.qty}</span>
                  <button onClick={() => setQty(l.id, l.qty + 1)} className="h-7 w-7 rounded border border-border">+</button>
                  <button onClick={() => remove(l.id)} className="ml-auto text-xs text-muted-foreground hover:text-destructive">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-border p-5">
            <div className="mb-4 flex justify-between text-lg font-bold"><span>Total</span><span className="text-accent">{fmtKES(total)}</span></div>
            <a href={orderMessage()} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-accent py-3 text-center font-semibold text-cream hover:opacity-90">Order via WhatsApp →</a>
          </div>
        )}
      </aside>
    </>
  );
}