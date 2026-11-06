import { useState } from "react";
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
 *  - Symbols communicate sale types without text; details live in a drop-down. A timed sale shows its
 *    end time (the sketch's "Timed Sale 12:10:02"), not a ticking countdown, per the team on Nov 6, 2026.
 *  - Shipping says "Free", or lists the stipulation, or "Free with stipulation ⓘ" if it's too long.
 *  - The left column (gallery, seller, reviews) scrolls independently of the right.
 * From Jelani's report text (Nov 2026): a seller box with name, short overview, accolades (years on Temu,
 * category rank, total sales) and a drop-down bio; accolades under the description (sales, low stock);
 * "Pay $X over time"; price-detail icons with a short hover label; a larger quantity control;
 * "Add X to Cart"; a stipulated shipping price is a button that opens its conditions; delivery as MM/DD/YY.
 * Items without full listing data get demo values from pageData() below (invented, see the AI Use Log).
 */
export function ProductDetails({ item, showDeals = true, onAddToCart = () => {} }) {
  const [shown, setShown] = useState(0);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState(item.options?.values.find((v) => v.available)?.name);
  const onSale = item.originalPrice && item.originalPrice > item.price;
  const pctOff = onSale ? Math.floor((1 - item.price / item.originalPrice) * 100) : 0;
  const ship = sellerShippingFor(item);
  const d = pageData(item, onSale, pctOff);

  return (
    <div className="pd">
      {/* LEFT: scrolls independently */}
      <div className="pd-left">
        <div className="pd-box pd-gallery">
          {item.gallery && (
            <div className="pd-thumbs">
              {item.gallery.map((_, i) => (
                <button key={i} className={`pd-thumb${i === shown ? " is-on" : ""}`} onMouseEnter={() => setShown(i)} onClick={() => setShown(i)} aria-label={`Image ${i + 1}`}>
                  <img {...imageProps(item, i)} alt="" />
                </button>
              ))}
            </div>
          )}
          <div className="pd-main-wrap">
            <img className="pd-main" {...(item.gallery ? imageProps(item, shown) : imageProps(item))} alt={item.name} />
            {item.gallery?.length > 1 && (
              <>
                <button className="pd-arrow pd-arrow--prev" aria-label="Previous image" onClick={() => setShown((shown - 1 + item.gallery.length) % item.gallery.length)}>‹</button>
                <button className="pd-arrow pd-arrow--next" aria-label="Next image" onClick={() => setShown((shown + 1) % item.gallery.length)}>›</button>
              </>
            )}
          </div>
        </div>

        <Disclosure className="pd-box pd-seller" openLabel="Show seller bio"
          title={<div className="pd-seller-head"><span className="pd-avatar" aria-hidden="true">{d.seller.name[0]}</span><b>{d.seller.name}</b>
            <span className="pd-seller-accolades">{d.seller.accolades.map((a) => <span key={a}>{a}</span>)}</span></div>}
          summary={<p className="pd-seller-overview">{d.seller.overview}</p>}>
          <p>{d.seller.bio}</p>
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
              <span>{d.accolades[0]}</span>
              {d.stockLeft != null && <span className="pd-low">Only {d.stockLeft} left</span>}
              <span>{item.sold} sold</span>
            </div>
          }>
          <div className="pd-accolade-grid">{d.accolades.map((a) => <span key={a} className="pd-accolade">{a}</span>)}</div>
        </Disclosure>

        <div className="pd-rating"><Stars value={item.rating} large /> <span className="pd-rating-num">{item.rating?.toFixed(1)}</span> <span className="ui-muted">({item.reviews ?? item.sold})</span></div>

        <div className={`pd-box pd-price${onSale ? " is-sale" : ""}`}>
          <div className="pd-price-row">
            <span className="pd-price-now">{money(item.price)}</span>
            {onSale && <span className="pd-off">{pctOff}% off</span>}
            {onSale && <span className="pd-was">{money(item.originalPrice)}</span>}
          </div>
          <div className="pd-klarna"><span className="pd-klarna-logo">Klarna</span> Pay {money(item.price)} over time: {d.klarna.payments} × {money(d.klarna.each)}</div>
          {showDeals && d.priceDetails.length > 0 && (
            <Disclosure title={<span className="pd-price-details">Price details <SaleIcons details={d.priceDetails} /></span>}>
              <ul className="pd-price-list">
                {d.priceDetails.map((p, i) => (
                  <li key={i}><SaleIcon kind={p.kind} /> {p.text}{p.endsAt && <>, ends <span className="pd-countdown">{p.endsAt}</span></>}</li>
                ))}
              </ul>
            </Disclosure>
          )}
        </div>

        <div className="pd-box pd-metrics">
          {item.options && (
            <>
              <div className="pd-metric-label">{item.options.label}: <b>{option}</b></div>
              <div className="pd-swatches">
                {item.options.values.map((v) => (
                  <button key={v.name} disabled={!v.available} className={`pd-swatch${v.name === option ? " is-on" : ""}`} onClick={() => setOption(v.name)}>
                    {v.name}{!v.available && <small>sold out</small>}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="pd-qty" role="group" aria-label="Quantity">
            <span>Qty</span>
            <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="One fewer">−</button>
            <span className="pd-qty-n" aria-live="polite">{qty}</span>
            <button onClick={() => setQty(Math.min(99, qty + 1))} aria-label="One more">+</button>
          </div>
        </div>

        <Button onClick={() => onAddToCart(item, qty, item.options ? option : null)}>Add {qty} to Cart</Button>

        <div className="pd-box pd-ship">
          <div className="pd-ship-title">Shipping and Delivery</div>
          <div>Shipping price: <ShippingPrice item={item} ship={ship} /></div>
          {d.arrive && <div>Delivery: <b className="pd-green">{d.arrive.from} to {d.arrive.to}</b> <span className="ui-muted">({item.delivery?.local ? "local warehouse" : "ships from overseas"})</span></div>}
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

/** Free, or a stipulated price shown as a button; clicking it opens the conditions (Jelani). */
function ShippingPrice({ item, ship }) {
  const [open, setOpen] = useState(false);
  if (item.shipsFrom !== "seller" || ship === 0) return <span className="pd-free">Free</span>;
  const conditions = item.shippingNote ?? `${money(ship)} standard shipping from this seller, or free when you order ${money(item.sellerFreeOver)} or more from this seller.`;
  return (
    <span className="pd-stip-wrap">
      <button className="pd-stip" aria-expanded={open} onClick={() => setOpen(!open)}>{money(ship)}, or free with stipulation ⓘ</button>
      {open && (
        <span className="pd-stip-pop" role="dialog" aria-label="Shipping conditions">
          {conditions}
          <button className="pd-stip-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </span>
      )}
    </span>
  );
}

/** MM/DD/YY, as in Jelani's shipping section. */
const mdy = (dt) => `${String(dt.getMonth() + 1).padStart(2, "0")}/${String(dt.getDate()).padStart(2, "0")}/${String(dt.getFullYear()).slice(2)}`;

/**
 * The page's data. Real listing values win; items scraped from search pages lack seller, accolade
 * and price-detail data, so those get stable demo values derived from the item id (invented).
 */
function pageData(item, onSale, pctOff) {
  const n = [...String(item.id)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const where = item.sub ?? item.category ?? "its category";
  const stores = ["Brightway", "Maple & Co.", "Harbor Goods", "Lumen Home", "Cedar Lane", "Nova Supply", "Kinfolk Trading", "Bluebird Shop"];
  const name = item.seller?.storeName ?? `${stores[n % stores.length]} Store`;
  const years = 1 + (n % 4);
  const sales = `${10 + (n % 90)}K+ sold`;
  const seller = {
    name,
    accolades: [`${years} yr${years > 1 ? "s" : ""} on Temu`, `#${1 + (n % 20)} in ${where}`, sales],
    overview: item.seller?.note ?? `${name} sells ${where.toLowerCase()} and ships ${item.delivery?.local ? "from a US warehouse" : "from overseas"}.`,
    bio: `${name} has sold on Temu for ${years} year${years > 1 ? "s" : ""}, with ${sales.replace(" sold", "")} orders across its listings. ${item.shipsFrom === "seller" ? "This item ships directly from the seller." : "Temu handles shipping, returns and refunds for this item."} Questions go through Temu's chat, and every order is covered by Temu's purchase protection.`,
  };
  const stockLeft = item.stockLeft ?? (n % 5 === 0 ? 3 + (n % 9) : null);
  const accolades = item.accolades ?? [
    item.rating >= 4.7 ? "Top rated" : "Well reviewed",
    `${item.sold} sold`,
    item.delivery?.local ? "Local warehouse" : "Ships from overseas",
    ...(stockLeft != null ? [`Low stock: ${stockLeft} left`] : []),
  ];
  const priceDetails = item.priceDetails ?? [
    ...(onSale ? [{ kind: "unique", text: `${pctOff}% off the listed price of ${money(item.originalPrice)}` }] : []),
    ...(item.deal?.type === "lightning" ? [{ kind: "lightning", text: `Lightning price until ${item.deal.endsAt}` }] : []),
    ...(item.deal?.type === "clearance" ? [{ kind: "timed", text: "Clearance price, while stock lasts" }] : []),
  ];
  const klarna = item.klarna ?? { payments: 4, each: Math.ceil((item.price / 4) * 100) / 100 };
  const m = (item.delivery?.delivers ?? "").match(/(\d+)\D+(\d+)/);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const plus = (k) => { const x = new Date(today); x.setDate(x.getDate() + k); return mdy(x); };
  const arrive = m ? { from: plus(Number(m[1])), to: plus(Number(m[2])) } : null;
  return { seller, accolades, stockLeft, priceDetails, klarna, arrive };
}

function Stars({ value = 0, small, large }) {
  const full = Math.round(value);
  return <span className={`pd-stars${small ? " is-small" : ""}${large ? " is-large" : ""}`} aria-label={`${value} out of 5 stars`}>{"★★★★★".slice(0, full)}<span className="pd-stars-off">{"★★★★★".slice(full)}</span></span>;
}

const ICONS = { unique: "❗", timed: "⏱", lightning: "⚡" };
/** Jelani: hovering an icon shows a 3 to 4 word description of the offer. */
const HOVER = { unique: "Discount on this item", timed: "Limited-time sale price", lightning: "Lightning deal price" };
function SaleIcon({ kind }) { return <span className={`pd-icon pd-icon--${kind}`} aria-hidden="true">{ICONS[kind]}</span>; }
function SaleIcons({ details }) {
  return (
    <span className="pd-icons">
      {details.map((d, i) => (
        <span key={i} className="pd-icon-tip" tabIndex={0} aria-label={HOVER[d.kind]} data-tip={HOVER[d.kind]}><SaleIcon kind={d.kind} /></span>
      ))}
    </span>
  );
}
