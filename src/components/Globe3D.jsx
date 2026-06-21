import { useMemo } from "react";

/**
 * CSS-3D rotating constellation globe. Points are distributed on a sphere
 * (fibonacci) inside a preserve-3d space that spins; three orbital rings give
 * wireframe structure. Tilts with the mouse via --rx / --ry set on the hero.
 * Pure CSS transforms — no WebGL — so it stays light.
 */
function Globe3D({ count = 50, radius = 200 }) {
  const points = useMemo(() => {
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * golden;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        big: i % 7 === 0,
        depth: (z + 1) / 2, // 0..1 for static opacity hint
      });
    }
    return pts;
  }, [count, radius]);

  return (
    <div className="globe" style={{ "--gr": `${radius}px` }}>
      <div className="globe-rot">
        <div className="gring gring-1" />
        <div className="gring gring-2" />
        <div className="gring gring-3" />
        {points.map((p, i) => (
          <span
            key={i}
            className={`gpt ${p.big ? "big" : ""}`}
            style={{
              transform: `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
              opacity: 0.45 + p.depth * 0.55,
            }}
          />
        ))}
      </div>
      <span className="globe-core" aria-hidden="true" />
    </div>
  );
}

export default Globe3D;
