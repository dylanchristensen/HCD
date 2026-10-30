import { Button } from "../../../shared";
import { PriceBlock } from "./PriceBlock/PriceBlock";
import { SeeMoreDetails } from "../SeeMoreDetails/SeeMoreDetails";

/**
 * Owner: Jelani. Product details page. Starter layout; replace freely.
 * Ideas from our session: "see more" drop-downs for extra information, stronger visual hierarchy,
 * a less "sketchy" look. Add to cart opens Dylan's Cart popout (onAddToCart).
 */
export function ProductDetails({ item, taxRate, zip, cart = [], budget = null, showDeals = true, onAddToCart = () => {} }) {
  return (
    <section style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ width: 320, height: 320, background: "var(--color-surface)", borderRadius: "var(--radius-md)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 460 }}>
        <h2 style={{ margin: 0 }}>{item.name}</h2>
        <div className="ui-muted">{item.rating} ★ · {item.sold.toLocaleString()} sold</div>
        <PriceBlock item={item} taxRate={taxRate} zip={zip} cart={cart} budget={budget} showDeals={showDeals} />
        <Button onClick={onAddToCart}>Add to cart</Button>
        <SeeMoreDetails />
      </div>
    </section>
  );
}
