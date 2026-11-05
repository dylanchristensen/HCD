import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";

/**
 * Owner: Aniah. From Aniah's design concept (Nov 5, 2026): a "Recently viewed" row under the item you
 * selected, so you're reminded of items you liked and can compare their prices, and products open in the
 * same tab instead of a new one. Also used as a compact list in the nav bar's Recently viewed menu.
 * compact = the nav bar menu; otherwise a strip for the bottom of a page.
 */
export function RecentlyViewed({ items = [], onOpen = () => {}, compact = false }) {
  if (items.length === 0) return <div className="ui-muted" style={{ padding: 8 }}>Products you open will show up here, so you never need a new tab.</div>;
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <b style={{ fontSize: compact ? 13 : 16 }}>Recently viewed</b>
      <div style={{ display: "flex", flexDirection: compact ? "column" : "row", gap: compact ? 4 : 12, overflowX: compact ? "visible" : "auto" }}>
        {items.map((i) => (
          <button key={i.id} onClick={() => onOpen(i)}
            style={{ display: "flex", flexDirection: compact ? "row" : "column", gap: 8, alignItems: compact ? "center" : "flex-start", textAlign: "left", width: compact ? "100%" : 150, padding: compact ? 6 : 8, background: "var(--color-bg)", border: compact ? "none" : "1px solid var(--color-border)", font: "inherit", color: "inherit", cursor: "pointer", borderRadius: "var(--radius-sm)" }}>
            <img {...imageProps(i)} alt="" style={{ width: compact ? 44 : 132, height: compact ? 44 : 132, objectFit: "cover", borderRadius: "var(--radius-sm)", background: "var(--color-surface)", flex: "none" }} />
            <span style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: compact ? "nowrap" : "normal", display: compact ? "block" : "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{i.name}</span>
              <b style={{ fontSize: compact ? 12 : 14 }}>{money(i.price)}</b>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
