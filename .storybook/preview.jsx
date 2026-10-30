import "../src/theme/tokens.css";
import "../src/shared/shared.css";

/** Theme switcher in the Storybook toolbar: wireframe while designing, temu for the final coat of paint. */
export const globalTypes = {
  theme: {
    description: "Visual theme",
    defaultValue: "wireframe",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "wireframe", title: "Wireframe" },
        { value: "temu", title: "Temu skin" },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => (
    <div data-theme={context.globals.theme} className="theme-root">
      <Story />
    </div>
  ),
];

export const parameters = {
  layout: "padded",
  controls: { expanded: true },
};
