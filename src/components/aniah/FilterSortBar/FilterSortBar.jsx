import { useEffect, useRef, useState } from "react";
import "./FilterSortBar.css";

/**
 * Owner: Aniah. From Aniah's design concept (Nov 5, 2026): the same sort and filter bar on every list page,
 * including Lightning Deals, "for consistency across the website", with her controls in her order:
 * Sort by, Price range, Rating 4+, Category, Free shipping, and "Showing N of M results".
 * Matched to real Temu's search page (checked Nov 5, 2026):
 *  - "Filters" opens a panel from the left with radio sections, "Reset" and "Show N results"
 *  - Sort by is Temu's own menu: Relevance, Top sales, Most recent, Price low to high, Price high to low
 *  - drop-downs open as small menus with a check on the current choice
 * Controlled: pass `value` and get the new value from `onChange`. Use applyFilters() to filter a list.
 * `categories`: subcategory names; `countFor(filters)`: how many results a set of filters would show.
 */
export const SORTS = [["relevance", "Relevance"], ["sold", "Top sales"], ["recent", "Most recent"], ["price-asc", "Price low to high"], ["price-desc", "Price high to low"]];
export const PRICE_RANGES = [["", "Any price"], ["0-5", "Under $5"], ["5-10", "$5 to $10"], ["10-20", "$10 to $20"], ["20-", "$20 and up"]];
export const DEFAULT_FILTERS = { sort: "relevance", local: false, freeShipping: false, price: "", rating4: false, offer: false, dealsToday: false, sub: "" };

