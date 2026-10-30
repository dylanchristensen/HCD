import { ProductDetails } from "./ProductDetails";
import { items, cart, TAX_RATE, ZIP } from "../../../data/sample";
export default { title: "Jelani/ProductDetails", component: ProductDetails, argTypes: { onAddToCart: { action: "addToCart" } } };
export const Default = { args: { item: items[2], taxRate: TAX_RATE, zip: ZIP, cart: cart.filter((c) => c.id !== "level"), budget: 30 } };
