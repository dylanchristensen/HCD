import { Orders } from "./Orders";
import { cart, TAX_RATE, ZIP } from "../../../data/sample";
import { cartTotals } from "../../../lib/price";
export default { title: "Dylan/Orders", component: Orders };
const lines = cart.map((i) => ({ ...i, qty: 1, key: i.id }));
const order = { number: "PO-211-04-0193", placedAt: "Nov 2, 2026", zip: ZIP, lines, totals: cartTotals(lines, TAX_RATE), coupon: null };
export const JustPlaced = { args: { orders: [order], justPlaced: true } };
export const NoOrdersYet = { args: { orders: [] } };
