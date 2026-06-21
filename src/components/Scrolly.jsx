import { useEffect, useRef, useState } from "react";

/**
 * Pinned scrollytelling section.
 * Each chapter is a tall two-column step: text on one side, a STICKY visual on
 * the other that stays centred while you read, then releases as the next chapter
 * arrives. A scroll observer marks the current chapter (focus dimming + rail).
 *
 * props: id, num, eyebrow, title (node)
 *   chapters: [{ key, num, left, stage, tint? }]
 *   compact:  shorter steps (lists like the toolkit)
 *   stageSide: "right" (default) | "left"
 */
function Scrolly({ id, num, eyebrow, title, chapters, compact = false, stageSide = "right" }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((e) => {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
        });
        if (best) {
          const idx = Number(best.target.dataset.step);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters.length]);

  return (
    <section
      className={`section scrolly ${compact ? "compact" : ""} stage-${stageSide}`}
      id={id}
      data-active={active}
    >
      <div className="wrap">
        <p className="eyebrow reveal">
          <span className="num">{num}</span> {eyebrow}
        </p>
        <h2 className="section-title mask-reveal">{title}</h2>

        <div className="scrolly-track">
          {chapters.map((c, i) => (
            <div
              key={c.key}
              className={`scrolly-step ${active === i ? "current" : ""}`}
              data-step={i}
              ref={(el) => (stepRefs.current[i] = el)}
            >
              <div className="step-body">
                <span className="step-index" aria-hidden="true">{c.num}</span>
                <span className="step-tag" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                </span>
                {c.left}
              </div>
              <div className="step-stage" aria-hidden="true">
                <div className="step-stage-pin" style={c.tint ? { "--tint": c.tint } : undefined}>
                  {c.stage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Scrolly;
