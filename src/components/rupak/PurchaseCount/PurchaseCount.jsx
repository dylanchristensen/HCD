/**
 * Owner: Rupak. Starter stub; replace freely.
 * Idea (from our ideation session): Display how many users have purchased (for example 1021 users have purchased it). From the meeting: also how many have it in their cart, shown on the home page.
 */
export function PurchaseCount({ sold = 1021, inCarts = 60 }) {
  return (
    <div className="ui-stub">
      {sold.toLocaleString()} bought · {inCarts} in carts
      <div>TODO (Rupak): placement on tile vs. product page.</div>
    </div>
  );
}
