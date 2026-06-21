import { useState, useEffect, useRef } from "react";
import { PROFILE, STATS, NOW } from "../data/content";
import Backdrop from "../components/Backdrop";
import Globe3D from "../components/Globe3D";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function TypeRole({ words }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  const reduce = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    if (reduce.current) { setText(words[0]); return; }
    const full = words[i % words.length];
    let t;
    if (!del && text === full) t = setTimeout(() => setDel(true), 1600);
    else if (del && text === "") { setDel(false); setI((p) => (p + 1) % words.length); }
    else t = setTimeout(() => setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)), del ? 45 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <span className="type-role">{text}<span className="caret" aria-hidden="true" /></span>;
}

function Hero() {
  const heroRef = useRef(null);

  // mouse parallax → tilt the globe + shift the headline (3D depth)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(-py * 16).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(px * 20).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(px * 18).toFixed(1)}px`);
        el.style.setProperty("--my", `${(py * 12).toFixed(1)}px`);
        raf = 0;
      });
    };
    const reset = () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px"); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", reset); };
  }, []);

  return (
    <>
      <header className="hero" id="top" ref={heroRef}>
        <Backdrop />

        <div className="hero-cover wrap">
          <div className="masthead reveal">
            <span><span className="accent">{PROFILE.volume}</span> · {PROFILE.year}</span>
            <span className="masthead-mid">The Field Notes — Portfolio</span>
            <span>{PROFILE.location}</span>
          </div>

          <div className="cover">
            <div className="cover-left" style={{ transform: "translate(var(--mx,0), var(--my,0))" }}>
              <p className="cover-kicker reveal">Software Developer · {PROFILE.location}</p>
              <h1 className="hero-name reveal">Tushar<br /><em>Chauhan</em></h1>
              <div className="hero-role reveal"><TypeRole words={PROFILE.roleRotation} /></div>
              <p className="hero-desc reveal">{PROFILE.tagline}</p>
              <div className="hero-cta reveal">
                <button className="btn btn-solid" onClick={() => go("build-log")}>View the work</button>
                <button className="btn btn-ghost" onClick={() => go("signal")}>Get in touch</button>
              </div>
            </div>

            <div className="cover-aside reveal" aria-hidden="true">
              <span className="globe-glow" />
              <Globe3D count={52} radius={200} />
            </div>
          </div>

          <button className="scroll-cue reveal" onClick={() => go("ledger")} aria-label="Scroll down">
            <span>Scroll</span><span className="scroll-line" />
          </button>
        </div>
      </header>

      <section className="ledger" id="ledger">
        <div className="wrap">
          <div className="hero-stats stagger">
            {STATS.map((s) => (
              <div className="cell" key={s.label}>
                <div className="val">{s.value}</div>
                <div className="lab">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="now stagger">
            {NOW.map((n) => (
              <div className="item" key={n.kicker}>
                <div className="k">{n.kicker}</div>
                <div className="t">{n.title}</div>
                <div className="n">{n.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
