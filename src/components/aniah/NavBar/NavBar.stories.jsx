import { NavBar } from "./NavBar";
import { items, CATEGORY_TREE } from "../../../data/sample";
export default {
  title: "Aniah/NavBar (draft)", component: NavBar, parameters: { layout: "fullscreen" },
  argTypes: { onSearch: { action: "search" }, onCategory: { action: "category" }, onBestSellers: { action: "bestSellers" }, onFiveStar: { action: "fiveStar" }, onLocal: { action: "local" }, onOpenItem: { action: "openItem" }, onCartClick: { action: "cartClick" } },
};
export const Default = { args: { cartCount: 4, categories: CATEGORY_TREE, recent: items.slice(0, 4) } };
export const NothingViewedYet = { args: { cartCount: 0, categories: CATEGORY_TREE, recent: [] } };
