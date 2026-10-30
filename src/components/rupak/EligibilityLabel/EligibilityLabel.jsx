/**
 * Owner: Rupak. Starter stub; replace freely.
 * Idea (from our ideation session): Clearer Eligibility Information: Simple Label to tell users if they are eligible for a discount before they click on it.
 */
export function EligibilityLabel({ eligible = true, reason = "New customer offer" }) {
  return (
    <div className="ui-stub">
      {eligible ? "You qualify" : "Not eligible"}: {reason}
      <div>TODO (Rupak): label design and where it appears.</div>
    </div>
  );
}
