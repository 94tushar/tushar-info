import { useState, useEffect } from "react";
import Globe3D from "./Globe3D";
import { PROFILE } from "../data/content";

/** Intro loader with the 3D constellation globe + animated progress. */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 13 + 5);
      setPct(Math.round(v));
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setOut(true), 350);
        setTimeout(() => onDone && onDone(), 950);
      }
    }, 110);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className={`loader ${out ? "out" : ""}`}>
      <div className="loader-3d">
        <Globe3D count={34} radius={92} />
      </div>
      <div className="loader-name">{PROFILE.name}</div>
      <div className="loader-role">{PROFILE.role}</div>
      <div className="loader-bar"><span style={{ width: `${pct}%` }} /></div>
      <div className="loader-pct">{String(pct).padStart(3, "0")} / 100</div>
    </div>
  );
}

export default Loader;
