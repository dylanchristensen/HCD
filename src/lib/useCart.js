import { useEffect, useState } from "react";

/**
 * The working cart, shared by the whole site (src/main.jsx).
 * A cart line is the product plus { qty, option, key }. `key` is product id + option, so the same
 * item in two colors is two lines, and adding the same item again just raises its quantity.
 * The cart is saved in the browser, so a refresh keeps it. "reset demo" empties it.
 *
 *   const cart = useCart(byId, demoCart);
 *   cart.lines, cart.count, cart.add(item, qty, option), cart.setQty(key, n), cart.remove(key),
 *   cart.undo(), cart.lastRemoved, cart.swap(fromId, toItem), cart.clear(), cart.reset()
 */
const STORAGE_KEY = "temu-demo-cart-v2";
const MAX_QTY = 99;

const lineFor = (item, qty = 1, option = null) => ({ ...item, qty, option, key: option ? `${item.id}::${option}` : item.id });

function load(catalog, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved.filter((s) => catalog[s.id]).map((s) => lineFor(catalog[s.id], s.qty, s.option));
  } catch { /* private window or blocked storage: start from the demo cart */ }
  return fallback;
}

export function useCart(catalog, demoItems = []) {
  const demo = demoItems.map((i) => lineFor(i));
  const [lines, setLines] = useState(() => load(catalog, demo));
  const [lastRemoved, setLastRemoved] = useState(null); // { line, index } for "Undo"

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines.map((l) => ({ id: l.id, qty: l.qty, option: l.option })))); } catch { /* ignore */ }
  }, [lines]);

  const add = (item, qty = 1, option = null) => {
    const line = lineFor(item, qty, option);
    setLines((ls) => ls.some((l) => l.key === line.key)
      ? ls.map((l) => (l.key === line.key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
      : [...ls, line]);
    setLastRemoved(null);
  };
  const setQty = (key, qty) => {
    if (qty < 1) return remove(key);
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)));
  };
  const remove = (key) => {
    const index = lines.findIndex((l) => l.key === key);
    if (index < 0) return;
    setLastRemoved({ line: lines[index], index });
    setLines((ls) => ls.filter((l) => l.key !== key));
  };
  const undo = () => {
    if (!lastRemoved) return;
    setLines((ls) => ls.some((l) => l.key === lastRemoved.line.key) ? ls
      : [...ls.slice(0, lastRemoved.index), lastRemoved.line, ...ls.slice(lastRemoved.index)]);
    setLastRemoved(null);
  };
  /** Replace a product with another (the budget line's swap), keeping its place and quantity. */
  const swap = (fromId, toItem) => setLines((ls) => ls.map((l) => (l.id === fromId ? lineFor(toItem, l.qty) : l)));
  const clear = () => { setLines([]); setLastRemoved(null); };
  const reset = () => { setLines(demo); setLastRemoved(null); };

  return { lines, count: lines.reduce((n, l) => n + l.qty, 0), add, setQty, remove, undo, lastRemoved, swap, clear, reset };
}
