/**
 * Owner: Aniah. Starter stub; replace freely.
 * Idea (from our ideation session): Ensure all pages have a filter/sort option (consistency). Same search tools and layout on every page, including Lightning Deals.
 */
export function FilterSortBar({ sorts = ["Relevance", "Price: low to high", "Rating", "Most sold"] }) {
  return (
    <div className="ui-stub">
      Filters · Sort: {sorts.join(" / ")}
      <div>TODO (Aniah): one bar used on search, category and deals pages.</div>
    </div>
  );
}
