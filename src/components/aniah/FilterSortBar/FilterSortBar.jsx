import "./FilterSortBar.css";

/**
 * Owner: Aniah. DRAFT by Dylan from Aniah's ideation notes (the same filter and sort bar on every page,
 * including Lightning Deals), laid out like the filter row in Rupak's final search page mockup and real Temu:
 * Filters, Deals end today, Sort by, Category, then quick chips.
 * Controlled: pass `value` and get the new value from `onChange`. Use applyFilters() to filter a list.
 * `categories` (optional): subcategory names for the Category drop-down.
 */
export const SORTS = [
  ["relevance", "Relevance"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"],
  ["rating", "Top rated"], ["sold", "Most sold"],
];
export const DEFAULT_FILTERS = { sort: "relevance", local: false, freeShipping: false, maxPrice: null, offer: false, dealsToday: false, sub: "" };

export function FilterSortBar({ value = DEFAULT_FILTERS, onChange = () => {}, count, categories = [] }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const active = ["local", "freeShipping", "offer"].filter((k) => value[k]).length + (value.maxPrice != null) + (value.sub ? 1 : 0) + (value.dealsToday ? 1 : 0);
  const chip = (on, label, patch) => (
    <button className={`fsb-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => set(patch)}>{label}</button>
  );
  return (
    <div className="fsb" role="toolbar" aria-label="Filter and sort">
      <span className="fsb-chip fsb-static">⚲ Filters{active > 0 && <b className="fsb-n">{active}</b>}</span>
      {chip(value.dealsToday, "⚡ Deals end today", { dealsToday: !value.dealsToday })}
      <label className="fsb-chip fsb-select">Sort by:
        <select value={value.sort} onChange={(e) => set({ sort: e.target.value })}>
          {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      {categories.length > 0 && (
        <label className={`fsb-chip fsb-select${value.sub ? " is-on" : ""}`}>Category
          <select value={value.sub} onChange={(e) => set({ sub: e.target.value })}>
            <option value="">All</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      )}
      {chip(value.local, "📍 Local warehouse", { local: !value.local })}
      {chip(value.freeShipping, "Free shipping", { freeShipping: !value.freeShipping })}
      {chip(value.offer, "20% off at checkout", { offer: !value.offer })}
      {[5, 10].map((p) => chip(value.maxPrice === p, `Under $${p}`, { maxPrice: value.maxPrice === p ? null : p }))}
      {count != null && <span className="ui-muted fsb-count">{count} results</span>}
      {active > 0 && <button className="fsb-clear" onClick={() => onChange({ ...DEFAULT_FILTERS, sort: value.sort })}>Clear all</button>}
    </div>
  );
}

const soldNum = (s) => { const n = parseFloat(String(s)); return String(s).includes("K") ? n * 1000 : n || 0; };
export function applyFilters(items, f = DEFAULT_FILTERS) {
  let out = items.filter((i) =>
    (!f.local || i.delivery?.local) &&
    (!f.freeShipping || i.shipsFrom !== "seller") &&
    (!f.offer || i.checkoutOffer) &&
    (!f.dealsToday || i.deal?.type === "lightning") &&
    (!f.sub || i.sub === f.sub) &&
    (f.maxPrice == null || i.price < f.maxPrice));
  const by = { "price-asc": (a, b) => a.price - b.price, "price-desc": (a, b) => b.price - a.price, rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0), sold: (a, b) => soldNum(b.sold) - soldNum(a.sold) }[f.sort];
  return by ? [...out].sort(by) : out;
}
