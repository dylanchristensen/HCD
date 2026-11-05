import { ProductCard } from "./ProductCard";
import { items, byId } from "../../../data/sample";

/** States of Rupak's final product card (reference/concepts/rupak-final-search.png). */
export default {
  title: "Rupak/ProductCard", component: ProductCard,
  decorators: [(S) => <div style={{ width: 230 }}><S /></div>],
  argTypes: { onOpen: { action: "open" }, onAdd: { action: "add to cart" } },
};
const offer = items.find((i) => i.checkoutOffer);
const hot = items.find((i) => i.soldToday && !i.checkoutOffer);
const both = items.find((i) => i.soldToday && i.checkoutOffer) ?? offer;

export const TwentyPercentAtCheckout = { args: { item: offer, onAdd: () => {} } };
export const SoldInLast24Hours = { args: { item: hot, onAdd: () => {} } };
export const BothBadges = { args: { item: both, onAdd: () => {} } };
export const LocalWarehouse = { args: { item: byId["laser-green"], onAdd: () => {} } };
export const ShipsFromOverseas = { args: { item: byId["wrap-fish"], onAdd: () => {} } };
/** Shopper turned deals off at onboarding: the sold badge hides; the 20% ribbon stays because it changes the price. */
export const DealsTurnedOff = { args: { item: both, showDeals: false, onAdd: () => {} } };
