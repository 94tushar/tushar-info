import Scrolly from "../components/Scrolly";
import { ROLES } from "../data/content";

function Experience() {
  const chapters = ROLES.map((role, i) => {
    const lead = role.highlights[0];
    return {
      key: role.id,
      num: String(i + 1).padStart(2, "0"),
      left: (
        <>
          <div className="step-kicker">{role.kicker}</div>
          <h3 className="step-title">{role.title}</h3>
          <div className="step-org">{role.org} · {role.span}</div>
          <p className="step-text">{role.summary}</p>
          <ul className="step-list">
            {role.highlights.map((h) => (
              <li key={h.title}>{h.title} — {h.sub}</li>
            ))}
          </ul>
        </>
      ),
      stage: (
        <div className="stage-role">
          <div className="sr-numeral">{role.numeral}</div>
          <div className="sr-span">{role.span}</div>
          <div className="sr-title">{role.title}</div>
          <div className="sr-org">{role.org}</div>
          <div className="sr-divider" />
          <div className="sr-stat">{lead.stat}</div>
          <div className="sr-stat-l">{lead.statLabel}</div>
        </div>
      ),
    };
  });

  return (
    <Scrolly
      id="experience"
      num="03"
      eyebrow="Engineering Experience"
      title={<>A few years shipping <em>reliable backends.</em></>}
      chapters={chapters}
      stageSide="left"
    />
  );
}

export default Experience;
