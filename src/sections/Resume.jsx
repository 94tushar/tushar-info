import { RESUME, PROFILE } from "../data/content";

function Resume() {
  return (
    <section className="section" id="resume" data-watermark="06">
      <div className="wrap">
        <p className="eyebrow reveal">
          <span className="num">06</span> The One-Pager
        </p>

        <div className="resume-grid">
          <div className="resume-left">
            <h2 className="section-title mask-reveal">
              The résumé, <em>on the record.</em>
            </h2>
            <p className="lede reveal" style={{ marginTop: 18 }}>{RESUME.blurb}</p>

            <div className="resume-facts stagger">
              {RESUME.facts.map((f) => (
                <div className="rf" key={f.k}>
                  <div className="rf-k">{f.k}</div>
                  <div className="rf-v">{f.v}</div>
                </div>
              ))}
            </div>

            <ul className="resume-highlights stagger">
              {RESUME.highlights.map((h, i) => (
                <li key={i}>
                  <span className="rh-num">{String(i + 1).padStart(2, "0")}</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="resume-actions reveal">
              <a className="btn btn-solid" href={RESUME.file} target="_blank" rel="noopener noreferrer">
                View résumé
              </a>
              <a className="btn btn-ghost" href={RESUME.file} download>
                Download PDF
              </a>
            </div>
          </div>

          <a
            className="resume-doc reveal"
            href={RESUME.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open résumé PDF"
          >
            <div className="doc-paper">
              <div className="doc-head">
                <div className="doc-name">{PROFILE.name}</div>
                <div className="doc-role">{PROFILE.role} · React · Laravel · PHP · MySQL</div>
                <div className="doc-contact">{PROFILE.location} · {PROFILE.email}</div>
              </div>
              {["Summary", "Experience", "Projects", "Education"].map((sec, si) => (
                <div className="doc-block" key={sec}>
                  <div className="doc-block-title">{sec}</div>
                  {[...Array(si === 1 || si === 2 ? 3 : 2)].map((_, li) => (
                    <span
                      className="doc-line"
                      key={li}
                      style={{ width: `${92 - ((li * 13 + si * 7) % 40)}%` }}
                    />
                  ))}
                </div>
              ))}
              <div className="doc-stamp">PDF</div>
            </div>
            <div className="doc-caption">
              <span>Updated {RESUME.updated}</span>
              <span>{RESUME.pages} · open →</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
