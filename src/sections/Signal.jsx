import { useState } from "react";
import { PROFILE, CONTACT_TYPES } from "../data/content";

function Signal() {
  const [type, setType] = useState(CONTACT_TYPES[0]);
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${type}] Portfolio inquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.note}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="section" id="signal" data-watermark="07">
      <div className="wrap">
        <p className="eyebrow reveal">
          <span className="num">07</span> Contact &amp; Availability
        </p>

        <div className="signal-grid">
          <div>
            <h2 className="signal-lead reveal">
              Let's build something <em>reliable.</em>
            </h2>
            <p className="signal-sub reveal">
              Open to full-stack developer roles — React front-ends backed by PHP / Laravel APIs and
              MySQL. Based in {PROFILE.location}, open to remote. I reply within a day.
            </p>

            <form className="form reveal" onSubmit={submit}>
              <span className="form-label">Inquiry type</span>
              <div className="chips">
                {CONTACT_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`chip ${type === t ? "active" : ""}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="field">
                <span className="form-label">Name</span>
                <input value={form.name} onChange={update("name")} placeholder="Your name" required />
              </div>
              <div className="field">
                <span className="form-label">Email</span>
                <input type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" required />
              </div>
              <div className="field">
                <span className="form-label">Note</span>
                <textarea value={form.note} onChange={update("note")} placeholder="What are you building?" required />
              </div>

              <div className="form-actions">
                <button className="btn btn-solid" type="submit">
                  {sent ? "Opening mail…" : "Send message"}
                </button>
                <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>
                  Copy email
                </a>
              </div>
            </form>
          </div>

          <aside className="channels reveal">
            <div className="ch-head">Correspondence · Four channels</div>
            <a className="channel" href={`mailto:${PROFILE.email}`}>
              <span className="cl">Email</span>
              <span className="cv">{PROFILE.email}</span>
            </a>
            <a className="channel" href={`tel:${PROFILE.phoneRaw}`}>
              <span className="cl">Phone</span>
              <span className="cv">{PROFILE.phone}</span>
            </a>
            <a className="channel" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="cl">LinkedIn</span>
              <span className="cv">{PROFILE.linkedinLabel}</span>
            </a>
            <a className="channel" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              <span className="cl">GitHub</span>
              <span className="cv">{PROFILE.githubLabel}</span>
            </a>
            <div className="channel">
              <span className="cl">Located</span>
              <span className="cv">{PROFILE.location}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Signal;
