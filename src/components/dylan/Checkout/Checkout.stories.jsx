import { Checkout } from "./Checkout";
import { cart, coupons, TAX_RATE, ZIP, DEMO_BUDGET } from "../../../data/sample";
export default { title: "Dylan/Checkout", component: Checkout, argTypes: { onPlaceOrder: { action: "placeOrder" } } };
const base = { cart, taxRate: TAX_RATE, zip: ZIP, budget: DEMO_BUDGET, coupons };
/** Before: the auto-apply button offers the one coupon this $22.55 cart qualifies for (SAVE2). */
export const CouponAvailable = { args: base };
/** After: SAVE2 applied, total drops from $27.39 to $25.25. NEW10 (Temu's real $10-over-$60 offer) shows what it would take. */
export const CouponApplied = { args: { ...base, defaultApplied: true } };
export const NoCoupons = { args: { ...base, coupons: [] } };
