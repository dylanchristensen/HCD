import { useState } from "react";
import { Button } from "../../../shared";
import { cartTotals, eligibleCoupons, money } from "../../../lib/price";
import "./Checkout.css";

/**
 * Owner: Dylan. Checkout order summary: the same numbers as the cart, a "matches your cart" line,
 * no pressure cues, and an auto-apply button for coupons the shopper qualifies for (Rupak's request).
 */
export function Checkout({ cart, taxRate, zip, budget = null, coupons = [], defaultApplied = false, onPlaceOrder = () => {} }) {
  const subtotal = cartTotals(cart, taxRate).subtotal;
  const eligible = eligibleCoupons(coupons, subtotal);
  const best = eligible[0] ?? null;
  const [applied, setApplied] = useState(defaultApplied && best ? best : null);
  const t = cartTotals(cart, taxRate, budget, applied?.savings ?? 0);
  const nextUp = coupons.filter((c) => subtotal < (c.minOrder ?? 0)).sort((a, b) => a.minOrder - b.minOrder)[0];

  return (
    <section className="co">
      <h3 className="co-title">Order summary</h3>
      <div className="ui-row"><span>Items ({cart.length})</span><span>{money(t.subtotal)}</span></div>
      {applied && <div className="ui-row co-discount"><span>Coupon {applied.code}</span><span>−{money(applied.savings)}</span></div>}
      <div className="ui-row"><span>Shipping</span><span>{money(t.shipping)}</span></div>
      <div className="ui-row"><span>Tax ({zip})</span><span>{money(t.tax)}</span></div>
      <div className="ui-row co-total"><span>Total</span><span className="ui-money">{money(t.total)}</span></div>

      <div className="co-coupons">
        {applied ? (
          <div className="ui-row">
            <span>✓ {applied.label} applied. You save <b>{money(applied.savings)}</b>.</span>
            <Button variant="link" onClick={() => setApplied(null)}>Remove</Button>
          </div>
        ) : best ? (
          <Button variant="ghost" onClick={() => setApplied(best)}>
            Auto-apply best coupon ({eligible.length} available)
          </Button>
        ) : (
          <span className="ui-muted">No coupons apply to this order.</span>
        )}
        {nextUp && <div className="ui-muted">{nextUp.code}: {nextUp.label}. Add {money(nextUp.minOrder - subtotal)} more to qualify.</div>}
      </div>

      <div className="co-match">
        ✓ {applied ? `Matches your cart, minus your ${money(applied.savings)} coupon.` : "Matches your cart. No charges were added at checkout."}
      </div>
      {budget != null && t.overBudget > 0 && <div className="co-note">Budget {money(budget)} · you chose to go {money(t.overBudget)} over.</div>}
      {budget != null && t.overBudget <= 0 && <div className="co-note">Budget {money(budget)} · {money(-t.overBudget)} under.</div>}
      <Button onClick={onPlaceOrder}>Place order · {money(t.total)}</Button>
      <div className="ui-muted" style={{ textAlign: "center" }}>Free first return within 90 days</div>
    </section>
  );
}
