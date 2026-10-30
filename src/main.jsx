import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./theme/tokens.css";
import "./shared/shared.css";
import { OnboardingSplash } from "./components/dylan/OnboardingSplash/OnboardingSplash";
import { Cart } from "./components/dylan/Cart/Cart";
import { Checkout } from "./components/dylan/Checkout/Checkout";
import { NavBar } from "./components/aniah/NavBar/NavBar";
import { FilterSortBar } from "./components/aniah/FilterSortBar/FilterSortBar";
import { SearchResults } from "./components/rupak/SearchResults/SearchResults";
import { ProductDetails } from "./components/jelani/ProductDetails/ProductDetails";
import { items, byId, cart as demoCart, swaps, coupons, TAX_RATE, ZIP, CITY, DEMO_BUDGET } from "./data/sample";

/**
 * The assembled site: everyone's screens wired together so we can click through the whole flow.
 * Components are designed one at a time in Storybook (npm run storybook); this is where they meet,
 * and where the Temu theme gets checked at the end.
 */
function App() {
  const [theme, setTheme] = useState("wireframe");
  const [prefs, setPrefs] = useState({ zip: ZIP, budget: DEMO_BUDGET, showDeals: true });
  const [cart, setCart] = useState(demoCart);
  const [product, setProduct] = useState(byId["laser-green"]);
  const [query, setQuery] = useState("Recommended for you");
  const swap = (from, to) => setCart((c) => c.map((i) => (i.id === from ? byId[to] : i)));
  const addToCart = (item) => { setCart((c) => (c.find((i) => i.id === item.id) ? c : [...c, item])); setPopout(true); };
  const cartProps = { cart, swaps, catalog: byId, onSwap: swap, city: CITY };
  const [splash, setSplash] = useState(true);
  const [page, setPage] = useState("search");
  const [popout, setPopout] = useState(false);
  const common = { taxRate: TAX_RATE, zip: prefs.zip || ZIP, budget: prefs.budget, showDeals: prefs.showDeals };

  return (
    <div data-theme={theme} className="theme-root" style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 16px", fontSize: 13, background: "var(--color-surface)" }}>
        <b>Demo controls</b>
        {["search", "product", "cart", "checkout"].map((p) => (
          <button key={p} className="ui-btn ui-btn--ghost" style={{ padding: "4px 10px" }} onClick={() => { setPage(p); setPopout(false); }}>{p}</button>
        ))}
        <button className="ui-btn ui-btn--ghost" style={{ padding: "4px 10px" }} onClick={() => setSplash(true)}>show onboarding</button>
        <button className="ui-btn ui-btn--ghost" style={{ padding: "4px 10px" }} onClick={() => { setCart(demoCart); setPrefs({ zip: ZIP, budget: DEMO_BUDGET, showDeals: true }); setPage("search"); setPopout(false); setSplash(true); }}>reset demo</button>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="wireframe">Wireframe</option>
          <option value="temu">Temu skin</option>
        </select>
      </div>

      <div style={{ padding: 16 }}>
        <NavBar cartCount={cart.length} onCartClick={() => setPopout(true)} />
      </div>

      <div style={{ padding: "0 16px 32px" }}>
        {page === "search" && (<>
          <FilterSortBar />
          <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
            {["Recommended for you", "Phone cases", "T-shirts", "Tools", "Gift wrap"].map((c) => (
              <button key={c} className="ui-btn ui-btn--ghost" style={{ padding: "4px 12px", fontWeight: c === query ? 800 : 400 }} onClick={() => setQuery(c)}>{c}</button>
            ))}
          </div>
          <SearchResults query={query} items={query === "Recommended for you" ? items : items.filter((i) => i.category === query)} showDeals={prefs.showDeals} onOpen={(i) => { setProduct(i); setPage("product"); }} />
        </>)}
        {page === "product" && <ProductDetails item={product} showDeals={prefs.showDeals} onAddToCart={addToCart} />}
        {page === "cart" && <Cart mode="fullscreen" {...cartProps} {...common} onCheckout={() => setPage("checkout")} onClose={() => setPage("search")} />}
        {page === "checkout" && <Checkout cart={cart} {...common} coupons={coupons} />}
      </div>

      {popout && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 50 }}>
          <Cart mode="popout" {...cartProps} {...common}
            onCheckout={() => { setPopout(false); setPage("checkout"); }}
            onExpand={() => { setPopout(false); setPage("cart"); }}
            onClose={() => setPopout(false)} />
        </div>
      )}

      <OnboardingSplash open={splash} defaultZip={prefs.zip} defaultBudget={prefs.budget ?? ""}
        onDone={(p) => { setPrefs({ zip: p.zip || ZIP, budget: p.budget, showDeals: p.showDeals }); setSplash(false); }} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
