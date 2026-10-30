import { ProductDetails } from "./ProductDetails";
import { byId } from "../../../data/sample";
export default {
  title: "Jelani/ProductDetails",
  component: ProductDetails,
  parameters: { layout: "fullscreen" },
  argTypes: { onAddToCart: { action: "addToCart" } },
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};
/** The demo's laser level, with Temu's real gallery, reviews, guarantees and seller shipping rule. */
export const LaserLevel = { args: { item: byId["laser-green"] } };
/** A Temu-shipped item with no sale and less detail, to check the plain states. */
export const PlainItem = { args: { item: byId["tee-cotton"] } };