export function FilterSortBar({ value = DEFAULT_FILTERS, onChange = () => {}, count, total, categories = [], countFor }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const [drawer, setDrawer] = useState(false);
  const active = ["local", "freeShipping", "offer", "rating4", "dealsToday"].filter((k) => value[k]).length + (value.price ? 1 : 0) + (value.sub ? 1 : 0);
  const chip = (on, label, patch) => (
    <button className={`fsb-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => set(patch)}>{label}</button>
  );
  const label = (list, v) => list.find(([k]) => k === v)?.[1];
  return (
    <div className="fsb" role="toolbar" aria-label="Filter and sort">
      <button className={`fsb-chip${active ? " is-on" : ""}`} onClick={() => setDrawer(true)}>⚲ Filters{active > 0 && <b className="fsb-n">{active}</b>}</button>
      <Menu label={`Sort by: ${label(SORTS, value.sort)}`} options={SORTS} value={value.sort} onPick={(v) => set({ sort: v })} />
      <Menu label={value.price ? label(PRICE_RANGES, value.price) : "Price range"} on={!!value.price} options={PRICE_RANGES} value={value.price} onPick={(v) => set({ price: v })} />
      {chip(value.rating4, "Rating 4+", { rating4: !value.rating4 })}
      {categories.length > 0 && (
        <Menu label={value.sub || "Category"} on={!!value.sub} options={[["", "All"], ...categories.map((c) => [c, c])]} value={value.sub} onPick={(v) => set({ sub: v })} />
      )}
      {chip(value.freeShipping, "Free shipping", { freeShipping: !value.freeShipping })}
      {chip(value.dealsToday, "⚡ Deals end today", { dealsToday: !value.dealsToday })}
      {chip(value.local, "📍 Local warehouse", { local: !value.local })}
      {chip(value.offer, "20% off at checkout", { offer: !value.offer })}
      {count != null && <span className="ui-muted fsb-count">Showing {count}{total != null && total !== count ? ` of ${total}` : ""} results</span>}
      {active > 0 && <button className="fsb-clear" onClick={() => onChange({ ...DEFAULT_FILTERS, sort: value.sort })}>Clear all</button>}
      {drawer && <FilterDrawer value={value} categories={categories} countFor={countFor} onApply={(v) => { onChange(v); setDrawer(false); }} onClose={() => setDrawer(false)} />}
    </div>
  );
}

/** A Temu-style drop-down: a chip that opens a small menu, with a check on the current choice. */
function Menu({ label, options, value, onPick, on = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", off); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div className="fsb-menu-wrap" ref={ref}>
      <button className={`fsb-chip fsb-select${on ? " is-on" : ""}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        {label} <span aria-hidden className={`fsb-caret${open ? " is-up" : ""}`}>⌄</span>
      </button>
      {open && (
        <ul className="fsb-menu" role="listbox">
          {options.map(([v, l]) => (
            <li key={v || "all"} role="option" aria-selected={v === value}>
              <button onClick={() => { onPick(v); setOpen(false); }}><span>{l}</span>{v === value && <span aria-hidden>✓</span>}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Temu's Filters panel: slides in from the left; choices apply when you press "Show N results". */
function FilterDrawer({ value, categories, countFor, onApply, onClose }) {
  const [draft, setDraft] = useState(value);
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const n = countFor ? countFor(draft) : null;
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  const radio = (name, v, label, cur, patch) => (
    <label key={name + v} className="fsd-opt"><input type="radio" name={name} checked={cur === v} onChange={() => set(patch)} /> {label}</label>
  );
  const check = (key, label) => (
    <label className="fsd-opt"><input type="checkbox" checked={!!draft[key]} onChange={() => set({ [key]: !draft[key] })} /> {label}</label>
  );
  return (
    <div className="fsd-backdrop" onClick={onClose}>
      <aside className="fsd" role="dialog" aria-modal="true" aria-label="Filters" onClick={(e) => e.stopPropagation()}>
        <button className="fsd-x" onClick={onClose} aria-label="Close filters">✕</button>
        <h2 className="fsd-title">Filters</h2>
        <div className="fsd-body">
          {categories.length > 0 && (
            <section><h3>Category</h3>{[["", "All"], ...categories.map((c) => [c, c])].map(([v, l]) => radio("cat", v, l, draft.sub, { sub: v }))}</section>
          )}
          <section><h3>Price</h3>{PRICE_RANGES.map(([v, l]) => radio("price", v, l, draft.price, { price: v }))}</section>
          <section><h3>Rating</h3>{check("rating4", "4 stars and up")}</section>
          <section><h3>Shipping</h3>{check("freeShipping", "Free shipping")}{check("local", "Local warehouse")}</section>
          <section><h3>Deals</h3>{check("dealsToday", "Deals end today")}{check("offer", "20% off at checkout")}</section>
        </div>
        <footer className="fsd-foot">
          <button className="fsd-reset" onClick={() => setDraft({ ...DEFAULT_FILTERS, sort: draft.sort })}>Reset</button>
          <button className="fsd-show" onClick={() => onApply(draft)}>Show {n != null ? `${n} ` : ""}results</button>
        </footer>
      </aside>
    </div>
  );
}

const soldNum = (s) => { const n = parseFloat(String(s)); return String(s).includes("K") ? n * 1000 : n || 0; };
function inRange(price, range) {
  if (!range) return true;
  const [lo, hi] = range.split("-").map((x) => (x === "" ? null : Number(x)));
  return (lo == null || price >= lo) && (hi == null || price < hi);
}
export function applyFilters(items, f = DEFAULT_FILTERS) {
  let out = items.filter((i) =>
    (!f.local || i.delivery?.local) &&
    (!f.freeShipping || i.shipsFrom !== "seller") &&
    (!f.offer || i.checkoutOffer) &&
    (!f.dealsToday || i.deal?.type === "lightning") &&
    (!f.sub || i.sub === f.sub) &&
    (!f.rating4 || (i.rating ?? 0) >= 4) &&
    inRange(i.price, f.price));
  if (f.sort === "recent") return [...out].reverse();   // demo: newest-collected listings first
  const by = { "price-asc": (a, b) => a.price - b.price, "price-desc": (a, b) => b.price - a.price, sold: (a, b) => soldNum(b.sold) - soldNum(a.sold) }[f.sort];
  return by ? [...out].sort(by) : out;
}
