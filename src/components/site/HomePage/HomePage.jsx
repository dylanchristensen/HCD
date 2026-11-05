import { useState } from "react";
import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import { ProductCard } from "../../rupak/ProductCard/ProductCard";
import "./HomePage.css";

/**
 * The homepage, laid out like Rupak's final homepage mockup (Nov 5, 2026), which follows real Temu during its
 * Black Friday sale: a sale banner, the Price Match bar, Lightning and Clearance deals as one row of Rupak's
 * product cards, a "Shop now, pay later" strip, then "Explore your interests" chips over a long grid.
 * Shared/assembly screen. (Aniah's web coupon is a pop-up now, shown by main.jsx after onboarding.)
 * Deals turned off (onboarding toggle) hides the sale banner and the deal row.
 */
export function HomePage({ items = [], interests = [], showDeals = true, banner = null, onOpen = () => {}, onAdd, onQuickLook, onSeeDeals = () => {}, onCategory = () => {} }) {
  const [chip, setChip] = useState("Recommended");
  const [shown, setShown] = useState(25);
  const lightning = items.filter((i) => i.deal?.type === "lightning");
  const clearance = items.filter((i) => i.deal?.type === "clearance");
  const dealRow = [...lightning.slice(0, 3), ...clearance.slice(0, 2)];
  const hero = [...lightning].sort((a, b) => (b.originalPrice ?? 0) / b.price - (a.originalPrice ?? 0) / a.price).slice(0, 2);
  const grid = chip === "Recommended" ? interleave(items) : items.filter((i) => i.category === chip);
  const card = (i) => <ProductCard key={i.id} item={i} showDeals={showDeals} onOpen={() => onOpen(i)} onAdd={onAdd} onQuickLook={onQuickLook} />;

  return (
    <div className="home">
      {showDeals && (
        <section className="home-hero" aria-label="Black Friday sale">
          <div className="home-hero-tag"><span>TEMU</span><b>UP TO</b><strong>90%</strong><b>OFF</b></div>
          <div className="home-hero-text">
            <div className="home-hero-title">BLACK FRIDAY <em>Deals</em></div>
            <button className="home-hero-cta" onClick={() => onSeeDeals("lightning")}>SHOP NOW ›</button>
          </div>
          <div className="home-hero-items">
            {hero.map((i) => (
              <button key={i.id} className="home-hero-item" onClick={() => onOpen(i)}>
                <span className="home-hero-img"><img {...imageProps(i)} alt={i.name} /></span>
                <b>{money(i.price)}</b>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="home-why">
        <div className="home-why-top"><b>✓ Never overpay with our Price Match Guarantee</b><span className="home-why-more">›</span></div>
        <div className="home-why-note">🔔 Be wary of messages about delivery issues claiming to be from USPS. <span className="home-why-more">View ›</span></div>
      </div>

      {showDeals && (
        <section className="home-deals">
          <div className="home-deals-heads">
            <button className="home-dealrow-h home-dealrow--lightning" onClick={() => onSeeDeals("lightning")}>⚡ LIGHTNING DEALS <span>Limited-time offers ›</span></button>
            <button className="home-dealrow-h home-dealrow--clearance" onClick={() => onSeeDeals("clearance")}>↘ CLEARANCE DEALS <span>Limited stock ›</span></button>
          </div>
          <div className="home-deals-cards">{dealRow.map(card)}</div>
        </section>
      )}

      <div className="home-bnpl">Shop now, pay later with <span>Afterpay</span><span>Klarna</span><span>Affirm</span><span>PayPal</span></div>

      {banner && <div className="home-banner">{banner}</div>}

      <div className="home-h">{showDeals && <div className="home-h-kicker">◆ BLACK FRIDAY DEALS ◆</div>}EXPLORE YOUR INTERESTS</div>
      <div className="home-chips" role="tablist">
        {["Recommended", ...interests].map((c) => (
          <button key={c} role="tab" aria-selected={chip === c} className={chip === c ? "is-on" : ""} onClick={() => { setChip(c); setShown(25); }}>{c}</button>
        ))}
      </div>
      <div className="home-grid">{grid.slice(0, shown).map(card)}</div>
      <div className="home-more">
        {shown < grid.length
          ? <button className="ui-btn" onClick={() => setShown((n) => n + 25)}>See more ⌄</button>
          : chip !== "Recommended" && <button className="ui-btn ui-btn--ghost" onClick={() => onCategory(chip)}>Shop all {chip} ›</button>}
      </div>
    </div>
  );
}

/** Mix categories so the "Recommended" grid looks like Temu's feed instead of one category at a time. */
function interleave(list) {
  const groups = {};
  for (const i of list) (groups[i.category] ??= []).push(i);
  const cols = Object.values(groups), out = [];
  for (let r = 0; out.length < list.length; r++) for (const g of cols) if (g[r]) out.push(g[r]);
  return out;
}
