import { EligibilityLabel } from "./EligibilityLabel";
import { byId } from "../../../data/sample";
export default { title: "Rupak/EligibilityLabel", component: EligibilityLabel, decorators: [(S) => <div style={{ paddingBottom: 90 }}><S /></div>] };
export const Eligible = { args: { eligibility: byId["case-polka"].eligibility } };
export const NotEligible = { args: { eligibility: byId["wrap-cow"].eligibility } };
export const NewUsersOnly = { args: { eligibility: byId["case-duck"].eligibility } };
