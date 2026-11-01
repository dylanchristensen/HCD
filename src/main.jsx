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
import { items, byId, cart as demoCart, swaps, coupons as demoCoupons, webDeal, CATEGORIES, TAX_RATE, ZIP, CITY, DEMO_BUDGET } from "./data/sample";

/**
 * The assembled site: everyone's screens wired together so we can click through the whole demo.
 * Components are designed one at a time in Storybook (npm run storybook); this is where they meet.
 */
const START = { zip: ZIP, budget: DEMO_BUDGET, showDeals: true };

function App() {
  const [theme, setTheme] = useState("temu");
  const [prefs, setPrefs] = useState(START);
  const [splash, setSplash] = useState(true);
  const [page, setPage] = useState("search");      // search | deals | product | cart | checkout
  const [query, setQuery] = useState("Recommended for you");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [cart, setCart] = useState(demoCart);
  const [product, setProduct] = useState(byId["laser-green"]);
  const [recent, setRecent] = useState([]);
  const [coupons, setCoupons] = useState(demoCoupons);
  const [popout, setPopout] = useState(false);

  const go = (p) => { setPage(p); setPopout(false); window.scrollTo(0, 0); };
  const openItem = (i) => { setProduct(i); setRecent((r) => [i, ...r.filter((x) => x.id !== i.id)].slice(0, 6)); go("product"); };
  const addToCart = (item) => { setCart((c) => (c.find((i) => i.id === item.id) ? c : [...c, item])); setPopout(true); };
  const swap = (from, to) => setCart((c) => c.map((i) => (i.id === from ? byId[to] : i)));
  const claim = (c) => setCoupons((cs) => (cs.find((x) => x.code === c.code) ? cs : [...cs, c]));
  const reset = () => { setCart(demoCart); setPrefs(START); setCoupons(demoCoupons); setRecent([]); setFilters(DEFAULT_FILTERS); setQuery("Recommended for you"); go("search"); setSplash(true); };
  const showCategory = (c) => { setQuery(c); setFilters(DEFAULT_FILTERS); go("search"); };
  const search = (text) => { setQuery(text ? `Results for "${text}"` : "Recommended for you"); setFilters(DEFAULT_FILTERS); go("search"); setSearchText(text); };
  const [searchText, setSearchText] = useState("");

  const common = { taxRate: TAX_RATE, zip: prefs.zip || ZIP, city: CITY, budget: prefs.budget, showDeals: prefs.showDeals };
  const cartProps = { cart, swaps, catalog: byId, onSwap: swap };

  const listing = (() => {
    if (page === "deals") return items.filter((i) => i.deal?.type !== "everyday" || (i.originalPrice && i.originalPrice / i.price > 2));
    if (query.startsWith("Results for")) return items.filter((i) => i.name.toLowerCase().includes(searchText.toLowerCase()) || i.category.toLowerCase().includes(searchText.toLowerCase()));
    if (CATEGORIES.includes(query)) return items.filter((i) => i.category === query);
    return items;
  })();
  const shown = applyFilters(listing, filters);

  return (
    <div data-theme={theme} className="theme-root" style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 16px", fontSize: 12, background: "#eee", color: "#333", flexWrap: "wrap" }}>
        <b>Demo controls</b>
        {["search", "deals", "product", "cart", "checkout"].map((p) => (
          <button key={p} className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={() => go(p)}>{p}</button>
        ))}
        <button className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={() => setSplash(true)}>show onboarding</button>
        <button className="ui-btn ui-btn--ghost" style={{ padding: "2px 10px", fontSize: 12 }} onClick={reset}>reset demo</button>
        <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ fontSize: 12 }}>
          <option value="temu">Temu skin</option>
          <option value="wireframe">Wireframe</option>
        </select>
      </div>

      <NavBar cartCount={cart.length} categories={CATEGORIES} recent={recent}
        onSearch={search} onCategory={showCategory} onDeals={() => { setFilters(DEFAULT_FILTERS); go("deals"); }}
        onHome={() => showCategory("Recommended for you")} onOpenItem={openItem} onCartClick={() => setPopout(true)} />

      <main style={{ padding: "16px 16px 40px" }}>
        {(page === "search" || page === "deals") && (
          <>
            {page === "search" && <div style={{ marginBottom: 12 }}><QRCodeDeals coupon={webDeal} claimed={coupons.some((c) => c.code === webDeal.code)} onClaim={claim} /></div>}
            <FilterSortBar value={filters} onChange={setFilters} count={shown.length} />
            <SearchResults query={page === "deals" ? "⚡ Lightning Deals" : query} items={shown} showDeals={prefs.showDeals} onOpen={openItem} />
            {recent.length > 0 && <div style={{ marginTop: 24 }}><RecentlyViewed items={recent} onOpen={openItem} /></div>}
          </>
        )}
        {page === "product" && (
          <>
            <ProductDetails item={product} showDeals={prefs.showDeals} onAddToCart={addToCart} />
            {recent.length > 1 && <div style={{ marginTop: 24 }}><RecentlyViewed items={recent.filter((r) => r.id !== product.id)} onOpen={openItem} /></div>}
          </>
        )}
        {page === "cart" && <Cart mode="fullscreen" {...cartProps} {...common} onCheckout={() => go("checkout")} onClose={() => go("search")} />}
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
