import { EligibilityLabel } from "./EligibilityLabel";
export default { title: "Rupak/EligibilityLabel", component: EligibilityLabel };
export const Eligible = { args: { eligible: true } };
export const NotEligible = { args: { eligible: false, reason: "Requires $60 order" } };
