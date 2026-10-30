import "./DealLabel.css";

/**
 * Three deal types, one look and one meaning each (brainwriting, Dylan).
 * lightning: short sale with a stated end time, shown as clock time, never a countdown.
 * clearance: until stock runs out, with the count.
 * everyday:  no time limit.
 * Renders nothing when the shopper has turned deals off.
 */
export function DealLabel({ deal, showDeals = true, detailed = false }) {
  if (!showDeals || !deal) return null;
  const text = {
    lightning: <>LIGHTNING <small>· ends {deal.endsAt}</small></>,
    clearance: <>CLEARANCE <small>· {deal.left} left</small></>,
    everyday: <>EVERYDAY PRICE</>,
  }[deal.type];
  return (
    <span className="deal-wrap">
      <span className={`deal deal--${deal.type}`}>{text}</span>
      {detailed && deal.type === "lightning" && (
        <span className="ui-muted deal-explain">
          A short sale with a fixed end time. Regular price ${deal.regularPrice?.toFixed(2)} after that.
        </span>
      )}
    </span>
  );
}
