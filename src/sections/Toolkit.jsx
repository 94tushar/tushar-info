import Scrolly from "../components/Scrolly";
import { TOOLKIT } from "../data/content";

function Toolkit() {
  const chapters = TOOLKIT.map((group, i) => ({
    key: group.code,
    num: String(i + 1).padStart(2, "0"),
    left: (
      <>
        <div className="step-kicker">{group.code}</div>
        <h3 className="step-title">{group.title}</h3>
        <ul className="step-list">
          {group.items.map((it) => <li key={it}>{it}</li>)}
        </ul>
      </>
    ),
    stage: (
      <div className="stage-kit">
        <div className="sk-code">{group.code}</div>
        <div className="sk-title">{group.title}</div>
        <div className="sk-tags">
          {group.items.map((it) => <span key={it}>{it}</span>)}
        </div>
      </div>
    ),
  }));

  return (
    <Scrolly
      id="toolkit"
      num="05"
      eyebrow="Technical Toolkit"
      title={<>The stack <em>under the hood.</em></>}
      chapters={chapters}
      compact
      stageSide="left"
    />
  );
}

export default Toolkit;
