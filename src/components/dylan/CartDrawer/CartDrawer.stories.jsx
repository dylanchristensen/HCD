import { CartDrawer } from "./CartDrawer";
import { cart, TAX_RATE, ZIP } from "../../../data/sample";
export default { title: "Dylan/CartDrawer", component: CartDrawer, argTypes: { onCheckout: { action: "checkout" }, onSwaps: { action: "swaps" } } };
const base = { cart, taxRate: TAX_RATE, zip: ZIP };
/** Reproduces D-1's real cart: $22.16 + $6.00 + $2.31 = $30.47. */
export const OverBudget = { args: { ...base, budget: 30 } };
export const UnderBudget = { args: { ...base, budget: 40 } };
export const NoBudget = { args: base };
export const AllTemuShipped = { args: { ...base, cart: cart.filter((i) => i.shipsFrom === "temu"), budget: 30 } };
