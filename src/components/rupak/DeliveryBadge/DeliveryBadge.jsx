import "./DeliveryBadge.css";

/**
 * Owner: Rupak. Shipping and delivery shown before you click, from Rupak's design concept.
 * Local items get the green "Local delivery available"; overseas items say so plainly.
 * variant="cart" adds the item-level detail Rupak specified for the cart.
 */
export function DeliveryBadge({ delivery, variant = "card" }) {
  if (!delivery) return null;
  const { local, label, ships, delivers } = delivery;
  if (variant === "cart") {
    return (
      <div className={`dlv dlv--cart${local ? " is-local" : ""}`}>
        <div className="dlv-head">{local ? "📍 Locally available in your region" : "🚚 Ships from overseas"}</div>
        {local && <div className="dlv-note">Ships from a warehouse near you.</div>}
        <div>Ships in {ships} · Delivered in {delivers}</div>
      </div>
    );
  }
  return (
    <div className={`dlv${local ? " is-local" : ""}`}>
      <div className="dlv-head">🚚 {label}</div>
      <div>Ships in {ships}</div>
      <div>Delivered in {delivers}</div>
    </div>
  );
}
