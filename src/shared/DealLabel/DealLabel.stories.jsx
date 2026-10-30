import { DealLabel } from "./DealLabel";
export default { title: "Shared/DealLabel", component: DealLabel };
export const Lightning = { args: { deal: { type: "lightning", endsAt: "Tue 3:00 pm", regularPrice: 12.5 } } };
export const LightningDetailed = { args: { ...Lightning.args, detailed: true } };
export const Clearance = { args: { deal: { type: "clearance", left: 12 } } };
export const Everyday = { args: { deal: { type: "everyday" } } };
export const DealsTurnedOff = { args: { ...Lightning.args, showDeals: false } };
