import { SearchResults } from "./SearchResults";
import { items } from "../../../data/sample";
export default { title: "Rupak/SearchResults", component: SearchResults };
export const PhoneCases = { args: { query: "phone case", items: items.filter((i) => i.category === "Phone cases") } };
export const AllDemoItems = { args: { query: "gifts", items } };
export const DealsOff = { args: { query: "phone case", items: items.filter((i) => i.category === "Phone cases"), showDeals: false } };
