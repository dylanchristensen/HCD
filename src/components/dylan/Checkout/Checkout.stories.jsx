import { Checkout } from "./Checkout";
import { cart, coupons, TAX_RATE, ZIP, DEMO_BUDGET } from "../../../data/sample";
export default { title: "Dylan/Checkout", component: Checkout, argTypes: { onPlaceOrder: { action: "placeOrder" } } };
const base = { cart, taxRate: TAX_RATE, zip: ZIP, budget: DEMO_BUDGET, coupons };
/** Opens with the best coupon applied automatically (Rupak's final design): SAVE2 takes $27.39 to $25.25. Remove is one click. */
export const AppliedAutomatically = { args: base };
/** After the shopper clicks Remove: one button puts the best coupon back. */
export const ShopperRemovedIt = { args: { ...base, autoApply: false } };
export const NoCoupons = { args: { ...base, coupons: [] } };
