import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import "./ProductCard.css";

/**
 * Owner: Rupak. Product card from Rupak's FINAL design (Nov 5, 2026; reference/concepts/rupak-final-*.png):
 *  - "Sold N in last 24 hours" badge on popular items (his idea: show how many people bought it)
 *  - green "20% OFF at checkout" ribbon on items with a checkout discount, so you know before you click
 *  - name, price and original price, star rating, a cart button on the card
 *  - one green "Arrives in X days" bar: delivery before you click
 * Deals turned off (onboarding toggle) hides the sold badge; the 20% ribbon stays because it changes the price.
 * Optional onAdd(item) shows the cart button; optional onQuickLook(item) shows a "Quick look" button on hover.
 * Hover (like Temu): the card lifts, the photo zooms or swaps to the second gallery photo, and Quick look appears.
 */
export function ProductCard({ item, showDeals = true, onOpen, onAdd, onQuickLook }) {
  const rating = item.rating ?? 0;
  return (
    <article className="pcard" onClick={onOpen} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen?.()}>
      <div className="pcard-img">
        {item.img && <img className="pcard-img-main" {...imageProps(item)} alt={item.name} />}
        {item.gallery?.[1] && <img className="pcard-img-alt" {...imageProps(item, 1)} alt="" aria-hidden />}
        {onQuickLook && (
          <button className="pcard-quick" onClick={(e) => { e.stopPropagation(); onQuickLook(item); }} onKeyDown={(e) => e.stopPropagation()}>Quick look</button>
        )}
        {showDeals && item.soldToday && <span className="pcard-hot">🔥 Sold {item.soldToday} in last 24 hours</span>}
        {item.checkoutOffer && <span className="pcard-offer">{item.checkoutOffer.percent}% OFF<small>at checkout</small></span>}
      </div>
      <div className="pcard-body">
        <div className="pcard-name">{item.name}</div>
        <div className="pcard-row">
          <div className="pcard-price">
            <span className="pcard-now">{money(item.price)}</span>
            {item.originalPrice && <span className="pcard-was">{money(item.originalPrice)}</span>}
          </div>
          {onAdd && (
            <button className="pcard-add" aria-label={`Add ${item.name} to cart`} title="Add to cart"
              onClick={(e) => { e.stopPropagation(); onAdd(item); }} onKeyDown={(e) => e.stopPropagation()}>🛒</button>
          )}
        </div>
        <div className="pcard-rating">
          {rating ? <Stars value={rating} /> : <span className="ui-muted">New</span>}
          {item.sold && <span className="ui-muted">({item.sold} sold)</span>}
        </div>
      </div>
      {item.delivery && <div className="pcard-arrives"><span aria-hidden>🚚</span> Arrives in {item.delivery.delivers}</div>}
    </article>
  );
}

function Stars({ value }) {
  const full = Math.floor(value), half = value - full >= 0.3 && value - full < 0.8, fullish = value - full >= 0.8;
  return (
    <span className="pcard-stars" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((n) => <span key={n} className={n < full || (n === full && fullish) ? "on" : n === full && half ? "half" : ""}>★</span>)}
    </span>
  );
}
