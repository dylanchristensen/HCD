import "./FilterSortBar.css";

/**
 * Owner: Aniah. From Aniah's design concept (Nov 5, 2026): the same sort and filter bar on every list page,
 * including Lightning Deals, "for consistency across the website", with her controls in her order:
 * Sort by, Price range, Rating 4+, Category, Free shipping, and "Showing N of M results".
 * Extra chips after hers come from Rupak's search mockup and real Temu (Deals end today, Local warehouse, 20% off).
 * Controlled: pass `value` and get the new value from `onChange`. Use applyFilters() to filter a list.
 * `categories` (optional): subcategory names for the Category drop-down.
 */
export const SORTS = [
  ["relevance", "Relevance"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"],
  ["rating", "Top rated"], ["sold", "Most sold"],
];
export const PRICE_RANGES = [["", "Any price"], ["0-5", "Under $5"], ["5-10", "$5 to $10"], ["10-20", "$10 to $20"], ["20-", "$20 and up"]];
export const DEFAULT_FILTERS = { sort: "relevance", local: false, freeShipping: false, price: "", rating4: false, offer: false, dealsToday: false, sub: "" };

export function FilterSortBar({ value = DEFAULT_FILTERS, onChange = () => {}, count, total, categories = [] }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const active = ["local", "freeShipping", "offer", "rating4", "dealsToday"].filter((k) => value[k]).length + (value.price ? 1 : 0) + (value.sub ? 1 : 0);
  const chip = (on, label, patch) => (
    <button className={`fsb-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => set(patch)}>{label}</button>
  );
  return (
    <div className="fsb" role="toolbar" aria-label="Filter and sort">
      <label className="fsb-chip fsb-select">Sort by:
        <select value={value.sort} onChange={(e) => set({ sort: e.target.value })}>
          {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label className={`fsb-chip fsb-select${value.price ? " is-on" : ""}`}>Price range
        <select value={value.price} onChange={(e) => set({ price: e.target.value })}>
          {PRICE_RANGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      {chip(value.rating4, "Rating 4+", { rating4: !value.rating4 })}
      {categories.length > 0 && (
        <label className={`fsb-chip fsb-select${value.sub ? " is-on" : ""}`}>Category
          <select value={value.sub} onChange={(e) => set({ sub: e.target.value })}>
            <option value="">All</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      )}
      {chip(value.freeShipping, "Free shipping", { freeShipping: !value.freeShipping })}
      {chip(value.dealsToday, "⚡ Deals end today", { dealsToday: !value.dealsToday })}
      {chip(value.local, "📍 Local warehouse", { local: !value.local })}
      {chip(value.offer, "20% off at checkout", { offer: !value.offer })}
      {count != null && <span className="ui-muted fsb-count">Showing {count}{total != null && total !== count ? ` of ${total}` : ""} results</span>}
      {active > 0 && <button className="fsb-clear" onClick={() => onChange({ ...DEFAULT_FILTERS, sort: value.sort })}>Clear all</button>}
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
  const by = { "price-asc": (a, b) => a.price - b.price, "price-desc": (a, b) => b.price - a.price, rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0), sold: (a, b) => soldNum(b.sold) - soldNum(a.sold) }[f.sort];
  return by ? [...out].sort(by) : out;
}
