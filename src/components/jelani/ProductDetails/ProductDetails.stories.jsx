import { ProductDetails } from "./ProductDetails";
import { byId, cart, TAX_RATE, ZIP, DEMO_BUDGET } from "../../../data/sample";
export default { title: "Jelani/ProductDetails", component: ProductDetails, argTypes: { onAddToCart: { action: "addToCart" } } };
const base = { taxRate: TAX_RATE, zip: ZIP, budget: DEMO_BUDGET, cart: cart.filter((c) => c.id !== "laser-green") };
/** The demo's laser level, with Temu's real gallery and seller shipping rule. */
export const LaserLevel = { args: { ...base, item: byId["laser-green"] } };
export const PhoneCase = { args: { ...base, item: byId["case-polka"] } };
