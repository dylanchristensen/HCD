import { Button } from "../../../shared";
import { cartTotals, money } from "../../../lib/price";
import "./CheckoutSummary.css";

/** Checkout order summary: the same numbers as the cart, a "matches your cart" line, no pressure cues. */
export function CheckoutSummary({ cart, taxRate, zip, budget = null, onPlaceOrder = () => {} }) {
  const t = cartTotals(cart, taxRate, budget);
  return (
    <section className="cs">
      <h3 className="cs-title">Order summary</h3>
      <div className="ui-row"><span>Items ({cart.length})</span><span>{money(t.subtotal)}</span></div>
      <div className="ui-row"><span>Shipping</span><span>{money(t.shipping)}</span></div>
      <div className="ui-row"><span>Tax ({zip})</span><span>{money(t.tax)}</span></div>
      <div className="ui-row cs-total"><span>Total</span><span className="ui-money">{money(t.total)}</span></div>
      <div className="cs-match">✓ Matches your cart. No charges were added at checkout.</div>
      {budget != null && t.overBudget > 0 && <div className="cs-note">Budget {money(budget)} · you chose to go {money(t.overBudget)} over.</div>}
      <Button onClick={onPlaceOrder}>Place order · {money(t.total)}</Button>
      <div className="ui-muted" style={{ textAlign: "center" }}>Free first return within 90 days</div>
    </section>
  );
}
