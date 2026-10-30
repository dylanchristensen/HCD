import { useState } from "react";
import { Button } from "../../../shared";
import { PriceBlock } from "./PriceBlock/PriceBlock";
import { SeeMoreDetails } from "../SeeMoreDetails/SeeMoreDetails";
import { imageProps } from "../../../data/products";

/**
 * Owner: Jelani. Product details page. Starter layout; replace freely.
 * Ideas from our session: "see more" drop-downs for extra information, stronger visual hierarchy,
 * a less "sketchy" look. Add to cart opens Dylan's Cart popout (onAddToCart).
 * The laser level has Temu's real 5-image gallery and shipping note (src/data/products.js).
 */
export function ProductDetails({ item, taxRate, zip, cart = [], budget = null, showDeals = true, onAddToCart = () => {} }) {
  const [shown, setShown] = useState(0);
  const gallery = item.gallery ?? [item.img];
  const main = item.gallery ? imageProps(item, shown) : imageProps(item);
  return (
    <section style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {item.gallery && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setShown(i)} style={{ padding: 0, border: `2px solid ${i === shown ? "var(--color-text)" : "transparent"}`, borderRadius: "var(--radius-sm)", background: "none", cursor: "pointer" }}>
                <img {...imageProps(item, i)} alt="" style={{ width: 56, height: 56, objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        )}
        <img {...main} alt={item.name} style={{ width: 360, height: 360, objectFit: "cover", borderRadius: "var(--radius-md)", background: "var(--color-surface)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 460 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>{item.name}</h2>
        <div className="ui-muted">{item.rating} ★{item.reviews ? ` · ${item.reviews} reviews` : ""} · {item.sold} sold</div>
        <PriceBlock item={item} taxRate={taxRate} zip={zip} cart={cart} budget={budget} showDeals={showDeals} />
        {item.shippingNote && <div className="ui-muted">{item.shippingNote}</div>}
        <Button onClick={() => onAddToCart(item)}>Add to cart</Button>
        <SeeMoreDetails />
      </div>
    </section>
  );
}
