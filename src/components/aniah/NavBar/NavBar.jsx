import { useState } from "react";
import { RecentlyViewed } from "../RecentlyViewed/RecentlyViewed";
import { imageProps } from "../../../data/products";
import "./NavBar.css";

/**
 * Owner: Aniah. DRAFT by Dylan from Aniah's ideation notes, to be replaced with her design concept.
 * Site header modeled on Temu's real layout (reference/temu-screens/homepage-with-coupon-popup.jpg):
 * black promo bar, logo, Best-Selling Items / 5-Star Rated / Local Warehouse, a Categories mega-menu
 * (Temu's real category list on the left, subcategories with pictures on the right), search, account, cart.
 * Aniah's idea: a Recently viewed menu, so products open in the same tab and you can get back to them.
 *
 * categories: [{ name, count, subs: [{ name, count, item }] }]  (CATEGORY_TREE in src/data/sample.js)
 * onCategory(name, sub?) opens a category, or one subcategory of it.
 */
export function NavBar({ cartCount = 0, categories = [], recent = [], onSearch = () => {}, onCategory = () => {},
  onBestSellers = () => {}, onFiveStar = () => {}, onLocal = () => {}, onHome = () => {}, onOpenItem = () => {}, onCartClick = () => {} }) {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(null); // "categories" | "recent" | null
  const [hover, setHover] = useState(0);
  const toggle = (m) => setMenu(menu === m ? null : m);
  const close = () => setMenu(null);
  const active = categories[hover];
  return (
    <header className="nav" onMouseLeave={close}>
      <div className="nav-promo">
        <span>🚚 <b>Free shipping</b> <small>Excludes items shipped from sellers</small></span>
        <span>✓ <b>Delivery guarantee</b> <small>Refund for any issues</small></span>
        <span>📱 <b>Get the Temu App</b></span>
      </div>
      <div className="nav-main">
        <button className="nav-logo" onClick={onHome} aria-label="Temu home"><span>TEMU</span></button>
        <nav className="nav-links">
          <button onClick={onBestSellers}>👍 Best-Selling Items</button>
          <button onClick={onFiveStar}>⭐ 5-Star Rated</button>
          <button onClick={onLocal}>🚚 Local Warehouse</button>
          <div className="nav-menu-wrap">
            <button aria-expanded={menu === "categories"} onClick={() => setMenu("categories")} onMouseEnter={() => setMenu("categories")}>Categories ▾</button>
            {menu === "categories" && (
              <div className="nav-mega" role="menu">
                <div className="nav-mega-list">
                  {categories.map((c, i) => (
                    <button key={c.name} className={i === hover ? "is-on" : ""} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}
                      onClick={() => { onCategory(c.name); close(); }}>
                      {c.name} <span aria-hidden>›</span>
                    </button>
                  ))}
                </div>
                {active && (
                  <div className="nav-mega-panel">
                    <button className="nav-mega-all" onClick={() => { onCategory(active.name); close(); }}>All {active.name} ›</button>
                    {active.subs.length > 0 ? (
                      <div className="nav-mega-subs">
                        {active.subs.map((s) => (
                          <button key={s.name} onClick={() => { onCategory(active.name, s.name); close(); }}>
                            <span className="nav-mega-pic">{s.item && <img {...imageProps(s.item)} alt="" />}</span>
                            <span>{s.name}</span>
                          </button>
                        ))}
                      </div>
                    ) : <p className="ui-muted">Popular picks for {active.name} appear here.</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      <div className="nav-row2">
        <form className="nav-search" onSubmit={(e) => { e.preventDefault(); onSearch(q); close(); }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Temu" aria-label="Search" />
          <button type="submit" aria-label="Search">🔍</button>
        </form>
        <div className="nav-menu-wrap">
          <button className="nav-icon-btn" aria-expanded={menu === "recent"} onClick={() => toggle("recent")}>
            🕘 <span>Recently<br />viewed</span>{recent.length > 0 && <span className="nav-badge">{recent.length}</span>}
          </button>
          {menu === "recent" && (
            <div className="nav-menu nav-menu--right">
              <RecentlyViewed items={recent} onOpen={(i) => { onOpenItem(i); close(); }} compact />
            </div>
          )}
        </div>
        <button className="nav-icon-btn">👤 <span>Orders &amp;<br />Account</span></button>
        <button className="nav-icon-btn" aria-label="Support">💬</button>
        <button className="nav-icon-btn" aria-label="Language and currency">🇺🇸</button>
        <button className="nav-cart" onClick={onCartClick} aria-label={`Cart, ${cartCount} items`}>🛒<span className="nav-badge">{cartCount}</span></button>
      </div>
      </div>
    </header>
  );
}
