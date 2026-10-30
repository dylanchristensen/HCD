import { Button, Pill } from "../../../shared";
import { cartTotals, money } from "../../../lib/price";
import "./Cart.css";

/**
 * Owner: Dylan. The cart, in two modes:
 *  - "popout": a drawer that slides in over the page you're on
 *  - "fullscreen": the cart as its own page, lines on the left, summary on the right
 * Both show per-line shipping and deal status, the full breakdown before any address,
 * "You'll pay" as the total's label, the budget line, and why shipping isn't free. No timers.
 */
export function Cart({ mode = "popout", cart, taxRate, zip, budget = null, showDeals = true,
  onCheckout = () => {}, onSwaps = () => {}, onExpand = () => {}, onClose = () => {} }) {
  const t = cartTotals(cart, taxRate, budget);
  const seller = cart.filter((i) => i.shipsFrom === "seller");

  const lines = (
    <ul className="cart-lines">
      {cart.map((i) => (
        <li key={i.id} className="cart-line">
          <div className="cart-thumb" />
          <div className="cart-info">
            <div>{i.name}</div>
            <div className="cart-meta">
              <Pill filled={i.shipsFrom !== "seller"}>{i.shipsFrom === "seller" ? "Seller-shipped" : "Temu (US)"}</Pill>
              <span className="ui-muted">{i.shipsFrom === "seller" ? `+ ${money(i.sellerShipping)} shipping` : "free shipping"}</span>
            </div>
            {showDeals && i.deal?.type === "lightning" && <div className="ui-muted">Lightning price, held until {i.deal.endsAt}</div>}
          </div>
          <div className="ui-money">{money(i.price)}</div>
        </li>
      ))}
    </ul>
  );

  const summary = (
    <>
      <div className="cart-sum">
        <div className="ui-row"><span>Items</span><span>{money(t.subtotal)}</span></div>
        <div className="ui-row"><span>Shipping {t.sellerShippedCount > 0 && <span className="ui-muted">({t.sellerShippedCount} seller-shipped)</span>}</span><span>{money(t.shipping)}</span></div>
        <div className="ui-row"><span>Est. tax <span className="ui-muted">({zip})</span></span><span>{money(t.tax)}</span></div>
        <div className="ui-row cart-total"><span>You'll pay</span><span className="ui-money">{money(t.total)}</span></div>
      </div>
      {budget != null && (
        <div className="cart-budget">
          <b>{t.overBudget > 0 ? `${money(t.overBudget)} over your ${money(budget)} budget` : `${money(-t.overBudget)} under your ${money(budget)} budget`}</b>
          <div className="cart-bar"><div style={{ width: `${Math.min(100, (t.total / budget) * 100)}%` }} /></div>
          {t.overBudget > 0 && (
            <div className="cart-actions"><Button variant="ghost" onClick={onSwaps}>Show cheaper swaps</Button><Button variant="ghost">Keep going</Button></div>
          )}
        </div>
      )}
      {seller.length > 0 && (
        <div className="cart-explain">
          Shipping is {money(t.shipping)} because {seller.map((s) => s.name.toLowerCase()).join(" and ")} {seller.length > 1 ? "ship" : "ships"} from a seller.
          Swap for Temu-shipped items and shipping drops to $0.
        </div>
      )}
      <Button onClick={onCheckout}>Checkout · {money(t.total)}</Button>
      <div className="ui-muted cart-promise">The total will not change at checkout.</div>
    </>
  );

  if (mode === "fullscreen") {
    return (
      <main className="cart-page">
        <div className="cart-page-head">
          <h2 className="cart-title">Your cart ({cart.length})</h2>
          <Button variant="link" onClick={onClose}>Continue shopping</Button>
        </div>
        <div className="cart-page-body">
          <section className="cart-page-lines">{lines}</section>
          <aside className="cart-page-summary">{summary}</aside>
        </div>
      </main>
    );
  }

  return (
    <aside className="cart-drawer" aria-label="Cart">
      <div className="cart-drawer-head">
        <h3 className="cart-title">Your cart ({cart.length})</h3>
        <div className="cart-head-actions">
          <Button variant="link" onClick={onExpand}>Open full cart</Button>
          <Button variant="link" onClick={onClose} aria-label="Close cart">✕</Button>
        </div>
      </div>
      {lines}
      {summary}
    </aside>
  );
}
