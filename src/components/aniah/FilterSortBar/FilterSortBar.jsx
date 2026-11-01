import "./FilterSortBar.css";

/**
 * Owner: Aniah. DRAFT by Dylan from Aniah's ideation notes: the same filter and sort bar on every page,
 * including Lightning Deals (on real Temu that page has no sort and no search).
 * Controlled: pass `value` and get the new value from `onChange`. Use applyFilters() to filter a list.
 */
export const SORTS = [
  ["relevance", "Relevance"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"],
  ["rating", "Top rated"], ["sold", "Most sold"],
];
export const DEFAULT_FILTERS = { sort: "relevance", local: false, freeShipping: false, maxPrice: null, eligible: false };

export function FilterSortBar({ value = DEFAULT_FILTERS, onChange = () => {}, count }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const chip = (on, label, patch) => (
    <button className={`fsb-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => set(patch)}>{label}</button>
  );
  return (
    <div className="fsb" role="toolbar" aria-label="Filter and sort">
      <label className="fsb-sort">Sort by
        <select value={value.sort} onChange={(e) => set({ sort: e.target.value })}>
          {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      {chip(value.local, "📍 Local warehouse", { local: !value.local })}
      {chip(value.freeShipping, "Free shipping", { freeShipping: !value.freeShipping })}
      {chip(value.eligible, "Eligible for discount", { eligible: !value.eligible })}
      {[5, 10].map((p) => chip(value.maxPrice === p, `Under $${p}`, { maxPrice: value.maxPrice === p ? null : p }))}
      {count != null && <span className="ui-muted fsb-count">{count} results</span>}
      {JSON.stringify(value) !== JSON.stringify(DEFAULT_FILTERS) && <button className="fsb-clear" onClick={() => onChange(DEFAULT_FILTERS)}>Clear all</button>}
    </div>
  );
}

const soldNum = (s) => { const n = parseFloat(String(s)); return String(s).includes("K") ? n * 1000 : n; };
export function applyFilters(items, f = DEFAULT_FILTERS) {
  let out = items.filter((i) =>
    (!f.local || i.delivery?.local) &&
    (!f.freeShipping || i.shipsFrom !== "seller") &&
    (!f.eligible || i.eligibility?.status === "eligible") &&
    (f.maxPrice == null || i.price < f.maxPrice));
  const by = { "price-asc": (a, b) => a.price - b.price, "price-desc": (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, sold: (a, b) => soldNum(b.sold) - soldNum(a.sold) }[f.sort];
  return by ? [...out].sort(by) : out;
}
