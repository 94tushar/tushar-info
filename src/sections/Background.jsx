import { TIMELINE, VITALS, DISCIPLINES, PROFILE, EDUCATION, CERTS } from "../data/content";

function Background() {
  return (
    <section className="section" id="background" data-watermark="01">
      <div className="wrap">
        <p className="eyebrow reveal">
          <span className="num">01</span> Background &amp; Working Style
        </p>
        <h2 className="section-title mask-reveal">A developer who thinks in systems.</h2>

        <div className="bg-grid">
          <div className="bg-body reveal">
            <p>
              I build the parts of software that people rely on but rarely see: the APIs,
              the data models, and the automation that keeps a product running. I care most
              about reliability — software that behaves predictably when real users and real
              data hit it.
            </p>
            <p>
              Most of my work has been in PHP ecosystems like Laravel and CodeIgniter, building
              production applications for business and government workflows across India, with a
              growing focus on Node.js services and clean REST contracts. I'm comfortable owning a
              feature end to end: schema, API, background jobs, and the React front-end on top.
            </p>
            <p>
              Off the keyboard, I'm a football enthusiast. I think the parallel is real — both
              good teams and good systems come down to clear roles, planning, and the discipline
              to adapt when the situation changes.
            </p>

            <div className="disc-cloud">
              {DISCIPLINES.slice(0, 9).map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <p className="eyebrow reveal" style={{ marginBottom: 18 }}>
              <span className="num">→</span> Through the years
            </p>
            <ul className="timeline stagger">
              {TIMELINE.map((t, i) => (
                <li key={i}>
                  <span className="ty">{t.year}</span>
                  <span className="tt">{t.text}</span>
                </li>
              ))}
            </ul>

            <div className="edu reveal">
              <p className="eyebrow" style={{ margin: "8px 0 18px" }}>
                <span className="num">§</span> Education &amp; Certifications
              </p>
              <div className="edu-card">
                <div className="edu-degree">{EDUCATION.degree}</div>
                <div className="edu-school">{EDUCATION.school}</div>
                <div className="edu-meta">{EDUCATION.span} · {EDUCATION.detail}</div>
              </div>
              {CERTS.map((c) => (
                <div className="edu-cert" key={c}>
                  <span>✦</span> {c}
                </div>
              ))}
            </div>
          </div>

          <aside className="vitals reveal">
            <div className="vitals-head">
              <span>Vitals</span>
              <span>{PROFILE.volume} · {PROFILE.year}</span>
            </div>
            <dl>
              <div className="vital-row">
                <dt>Currently</dt>
                <dd>
                  <div className="r">{VITALS.currently.role}</div>
                  <div className="w">{VITALS.currently.where}</div>
                </dd>
              </div>
              <div className="vital-row">
                <dt>Previously</dt>
                <dd>
                  <div className="r">{VITALS.previously.role}</div>
                  <div className="w">{VITALS.previously.where}</div>
                </dd>
              </div>
              <div className="vital-row">
                <dt>Based in</dt>
                <dd>
                  <div className="r">{VITALS.based.place}</div>
                  <div className="w">{VITALS.based.coords}</div>
                </dd>
              </div>
              <div className="vital-row">
                <dt>Open to</dt>
                <dd>
                  <div className="r">{VITALS.open.role}</div>
                  <div className="w">{VITALS.open.note}</div>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Background;
