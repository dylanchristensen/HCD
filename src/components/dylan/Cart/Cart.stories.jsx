import { Cart } from "./Cart";
import { cart, byId, swaps, TAX_RATE, ZIP, DEMO_BUDGET } from "../../../data/sample";
export default {
  title: "Dylan/Cart",
  component: Cart,
  argTypes: { mode: { control: "radio", options: ["popout", "fullscreen"] }, onCheckout: { action: "checkout" }, onSwap: { action: "swap" }, onExpand: { action: "expand" }, onClose: { action: "close" } },
};
const base = { cart, taxRate: TAX_RATE, zip: ZIP, budget: DEMO_BUDGET, swaps, catalog: byId };
/** Demo cart of real Temu items: $22.55 + $2.99 shipping + $1.85 tax = $27.39, against a $25 budget. */
export const Popout = { args: { ...base, mode: "popout" } };
export const Fullscreen = { args: { ...base, mode: "fullscreen" }, parameters: { layout: "fullscreen" } };
export const PopoutUnderBudget = { args: { ...base, budget: 30 } };
export const PopoutNoBudget = { args: { ...base, budget: null } };
export const AllTemuShipped = { args: { ...base, cart: cart.filter((i) => i.shipsFrom === "temu") } };
