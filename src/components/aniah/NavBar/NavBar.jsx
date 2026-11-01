import { useState } from "react";
import { RecentlyViewed } from "../RecentlyViewed/RecentlyViewed";
import "./NavBar.css";

/**
 * Owner: Aniah. DRAFT by Dylan from Aniah's ideation notes, to be replaced with her design concept.
 * Site header modeled on Temu's real layout (reference/temu-screens/homepage-with-coupon-popup.jpg):
 * black promo bar, logo, quick links, Categories, search, account, cart.
 * Aniah's idea: a Recently viewed menu, so products open in the same tab and you can get back to them.
 */
export function NavBar({ cartCount = 0, categories = [], recent = [], onSearch = () => {}, onCategory = () => {},
  onDeals = () => {}, onHome = () => {}, onOpenItem = () => {}, onCartClick = () => {} }) {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(null); // "categories" | "recent" | null
  const toggle = (m) => setMenu(menu === m ? null : m);
  return (
    <header className="nav" onMouseLeave={() => setMenu(null)}>
      <div className="nav-promo">
        <span>🚚 <b>Free shipping</b> on items shipped by Temu</span>
        <span>✓ <b>Delivery guarantee</b> · refund for any issues</span>
        <span>↩ <b>Free returns</b> within 90 days</span>
      </div>
      <div className="nav-main">
        <button className="nav-logo" onClick={onHome} aria-label="Home">temu</button>
        <nav className="nav-links">
          <button onClick={onDeals}>⚡ Lightning Deals</button>
          <button onClick={() => onCategory("Recommended for you")}>★ 5-Star Rated</button>
          <div className="nav-menu-wrap">
            <button aria-expanded={menu === "categories"} onClick={() => toggle("categories")}>Categories ▾</button>
            {menu === "categories" && (
              <div className="nav-menu">
                {categories.map((c) => <button key={c} onClick={() => { onCategory(c); setMenu(null); }}>{c}</button>)}
              </div>
            )}
          </div>
        </nav>
        <form className="nav-search" onSubmit={(e) => { e.preventDefault(); onSearch(q); }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Temu" aria-label="Search" />
          <button type="submit" aria-label="Search">🔍</button>
        </form>
        <div className="nav-menu-wrap">
          <button className="nav-icon-btn" aria-expanded={menu === "recent"} onClick={() => toggle("recent")}>
            🕘 <span>Recently<br />viewed</span>{recent.length > 0 && <span className="nav-badge">{recent.length}</span>}
          </button>
          {menu === "recent" && (
            <div className="nav-menu nav-menu--right">
              <RecentlyViewed items={recent} onOpen={(i) => { onOpenItem(i); setMenu(null); }} compact />
            </div>
          )}
        </div>
        <button className="nav-icon-btn">👤 <span>Orders &amp;<br />Account</span></button>
        <button className="nav-cart" onClick={onCartClick} aria-label={`Cart, ${cartCount} items`}>🛒<span className="nav-badge">{cartCount}</span></button>
      </div>
    </header>
  );
}
