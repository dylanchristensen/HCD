import { ProductTile } from "./ProductTile/ProductTile";
import { DeliveryEstimate } from "../DeliveryEstimate/DeliveryEstimate";
import { PurchaseCount } from "../PurchaseCount/PurchaseCount";

/**
 * Owner: Rupak. Search results page. Starter layout; replace freely.
 * Ideas from our session: delivery estimate and purchase count before you click an item,
 * discount eligibility label. Aniah's FilterSortBar sits above this on the assembled page.
 */
export function SearchResults({ query = "phone case", items = [], showDeals = true }) {
  return (
    <section>
      <h2 style={{ margin: "0 0 12px" }}>Results for "{query}"</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {items.map((i) => (
          <div key={i.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <ProductTile item={i} showDeals={showDeals} />
            <PurchaseCount sold={i.sold} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}><DeliveryEstimate /></div>
    </section>
  );
}
