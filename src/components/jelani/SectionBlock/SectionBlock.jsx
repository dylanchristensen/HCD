/**
 * Owner: Jelani. Starter stub; replace freely.
 * Idea (from our ideation session): Deeper and darker lines to separate categories, bolder fonts to draw the eye to important information, organizing sections and making the site look less "sketchy".
 */
export function SectionBlock({ title = "Clearance", children = "Products go here" }) {
  return (
    <section className="ui-stub">
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div>{children}</div>
      <div>TODO (Jelani): hierarchy rules for headers, dividers, spacing.</div>
    </section>
  );
}
