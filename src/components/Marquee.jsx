import { DISCIPLINES } from "../data/content";

function Marquee() {
  const row = [...DISCIPLINES, ...DISCIPLINES];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
