import { FirstVisitCard } from "./FirstVisitCard";
export default { title: "Dylan/FirstVisitCard", component: FirstVisitCard, argTypes: { onDone: { action: "done" } } };
export const Empty = {};
export const Filled = { args: { defaultZip: "28223", defaultBudget: "30" } };
