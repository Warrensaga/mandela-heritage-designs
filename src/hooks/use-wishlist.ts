import { useEffect, useState, useCallback } from "react";

const KEY = "mh_wishlist_v1";

function read(): number[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function useWishlist() {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => {
    setIds(read());
    const onStorage = () => setIds(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("mh-wishlist", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mh-wishlist", onStorage);
    };
  }, []);

  const toggle = useCallback((id: number) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
    window.dispatchEvent(new Event("mh-wishlist"));
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);
  return { ids, toggle, has, count: ids.length };
}

const CART_KEY = "mh_cart_v1";
function readCart(): { id: number; qty: number }[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
export function useCart() {
  const [items, setItems] = useState<{ id: number; qty: number }[]>([]);
  useEffect(() => {
    setItems(readCart());
    const h = () => setItems(readCart());
    window.addEventListener("mh-cart", h);
    return () => window.removeEventListener("mh-cart", h);
  }, []);
  const add = (id: number) => {
    const cur = readCart();
    const ex = cur.find((x) => x.id === id);
    const next = ex ? cur.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...cur, { id, qty: 1 }];
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("mh-cart"));
  };
  const remove = (id: number) => {
    const next = readCart().filter((x) => x.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("mh-cart"));
  };
  const setQty = (id: number, qty: number) => {
    if (qty <= 0) return remove(id);
    const next = readCart().map((x) => x.id === id ? { ...x, qty } : x);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("mh-cart"));
  };
  return { items, add, remove, setQty, count: items.reduce((s, x) => s + x.qty, 0) };
}