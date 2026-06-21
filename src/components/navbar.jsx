import { useState, useEffect } from "react";
import { NAV, PROFILE } from "../data/content";
import CelestialToggle from "./CelestialToggle";

function Navbar({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [first, ...rest] = PROFILE.name.split(" ");
  const last = rest.join(" ");

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-brand" onClick={() => go("top")}>
        {first} <span>{last}</span>
      </div>

      <ul className="nav-links">
        {NAV.map((n) => (
          <li key={n.id} onClick={() => go(n.id)}>
            <b>{n.num}</b>
            {n.label}
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <CelestialToggle theme={theme} onToggle={onToggle} />
        <button className="btn-hire" onClick={() => go("signal")}>
          Get in touch
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
