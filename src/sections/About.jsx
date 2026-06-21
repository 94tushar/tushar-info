import "../styles/about.css";

function About() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / yc;
    const angleY = (x - xc) / xc;
    
    const maxTilt = 8; // Gentle tilt for stack cards
    
    card.style.setProperty("--tilt-x", `${angleX * maxTilt}deg`);
    card.style.setProperty("--tilt-y", `${angleY * maxTilt}deg`);
    card.style.setProperty("--tilt-scale", "1.03");
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--tilt-scale", "1");
  };

  return (
    <section className="about-section" id="about">

      <h2 className="about-title scroll-reveal">About Me</h2>

      <div className="about-container">

        {/* LEFT SIDE */}
        <div className="about-left scroll-reveal">

          <h3 className="about-heading">Engineering Reliable Systems That Scale</h3>

          <p>
            I'm a backend-focused full stack developer who builds systems that perform reliably under pressure. 
            With hands-on experience in PHP ecosystems like Laravel and CodeIgniter, I have contributed to 
            production-ready applications used in real-world business environments across India.
          </p>

          <p>
            My work focuses on the critical aspects of software development—data integrity, workflow automation, 
            security practices, and building systems that require minimal maintenance. I enjoy solving complex 
            problems where reliability and scalability are essential.
          </p>

          <p>
            Beyond coding, I’m an avid football enthusiast who draws parallels between team strategy and software 
            architecture—both require planning, execution, and adaptability.
          </p>

          {/* Highlights */}
          <div className="about-highlights scroll-reveal">

            <div className="highlight">
              <span>✔</span>
              <div>
                <h4>Full Stack Development</h4>
                <p>Frontend + Backend expertise</p>
              </div>
            </div>

            <div className="highlight">
              <span>✔</span>
              <div>
                <h4>API Architecture</h4>
                <p>RESTful & scalable systems</p>
              </div>
            </div>

            <div className="highlight">
              <span>✔</span>
              <div>
                <h4>Database Optimization</h4>
                <p>MySQL performance tuning</p>
              </div>
            </div>

            <div className="highlight">
              <span>✔</span>
              <div>
                <h4>Government Projects</h4>
                <p>Compliance-first development</p>
              </div>
            </div>

          </div>

          {/* EDUCATION */}
          <div className="about-education scroll-reveal">

            <div className="section-divider"></div>

            <h3 className="education-title">Education</h3>

            <div className="education-item">
              <div className="edu-icon">🎓</div>

              <div className="edu-content">
                <h4>B.Tech (Computer Science Engineering)</h4>
                <p>Graphic Era University, Dehradun</p>
                <span>2020 - 2024</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div 
          className="about-right tilt-card scroll-reveal"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >

          <h3 className="stack-title">Technical Stack</h3>

          {/* BACKEND */}
          <div className="stack-section">
            <p className="stack-heading">Backend Core</p>

            <div className="stack-grid">
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>PHP</div>
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>Laravel</div>
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>CodeIgniter</div>
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>Node.js</div>
            </div>
          </div>

          {/* DATABASE */}
          <div className="stack-section">
            <p className="stack-heading">Databases</p>

            <div className="stack-grid">
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>MySQL</div>
            </div>
          </div>

          {/* FRONTEND */}
          <div className="stack-section">
            <p className="stack-heading">Frontend (Supporting)</p>

            <div className="stack-grid">
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>React</div>
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>JavaScript</div>
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>CSS</div>
              <div className="stack-card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>HTML</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;