import { Fragment, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  PROFILE, SUMMARY, HIGHLIGHTS, SKILLS, EXPERIENCE, PROJECTS,
  CERTIFICATIONS, EDUCATION, FAQ, NAV,
} from "./data/content";
import "./styles/site.css";
import { Title, HeroOrbit, SkillSphere, TiltImage } from "./components/Fx";
import { useStackScroll } from "./components/useStackScroll";
import Loader from "./components/Loader";

const Icon = ({ name }) => {
  const paths = {
    github: "M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z",
    linkedin: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z",
    mail: "M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2 .9V18h16V6.4l-8 6.2-8-6.2ZM5.6 6l6.4 5 6.4-5H5.6Z",
  };
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d={paths[name]} />
    </svg>
  );
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header-inner">
        <a href="#top" className="logo" onClick={close}>{PROFILE.name}</a>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </nav>
        <a href="#contact" className="btn btn-dark header-cta">Hire Me</a>
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
      <div className="mobile-menu" hidden={!open}>
        {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={close}>{n.label}</a>)}
        <a href="#contact" className="btn btn-dark" onClick={close}>Hire Me</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="section theme-light hero">
      <div className="wrap hero-grid">
        <div className="hero-text reveal">
          <p className="eyebrow">{PROFILE.title} · {PROFILE.location}</p>
          <h1 className="mask in"><span>Hey, I'm {PROFILE.firstName}.</span></h1>
          <p className="hero-sub">
            {PROFILE.title} | {PROFILE.stack.join(" · ")} | {PROFILE.focus}
          </p>
          <div className="btn-row">
            <a href="#contact" className="btn btn-dark">Work with Me</a>
            <a href={PROFILE.resume} className="btn btn-outline" download="TusharChauhan_Resume.pdf">
              Download Resume
            </a>
          </div>
          <div className="socials">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </div>
        <HeroOrbit
          photo={PROFILE.photo}
          alt={`Portrait of ${PROFILE.name}`}
          chips={["React.js", "Laravel", "PHP", "MySQL", "CodeIgniter", "REST APIs"]}
        />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section theme-white">
      <div className="wrap split">
        <div className="about-card reveal">
          <dl>
            <div><dt>Location</dt><dd>{PROFILE.location}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
            <div><dt>Portfolio</dt><dd><a href={PROFILE.portfolio} target="_blank" rel="noreferrer">{PROFILE.portfolioLabel}</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={PROFILE.github} target="_blank" rel="noreferrer">{PROFILE.githubLabel}</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">{PROFILE.linkedinLabel}</a></dd></div>
          </dl>
        </div>
        <div className="reveal">
          <Title>About Me</Title>
          <h3 className="sub-h">Summary</h3>
          <p className="lead">{SUMMARY}</p>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="section theme-black highlights" aria-label="Highlights">
      <div className="wrap highlight-grid">
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className="highlight reveal">
            <span className="star" aria-hidden="true">✦</span>
            <h3>{h.title}</h3>
            <p>{h.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section theme-white">
      <div className="wrap">
        <div className="skills-top">
          <div>
            <Title>Technical Skills</Title>
            <p className="lead reveal">
              Frontend, backend, databases, tools and the AI assistants I work with every day.
            </p>
            <p className="hint reveal">Drag the sphere to spin it.</p>
          </div>
          <SkillSphere tags={SKILLS.flatMap((s) => s.items)} />
        </div>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div key={s.group} className="skill-card reveal">
              <h3>{s.group}</h3>
              <ul className="chips">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section theme-light">
      <div className="wrap">
        <Title>Experience</Title>
        {EXPERIENCE.map((e) => (
          <article key={e.role + e.company} className="exp reveal">
            <div className="exp-meta">
              <p className="exp-period">{e.period}</p>
              <h3>{e.role}</h3>
              <p className="exp-type">{e.type}</p>
              <p className="exp-company">{e.company}, {e.location}</p>
              <p className="exp-timeline">{e.timeline}</p>
            </div>
            <ul className="exp-points">
              {e.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project details" autoFocus>×</button>
        <img src={project.image} alt={`${project.name} screenshot`} decoding="async" />
        <div className="modal-body">
          <p className="eyebrow">{project.category}</p>
          <h3 id="modal-title">{project.name}</h3>
          <ul className="chips">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          <ul className="exp-points">{project.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <div className="btn-row">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-dark">
                Visit Live Site
              </a>
            )}
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-outline">View GitHub</a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Projects() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <section className="section theme-white">
      <div className="wrap">
        <Title>Projects</Title>
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <article key={p.id} className="project reveal">
              <TiltImage
                src={p.image}
                alt={`${p.name} screenshot`}
                label={`Open ${p.name} details`}
                onClick={() => setActive(p)}
              />
              <h3>{p.name}</h3>
              <p className="project-cat">{p.stack.join(", ")}</p>
              {p.live && (
                <p className="project-live">
                  Live: <a href={p.live} target="_blank" rel="noreferrer">{p.liveLabel}</a>
                </p>
              )}
              <p>{p.blurb}</p>
              <button className="link-btn" onClick={() => setActive(p)}>View Project</button>
            </article>
          ))}
        </div>
      </div>
      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}

