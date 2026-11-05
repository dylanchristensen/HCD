import { CouponPopup } from "./CouponPopup";
import { webDeal } from "../../../data/sample";
export default { title: "Aniah/CouponPopup", component: CouponPopup, parameters: { layout: "fullscreen" }, argTypes: { onClaim: { action: "claim" }, onClose: { action: "close" } } };
export const Web = { args: { coupon: webDeal, variant: "web" } };
export const Mobile = { args: { coupon: webDeal, variant: "mobile" }, parameters: { viewport: { defaultViewport: "mobile1" } } };
