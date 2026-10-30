import { OnboardingSplash } from "./OnboardingSplash";
export default {
  title: "Dylan/OnboardingSplash",
  component: OnboardingSplash,
  parameters: { layout: "fullscreen" },
  argTypes: { onDone: { action: "done" } },
  decorators: [(Story) => <div style={{ minHeight: 640, background: "var(--color-surface)" }}><Story /></div>],
};
export const FirstOpen = {};
export const Filled = { args: { defaultZip: "28223", defaultBudget: "30" } };
