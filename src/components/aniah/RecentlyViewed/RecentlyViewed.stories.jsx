import { RecentlyViewed } from "./RecentlyViewed";
import { items } from "../../../data/sample";
export default { title: "Aniah/RecentlyViewed (draft)", component: RecentlyViewed, argTypes: { onOpen: { action: "open" } } };
export const Strip = { args: { items: items.slice(0, 6) } };
export const NavMenu = { args: { items: items.slice(0, 4), compact: true }, decorators: [(S) => <div style={{ width: 300 }}><S /></div>] };
export const Empty = { args: { items: [] } };
