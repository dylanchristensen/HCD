/** Small building blocks shared by everyone. Keep them dumb: no business logic here. */
export function Button({ variant = "primary", children, ...props }) {
  return <button className={`ui-btn ui-btn--${variant}`} {...props}>{children}</button>;
}

export function Pill({ filled = false, children }) {
  return <span className={`ui-pill${filled ? " ui-pill--filled" : ""}`}>{children}</span>;
}

export function Card({ children, style }) {
  return <div className="ui-card" style={style}>{children}</div>;
}

/** Placeholder box for parts a teammate hasn't designed yet. */
export function Stub({ children }) {
  return <div className="ui-stub">{children}</div>;
}
