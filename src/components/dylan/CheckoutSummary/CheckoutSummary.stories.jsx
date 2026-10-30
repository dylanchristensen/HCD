import { CheckoutSummary } from "./CheckoutSummary";
import { cart, TAX_RATE, ZIP } from "../../../data/sample";
export default { title: "Dylan/CheckoutSummary", component: CheckoutSummary, argTypes: { onPlaceOrder: { action: "placeOrder" } } };
export const WentOverBudget = { args: { cart, taxRate: TAX_RATE, zip: ZIP, budget: 30 } };
export const NoBudget = { args: { cart, taxRate: TAX_RATE, zip: ZIP } };
