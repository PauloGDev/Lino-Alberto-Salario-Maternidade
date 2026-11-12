export function Section({ eyebrow, title, children }) { return <section className="section container">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{children}</section>; }
