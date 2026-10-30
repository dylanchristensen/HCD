/** Owner: Rupak. Side panel explaining the eligibility labels, from Rupak's design concept. */
import { EligibilityLabel } from "../EligibilityLabel/EligibilityLabel";
export function EligibilityGuide() {
  const rows = [
    [{ status: "eligible", label: "Eligible for discount" }, "You can apply the current discount at checkout."],
    [{ status: "not", label: "Not eligible for discount" }, "This item isn't part of the discount (for example, already at its lowest price, or certain brands or categories)."],
    [{ status: "new", label: "Only for new users" }, "Discount available for first-time Temu customers."],
  ];
  return (
    <aside style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", padding: 16, display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
      <b style={{ fontSize: 15 }}>How to know if you're eligible for a discount?</b>
      <span className="ui-muted">Look for the eligibility label on the product card before you click. Hover it to see the conditions.</span>
      {rows.map(([e, text]) => (
        <div key={e.status} style={{ background: "var(--color-bg)", borderRadius: "var(--radius-md)", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          <EligibilityLabel eligibility={e} />
          <span className="ui-muted">{text}</span>
        </div>
      ))}
      <span className="ui-muted">Tip: check the label on each product card to save time and shop smarter.</span>
    </aside>
  );
}
