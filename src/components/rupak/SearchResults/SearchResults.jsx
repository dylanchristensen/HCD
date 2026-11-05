import { ProductCard } from "../ProductCard/ProductCard";

/**
 * Owner: Rupak. Search results / product listing page from Rupak's FINAL design (Nov 5, 2026):
 * a full-width grid, five across on a laptop, of his product cards (sold today, 20% off at checkout,
 * delivery before you click). Aniah's FilterSortBar sits above it on the assembled page.
 * (His earlier concept had an eligibility guide panel on the side; the final design drops it.)
 */
export function SearchResults({ query = "Recommended for you", items = [], showDeals = true, onOpen = () => {}, onAdd, onQuickLook }) {
  return (
    <section>
      <h2 style={{ margin: "0 0 12px" }}>{query}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {items.map((i) => <ProductCard key={i.id} item={i} showDeals={showDeals} onOpen={() => onOpen(i)} onAdd={onAdd} onQuickLook={onQuickLook} />)}
      </div>
      {!items.length && <p className="ui-muted">Nothing matches these filters. Try clearing one.</p>}
    </section>
  );
}
