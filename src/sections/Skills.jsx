function Skills() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / yc;
    const angleY = (x - xc) / xc;
    
    const maxTilt = 10;
    
    card.style.setProperty("--tilt-x", `${angleX * maxTilt}deg`);
    card.style.setProperty("--tilt-y", `${angleY * maxTilt}deg`);
    card.style.setProperty("--tilt-scale", "1.04");
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--tilt-scale", "1");
  };

  const skillsData = ["React", "JavaScript", "PHP", "CodeIgniter", "MySQL", "REST APIs"];

  return (
    <section className="section" id="skills">
      <h2 className="scroll-reveal">Skills</h2>

      <div className="skills-grid scroll-reveal">
        {skillsData.map((skill) => (
          <div 
            key={skill}
            className="skill-card tilt-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;