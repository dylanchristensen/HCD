import { SearchResults } from "./SearchResults";
import { items } from "../../../data/sample";
export default { title: "Rupak/SearchResults", component: SearchResults };
export const Default = { args: { items } };
export const DealsOff = { args: { items, showDeals: false } };
