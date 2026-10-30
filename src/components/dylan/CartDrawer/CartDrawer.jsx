import { Button, Pill } from "../../../shared";
import { cartTotals, money } from "../../../lib/price";
import "./CartDrawer.css";

/**
 * Cart drawer: per-line shipping and deal status, the full breakdown before any address,
 * "You'll pay" as the total's label, the budget line, and an explanation of any shipping fee.
 * No timers anywhere.
 */
export function CartDrawer({ cart, taxRate, zip, budget = null, showDeals = true, onCheckout = () => {}, onSwaps = () => {} }) {
  const t = cartTotals(cart, taxRate, budget);
  const seller = cart.filter((i) => i.shipsFrom === "seller");
  return (
    <aside className="cd">
      <h3 className="cd-title">Your cart ({cart.length})</h3>
      <ul className="cd-lines">
        {cart.map((i) => (
          <li key={i.id} className="cd-line">
            <div className="cd-thumb" />
            <div className="cd-info">
              <div>{i.name}</div>
              <div className="cd-meta">
                <Pill filled={i.shipsFrom !== "seller"}>{i.shipsFrom === "seller" ? "Seller-shipped" : "Temu (US)"}</Pill>
                <span className="ui-muted">{i.shipsFrom === "seller" ? `+ ${money(i.sellerShipping)} shipping` : "free shipping"}</span>
              </div>
              {showDeals && i.deal?.type === "lightning" && <div className="ui-muted">Lightning price, held until {i.deal.endsAt}</div>}
            </div>
            <div className="ui-money">{money(i.price)}</div>
          </li>
        ))}
      </ul>
      <div className="cd-sum">
        <div className="ui-row"><span>Items</span><span>{money(t.subtotal)}</span></div>
        <div className="ui-row"><span>Shipping {t.sellerShippedCount > 0 && <span className="ui-muted">({t.sellerShippedCount} seller-shipped)</span>}</span><span>{money(t.shipping)}</span></div>
        <div className="ui-row"><span>Est. tax <span className="ui-muted">({zip})</span></span><span>{money(t.tax)}</span></div>
        <div className="ui-row cd-total"><span>You'll pay</span><span className="ui-money">{money(t.total)}</span></div>
      </div>
      {budget != null && (
        <div className="cd-budget">
          <div className="ui-row">
            <b>{t.overBudget > 0 ? `${money(t.overBudget)} over your ${money(budget)} budget` : `${money(-t.overBudget)} under your ${money(budget)} budget`}</b>
          </div>
          <div className="cd-bar"><div style={{ width: `${Math.min(100, (t.total / budget) * 100)}%` }} /></div>
          {t.overBudget > 0 && (
            <div className="cd-actions"><Button variant="ghost" onClick={onSwaps}>Show cheaper swaps</Button><Button variant="ghost">Keep going</Button></div>
          )}
        </div>
      )}
      {seller.length > 0 && (
        <div className="cd-explain">
          Shipping is {money(t.shipping)} because {seller.map((s) => s.name.toLowerCase()).join(" and ")} {seller.length > 1 ? "ship" : "ships"} from a seller.
          Swap for Temu-shipped items and shipping drops to $0.
        </div>
      )}
      <Button onClick={onCheckout}>Checkout · {money(t.total)}</Button>
      <div className="ui-muted cd-promise">The total will not change at checkout.</div>
    </aside>
  );
}
