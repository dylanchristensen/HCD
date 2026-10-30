import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./theme/tokens.css";
import "./shared/shared.css";
import { ProductTile } from "./components/dylan/ProductTile/ProductTile";
import { PriceBlock } from "./components/dylan/PriceBlock/PriceBlock";
import { CartDrawer } from "./components/dylan/CartDrawer/CartDrawer";
import { CheckoutSummary } from "./components/dylan/CheckoutSummary/CheckoutSummary";
import { DeliveryEstimate } from "./components/rupak/DeliveryEstimate/DeliveryEstimate";
import { FilterSortBar } from "./components/aniah/FilterSortBar/FilterSortBar";
import { SectionBlock } from "./components/jelani/SectionBlock/SectionBlock";
import { items, cart, TAX_RATE, ZIP } from "./data/sample";

/**
 * Assembled screens. While we design, components are built one at a time in Storybook (npm run storybook).
 * This page is where they come together, and where the Temu theme gets tested at the end.
 */
function App() {
  const [theme, setTheme] = useState("wireframe");
  const [showDeals, setShowDeals] = useState(true);
  return (
    <div data-theme={theme} className="theme-root" style={{ minHeight: "100vh", padding: 24 }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Temu redesign: assembled screens</h1>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="wireframe">Wireframe</option>
          <option value="temu">Temu skin</option>
        </select>
        <label><input type="checkbox" checked={showDeals} onChange={(e) => setShowDeals(e.target.checked)} /> Show deals and timers</label>
      </header>
      <h2>Search results</h2>
      <FilterSortBar />
      <SectionBlock title="Phone cases">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
          {items.map((i) => <ProductTile key={i.id} item={i} showDeals={showDeals} />)}
        </div>
      </SectionBlock>
      <h2>Product page</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <PriceBlock item={items[2]} taxRate={TAX_RATE} zip={ZIP} cart={cart.filter((c) => c.id !== "level")} budget={30} showDeals={showDeals} />
        <DeliveryEstimate />
      </div>
      <h2>Cart and checkout</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <CartDrawer cart={cart} taxRate={TAX_RATE} zip={ZIP} budget={30} showDeals={showDeals} />
        <CheckoutSummary cart={cart} taxRate={TAX_RATE} zip={ZIP} budget={30} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
