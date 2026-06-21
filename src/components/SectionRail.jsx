import { useState, useEffect } from "react";
import { NAV } from "../data/content";

function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="rail" aria-label="Section navigation">
      {NAV.map((n) => (
        <button
          key={n.id}
          className={`rail-dot ${active === n.id ? "active" : ""}`}
          onClick={() => go(n.id)}
          aria-label={`${n.num} ${n.label}`}
          aria-current={active === n.id ? "true" : undefined}
        >
          <span className="rail-num">{n.num}</span>
          <span className="rail-mark" />
          <span className="rail-label">{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default SectionRail;
