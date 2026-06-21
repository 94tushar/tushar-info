function Projects() {
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

  const projectsData = [
    {
      title: "Membership Management System",
      desc: "Full stack system with API and database.",
    },
    {
      title: "Portfolio Website",
      desc: "Personal portfolio built with React.",
    },
    {
      title: "API Integration Project",
      desc: "React app consuming REST APIs.",
    },
  ];

  return (
    <section className="section" id="projects">
      <h2 className="scroll-reveal">Projects</h2>

      <div className="projects-grid scroll-reveal">
        {projectsData.map((proj, idx) => (
          <div 
            key={idx}
            className="project-card tilt-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;