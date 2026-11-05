import { SearchResults } from "./SearchResults";
import { items } from "../../../data/sample";
export default { title: "Rupak/SearchResults", component: SearchResults, parameters: { layout: "fullscreen" }, decorators: [(S) => <div style={{ padding: 24 }}><S /></div>],
  argTypes: { onOpen: { action: "open" }, onAdd: { action: "add to cart" } } };
export const Christmas = { args: { query: "Results for \"christmas\"", items: items.filter((i) => /christmas/i.test(i.name)), onAdd: () => {} } };
export const LaserLevels = { args: { query: "Measuring & Layout Tools", items: items.filter((i) => i.sub === "Measuring & Layout Tools"), onAdd: () => {} } };
export const NoResults = { args: { query: "Results for \"xyz\"", items: [] } };
