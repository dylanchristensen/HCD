import { Checkout } from "./Checkout";
import { cart, coupons, TAX_RATE, ZIP } from "../../../data/sample";
export default { title: "Dylan/Checkout", component: Checkout, argTypes: { onPlaceOrder: { action: "placeOrder" } } };
const base = { cart, taxRate: TAX_RATE, zip: ZIP, budget: 30, coupons };
/** Before: the auto-apply button offers the one coupon this $22.16 cart qualifies for. */
export const CouponAvailable = { args: base };
/** After: SAVE3 applied, total drops from $30.47 to $27.22, back under the $30 budget. */
export const CouponApplied = { args: { ...base, defaultApplied: true } };
export const NoCoupons = { args: { ...base, coupons: [] } };
