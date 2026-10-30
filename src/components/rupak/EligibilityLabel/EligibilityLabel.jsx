import "./EligibilityLabel.css";

/**
 * Owner: Rupak. Discount eligibility label, from Rupak's design concept.
 * Green = eligible, blue = not eligible (with a reason), orange = new users only.
 * Hover or focus shows the conditions (minimum purchase, account eligibility, exclusions).
 */
const ICON = { eligible: "✓", not: "i", new: "!" };
export function EligibilityLabel({ eligibility }) {
  if (!eligibility) return null;
  const { status, label, detail } = eligibility;
  return (
    <span className={`elig elig--${status}`} tabIndex={0} aria-describedby={undefined}>
      <span className="elig-icon" aria-hidden="true">{ICON[status]}</span>
      <span className="elig-label">{label}</span>
      {detail && <span className="elig-tip" role="tooltip">{detail}</span>}
    </span>
  );
}
