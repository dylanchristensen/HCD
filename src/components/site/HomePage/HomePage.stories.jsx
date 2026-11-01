import { HomePage } from "./HomePage";
import { items, INTEREST_CHIPS } from "../../../data/sample";
export default { title: "Site/HomePage", component: HomePage, parameters: { layout: "fullscreen" },
  argTypes: { onOpen: { action: "open" }, onSeeDeals: { action: "seeDeals" }, onCategory: { action: "category" } } };
export const Default = { args: { items, interests: INTEREST_CHIPS, showDeals: true } };
export const DealsTurnedOff = { args: { items, interests: INTEREST_CHIPS, showDeals: false } };
