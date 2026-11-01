import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./theme/tokens.css";
import "./shared/shared.css";
import { OnboardingSplash } from "./components/dylan/OnboardingSplash/OnboardingSplash";
import { Cart } from "./components/dylan/Cart/Cart";
import { Checkout } from "./components/dylan/Checkout/Checkout";
import { NavBar } from "./components/aniah/NavBar/NavBar";
import { FilterSortBar, applyFilters, DEFAULT_FILTERS } from "./components/aniah/FilterSortBar/FilterSortBar";
import { QRCodeDeals } from "./components/aniah/QRCodeDeals/QRCodeDeals";
import { RecentlyViewed } from "./components/aniah/RecentlyViewed/RecentlyViewed";
import { SearchResults } from "./components/rupak/SearchResults/SearchResults";
import { ProductDetails } from "./components/jelani/ProductDetails/ProductDetails";
import { HomePage } from "./components/site/HomePage/HomePage";
import { imageProps } from "./data/products";
import { items, byId, cart as demoCart, swaps, coupons as demoCoupons, webDeal, CATEGORY_TREE, INTEREST_CHIPS, TAX_RATE, ZIP, CITY, DEMO_BUDGET } from "./data/sample";

/**
 * The assembled site: everyone's screens wired together so we can click through the whole demo.
 * Components are designed one at a time in Storybook (npm run storybook); this is where they meet.
 */
const START = { zip: ZIP, budget: DEMO_BUDGET, showDeals: true };

