import { Cart } from "./Cart";
import { cart, TAX_RATE, ZIP } from "../../../data/sample";
export default {
  title: "Dylan/Cart",
  component: Cart,
  argTypes: { mode: { control: "radio", options: ["popout", "fullscreen"] }, onCheckout: { action: "checkout" }, onSwaps: { action: "swaps" }, onExpand: { action: "expand" }, onClose: { action: "close" } },
};
const base = { cart, taxRate: TAX_RATE, zip: ZIP, budget: 30 };
/** D-1's real cart: $22.16 + $6.00 + $2.31 = $30.47, against a $30 budget. */
export const Popout = { args: { ...base, mode: "popout" } };
export const Fullscreen = { args: { ...base, mode: "fullscreen" }, parameters: { layout: "fullscreen" } };
export const PopoutUnderBudget = { args: { ...base, budget: 40 } };
export const PopoutNoBudget = { args: { ...base, budget: null } };
export const AllTemuShipped = { args: { ...base, cart: cart.filter((i) => i.shipsFrom === "temu") } };
