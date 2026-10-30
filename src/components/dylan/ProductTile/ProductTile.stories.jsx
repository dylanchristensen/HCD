import { ProductTile } from "./ProductTile";
import { items } from "../../../data/sample";
export default { title: "Dylan/ProductTile", component: ProductTile };
export const TemuShipped = { args: { item: items[0] } };
export const SellerShipped = { args: { item: items[3] } };
export const DealsOff = { args: { item: items[0], showDeals: false } };
export const ResultsRow = {
  render: () => <div style={{ display: "flex", gap: 16 }}>{items.map((i) => <ProductTile key={i.id} item={i} />)}</div>,
};
