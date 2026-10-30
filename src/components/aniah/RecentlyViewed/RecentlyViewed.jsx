/**
 * Owner: Aniah. Starter stub; replace freely.
 * Idea (from our ideation session): Recently viewed when items are clicked instead of a new tab being opened when you click an item.
 */
export function RecentlyViewed({ items = ["Polka-dot case", "Basic tee", "Laser level"] }) {
  return (
    <div className="ui-stub">
      Recently viewed: {items.join(" · ")}
      <div>TODO (Aniah): strip or panel; replaces opening new tabs.</div>
    </div>
  );
}
