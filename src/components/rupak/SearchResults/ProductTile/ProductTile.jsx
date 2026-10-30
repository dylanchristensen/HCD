import { Pill, DealLabel } from "../../../../shared";
import { money } from "../../../../lib/price";
import "./ProductTile.css";

/**
 * Owner: Rupak (search results page). Starting point carried over from Dylan's price ideas:
 * all-in price line, shipping source badge, deal label, "You'd pay" footer. Change freely.
 */
export function ProductTile({ item, showDeals = true, image }) {
  const sellerShipped = item.shipsFrom === "seller";
  const youPay = item.price + (sellerShipped ? item.sellerShipping : 0);
  return (
    <article className="tile">
      <div className="tile-img">{image ? <img src={image} alt="" /> : null}</div>
      <div className="tile-name">{item.name}</div>
      <div className="tile-deal"><DealLabel deal={item.deal} showDeals={showDeals} /></div>
      <div className="tile-price ui-money">{money(item.price)}</div>
      <div className="tile-ship">{sellerShipped ? `+ ${money(item.sellerShipping)} shipping` : "Free shipping"}</div>
      <Pill filled={!sellerShipped}>{sellerShipped ? "Seller-shipped" : "Ships from Temu (US)"}</Pill>
      <div className="tile-foot">You'd pay <b>{money(youPay)}</b> + est. tax</div>
    </article>
  );
}
