import { NavBar } from "./NavBar";
import { items } from "../../../data/sample";
export default {
  title: "Aniah/NavBar (draft)", component: NavBar, parameters: { layout: "fullscreen" },
  argTypes: { onSearch: { action: "search" }, onCategory: { action: "category" }, onDeals: { action: "deals" }, onOpenItem: { action: "openItem" }, onCartClick: { action: "cartClick" } },
  decorators: [(S) => <div style={{ minHeight: 420 }}><S /></div>],
};
export const Default = { args: { cartCount: 4, categories: ["Phone cases", "T-shirts", "Tools", "Gift wrap"], recent: items.slice(0, 4) } };
export const NothingViewedYet = { args: { cartCount: 0, categories: ["Phone cases", "T-shirts", "Tools", "Gift wrap"], recent: [] } };
