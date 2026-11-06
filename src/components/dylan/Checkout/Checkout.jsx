import { useState } from "react";
import { Button } from "../../../shared";
import { cartTotals, eligibleCoupons, money } from "../../../lib/price";
import "./Checkout.css";

/**
 * Owner: Dylan. Checkout order summary: the same numbers as the cart, a "matches your cart" line, no pressure cues.
 * Coupons, merged with Rupak's final checkout design (Nov 5, 2026; reference/concepts/rupak-final-checkout.png):
 *  - the best coupon the shopper qualifies for applies automatically when checkout opens
 *    ("Coupon applied automatically"), and follows the cart if it changes
 *  - Remove takes it off; "Apply best coupon" puts it back (Dylan's concept: the shopper stays in control)
 *  - a coupon code box, like Rupak's design and real Temu
 *  - unlike Rupak's design and real Temu: no "Ends in 08:54:46" countdown on the savings (Dylan's concept: no timers)
 * onPlaceOrder({ lines, totals, coupon }) is called with exactly what the shopper saw.
 */
export function Checkout({ cart, taxRate, zip, budget = null, coupons = [], autoApply = true, onPlaceOrder = () => {}, onBack = () => {} }) {
  const subtotal = cartTotals(cart, taxRate).subtotal;
  const eligible = eligibleCoupons(coupons, subtotal);
  const best = eligible[0] ?? null;
  // "auto" = always the best coupon; "none" = shopper removed it; otherwise a code the shopper typed.
  const [mode, setMode] = useState(autoApply ? "auto" : "none");
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState(null);
  const applied = mode === "auto" ? best : mode === "none" ? null : eligible.find((c) => c.code === mode) ?? null;
  const count = cart.reduce((n, i) => n + (i.qty ?? 1), 0);
  const tryCode = (e) => {
    e.preventDefault();
    const c = coupons.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
    if (!c) return setCodeMsg({ ok: false, text: `"${code.trim()}" isn't a valid coupon code.` });
    if (subtotal < (c.minOrder ?? 0)) return setCodeMsg({ ok: false, text: `${c.code} needs ${money(c.minOrder - subtotal)} more in your cart.` });
    setMode(c.code); setCode(""); setCodeMsg(null);
  };

  if (!cart.length) {
    return (
      <section className="co">
        <h3 className="co-title">Order summary</h3>
        <span className="ui-muted">Your cart is empty, so there's nothing to check out.</span>
        <Button variant="ghost" onClick={onBack}>Continue shopping</Button>
      </section>
    );
  }
  const t = cartTotals(cart, taxRate, budget, applied?.savings ?? 0);
  const nextUp = coupons.filter((c) => subtotal < (c.minOrder ?? 0)).sort((a, b) => a.minOrder - b.minOrder)[0];

  return (
    <section className="co">
      <h3 className="co-title">Order summary</h3>
      <div className="ui-row"><span>Items ({count})</span><span>{money(t.subtotal)}</span></div>
      {t.itemDiscount > 0 && <div className="ui-row co-discount"><span>20% off at checkout ({t.offerCount} {t.offerCount === 1 ? "item" : "items"})</span><span>−{money(t.itemDiscount)}</span></div>}
      {applied && <div className="ui-row co-discount"><span>Coupon {applied.code}</span><span>−{money(applied.savings)}</span></div>}
      <div className="ui-row"><span>Shipping</span><span>{money(t.shipping)}</span></div>
      <div className="ui-row"><span>Tax ({zip})</span><span>{money(t.tax)}</span></div>
      <div className="ui-row co-total"><span>Total</span><span className="ui-money">{money(t.total)}</span></div>

      <div className="co-coupons">
        <form className="co-code" onSubmit={tryCode}>
          <input value={code} onChange={(e) => { setCode(e.target.value); setCodeMsg(null); }} placeholder="Enter coupon code" aria-label="Coupon code" />
          <Button variant="ghost" type="submit" disabled={!code.trim()}>Apply</Button>
        </form>
        {codeMsg && <div className="co-code-msg">{codeMsg.text}</div>}
        {applied ? (
          <div className="co-applied">
            <div className="ui-row"><b>✓ Coupon applied{mode === "auto" ? " automatically" : ""}</b><Button variant="link" onClick={() => setMode("none")}>Remove</Button></div>
            <div>{applied.code}: {applied.label}. You save <b>{money(applied.savings)}</b>.</div>
          </div>
        ) : best ? (
          <Button variant="ghost" onClick={() => setMode("auto")}>Apply best coupon ({eligible.length} available)</Button>
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
      {subtotal < 10 ? <Button disabled>$10 min. to place an order · add {money(10 - subtotal)} more</Button> : <Button onClick={() => onPlaceOrder({ lines: cart, totals: t, coupon: applied })}>Place order · {money(t.total)}</Button>}
      <div className="ui-muted" style={{ textAlign: "center" }}>Free first return within 90 days</div>
    </section>
  );
}
