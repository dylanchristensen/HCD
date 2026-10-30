import { Pill, DealLabel } from "../../../../shared";
import { money, sellerShippingFor } from "../../../../lib/price";
import { imageProps } from "../../../../data/products";
import "./ProductTile.css";

/**
 * Owner: Rupak (search results page). Starting point carried over from Dylan's price ideas:
 * all-in price line, shipping source badge, deal label, "You'd pay" footer. Change freely.
 */
export function ProductTile({ item, showDeals = true, onOpen }) {
  const sellerShipped = item.shipsFrom === "seller";
  const ship = sellerShippingFor(item);
  const youPay = item.price + ship;
  return (
    <article className="tile" onClick={onOpen} style={onOpen ? { cursor: "pointer" } : undefined}>
      <div className="tile-img">{item.img && <img {...imageProps(item)} alt={item.name} />}</div>
      <div className="tile-name">{item.name}</div>
      <div className="tile-deal"><DealLabel deal={item.deal} showDeals={showDeals} /></div>
      <div className="tile-price ui-money">{money(item.price)}</div>
      <div className="tile-ship">{ship > 0 ? `+ ${money(ship)} shipping` : "Free shipping"}</div>
      <Pill filled={!sellerShipped}>{sellerShipped ? "Seller-shipped" : "Ships from Temu (US)"}</Pill>
      <div className="tile-foot">You'd pay <b>{money(youPay)}</b> + est. tax</div>
    </article>
  );
}
