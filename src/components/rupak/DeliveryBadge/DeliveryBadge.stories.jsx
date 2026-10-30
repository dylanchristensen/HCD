import { DeliveryBadge } from "./DeliveryBadge";
import { byId } from "../../../data/sample";
export default { title: "Rupak/DeliveryBadge", component: DeliveryBadge };
export const Local = { args: { delivery: byId["tee-black-3pk"].delivery } };
export const Overseas = { args: { delivery: byId["case-polka"].delivery } };
export const LocalInCart = { args: { delivery: byId["laser-green"].delivery, variant: "cart" } };
export const OverseasInCart = { args: { delivery: byId["case-polka"].delivery, variant: "cart" } };
