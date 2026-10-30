import { ProductTile } from "./ProductTile";
import { items, byId } from "../../../../data/sample";
export default { title: "Rupak/SearchResults/ProductTile", component: ProductTile };
export const TemuShipped = { args: { item: byId["case-polka"] } };
export const SellerShipped = { args: { item: byId["laser-green"] } };
export const DealsOff = { args: { item: byId["case-polka"], showDeals: false } };
export const ResultsRow = {
  render: () => <div style={{ display: "flex", gap: 16 }}>{items.slice(0, 6).map((i) => <ProductTile key={i.id} item={i} />)}</div>,
};