function App() {
  const [theme, setTheme] = useState("temu");
  const [prefs, setPrefs] = useState(START);
  const [splash, setSplash] = useState(true);
  const [page, setPage] = useState("home");        // home | list | product | cart | checkout
  const [view, setView] = useState({ kind: "home" }); // what the list page shows (see `listing` below)
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [cart, setCart] = useState(demoCart);
  const [product, setProduct] = useState(byId["laser-green"]);
  const [recent, setRecent] = useState([]);
  const [coupons, setCoupons] = useState(demoCoupons);
  const [popout, setPopout] = useState(false);

  const go = (p) => { setPage(p); setPopout(false); window.scrollTo(0, 0); };
  const show = (v) => { setView(v); setFilters(DEFAULT_FILTERS); go(v.kind === "home" ? "home" : "list"); };
  const openItem = (i) => { setProduct(i); setRecent((r) => [i, ...r.filter((x) => x.id !== i.id)].slice(0, 6)); go("product"); };
  const addToCart = (item) => { setCart((c) => (c.find((i) => i.id === item.id) ? c : [...c, item])); setPopout(true); };
  const swap = (from, to) => setCart((c) => c.map((i) => (i.id === from ? byId[to] : i)));
  const claim = (c) => setCoupons((cs) => (cs.find((x) => x.code === c.code) ? cs : [...cs, c]));
  const reset = () => { setCart(demoCart); setPrefs(START); setCoupons(demoCoupons); setRecent([]); show({ kind: "home" }); setSplash(true); };

  const common = { taxRate: TAX_RATE, zip: prefs.zip || ZIP, city: CITY, budget: prefs.budget, showDeals: prefs.showDeals };
  const cartProps = { cart, swaps, catalog: byId, onSwap: swap };
  const qr = <QRCodeDeals coupon={webDeal} claimed={coupons.some((c) => c.code === webDeal.code)} onClaim={claim} />;

  // The list page: a category (optionally one subcategory), a search, or one of Temu's quick links.
  const soldNum = (s) => (s ? parseFloat(s) * (String(s).includes("K") ? 1000 : 1) : 0);
  const listing = (() => {
    const v = view;
    if (v.kind === "category") {
      const inCat = items.filter((i) => i.category === v.name);
      const subs = CATEGORY_TREE.find((c) => c.name === v.name)?.subs ?? [];
      const inSub = v.sub ? inCat.filter((i) => i.sub === v.sub) : inCat;
      return { title: v.sub ?? v.name, crumb: v.sub ? v.name : null, subs, list: inSub.length ? inSub : inCat,
        empty: inCat.length === 0, subEmpty: v.sub && !inSub.length && inCat.length > 0 };
    }
    if (v.kind === "search") {
      const words = v.text.toLowerCase().split(/\s+/).filter(Boolean);
      const hay = (i) => `${i.name} ${i.category} ${i.sub ?? ""} ${i.query ?? ""}`.toLowerCase();
      return { title: `Results for "${v.text}"`, list: items.filter((i) => words.every((w) => hay(i).includes(w.replace(/s$/, "")))) };
    }
    if (v.kind === "best") return { title: "👍 Best-Selling Items", list: [...items].sort((a, b) => soldNum(b.sold) - soldNum(a.sold)).slice(0, 48) };
    if (v.kind === "five") return { title: "⭐ 5-Star Rated", list: items.filter((i) => i.rating >= 4.8) };
    if (v.kind === "local") return { title: "🚚 Local Warehouse", list: items.filter((i) => i.delivery?.local) };
    if (v.kind === "deals") return { title: v.type === "clearance" ? "↘ Clearance Deals" : "⚡ Lightning Deals", list: items.filter((i) => i.deal?.type === v.type) };
    return { title: "Recommended for you", list: items };
  })();
  const popular = [...items].sort((a, b) => soldNum(b.sold) - soldNum(a.sold)).slice(0, 24);
  const shown = applyFilters(listing.empty ? popular : listing.list, filters);

  return (
    <div data-theme={theme} className="theme-root" style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 16px", fontSize: 12, background: "#eee", color: "#333", flexWrap: "wrap" }}>
        <b>Demo controls</b>
        <button className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={() => show({ kind: "home" })}>home</button>
        <button className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={() => show({ kind: "deals", type: "lightning" })}>deals</button>
        {["product", "cart", "checkout"].map((p) => (
          <button key={p} className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={() => go(p)}>{p}</button>
        ))}
        <button className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={() => setSplash(true)}>show onboarding</button>
        <button className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={reset}>reset demo</button>
        <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ fontSize: 12 }}>
          <option value="temu">Temu skin</option>
          <option value="wireframe">Wireframe</option>
        </select>
      </div>

      <NavBar cartCount={cart.length} categories={CATEGORY_TREE} recent={recent}
        onSearch={(t) => show(t.trim() ? { kind: "search", text: t.trim() } : { kind: "home" })}
        onCategory={(name, sub) => show({ kind: "category", name, sub })}
        onBestSellers={() => show({ kind: "best" })} onFiveStar={() => show({ kind: "five" })} onLocal={() => show({ kind: "local" })}
        onHome={() => show({ kind: "home" })} onOpenItem={openItem} onCartClick={() => setPopout(true)} />

      <main style={{ padding: "16px 16px 40px", maxWidth: 1400, margin: "0 auto" }}>
        {page === "home" && (
          <HomePage items={items} interests={INTEREST_CHIPS} showDeals={prefs.showDeals} banner={qr} onOpen={openItem}
            onSeeDeals={(type) => show({ kind: "deals", type })} onCategory={(name) => show({ kind: "category", name })} />
        )}
        {page === "list" && (
          <>
            {listing.crumb !== undefined && (
              <div className="ui-muted" style={{ fontSize: 13, marginBottom: 8 }}>
                <button className="ui-btn--link" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }} onClick={() => show({ kind: "home" })}>Home</button>
                {" › "}{listing.crumb
                  ? <><button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }} onClick={() => show({ kind: "category", name: listing.crumb })}>{listing.crumb}</button>{" › "}{listing.title}</>
                  : listing.title}
              </div>
            )}
            {listing.subs?.length > 0 && (
              <div style={{ display: "flex", gap: 18, overflowX: "auto", padding: "4px 0 14px" }}>
                {listing.subs.map((sub) => (
                  <button key={sub.name} onClick={() => show({ kind: "category", name: view.name, sub: sub.name })}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit", fontSize: 12, width: 100, fontWeight: view.sub === sub.name ? 700 : 400 }}>
                    <img {...(sub.item ? imageProps(sub.item) : {})} alt="" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", outline: view.sub === sub.name ? "2px solid var(--color-text)" : "none", outlineOffset: 2 }} />
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
            {view.kind === "search" && <div style={{ marginBottom: 12 }}>{qr}</div>}
            <FilterSortBar value={filters} onChange={setFilters} count={shown.length} />
            {listing.subEmpty && <div className="ui-muted" style={{ margin: "4px 0 12px" }}>Nothing from {listing.title} is in our demo store yet. Showing everything in {listing.crumb}.</div>}
            {listing.empty && <div className="ui-muted" style={{ margin: "4px 0 12px" }}>Nothing from {listing.title} is in our demo store yet. Here's what's popular right now.</div>}
            <SearchResults query={listing.title} items={shown} showDeals={prefs.showDeals} onOpen={openItem} />
            {recent.length > 0 && <div style={{ marginTop: 24 }}><RecentlyViewed items={recent} onOpen={openItem} /></div>}
          </>
        )}
        {page === "product" && (
          <>
            <ProductDetails item={product} showDeals={prefs.showDeals} onAddToCart={addToCart} />
            {recent.length > 1 && <div style={{ marginTop: 24 }}><RecentlyViewed items={recent.filter((r) => r.id !== product.id)} onOpen={openItem} /></div>}
          </>
        )}
        {page === "cart" && <Cart mode="fullscreen" {...cartProps} {...common} onCheckout={() => go("checkout")} onClose={() => show({ kind: "home" })} />}
        {page === "checkout" && <div style={{ display: "flex", justifyContent: "center" }}><Checkout cart={cart} {...common} coupons={coupons} /></div>}
      </main>

      {popout && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 50, maxHeight: "calc(100vh - 32px)", overflowY: "auto" }}>
          <Cart mode="popout" {...cartProps} {...common}
            onCheckout={() => go("checkout")} onExpand={() => go("cart")} onClose={() => setPopout(false)} />
        </div>
      )}

      <OnboardingSplash open={splash} defaultZip={prefs.zip} defaultBudget={prefs.budget ?? ""}
        onDone={(p) => { setPrefs({ zip: p.zip || ZIP, budget: p.budget, showDeals: p.showDeals }); setSplash(false); }} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
