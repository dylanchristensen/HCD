import { PriceBlock } from "./PriceBlock";
import { items, cart, TAX_RATE, ZIP } from "../../../data/sample";
export default { title: "Dylan/PriceBlock", component: PriceBlock };
const base = { taxRate: TAX_RATE, zip: ZIP, cart: cart.filter((c) => c.id !== "level") };
export const SellerShippedOverBudget = { args: { ...base, item: items[2], budget: 30 } };
export const TemuShippedNoBudget = { args: { ...base, item: items[1] } };
export const DealsOff = { args: { ...base, item: items[2], budget: 30, showDeals: false } };
