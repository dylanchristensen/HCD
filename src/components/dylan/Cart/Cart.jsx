import { useState } from "react";
import { Button, Pill } from "../../../shared";
import { isZip, taxForZip } from "../../../lib/tax";
import { cartTotals, money, sellerShippingFor } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import { DeliveryBadge } from "../../rupak/DeliveryBadge/DeliveryBadge";
import "./Cart.css";

/**
 * Owner: Dylan. The cart, in two modes:
 *  - "popout": a drawer that slides in over the page you're on
 *  - "fullscreen": the cart as its own page, lines on the left, summary on the right
 * Both show per-line shipping and deal status, the full breakdown before any address,
 * "You'll pay" as the total's label, the budget line, and why shipping isn't free. No timers.
 * Lines are products with { qty, option, key } (src/lib/useCart.js). Quantity buttons, Remove with Undo,
 * and an empty state; every number updates as the cart changes.
 */
export function Cart({ mode = "popout", cart, taxRate, zip, city = "", budget = null, showDeals = true, swaps = {}, catalog = {},
  lastRemoved = null, recommended = [], renderCard = null, onZipChange = () => {}, onQty = () => {}, onRemove = () => {}, onUndo = () => {},
  onCheckout = () => {}, onSwap = () => {}, onExpand = () => {}, onClose = () => {} }) {
  const t = cartTotals(cart, taxRate, budget);
  const [editZip, setEditZip] = useState(false);
  const [zipDraft, setZipDraft] = useState("");
  const zipOk = isZip(zipDraft) && taxForZip(zipDraft);
  const saveZip = (e) => { e.preventDefault(); if (zipOk) { onZipChange(zipDraft.trim()); setEditZip(false); } };
  const count = cart.reduce((n, i) => n + (i.qty ?? 1), 0);
  const seller = cart.filter((i) => sellerShippingFor(i, i.qty ?? 1) > 0);
  const swap = seller.map((i) => swaps[i.id] && catalog[swaps[i.id]] ? { from: i, to: catalog[swaps[i.id]] } : null).find(Boolean);

  const undo = lastRemoved && (
    <div className="cart-undo" role="status">
      Removed {lastRemoved.line.short ?? lastRemoved.line.name}. <Button variant="link" onClick={onUndo}>Undo</Button>
    </div>
  );

  const lines = (
    <ul className="cart-lines">
      {cart.map((i) => {
        const qty = i.qty ?? 1, ship = sellerShippingFor(i, qty), key = i.key ?? i.id;
        return (
          <li key={key} className="cart-line">
            <div className="cart-thumb">{i.img && <img {...imageProps(i)} alt="" />}</div>
            <div className="cart-info">
              <div className="cart-name">{i.name}</div>
              {i.option && <div className="ui-muted">{i.option}</div>}
              <div className="cart-meta">
                <Pill filled={i.shipsFrom !== "seller"}>{i.shipsFrom === "seller" ? "Seller-shipped" : "Shipped by Temu"}</Pill>
                <span className="ui-muted">{ship > 0 ? `+ ${money(ship)} shipping` : "free shipping"}</span>
              </div>
              {showDeals && i.deal?.type === "lightning" && <div className="ui-muted">Lightning price, held until {i.deal.endsAt}</div>}
              {i.checkoutOffer && <div className="cart-offer">{i.checkoutOffer.percent}% off at checkout: you pay {money(i.price * qty * (1 - i.checkoutOffer.percent / 100))}</div>}
              <DeliveryBadge delivery={i.delivery} variant="cart" />
              <div className="cart-controls">
                <div className="cart-qty" role="group" aria-label={`Quantity of ${i.short ?? i.name}`}>
                  <button onClick={() => onQty(key, qty - 1)} aria-label={qty === 1 ? "Remove" : "One fewer"}>{qty === 1 ? "🗑" : "−"}</button>
                  <span aria-live="polite">{qty}</span>
                  <button onClick={() => onQty(key, qty + 1)} aria-label="One more" disabled={qty >= 99}>+</button>
                </div>
                <button className="cart-remove" onClick={() => onRemove(key)}>Remove</button>
              </div>
            </div>
            <div className="cart-price">
              <div className="ui-money">{money(i.price * qty)}</div>
              {qty > 1 && <div className="ui-muted">{money(i.price)} each</div>}
            </div>
          </li>
        );
      })}
    </ul>
  );

  const empty = (
    <div className="cart-empty">
      <div className="cart-empty-icon" aria-hidden>🛒</div>
      <b>Your cart is empty</b>
      <span className="ui-muted">Items you add will show up here with their shipping and tax.</span>
      <Button variant="ghost" onClick={onClose}>{mode === "fullscreen" ? "See trending items" : "Continue shopping"}</Button>
    </div>
  );

  const summary = (
    <>
      <div className="cart-sum">
        <div className="ui-row"><span>Items</span><span>{money(t.subtotal)}</span></div>
        {t.itemDiscount > 0 && <div className="ui-row cart-offer"><span>20% off at checkout <span className="ui-muted">({t.offerCount} {t.offerCount === 1 ? "item" : "items"}, applied automatically)</span></span><span>−{money(t.itemDiscount)}</span></div>}
        <div className="ui-row"><span>Shipping {t.sellerShippedCount > 0 && <span className="ui-muted">({t.sellerShippedCount} seller-shipped)</span>}</span><span>{money(t.shipping)}</span></div>
        <div className="ui-row"><span>Est. tax <span className="ui-muted">({zip})</span></span><span>{money(t.tax)}</span></div>
        <div className="ui-row cart-total"><span>You'll pay</span><span className="ui-money">{money(t.total)}</span></div>
        {editZip ? (
          <form className="cart-zip" onSubmit={saveZip}>
            <label>📍 ZIP <input autoFocus value={zipDraft} onChange={(e) => setZipDraft(e.target.value.replace(/\D/g, "").slice(0, 5))} inputMode="numeric" placeholder={zip} aria-label="Delivery ZIP code" /></label>
            <Button variant="ghost" type="submit" disabled={!zipOk}>Update</Button>
            <Button variant="link" type="button" onClick={() => setEditZip(false)}>Cancel</Button>
            {zipDraft.length === 5 && !zipOk && <span className="cart-zip-err">We don't recognize that ZIP.</span>}
          </form>
        ) : (
          <div className="ui-row ui-muted cart-deliver"><span>📍 Deliver to: {city ? `${city} ` : ""}{zip} · tax {(taxRate * 100).toFixed(2)}%</span><button className="cart-remove" onClick={() => { setZipDraft(""); setEditZip(true); }}>Change</button></div>
        )}
      </div>
      {budget != null && (
        <div className="cart-budget">
          <b>{t.overBudget > 0 ? `${money(t.overBudget)} over your ${money(budget)} budget` : `${money(-t.overBudget)} under your ${money(budget)} budget`}</b>
          <div className="cart-bar"><div style={{ width: `${Math.min(100, (t.total / budget) * 100)}%` }} /></div>
          {t.overBudget > 0 && (
            <div className="cart-actions">{swap && <Button variant="ghost" onClick={() => onSwap(swap.from.id, swap.to.id)}>Swap {swap.from.short} for {swap.to.short} ({money(swap.to.price)})</Button>}<Button variant="ghost">Keep going</Button></div>
          )}
        </div>
      )}
      {seller.length > 0 && (
        <div className="cart-explain">
          Shipping is {money(t.shipping)} because the {seller.map((s) => s.short).join(" and ")} {seller.length > 1 ? "ship" : "ships"} from a seller
          {seller[0]?.sellerFreeOver ? ` (free from that seller over ${money(seller[0].sellerFreeOver)})` : ""}.
          {swap ? ` The ${swap.to.short} ships from Temu for free.` : " Temu-shipped items ship free."}
        </div>
      )}
      <Button onClick={onCheckout}>Checkout · {money(t.total)}</Button>
      <div className="ui-muted cart-promise">Checkout won't add anything. Coupons only take money off.</div>
    </>
  );

  if (mode === "fullscreen") {
    return (
      <main className="cart-page">
        <div className="cart-page-head">
          <h2 className="cart-title">Your cart ({count})</h2>
          <Button variant="link" onClick={onClose}>Continue shopping</Button>
        </div>
        <div className="cart-page-body">
          <section className="cart-page-lines">{undo}{cart.length ? lines : empty}</section>
          {cart.length > 0 && <aside className="cart-page-summary">{summary}</aside>}
        </div>
        {renderCard && recommended.length > 0 && (
          <section className="cart-recs">
            <h3>Items you may want to add</h3>
            <div className="cart-recs-grid">{recommended.map(renderCard)}</div>
          </section>
        )}
      </main>
    );
  }

  return (
    <aside className="cart-drawer" aria-label="Cart">
      <div className="cart-drawer-head">
        <h3 className="cart-title">Your cart ({count})</h3>
        <div className="cart-head-actions">
          <Button variant="link" onClick={onExpand}>Open full cart</Button>
          <Button variant="link" onClick={onClose} aria-label="Close cart">✕</Button>
        </div>
      </div>
      {undo}
      {cart.length ? <>{lines}{summary}</> : empty}
    </aside>
  );
}
