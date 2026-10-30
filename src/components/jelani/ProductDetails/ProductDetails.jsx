import { useEffect, useState } from "react";
import { Button } from "../../../shared";
import { money, sellerShippingFor } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import "./ProductDetails.css";

/**
 * Owner: Jelani. Product details page, built from Jelani's design concept sketch (Oct 30, 2026).
 *
 * Design rules from the sketch:
 *  - Large boxes and deeper separation to show hierarchy; spacing separates subjects.
 *  - "More details" chevrons open drop-down boxes; the up chevron closes them.
 *  - Large rating, because shoppers use stars as the important metric.
 *  - Large, simple price: no color means no sale, color means a sale or discount is applied.
 *  - Symbols communicate sale types without text; details live in a drop-down.
 *  - Shipping says "Free", or lists the stipulation, or "Free with stipulation ⓘ" if it's too long.
 *  - The left column (gallery, seller, reviews) scrolls independently of the right.
 */
export function ProductDetails({ item, showDeals = true, onAddToCart = () => {} }) {
  const [shown, setShown] = useState(0);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState(item.options?.values.find((v) => v.available)?.name);
  const onSale = item.originalPrice && item.originalPrice > item.price;
  const pctOff = onSale ? Math.floor((1 - item.price / item.originalPrice) * 100) : 0;
  const ship = sellerShippingFor(item);

  return (
    <div className="pd">
      {/* LEFT: scrolls independently */}
      <div className="pd-left">
        <div className="pd-box pd-gallery">
          {item.gallery && (
            <div className="pd-thumbs">
              {item.gallery.map((_, i) => (
                <button key={i} className={`pd-thumb${i === shown ? " is-on" : ""}`} onClick={() => setShown(i)} aria-label={`Image ${i + 1}`}>
                  <img {...imageProps(item, i)} alt="" />
                </button>
              ))}
            </div>
          )}
          <img className="pd-main" {...(item.gallery ? imageProps(item, shown) : imageProps(item))} alt={item.name} />
        </div>

        <Disclosure className="pd-box" title={<b>Seller details</b>} summary={<span className="ui-muted">{item.seller?.shipsFrom ?? "Ships from Temu (US)"}</span>}>
          <p>{item.seller?.note ?? "Shipped and handled by Temu's US warehouse."}</p>
        </Disclosure>

        <div className="pd-box pd-reviews">
          <div className="pd-reviews-head">
            <span className="pd-reviews-count">{item.reviews ?? 0} Reviews</span>
            <Stars value={item.rating} /> <span>{item.rating?.toFixed(1)}</span>
          </div>
          <div className="pd-verified">All reviews are verified purchases</div>
          {(item.reviewSamples ?? []).map((r, i) => (
            <article key={i} className="pd-review">
              <div className="pd-review-head">
                <span className="pd-avatar" aria-hidden="true">{r.user[0].toUpperCase()}</span>
                <span><b>{r.user}</b> in 🇺🇸 on {r.date}</span>
              </div>
              <Stars value={r.stars} small />
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="pd-right">
        <Disclosure className="pd-box" title={<h1 className="pd-title">{item.name}</h1>} openLabel="Show full description">
          <p className="pd-desc">{item.description ?? item.name}</p>
        </Disclosure>

        <Disclosure className="pd-box pd-accolades-box"
          title={
            <div className="pd-accolades">
              <span>{item.accolades?.[0] ?? "Accolades"}</span>
              {item.stockLeft != null && <span>{item.stockLeft} left</span>}
              <span>{item.sold} sold</span>
            </div>
          }>
          <div className="pd-accolade-grid">{(item.accolades ?? []).map((a) => <span key={a} className="pd-accolade">{a}</span>)}</div>
        </Disclosure>

        <div className="pd-rating"><Stars value={item.rating} large /> <span className="pd-rating-num">{item.rating?.toFixed(1)}</span> <span className="ui-muted">({item.reviews ?? item.sold})</span></div>

        <div className={`pd-box pd-price${onSale ? " is-sale" : ""}`}>
          <div className="pd-price-row">
            <span className="pd-price-now">{money(item.price)}</span>
            {onSale && <span className="pd-off">{pctOff}% off</span>}
            {onSale && <span className="pd-was">{money(item.originalPrice)}</span>}
          </div>
          {item.klarna && <div className="pd-klarna">{item.klarna.payments} × {money(item.klarna.each)} with Klarna</div>}
          {showDeals && item.priceDetails?.length > 0 && (
            <Disclosure title={<span className="pd-price-details">Price details <SaleIcons details={item.priceDetails} /></span>}>
              <ul className="pd-price-list">
                {item.priceDetails.map((d, i) => (
                  <li key={i}><SaleIcon kind={d.kind} /> {d.text}{d.kind === "timed" && <> <Countdown seconds={d.endsInSeconds} /></>}</li>
                ))}
              </ul>
            </Disclosure>
          )}
        </div>

        {item.options && (
          <div className="pd-box pd-metrics">
            <div className="pd-metric-label">{item.options.label}: <b>{option}</b></div>
            <div className="pd-swatches">
              {item.options.values.map((v) => (
                <button key={v.name} disabled={!v.available} className={`pd-swatch${v.name === option ? " is-on" : ""}`} onClick={() => setOption(v.name)}>
                  {v.name}{!v.available && <small>sold out</small>}
                </button>
              ))}
            </div>
            <label className="pd-qty">Qty
              <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select>
            </label>
          </div>
        )}

        <Button onClick={() => onAddToCart(item, qty)}>Add to Cart</Button>

        <div className="pd-box pd-ship">
          <div className="pd-ship-title">Shipping and Delivery</div>
          <div>Shipping price: <ShippingPrice item={item} ship={ship} /></div>
          {item.delivery && <div>Delivery from: <b className="pd-green">{item.delivery.from} to {item.delivery.to}</b></div>}
          {item.guarantees && (
            <Disclosure title={<span className="pd-green"><b>Order guarantees</b></span>}
              summary={<div className="pd-guarantees">{item.guarantees.slice(0, 2).map((g) => <span key={g}>{g}</span>)}</div>}>
              <div className="pd-guarantees">{item.guarantees.map((g) => <span key={g}>{g}</span>)}</div>
            </Disclosure>
          )}
        </div>
      </div>
    </div>
  );
}

/** "More details" drop-down: chevron down opens, chevron up closes. */
function Disclosure({ title, summary, children, className = "", openLabel = "More details" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pd-disc ${className}`}>
      <div className="pd-disc-head">
        <div className="pd-disc-title">{title}{!open && summary}</div>
        <button className="pd-chev" aria-expanded={open} aria-label={open ? "Hide details" : openLabel} onClick={() => setOpen(!open)}>{open ? "▲" : "▼"}</button>
      </div>
      {open && <div className="pd-disc-body">{children}</div>}
    </div>
  );
}

function ShippingPrice({ item, ship }) {
  if (item.shipsFrom !== "seller") return <span className="pd-free">Free</span>;
  if (ship === 0) return <span className="pd-free">Free</span>;
  const stipulation = `Free with ${money(item.sellerFreeOver)} purchase or more from this seller`;
  if (stipulation.length <= 60) return <span className="pd-stip">{money(ship)}, or {stipulation}</span>;
  return <span className="pd-stip" title={stipulation}>{money(ship)}, or free with stipulation ⓘ</span>;
}

function Stars({ value = 0, small, large }) {
  const full = Math.round(value);
  return <span className={`pd-stars${small ? " is-small" : ""}${large ? " is-large" : ""}`} aria-label={`${value} out of 5 stars`}>{"★★★★★".slice(0, full)}<span className="pd-stars-off">{"★★★★★".slice(full)}</span></span>;
}

const ICONS = { unique: "❗", timed: "⏱", lightning: "⚡" };
function SaleIcon({ kind }) { return <span className={`pd-icon pd-icon--${kind}`} aria-hidden="true">{ICONS[kind]}</span>; }
function SaleIcons({ details }) { return <span className="pd-icons">{details.map((d, i) => <SaleIcon key={i} kind={d.kind} />)}</span>; }

function Countdown({ seconds }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => { const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, []);
  const hh = String(Math.floor(left / 3600)).padStart(2, "0"), mm = String(Math.floor((left % 3600) / 60)).padStart(2, "0"), ss = String(left % 60).padStart(2, "0");
  return <span className="pd-countdown">{hh}:{mm}:{ss}</span>;
}
