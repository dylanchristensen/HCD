import { Pill, DealLabel } from "../../../../shared";
import { landedPrice, cartTotals, money } from "../../../../lib/price";
import "./PriceBlock.css";

/**
 * Owner: Jelani (product details page). Starting point carried over from Dylan's price ideas. Change freely.
 * Product page price block: item price alone, the deal stated, shipping with its reason,
 * estimated tax from the ZIP, "You'd pay", and a budget check against the current cart.
 * Delivery dates: Rupak's DeliveryEstimate can sit next to this.
 */
export function PriceBlock({ item, taxRate, zip, cart = [], budget = null, showDeals = true }) {
  const lp = landedPrice(item, taxRate);
  const sellerShipped = item.shipsFrom === "seller";
  const withCart = budget != null ? cartTotals([...cart.filter((c) => c.id !== item.id), item], taxRate, budget) : null;
  return (
    <section className="pb">
      <div className="pb-price"><span className="ui-money">{money(item.price)}</span><span className="ui-muted">item price</span></div>
      <DealLabel deal={item.deal} showDeals={showDeals} detailed />
      <div className="pb-line">
        <b>{sellerShipped ? `+ ${money(lp.shipping)} shipping` : "Free shipping"}</b>
        <Pill filled={!sellerShipped}>{sellerShipped ? "Seller-shipped" : "Ships from Temu (US)"}</Pill>
      </div>
      {sellerShipped && <div className="ui-muted">Shipping is free when every item in your order ships from Temu. This one ships from the seller.</div>}
      <div className="pb-line"><b>+ {money(lp.tax)} est. tax</b><span className="ui-muted">for {zip}</span></div>
      <div className="pb-total">You'd pay <span className="ui-money">{money(lp.total)}</span> <span className="ui-muted">for this item on its own</span></div>
      {withCart && (
        <div className="pb-budget">
          With your cart: <b>{money(withCart.total)}</b>
          {withCart.overBudget > 0 ? <>, which is <b>{money(withCart.overBudget)} over</b> your {money(budget)} budget.</> : <>, {money(-withCart.overBudget)} under your {money(budget)} budget.</>}
        </div>
      )}
    </section>
  );
}
