import { useEffect, useRef } from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/* Heading that slides up out of a mask when it scrolls into view. */
export function Title({ children }) {
  return (
    <h2 className="reveal mask">
      <span>{children}</span>
    </h2>
  );
}

/* Runs a callback every frame, but only while the element is actually visible:
   on screen, not covered by a later slide, and the tab is in front.
   The element's size is measured once and on resize, never inside the frame loop. */
function useVisibleLoop(ref, tick) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const panel = el.closest("[data-panel]");
    const size = { w: el.offsetWidth, h: el.offsetHeight };
    let raf = 0, onScreen = false, last = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (panel && panel.dataset.covered) { last = now; return; }
      tick(Math.min(now - last, 50), size);
      last = now;
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); }
    };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
    const ro = new ResizeObserver(() => { size.w = el.offsetWidth; size.h = el.offsetHeight; });
    io.observe(el);
    ro.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", sync); cancelAnimationFrame(raf); };
    // tick is stable by contract (defined from refs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* Hero photo in an arch, tilting toward the pointer, with tech chips orbiting it in 3D. */
export function HeroOrbit({ photo, alt, chips }) {
  const wrap = useRef(null);
  const arch = useRef(null);
  const chipRefs = useRef([]);
  const state = useRef({ t: 0, rx: 0, ry: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el || !finePointer()) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      state.current.ty = ((e.clientX - r.left) / r.width - 0.5) * 16;
      state.current.tx = -((e.clientY - r.top) / r.height - 0.5) * 12;
    };
    const leave = () => { state.current.tx = 0; state.current.ty = 0; };
    window.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);

  useVisibleLoop(wrap, (dt, size) => {
    const s = state.current;
    if (!reduced()) s.t += dt * 0.00035;
    s.rx += (s.tx - s.rx) * 0.08;
    s.ry += (s.ty - s.ry) * 0.08;
    if (arch.current && (Math.abs(s.tx - s.rx) > 0.01 || Math.abs(s.ty - s.ry) > 0.01)) {
      arch.current.style.transform = `rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
    }
    const w = size.w || 400;
    const h = size.h || 500;
    const rx = Math.min(w * 0.52, window.innerWidth / 2 - 56), ry = h * 0.1;
    const n = chipRefs.current.length;
    chipRefs.current.forEach((c, i) => {
      if (!c) return;
      const a = s.t * Math.PI * 2 + (i / n) * Math.PI * 2;
      const depth = Math.sin(a);
      const x = Math.cos(a) * rx;
      const y = depth * ry + (i % 2 ? 1 : -1) * h * 0.12 + s.rx * 2;
      const scale = 0.78 + (depth + 1) * 0.17;
      c.style.transform = `translate(-50%, -50%) translate3d(${(x + s.ry * 1.5).toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      c.style.opacity = (0.45 + (depth + 1) * 0.275).toFixed(2);
      const front = depth > 0 ? "3" : "1";
      if (c.dataset.z !== front) { c.dataset.z = front; c.style.zIndex = front; }
    });
  });

  return (
    <div className="hero-photo reveal">
    <div className="orbit-wrap" ref={wrap}>
      <div className="arch arch-3d" ref={arch}>
        <img src={photo} alt={alt} decoding="async" fetchPriority="high" />
        <span className="arch-glare" aria-hidden="true" />
      </div>
      <div className="orbit" aria-hidden="true">
        {chips.map((c, i) => (
          <span key={c} className="orbit-chip" ref={(el) => (chipRefs.current[i] = el)}>{c}</span>
        ))}
      </div>
    </div>
    </div>
  );
}

/* Draggable 3D sphere of skill tags. */
export function SkillSphere({ tags }) {
  const box = useRef(null);
  const tagRefs = useRef([]);
  const st = useRef({ ax: -0.25, ay: 0, vx: 0, vy: 0.0035, drag: null, hover: false });

  const points = useRef(
    tags.map((_, i) => {
      const n = tags.length;
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5));
      return [Math.cos(phi) * r, y, Math.sin(phi) * r];
    })
  );

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const s = st.current;
    const down = (e) => { s.drag = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); el.classList.add("grabbing"); };
    const move = (e) => {
      if (!s.drag) return;
      const dx = e.clientX - s.drag.x, dy = e.clientY - s.drag.y;
      s.vy = dx * 0.0009; s.vx = -dy * 0.0009;
      s.drag = { x: e.clientX, y: e.clientY };
    };
    const up = () => { s.drag = null; el.classList.remove("grabbing"); };
    const enter = () => (s.hover = true);
    const leave = () => (s.hover = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const widths = useRef([]);
  useEffect(() => {
    const read = () => { widths.current = tagRefs.current.map((el) => (el ? el.offsetWidth : 0)); };
    read();
    const ro = new ResizeObserver(read);
    if (box.current) ro.observe(box.current);
    document.fonts?.ready.then(read);
    return () => ro.disconnect();
  }, []);

  useVisibleLoop(box, (dt, dims) => {
    const s = st.current;
    const k = dt / 16.7;
    if (!s.drag) {
      const target = reduced() || s.hover ? 0 : 0.0035;
      s.vy += (target - s.vy) * 0.02 * k;
      s.vx += (0 - s.vx) * 0.03 * k;
    }
    s.ay += s.vy * k;
    s.ax += s.vx * k;
    const size = dims.w || 400;
    const R = size < 420 ? size * 0.32 : size * 0.4;
    const P = R * 3.4;
    const half = size / 2;
    const [cx, sx, cy, sy] = [Math.cos(s.ax), Math.sin(s.ax), Math.cos(s.ay), Math.sin(s.ay)];
    points.current.forEach(([x, y, z], i) => {
      const el = tagRefs.current[i];
      if (!el) return;
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const y2 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;
      const scale = P / (P - z2 * R);
      const hw = ((widths.current[i] || 0) * scale) / 2;
      const px = Math.max(-half + hw, Math.min(half - hw, x1 * R * scale));
      el.style.transform = `translate(-50%, -50%) translate3d(${px.toFixed(1)}px, ${(y2 * R * scale).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      el.style.opacity = (0.25 + ((z2 + 1) / 2) * 0.75).toFixed(2);
      const zi = String(Math.round((z2 + 1) * 4));
      if (el.dataset.z !== zi) { el.dataset.z = zi; el.style.zIndex = zi; }
    });
  });

  return (
    <div className="sphere" ref={box} role="img" aria-label={`Skills: ${tags.join(", ")}`}>
      <div className="sphere-core" aria-hidden="true" />
      {tags.map((t, i) => (
        <span key={t} className="sphere-tag" aria-hidden="true" ref={(el) => (tagRefs.current[i] = el)}>{t}</span>
      ))}
    </div>
  );
}

/* Button-wrapped image that tilts in 3D toward the pointer, with a moving light glare. */
export function TiltImage({ src, alt, onClick, label }) {
  const ref = useRef(null);
  const move = (e) => {
    if (!finePointer() || reduced()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * 10}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <button ref={ref} className="project-img tilt" onClick={onClick} onPointerMove={move} onPointerLeave={leave} aria-label={label}>
      <img src={src} alt={alt} decoding="async" />
      <span className="tilt-glare" aria-hidden="true" />
    </button>
  );
}

