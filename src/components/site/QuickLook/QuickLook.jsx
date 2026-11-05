import { useEffect, useState } from "react";
import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import "./QuickLook.css";

/**
 * Quick look: the preview Temu opens from the "Quick look" button on a product card, so a shopper can check
 * the price, delivery and options and add to cart without leaving the results. Shared/assembly piece.
 * "See all details" opens Jelani's full product page.
 */
export function QuickLook({ item, showDeals = true, onClose = () => {}, onAdd = () => {}, onDetails = () => {} }) {
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(null);
  const colors = (item?.options?.values ?? []).map((v) => ({ name: v.name, soldOut: !v.available }));
  const optLabel = item?.options?.label ?? "Option";
  const [option, setOption] = useState(colors.find((c) => !c.soldOut)?.name ?? null);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  if (!item) return null;
  const pct = item.originalPrice ? Math.floor((1 - item.price / item.originalPrice) * 100) : 0;
  const thumbs = item.gallery?.length ? item.gallery.map((_, n) => n) : [];
  return (
    <div className="ql-backdrop" onClick={onClose}>
      <div className="ql" role="dialog" aria-modal="true" aria-label={`Quick look: ${item.name}`} onClick={(e) => e.stopPropagation()}>
        <button className="ql-x" onClick={onClose} aria-label="Close">✕</button>
        <div className="ql-media">
          <div className="ql-main"><img {...(photo == null ? imageProps(item) : imageProps(item, photo))} alt={item.name} /></div>
          {thumbs.length > 1 && (
            <div className="ql-thumbs">
              {thumbs.slice(0, 5).map((n) => (
                <button key={n} className={photo === n ? "is-on" : ""} onMouseEnter={() => setPhoto(n)} onClick={() => setPhoto(n)} aria-label={`Photo ${n + 1}`}>
                  <img {...imageProps(item, n)} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="ql-info">
          <h3 className="ql-name">{item.name}</h3>
          <div className="ql-rating">{item.rating ? `★ ${item.rating}` : "New"}{item.sold ? ` · ${item.sold} sold` : ""}</div>
          <div className="ql-price">
            <span className="ql-now">{money(item.price)}</span>
            {item.originalPrice && <s>{money(item.originalPrice)}</s>}
            {pct > 0 && <span className="ql-pct">-{pct}%</span>}
          </div>
          {item.checkoutOffer && <div className="ql-offer">{item.checkoutOffer.percent}% off at checkout: you pay {money(item.price * (1 - item.checkoutOffer.percent / 100))}</div>}
          {showDeals && item.deal?.type === "lightning" && <div className="ql-deal">⚡ Lightning deal, ends {item.deal.endsAt}</div>}
          {item.delivery && <div className="ql-arrives">🚚 Arrives in {item.delivery.delivers}{item.delivery.local ? " · from a local warehouse" : ""}</div>}
          <div className="ql-ship">{item.shipsFrom === "seller" ? "Shipped by the seller: $2.99, free on $30+ from this seller" : "Shipped by Temu: free shipping"}</div>
          {colors.length > 0 && (
            <div className="ql-opts">
              <div className="ql-label">{optLabel}: <b>{option}</b></div>
              <div className="ql-swatches">
                {colors.map((c) => (
                  <button key={c.name} disabled={c.soldOut} className={option === c.name ? "is-on" : ""} onClick={() => setOption(c.name)}>{c.name}</button>
                ))}
              </div>
            </div>
          )}
          <div className="ql-buy">
            <label className="ql-qty">Qty <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select></label>
            <button className="ql-add" onClick={() => { onAdd(item, qty, colors.length ? option : null); onClose(); }}>Add to cart</button>
          </div>
          <button className="ql-details" onClick={() => { onDetails(item); onClose(); }}>See all details ›</button>
        </div>
      </div>
    </div>
  );
}
