import { useState } from "react";
import { Button } from "../../../shared";
import "./QRCodeDeals.css";

/**
 * Owner: Aniah. DRAFT by Dylan from Aniah's idea: "For the coupons/discounts on the web, change the QR code
 * scanner. Have the pop-ups be usable on both mobile & web."
 * On real Temu, some deals on the website say "scan with the Temu app", which a laptop shopper can't use and
 * a phone shopper can't scan. Here the deal can be claimed right on the page; the QR code is kept only as an
 * option on desktop, and on mobile it becomes an "Open in app" link.
 * `onClaim(coupon)` adds the coupon to the account; Dylan's checkout then shows it.
 */
export function QRCodeDeals({ coupon, platform = "web", claimed: claimedProp = false, onClaim = () => {} }) {
  const [claimed, setClaimed] = useState(claimedProp);
  const claim = () => { setClaimed(true); onClaim(coupon); };
  return (
    <aside className={`qr qr--${platform}`}>
      <div className="qr-text">
        <div className="qr-kicker">Coupon</div>
        <div className="qr-title">{coupon.label}</div>
        {claimed
          ? <div className="qr-done">✓ Saved to your coupons. It applies at checkout once your order reaches ${coupon.minOrder}.</div>
          : <div className="ui-muted">No app needed. Claim it here and it applies at checkout.</div>}
        {!claimed && <div className="qr-actions"><Button onClick={claim}>Claim on {platform === "mobile" ? "this phone" : "web"}</Button>
          {platform === "mobile" && <Button variant="link">Open in app</Button>}</div>}
      </div>
      {platform === "web" && !claimed && (
        <div className="qr-code">
          <FakeQR />
          <span className="ui-muted">or scan to save it in the app</span>
        </div>
      )}
    </aside>
  );
}

/** A placeholder QR-style pattern (not a working code). */
function FakeQR({ size = 21 }) {
  let seed = 7; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const finder = (x, y) => (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  const cells = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let on;
    if (finder(x, y)) { const fx = x >= size - 7 ? x - (size - 7) : x, fy = y >= size - 7 ? y - (size - 7) : y; on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4); }
    else on = rnd() > 0.5;
    if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  }
  return <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} width="96" height="96" aria-label="QR code" role="img" style={{ background: "#fff" }}><g fill="#000">{cells}</g></svg>;
}
