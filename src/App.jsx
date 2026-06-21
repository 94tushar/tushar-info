import { useState, useEffect, useRef } from "react";
import "./styles/editorial.css";

import Loader from "./components/Loader";
import Navbar from "./components/navbar";
import SectionRail from "./components/SectionRail";
import Marquee from "./components/Marquee";
import Hero from "./sections/Hero";
import Background from "./sections/Background";
import Philosophy from "./sections/Philosophy";
import Experience from "./sections/Experience";
import BuildLog from "./sections/BuildLog";
import Toolkit from "./sections/Toolkit";
import Resume from "./sections/Resume";
import Signal from "./sections/Signal";
import { PROFILE } from "./data/content";

function App() {
  const [theme, setTheme] = useState("night");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const cursorRef = useRef(null);

  // lock scroll while the intro loader is up
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  // apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "day" ? "#faf7f0" : "#0f0c09");
  }, [theme]);

  // scroll reveal (handles .reveal, .stagger, .mask-reveal)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .stagger, .mask-reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // scroll progress + parallax driver
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
        h.style.setProperty("--sy", String(h.scrollTop));
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // custom cursor glow (pointer devices only)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");
    const el = cursorRef.current;
    let raf = 0, x = 0, y = 0;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (el) el.style.transform = `translate(${x}px, ${y}px)`;
        raf = 0;
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); document.body.classList.remove("has-cursor"); };
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const toggle = () => setTheme((t) => (t === "day" ? "night" : "day"));

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Navbar theme={theme} onToggle={toggle} />
      <SectionRail />

      <main>
        <Hero />
        <Marquee />
        <Background />
        <Philosophy />
        <Experience />
        <BuildLog />
        <Marquee />
        <Toolkit />
        <Resume />
        <Signal />
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</span>
        <span className="foot-top" onClick={() => go("top")}>Back to top ↑</span>
        <span>{PROFILE.volume} · {PROFILE.year}</span>
      </footer>
    </>
  );
}

export default App;
