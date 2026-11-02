import { Button } from "../../../shared";
import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import "./Orders.css";

/**
 * Owner: Dylan. What happens after "Place order": a confirmation that repeats the exact total the shopper
 * agreed to (the same number as the cart and checkout), and an Orders page under "Orders & Account".
 * An order is { number, placedAt, lines, totals, coupon, zip }. Demo only: nothing is charged or shipped.
 */
export function Orders({ orders = [], justPlaced = false, onContinue = () => {}, onOpenItem = () => {} }) {
  if (!orders.length) {
    return (
      <section className="ord">
        <h2>Your orders</h2>
        <p className="ui-muted">No orders yet. Orders you place in this demo show up here.</p>
        <Button variant="ghost" onClick={onContinue}>Start shopping</Button>
      </section>
    );
  }
  const [latest, ...older] = orders;
  return (
    <section className="ord">
      {justPlaced ? (
        <div className="ord-done">
          <div className="ord-check" aria-hidden>✓</div>
          <div>
            <h2>Order placed</h2>
            <div>You paid <b>{money(latest.totals.total)}</b>, the same total you saw in your cart{latest.coupon ? `, minus your ${money(latest.coupon.savings)} coupon` : ""}.</div>
            <div className="ui-muted">Order {latest.number} · demo only, nothing was charged.</div>
          </div>
        </div>
      ) : <h2>Your orders</h2>}

      {[latest, ...older].map((o, n) => (
        <article key={o.number} className="ord-card">
          <header className="ord-head">
            <b>Order {o.number}</b>
            <span className="ui-muted">{o.placedAt} · delivering to {o.zip}</span>
          </header>
          <ul className="ord-lines">
            {o.lines.map((l) => (
              <li key={l.key ?? l.id}>
                <button className="ord-thumb" onClick={() => onOpenItem(l)} aria-label={`Open ${l.name}`}>{l.img && <img {...imageProps(l)} alt="" />}</button>
                <span className="ord-name">{l.name}{l.option ? <span className="ui-muted"> · {l.option}</span> : null}</span>
                <span className="ui-muted">× {l.qty ?? 1}</span>
                <span>{money(l.price * (l.qty ?? 1))}</span>
              </li>
            ))}
          </ul>
          <div className="ord-totals">
            <span>Items {money(o.totals.subtotal)}</span>
            {o.coupon && <span>Coupon {o.coupon.code} −{money(o.coupon.savings)}</span>}
            <span>Shipping {money(o.totals.shipping)}</span>
            <span>Tax {money(o.totals.tax)}</span>
            <b>Total {money(o.totals.total)}</b>
          </div>
          {n === 0 && justPlaced && <Button onClick={onContinue}>Continue shopping</Button>}
        </article>
      ))}
    </section>
  );
}
