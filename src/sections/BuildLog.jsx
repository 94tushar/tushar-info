import Scrolly from "../components/Scrolly";
import BrowserMock from "../components/BrowserMock";
import { PROJECTS } from "../data/content";
import hortiShot from "../assets/horti.jpg";
import uhbShot from "../assets/uhb-login.jpg";

const IMAGES = { horti: hortiShot, uhb: uhbShot };

function BuildLog() {
  const count = PROJECTS.length;
  const word = count === 2 ? "Two" : count === 3 ? "Three" : count === 4 ? "Four" : String(count);

  const urlFor = (p) =>
    p.link && p.link !== "#" ? p.link.replace(/^https?:\/\//, "") : `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.app`;

  const chapters = PROJECTS.map((p, i) => {
    const img = p.image ? IMAGES[p.image] : null;
    return {
      key: p.code,
      num: String(i + 1).padStart(2, "0"),
      left: (
        <>
          <div className="step-kicker">{p.kicker}</div>
          <h3 className="step-title">{p.name}</h3>
          <p className="step-quote">“{p.quote}”</p>
          <p className="step-text">{p.body}</p>
          {img && (
            <div className="step-shot">
              <BrowserMock image={img} label={`${p.name} screenshot`} url={urlFor(p)} />
            </div>
          )}
          <div className="step-meta">
            <div><div className="l">Role</div><div className="v">{p.role}</div></div>
            <div><div className="l">Period</div><div className="v">{p.period}</div></div>
            <div><div className="l">Status</div><div className="v">{p.status}</div></div>
          </div>
          <div className="step-tags">
            {p.stack.map((s) => <span key={s}>{s}</span>)}
          </div>
          {p.link && p.link !== "#" && (
            <a className="step-link" href={p.link} target="_blank" rel="noopener noreferrer">
              Visit live site →
            </a>
          )}
        </>
      ),
      stage: (
        <BrowserMock
          image={img}
          label={`${p.name} screenshot`}
          url={urlFor(p)}
          accent="var(--accent)"
        />
      ),
    };
  });

  return (
    <Scrolly
      id="build-log"
      num="04"
      eyebrow="Selected Work"
      title={<>{word} builds, <em>front to back.</em></>}
      chapters={chapters}
      stageSide="right"
    />
  );
}

export default BuildLog;
