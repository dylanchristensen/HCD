import { useState } from "react";
import { money } from "../../../lib/price";
import "./CouponPopup.css";

/**
 * Owner: Aniah. From Aniah's design concept (Nov 5, 2026; reference/concepts/aniah-design-concept.pdf):
 * coupons and pop-ups that can be claimed on the web, not only in the app. Real Temu's web coupons often say
 * "scan the QR code with your phone"; here one click claims it, and it applies at checkout with no code or QR.
 * variant: "web" (centered over the site) or "mobile" (phone-width card, for the report's side-by-side).
 * After Claim, the pop-up confirms what was claimed and when it applies.
 */
export function CouponPopup({ coupon, variant = "web", onClaim = () => {}, onClose = () => {} }) {
  const [claimed, setClaimed] = useState(false);
  if (!coupon) return null;
  const title = `${money(coupon.amount).replace(".00", "")} off your order`;
  return (
    <div className={`cp-backdrop cp--${variant}`} onClick={onClose}>
      <div className="cp" role="dialog" aria-modal="true" aria-labelledby="cp-title" onClick={(e) => e.stopPropagation()}>
        {claimed ? (
          <>
            <div className="cp-check" aria-hidden>✓</div>
            <h3 id="cp-title" className="cp-title">Coupon claimed</h3>
            <p className="cp-text">{coupon.code}: {coupon.label}. It applies at checkout on its own once your order is over {money(coupon.minOrder).replace(".00", "")}.</p>
            <button className="cp-claim" onClick={onClose}>Continue shopping</button>
          </>
        ) : (
          <>
            <h3 id="cp-title" className="cp-title">{title}</h3>
            <p className="cp-text">On orders over {money(coupon.minOrder).replace(".00", "")}. Applied at checkout, with no code or QR scan needed.</p>
            <button className="cp-claim" onClick={() => { onClaim(coupon); setClaimed(true); }}>Claim coupon</button>
            <button className="cp-no" onClick={onClose}>No thanks</button>
          </>
        )}
      </div>
    </div>
  );
}
