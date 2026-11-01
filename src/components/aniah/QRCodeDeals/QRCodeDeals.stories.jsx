import { QRCodeDeals } from "./QRCodeDeals";
import { webDeal } from "../../../data/sample";
export default { title: "Aniah/QRCodeDeals (draft)", component: QRCodeDeals, argTypes: { onClaim: { action: "claim" } } };
export const Web = { args: { coupon: webDeal, platform: "web" } };
export const Mobile = { args: { coupon: webDeal, platform: "mobile" } };
export const Claimed = { args: { coupon: webDeal, claimed: true } };
