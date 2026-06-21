import Scrolly from "../components/Scrolly";
import { STUDIES } from "../data/content";

// abstract motif per study
function Motif({ variant }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <line key={i} x1={20 + i * 20} y1="14" x2={20 + i * 20} y2="86" className="starline" />
        ))}
        <rect x="20" y="40" width="120" height="20" rx="4" fill="none" className="starline" style={{ opacity: 0.5 }} />
        <circle className="star tw" cx="80" cy="50" r="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[...Array(5)].map((_, r) =>
        [...Array(8)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={16 + c * 18} cy={14 + r * 18} r="1.5"
            className={`star ${(r + c) % 4 === 0 ? "tw" : ""}`}
            style={{ animationDelay: `${(r + c) * 0.2}s`, opacity: (r + c) % 3 === 0 ? 1 : 0.4 }} />
        ))
      )}
    </svg>
  );
}

function Philosophy() {
  const chapters = STUDIES.map((s, i) => ({
    key: s.code,
    num: String(i + 1).padStart(2, "0"),
    left: (
      <>
        <div className="step-kicker">{s.code} · {s.label}</div>
        <h3 className="step-title">{s.title}</h3>
        <p className="step-text">{s.body}</p>
      </>
    ),
    stage: (
      <div className="stage-card">
        <div className="sc-art"><Motif variant={i} /></div>
        <div className="sc-body">
          <div className="sc-code">{s.code} // {s.label}</div>
          <div className="sc-title">{s.title}</div>
        </div>
      </div>
    ),
  }));

  return (
    <Scrolly
      id="philosophy"
      num="02"
      eyebrow="How I Think & Build"
      title={<>Two notes on building <em>things that last.</em></>}
      chapters={chapters}
      stageSide="right"
    />
  );
}

export default Philosophy;
