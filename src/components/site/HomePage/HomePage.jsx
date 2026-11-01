import { useState } from "react";
import { money } from "../../../lib/price";
import { imageProps } from "../../../data/products";
import { ProductCard } from "../../rupak/ProductCard/ProductCard";
import "./HomePage.css";

/**
 * The homepage, laid out like Temu's (reference/temu-screens/homepage-with-coupon-popup.jpg):
 * "Why choose Temu" bar, Lightning Deals and Clearance Deals rows side by side, a banner slot
 * (Aniah's claim-on-web coupon goes here), then "Explore your interests" category chips over a long grid
 * of Rupak's product cards. Shared/assembly screen, not one person's concept.
 * Our changes to the real thing: deal tiles state when the deal ends ("ends tonight 11:59 pm") instead of a
 * countdown, and both deal rows disappear when the shopper turns deals off.
 */
export function HomePage({ items = [], interests = [], showDeals = true, banner = null, onOpen = () => {}, onSeeDeals = () => {}, onCategory = () => {} }) {
  const [chip, setChip] = useState("Recommended");
  const [shown, setShown] = useState(24);
  const lightning = items.filter((i) => i.deal?.type === "lightning").slice(0, 4);
  const clearance = items.filter((i) => i.deal?.type === "clearance").slice(0, 4);
  const grid = chip === "Recommended" ? interleave(items) : items.filter((i) => i.category === chip);

  return (
    <div className="home">
      <div className="home-why">
        <div className="home-why-top">
          <b>🛡 Why choose Temu?</b>
          <span>🔒 Secure privacy</span><span className="home-sep">|</span>
          <span>💳 Safe payments</span><span className="home-sep">|</span>
          <span>🚚 Delivery guarantee</span>
          <span className="home-why-more">›</span>
        </div>
        <div className="home-why-note">🔔 Be wary of messages about delivery issues claiming to be from USPS. <span className="home-why-more">View ›</span></div>
      </div>

      {showDeals && (
        <div className="home-deals">
          <DealRow title="⚡ Lightning Deals" tone="lightning" items={lightning} onOpen={onOpen} onMore={() => onSeeDeals("lightning")}
            note={(i) => `ends ${i.deal.endsAt}`} />
          <DealRow title="↘ Clearance Deals" tone="clearance" items={clearance} onOpen={onOpen} onMore={() => onSeeDeals("clearance")}
            note={() => "while stock lasts"} />
        </div>
      )}

      {banner && <div className="home-banner">{banner}</div>}

      <h2 className="home-h">Explore your interests</h2>
      <div className="home-chips" role="tablist">
        {["Recommended", ...interests].map((c) => (
          <button key={c} role="tab" aria-selected={chip === c} className={chip === c ? "is-on" : ""} onClick={() => { setChip(c); setShown(24); }}>{c}</button>
        ))}
      </div>
      <div className="home-grid">
        {grid.slice(0, shown).map((i) => <ProductCard key={i.id} item={i} showDeals={showDeals} onOpen={() => onOpen(i)} />)}
      </div>
      <div className="home-more">
        {shown < grid.length
          ? <button className="ui-btn" onClick={() => setShown((n) => n + 24)}>See more ⌄</button>
          : chip !== "Recommended" && <button className="ui-btn ui-btn--ghost" onClick={() => onCategory(chip)}>Shop all {chip} ›</button>}
      </div>
    </div>
  );
}

function DealRow({ title, tone, items, onOpen, onMore, note }) {
  return (
    <section className={`home-dealrow home-dealrow--${tone}`}>
      <button className="home-dealrow-h" onClick={onMore}>{title} <span>›</span></button>
      <div className="home-dealrow-items">
        {items.map((i) => {
          const pct = i.originalPrice ? Math.floor((1 - i.price / i.originalPrice) * 100) : 0;
          return (
            <button key={i.id} className="home-tile" onClick={() => onOpen(i)}>
              <span className="home-tile-img"><img {...imageProps(i)} alt={i.name} /></span>
              <span className="home-tile-price"><b>{money(i.price)}</b>{i.originalPrice && <s>{money(i.originalPrice)}</s>}</span>
              <span className="home-tile-note">{pct > 0 && <b>-{pct}%</b>} {note(i)}</span>
            </button>
          );
        })}
      </div>
    </section>
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
