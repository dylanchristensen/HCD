import { Cart } from "./Cart";
import { cart, byId, swaps, TAX_RATE, ZIP, CITY, DEMO_BUDGET } from "../../../data/sample";
export default {
  title: "Dylan/Cart",
  component: Cart,
  argTypes: { mode: { control: "radio", options: ["popout", "fullscreen"] }, onCheckout: { action: "checkout" }, onSwap: { action: "swap" }, onExpand: { action: "expand" }, onClose: { action: "close" } },
};
const base = { cart, taxRate: TAX_RATE, zip: ZIP, city: CITY, budget: DEMO_BUDGET, swaps, catalog: byId };
/** Demo cart of real Temu items: $22.55 + $2.99 shipping + $1.85 tax = $27.39, against a $25 budget. */
export const Popout = { args: { ...base, mode: "popout" } };
export const Fullscreen = { args: { ...base, mode: "fullscreen" }, parameters: { layout: "fullscreen" } };
export const PopoutUnderBudget = { args: { ...base, budget: 30 } };
export const PopoutNoBudget = { args: { ...base, budget: null } };
export const AllTemuShipped = { args: { ...base, cart: cart.filter((i) => i.shipsFrom === "temu") } };

/** Quantities: two of the tees and three laser levels (3 x $10.63 = $31.89 clears the seller's $30 free-shipping bar). */
export const WithQuantities = { args: { ...base, cart: cart.map((i) => ({ ...i, key: i.id, qty: i.id === "tee-black-3pk" ? 2 : i.id === "laser-green" ? 3 : 1 })) } };
/** Just removed an item: the Undo bar. */
export const JustRemoved = { args: { ...base, cart: cart.slice(1), lastRemoved: { line: cart[0], index: 0 } } };
export const Empty = { args: { ...base, cart: [] } };
export const EmptyFullscreen = { args: { ...base, mode: "fullscreen", cart: [] } };
