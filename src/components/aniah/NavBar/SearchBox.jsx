import { useMemo, useRef, useState } from "react";
import { imageProps } from "../../../data/products";

/**
 * Search box matched to real Temu's (checked on temu.com, Nov 5, 2026):
 *  - the placeholder is a suggested search; searching with the box empty searches for it
 *  - focused while empty: "Recently searched (?)" as chips with "More", then "Popular right now" as chips,
 *    each with a small product picture and an orange arrow on the trending ones
 *  - while typing: up to 12 suggested searches with a magnifier; what you typed stays normal, the rest is bold
 * Keyboard: Up/Down to move, Enter to search, Escape to close.
 * Props: searches (phrases to suggest), popular (Temu's "Popular right now"), items (for chip pictures), recent.
 */
export function SearchBox({ searches = [], popular = [], items = [], recent = [], placeholder = "wrapping paper christmas",
  onSearch = () => {} }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [moreRecent, setMoreRecent] = useState(false);
  const input = useRef(null);

  const t = q.trim().toLowerCase();
  const typed = useMemo(() => {
    if (!t) return [];
    const all = [...new Set(searches.map((s) => s.toLowerCase()))];
    const starts = all.filter((s) => s.startsWith(t));
    const words = all.filter((s) => !s.startsWith(t) && s.split(/[^a-z0-9]+/).some((w) => w.startsWith(t)));
    return [...starts.sort((a, b) => a.length - b.length), ...words.sort((a, b) => a.length - b.length)].slice(0, 12);
  }, [t, searches]);
  const picFor = useMemo(() => {
    const m = {};
    for (const p of popular) {
      const ws = p.toLowerCase().split(/\s+/).map((w) => w.replace(/s$/, ""));
      m[p] = items.find((i) => ws.every((w) => i.name.toLowerCase().includes(w))) ?? items.find((i) => i.name.toLowerCase().includes(ws[0]));
    }
    return m;
  }, [popular, items]);

  const go = (text) => { const v = text.trim() || placeholder; setQ(v); onSearch(v); setOpen(false); setActive(-1); input.current?.blur(); };
  const submit = (e) => { e.preventDefault(); go(active >= 0 && typed[active] ? typed[active] : q); };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, typed.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Escape") { setOpen(false); setActive(-1); }
  };
  // Temu bolds the completion, not what you typed.
  const completion = (s) => (s.startsWith(t) ? <>{s.slice(0, t.length)}<b>{s.slice(t.length)}</b></> : <b>{s}</b>);
  const shownRecent = moreRecent ? recent : recent.slice(0, 10);

  return (
    <form className="nav-search" onSubmit={submit} role="search">
      <input ref={input} value={q} placeholder={placeholder} aria-label="Search" autoComplete="off"
        role="combobox" aria-expanded={open} aria-controls="search-suggest" aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `sugg-${active}` : undefined}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)} onKeyDown={onKey} />
      {q && <button type="button" className="nav-search-clear" aria-label="Clear search" onMouseDown={(e) => e.preventDefault()} onClick={() => { setQ(""); input.current?.focus(); }}>✕</button>}
      <button type="submit" aria-label="Search">🔍</button>
      {open && (t ? typed.length > 0 : recent.length + popular.length > 0) && (
        <div className="nav-suggest" id="search-suggest" onMouseDown={(e) => e.preventDefault()}>
          {t ? (
            <ul role="listbox" className="nav-suggest-list">
              {typed.map((s, n) => (
                <li key={s} id={`sugg-${n}`} role="option" aria-selected={n === active}>
                  <button type="button" className={n === active ? "is-on" : ""} onMouseEnter={() => setActive(n)} onClick={() => go(s)}>
                    <span className="nav-suggest-icon" aria-hidden>⌕</span><span className="nav-suggest-text">{completion(s)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {recent.length > 0 && (
                <section className="nav-suggest-sec">
                  <div className="nav-suggest-head">Recently searched <span className="nav-suggest-q" title="Your search history is stored for up to 90 days.">?</span></div>
                  <div className="nav-chips">
                    {shownRecent.map((s) => <button type="button" key={s} className="nav-chip" onClick={() => go(s)}>{s}</button>)}
                    {recent.length > 10 && <button type="button" className="nav-chip-more" onClick={() => setMoreRecent((m) => !m)}>{moreRecent ? "Less" : "More"}</button>}
                  </div>
                </section>
              )}
              {popular.length > 0 && (
                <section className="nav-suggest-sec">
                  <div className="nav-suggest-head">Popular right now</div>
                  <div className="nav-chips">
                    {popular.map((s, n) => (
                      <button type="button" key={s} className="nav-chip" onClick={() => go(s)}>
                        {picFor[s] && <span className="nav-chip-pic"><img {...imageProps(picFor[s])} alt="" /></span>}
                        {n < 3 && <span className="nav-chip-up" aria-label="trending">↑</span>}
                        {s}
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}
    </form>
  );
}
