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
export const CITY = "Charlotte, NC";
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

/**
 * Rupak's delivery badges. "Local" = the listing carried Temu's "Local Warehouse" tag on Oct 30, 2026.
 * Ranges are from Rupak's design concept.
 */
const LOCAL = { local: true, label: "Local delivery available", ships: "1–3 days", delivers: "3–7 days" };
const OVERSEAS = { local: false, label: "Ships from overseas", ships: "5–10 days", delivers: "10–20 days" };
const localIds = new Set(["tee-black-3pk", "tee-cotton", "tee-black", "laser-green", "laser-kit", "laser-pro"]);

/**
 * Rupak's eligibility labels, tied to the demo's real coupons (see `coupons` below) so labels,
 * cart and checkout agree. eligible = green, not = blue, new = orange.
 */
const ELIGIBLE = { status: "eligible", label: "Eligible for $2 off", detail: "SAVE2: $2 off orders over $20. Applied at checkout with Auto-apply." };
const NOT_ELIGIBLE = { status: "not", label: "Not eligible for discount", detail: "Clearance items are already at their lowest price and are excluded from coupons." };
const NEW_ONLY = { status: "new", label: "New users only", detail: "NEW10: $10 off orders over $60, first order on a new account only." };
const eligibility = { "wrap-cow": NOT_ELIGIBLE, "laser-pro": NOT_ELIGIBLE, "case-duck": NEW_ONLY, "tee-basic": NEW_ONLY, "wrap-chicken": NEW_ONLY };

export const items = products.map((p) => ({
  ...p,
  deal: deals[p.id] ?? { type: "everyday" },
  short: short[p.id] ?? p.name,
  delivery: { ...(localIds.has(p.id) ? LOCAL : OVERSEAS), ...(p.delivery ?? {}) },
  eligibility: eligibility[p.id] ?? ELIGIBLE,
}));
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

/**
 * The deal behind Aniah's QR-code deals banner: on real Temu this kind of offer says "scan with the app".
 * $25 minimum, so with the demo cart ($22.55) checkout shows "add $2.45 more" after it's claimed.
 */
export const webDeal = { code: "APP3", label: "$3 off orders over $25", amount: 3, minOrder: 25 };

export const CATEGORIES = ["Phone cases", "T-shirts", "Tools", "Gift wrap"];
