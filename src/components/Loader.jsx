import { useEffect, useRef, useState } from "react";

/* Page loader.
   A large serif counter and a thin progress line track real loading work
   (web fonts, the hero photo, and the window load event). It never finishes faster
   than MIN_MS so it doesn't flash, and never waits longer than MAX_MS.
   At 100% the navy screen lifts away with a curved edge and the hero animates in.
   The counter is written straight to the DOM each frame, so React does not re-render. */

const MIN_MS = 1400;
const MAX_MS = 6000;

function trackLoading(onStep) {
  const tasks = [];
  const add = (p) => tasks.push(p.catch(() => {}).then(() => onStep()));
  if (document.fonts?.ready) add(document.fonts.ready);
  add(new Promise((res) => {
    if (document.readyState === "complete") res();
    else window.addEventListener("load", res, { once: true });
  }));
  document.querySelectorAll(".hero img").forEach((img) => {
    add(img.complete ? Promise.resolve() : new Promise((res) => {
      img.addEventListener("load", res, { once: true });
      img.addEventListener("error", res, { once: true });
    }));
  });
  return tasks.length;
}

export default function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("is-loading");
    document.body.style.overflow = "hidden";

    let done = 0;
    const total = trackLoading(() => { done += 1; });
    const start = performance.now();
    let shown = 0, raf = 0, finished = false;
    const timers = [];

    const frame = (now) => {
      const elapsed = now - start;
      const real = total ? done / total : 1;
      // Time sets the pace; until everything has loaded, the counter may not pass
      // the share of work actually done (with a little head start so it never sits at 0).
      const byTime = Math.min(1, elapsed / MIN_MS);
      const allowed = real >= 1 || elapsed > MAX_MS ? 1 : 0.15 + 0.75 * real;
      const target = Math.min(byTime, allowed);
      shown += (target - shown) * 0.12;
      if (target >= 1 && 1 - shown < 0.004) shown = 1;
      const pct = Math.round(shown * 100);
      if (countRef.current) countRef.current.textContent = String(pct).padStart(2, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      if (shown >= 1 && !finished) {
        finished = true;
        timers.push(setTimeout(() => {
          setLeaving(true);
          html.classList.remove("is-loading");
          document.body.style.overflow = "";
        }, 250));
        timers.push(setTimeout(onDone, 250 + 1000));
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      html.classList.remove("is-loading");
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <div className={`loader${leaving ? " is-leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loader-inner">
        <div className="loader-top">
          <span className="loader-name">Tushar Chauhan</span>
          <span className="loader-role">Full-Stack Developer</span>
        </div>
        <div className="loader-bottom">
          <p className="loader-count">
            <span ref={countRef}>00</span>
            <sup>%</sup>
          </p>
          <p className="loader-note">Loading portfolio</p>
        </div>
        <div className="loader-track" aria-hidden="true">
          <span className="loader-bar" ref={barRef} />
        </div>
      </div>
    </div>
  );
}
