import { SearchResults } from "./SearchResults";
import { items } from "../../../data/sample";
export default { title: "Rupak/SearchResults", component: SearchResults, parameters: { layout: "fullscreen" }, decorators: [(S) => <div style={{ padding: 24 }}><S /></div>] };
export const AllDemoItems = { args: { query: "Recommended for you", items } };
export const Tools = { args: { query: "Tools", items: items.filter((i) => i.category === "Tools") } };
