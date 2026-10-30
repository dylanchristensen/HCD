import { DealLabel } from "../../../shared";
import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import { EligibilityLabel } from "../EligibilityLabel/EligibilityLabel";
import { DeliveryBadge } from "../DeliveryBadge/DeliveryBadge";
import "./ProductCard.css";

/**
 * Owner: Rupak. Product card from Rupak's design concept mockups: discount badge on the image,
 * title, price and original price, rating, then the eligibility label and the delivery badge,
 * so shoppers can compare discounts and delivery without opening each product.
 */
export function ProductCard({ item, showDeals = true, onOpen }) {
  const pct = item.originalPrice ? Math.floor((1 - item.price / item.originalPrice) * 100) : 0;
  return (
    <article className="pcard" onClick={onOpen} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen?.()}>
      <div className="pcard-img">
        {item.img && <img {...imageProps(item)} alt={item.name} />}
        {showDeals && pct > 0 && <span className="pcard-pct">-{pct}%</span>}
      </div>
      <div className="pcard-name">{item.name}</div>
      <div className="pcard-price">
        <span className="ui-money">{money(item.price)}</span>
        {item.originalPrice && <span className="pcard-was">{money(item.originalPrice)}</span>}
      </div>
      <div className="pcard-rating"><span className="pcard-stars">{"★".repeat(Math.round(item.rating))}</span> <span className="ui-muted">({item.sold} sold)</span></div>
      {showDeals && item.deal?.type !== "everyday" && <DealLabel deal={item.deal} />}
      <EligibilityLabel eligibility={item.eligibility} />
      <DeliveryBadge delivery={item.delivery} />
    </article>
  );
}
