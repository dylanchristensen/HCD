import { PriceBlock } from "./PriceBlock";
import { byId, cart, TAX_RATE, ZIP, DEMO_BUDGET } from "../../../../data/sample";
export default { title: "Jelani/ProductDetails/PriceBlock", component: PriceBlock };
const base = { taxRate: TAX_RATE, zip: ZIP, cart: cart.filter((c) => c.id !== "laser-green") };
export const SellerShippedOverBudget = { args: { ...base, item: byId["laser-green"], budget: DEMO_BUDGET } };
export const TemuShippedNoBudget = { args: { ...base, item: byId["tee-black-3pk"] } };
export const DealsOff = { args: { ...base, item: byId["laser-green"], budget: DEMO_BUDGET, showDeals: false } };
