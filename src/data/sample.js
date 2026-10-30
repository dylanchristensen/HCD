import { products } from "./products.js";

/**
 * The demo scenario. Every item is a real Temu listing (src/data/products.js, collected Oct 30, 2026).
 *
 * Demo cart: polka-dot case $1.85 + 3-pack tees $5.80 + laser level $10.63 (seller-shipped, $2.99)
 * + Christmas fish wrapping paper $4.27 = $22.55 items, $2.99 shipping, 7.25% tax (Charlotte, NC 28223)
 * = $27.39. Demo budget $25, so the cart starts $2.39 over. Swapping the laser level for the
 * Temu-shipped laser kit ($6.01) removes the shipping and brings the total to $19.23.
 * At checkout, auto-applying SAVE2 instead takes $27.39 to $25.25.
 */
export const TAX_RATE = 0.0725; // NC 4.75% + Mecklenburg County 2.5%
export const ZIP = "28223";
export const DEMO_BUDGET = 25;

/**
 * Deal labels for the demo, in our three-type system. On Temu these items carried "LAST DAY",
 * "ALMOST SOLD OUT" and countdowns; here each gets one stated label instead.
 */
const deals = {
  "case-polka": { type: "lightning", endsAt: "Tue 3:00 pm", regularPrice: 17.99 },
  "case-duck": { type: "lightning", endsAt: "Tue 3:00 pm", regularPrice: 5.73 },
  "laser-green": { type: "clearance", left: 12 },
  "laser-kit": { type: "everyday" },
  "wrap-cow": { type: "clearance", left: 40 },
};

/** Short names for tight spaces (cart explanation, budget line). */
const short = {
  "case-polka": "polka-dot case", "tee-black-3pk": "3-pack tees", "laser-green": "laser level",
  "laser-kit": "laser kit", "wrap-fish": "fish wrapping paper",
};

export const items = products.map((p) => ({ ...p, deal: deals[p.id] ?? { type: "everyday" }, short: short[p.id] ?? p.name }));
export const byId = Object.fromEntries(items.map((i) => [i.id, i]));

export const cart = ["case-polka", "tee-black-3pk", "laser-green", "wrap-fish"].map((id) => byId[id]);

/** The swap the cart offers when shipping or budget is the problem. */
export const swaps = { "laser-green": "laser-kit" };

/**
 * Coupons. NEW10 is the real offer Temu's homepage pop-up showed on Oct 30, 2026
 * ("$10 OFF on orders over $60"). SAVE2 is a demo coupon so the auto-apply button has something to apply.
 */
export const coupons = [
  { code: "SAVE2", label: "$2 off orders over $20", amount: 2, minOrder: 20 },
  { code: "NEW10", label: "$10 off orders over $60", amount: 10, minOrder: 60 },
];
