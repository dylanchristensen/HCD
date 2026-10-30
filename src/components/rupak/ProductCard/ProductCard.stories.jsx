import { ProductCard } from "./ProductCard";
import { byId } from "../../../data/sample";
export default { title: "Rupak/ProductCard", component: ProductCard, decorators: [(S) => <div style={{ width: 220, paddingBottom: 90 }}><S /></div>] };
export const LocalAndEligible = { args: { item: byId["laser-green"] } };
export const OverseasAndEligible = { args: { item: byId["case-polka"] } };
export const NotEligible = { args: { item: byId["wrap-cow"] } };
export const NewUsersOnly = { args: { item: byId["case-duck"] } };
