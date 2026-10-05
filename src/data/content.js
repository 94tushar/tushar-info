// Portfolio content for Tushar Chauhan.
// Everything here comes from the resume, in the same order. Edit this file to update the site.

export const PROFILE = {
  name: "Tushar Chauhan",
  firstName: "Tushar",
  title: "Full-Stack Developer",
  stack: ["React.js", "Laravel", "PHP", "MySQL"],
  focus: "AI-Assisted Development",
  location: "Dehradun, India",
  email: "tusharchauhan9411@gmail.com",
  portfolio: "https://tusharchauhanportfolio.vercel.app",
  portfolioLabel: "tusharchauhanportfolio.vercel.app",
  github: "https://github.com/94tushar",
  githubLabel: "github.com/94tushar",
  linkedin: "https://www.linkedin.com/in/tushar-chauhan-51526b342",
  linkedinLabel: "linkedin.com/in/tushar-chauhan-51526b342",
  resume: "/TusharChauhan_Resume.pdf",
  photo: "/me.jpg",
};

export const SUMMARY =
  "Full-stack software developer and B.Tech Computer Science graduate who builds and ships web applications end-to-end - responsive React frontends backed by PHP (Laravel, CodeIgniter) REST APIs and MySQL. Delivered production MVC applications from internship through to a full-time developer role. Comfortable owning a feature from database and API design through to a polished, component-based UI. Uses AI tools (GitHub Copilot, ChatGPT, Claude) daily to speed up coding, debugging and R&D, so more time goes into architecture and shipping.";

export const HIGHLIGHTS = [
  { title: "2 Production Apps", note: "UHB Inventory System and Horticulture Nursery Management System" },
  { title: "Intern to Full-time", note: "Hiesys Technologies, since June 2025" },
  { title: "B.Tech CSE Graduate", note: "Graphic Era Hill University, 2026" },
  { title: "AI-Assisted Developer", note: "GitHub Copilot, ChatGPT and Claude, daily" },
];

export const SKILLS = [
  { group: "Frontend", items: ["React.js", "React Native", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive Design", "Component-Based UI"] },
  { group: "Backend", items: ["PHP", "Laravel (MVC)", "CodeIgniter 4 (MVC)", "REST API Design", "JSON"] },
  { group: "Databases", items: ["MySQL", "SQL", "Schema Design", "Query Optimization"] },
  { group: "Tools & Practices", items: ["Git", "GitHub", "VS Code", "Postman", "Android Studio", "MVC", "CRUD", "SPA"] },
  { group: "AI-Assisted Dev", items: ["GitHub Copilot", "ChatGPT", "Claude"] },
  { group: "Currently Learning", items: ["TypeScript", "Next.js", "Tailwind CSS"] },
];

export const EXPERIENCE = [
  {
    role: "Software Developer",
    type: "Intern, then Full-time",
    period: "June 2025 - Present",
    company: "Hiesys Technologies Pvt. Ltd",
    location: "Dehradun",
    timeline: "Intern Jun 2025 - May 2026, Full-time since Jun 2026",
    points: [
      "Develop and maintain full-stack web applications end-to-end using Laravel and CodeIgniter (MVC) on the backend with React on the frontend.",
      "Build responsive, component-based interfaces in React (HTML5/CSS3, JavaScript) integrated with backend services through REST APIs.",
      "Design and optimize MySQL schemas and queries, and debug production issues to improve application reliability and response time.",
      "Collaborate across the stack to ship features - from database and API design through to UI implementation and testing.",
      "Use AI coding assistants (GitHub Copilot, ChatGPT, Claude) to generate boilerplate, write unit tests and documentation, and debug faster - cutting routine coding time and shortening feature turnaround.",
      "Run AI-assisted R&D before building: evaluate libraries, API designs and alternative approaches with LLMs, then prototype the best option - reducing rework and dead-end implementations.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "uhb",
    name: "UHB Inventory System",
    category: "Inventory Management",
    stack: ["React", "Laravel REST APIs", "MySQL"],
    image: "/uhb-login.jpg",
    blurb: "A full-stack inventory management system with a React single-page frontend and a Laravel REST API backend.",
    points: [
      "Built a full-stack inventory management system: a React single-page frontend consuming a Laravel REST API backend.",
      "Implemented CRUD operations, authentication, and state-driven UI updates for real-time inventory and order tracking.",
      "Modeled and optimized the MySQL database for reliable stock, order, and billing data.",
    ],
    live: null,
  },
  {
    id: "horti",
    name: "Horticulture Nursery Management System",
    category: "Nursery Management",
    stack: ["CodeIgniter", "PHP", "MySQL"],
    image: "/horti.jpg",
    blurb: "A role-based nursery management system handling inventory, orders, billing, and plant records.",
    points: [
      "Developed a role-based nursery management system handling inventory, orders, billing, and plant records.",
      "Engineered a modular MVC architecture with secure session handling and automated stock and invoicing workflows, cutting manual data entry.",
      "Tuned MySQL queries and application modules to improve system performance and response time.",
    ],
    live: "https://horti.hiesys.in",
    liveLabel: "horti.hiesys.in",
  },
];

export const CERTIFICATIONS = [{ name: "Python for Data Science", issuer: "Great Learning" }];

export const EDUCATION = [
  {
    degree: "B.Tech, Computer Science Engineering",
    school: "Graphic Era Hill University, Dehradun",
    period: "Aug 2022 - Jul 2026",
    details: ["CGPA: 7.1", "Class Representative"],
  },
];

export const FAQ = [
  {
    q: "What is your core stack?",
    a: "React.js on the frontend, PHP with Laravel and CodeIgniter 4 (MVC) on the backend, connected through REST APIs, with MySQL for data.",
  },
  {
    q: "How do you use AI in your work?",
    a: "I use GitHub Copilot, ChatGPT and Claude daily for codegen, debugging, refactoring, tests and docs. I also run AI-assisted R&D to compare libraries and API designs before building.",
  },
  {
    q: "What are you learning right now?",
    a: "TypeScript, Next.js and Tailwind CSS.",
  },
  {
    q: "Where are you based?",
    a: "Dehradun, India. The fastest way to reach me is email at tusharchauhan9411@gmail.com.",
  },
];

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
