import { ProductCard } from "../ProductCard/ProductCard";
import { EligibilityGuide } from "../EligibilityGuide/EligibilityGuide";

/**
 * Owner: Rupak. Search results / product listing page, from Rupak's design concept:
 * product cards with eligibility labels and delivery badges, the eligibility guide on the side,
 * and a note that exact estimates appear on the product page and in the cart.
 * Aniah's FilterSortBar sits above this on the assembled page.
 */
export function SearchResults({ query = "Recommended for you", items = [], showDeals = true, onOpen = () => {} }) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 260px", gap: 24, alignItems: "start" }}>
      <div>
        <h2 style={{ margin: "0 0 12px" }}>{query}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 20 }}>
          {items.map((i) => <ProductCard key={i.id} item={i} showDeals={showDeals} onOpen={() => onOpen(i)} />)}
        </div>
        <div className="ui-muted" style={{ marginTop: 16, background: "var(--color-surface)", borderRadius: "var(--radius-md)", padding: "10px 12px" }}>
          🚚 Shipping and delivery times vary by location and product availability. You'll see the exact estimate on the product page and in your cart.
        </div>
      </div>
      <EligibilityGuide />
    </section>
  );
}