function Education() {
  return (
    <section className="section theme-light">
      <div className="wrap">
        <Title>Certifications &amp; Education</Title>
        <div className="two-col">
          <div className="reveal">
            <p className="eyebrow">Certifications</p>
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="quote-block">
                <h3>{c.name}</h3>
                <p>{c.issuer}</p>
              </div>
            ))}
          </div>
          <div className="reveal">
            <p className="eyebrow">Education</p>
            {EDUCATION.map((e) => (
              <div key={e.degree} className="quote-block">
                <h3>{e.degree}</h3>
                <p>{e.school}</p>
                <p className="muted">{e.period} · {e.details.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section theme-bright">
      <div className="wrap split contact">
        <div className="reveal">
          <Title>Get in Touch!</Title>
          <p className="lead">
            Have a role or a project in mind? Send me an email or message me on LinkedIn, and I'll get back to you soon.
          </p>
          <div className="btn-row">
            <a href={`mailto:${PROFILE.email}`} className="btn btn-dark">Email Me</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">Connect on LinkedIn</a>
          </div>
        </div>
        <ul className="contact-list reveal">
          <li><Icon name="mail" /><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
          <li><Icon name="linkedin" /><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">{PROFILE.linkedinLabel}</a></li>
          <li><Icon name="github" /><a href={PROFILE.github} target="_blank" rel="noreferrer">{PROFILE.githubLabel}</a></li>
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section theme-white">
      <div className="wrap faq-wrap">
        <Title>FAQ</Title>
        <div className="accordion reveal">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`acc-item${isOpen ? " open" : ""}`}>
                <h3>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <span className="acc-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="acc-panel" hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section theme-light footer" data-panel-end>
      <div className="wrap footer-grid">
        <div>
          <a href="#top" className="logo">{PROFILE.name}</a>
          <p className="muted">{PROFILE.title}</p>
        </div>
        <div>
          <p>{PROFILE.location}</p>
          <p><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></p>
        </div>
        <div>
          <p><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a></p>
          <p><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
          <p><a href={PROFILE.resume} download="TusharChauhan_Resume.pdf">Resume (PDF)</a></p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

const PANELS = [
  { id: "top", el: <Hero /> },
  { id: "about", el: <About /> },
  { id: null, el: <Highlights /> },
  { id: "skills", el: <Skills /> },
  { id: "experience", el: <Experience /> },
  { id: "projects", el: <Projects /> },
  { id: "education", el: <Education /> },
  { id: "contact", el: <Contact /> },
  { id: "faq", el: <Faq /> },
];

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Hold the hero back from the very first paint so it can animate in after the loader.
    document.documentElement.classList.add("is-loading");
    return true;
  });
  const endLoading = useCallback(() => setLoading(false), []);
  useReveal();
  useStackScroll();
  return (
    <>
      {loading && <Loader onDone={endLoading} />}
      <a className="skip" href="#about">Skip to content</a>
      <Header />
      <main className="deck">
        {PANELS.map(({ id, el }, i) => (
          <Fragment key={id || i}>
            {id && <span id={id} className="anchor" />}
            <div className="panel" data-panel style={{ zIndex: i + 1 }}>
              <div className="panel-inner">
                {el}
              </div>
            </div>
          </Fragment>
        ))}
      </main>
      <Footer />
    </>
  );
}
