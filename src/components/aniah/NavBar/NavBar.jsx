/**
 * Owner: Aniah. Starter stub; replace freely.
 * Site-wide navigation bar: logo, search, categories, account, cart. The cart button opens Dylan's
 * Cart popout (onCartClick). Ideas from our session: the same search and filter tools on every page.
 */
export function NavBar({ cartCount = 3, onCartClick = () => {} }) {
  return (
    <header className="ui-stub" style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
      <b>LOGO</b>
      <span style={{ flex: 1, border: "1px solid currentColor", borderRadius: 999, padding: "4px 12px" }}>Search</span>
      <span>Categories</span>
      <span>Account</span>
      <button className="ui-btn ui-btn--ghost" onClick={onCartClick}>Cart ({cartCount})</button>
      <span style={{ flexBasis: "100%", fontSize: 12 }}>TODO (Aniah): design the nav bar.</span>
    </header>
  );
}
