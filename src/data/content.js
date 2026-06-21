// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT  ·  Tushar Chauhan
//  Sourced from resume. Edit here to update the whole site.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Tushar Chauhan",
  role: "Full-Stack Developer",
  roleRotation: [
    "Full-Stack Developer",
    "React Front-ends",
    "Laravel & PHP APIs",
    "MySQL & clean schemas",
  ],
  volume: "Vol. 01",
  year: "'26",
  location: "Dehradun, India",
  coords: "30.3165° N · 78.0322° E",
  tagline:
    "I build and ship web applications end-to-end — responsive React front-ends backed by PHP (Laravel, CodeIgniter) REST APIs and MySQL. Comfortable owning a feature from database and API design through to a polished, component-based UI.",
  email: "tusharchauhan9411@gmail.com",
  phone: "+91 94118 84104",
  phoneRaw: "+919411884104",
  linkedin: "https://www.linkedin.com/in/tushar-chauhan-51526b342/",
  linkedinLabel: "linkedin.com/in/tushar-chauhan-51526b342",
  github: "https://github.com/94tushar",
  githubLabel: "github.com/94tushar",
  openTo: "Full-Stack · Frontend · Backend roles",
};

export const NAV = [
  { id: "top", num: "00", label: "Intro" },
  { id: "background", num: "01", label: "Background" },
  { id: "philosophy", num: "02", label: "Philosophy" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "build-log", num: "04", label: "Work" },
  { id: "toolkit", num: "05", label: "Toolkit" },
  { id: "resume", num: "06", label: "Résumé" },
  { id: "signal", num: "07", label: "Contact" },
];

// Résumé section
export const RESUME = {
  file: "/TusharChauhan_Resume.pdf",
  updated: "June 2026",
  pages: "1 page",
  blurb:
    "One page, no fluff — the full-stack story in print: who I work for, what I've shipped, and the stack I reach for. Read it in the browser or take the PDF with you.",
  facts: [
    { k: "Role", v: "Full-Stack Developer" },
    { k: "Now at", v: "Hiesys Technologies, Dehradun" },
    { k: "Core stack", v: "React · Laravel · CodeIgniter · MySQL" },
    { k: "Education", v: "B.Tech CSE · Graphic Era Hill University" },
    { k: "Based in", v: "Dehradun, India" },
    { k: "Open to", v: "Full-Stack developer roles" },
  ],
  highlights: [
    "Ships full-stack web apps end-to-end — React front-ends on Laravel / CodeIgniter REST APIs.",
    "Converted from intern to full-time Software Developer on the strength of production work.",
    "Two systems live: UHB Inventory and the Uttarakhand Horticulture Nursery platform.",
  ],
};

// Headline stats
export const STATS = [
  { value: "2+", label: "production apps shipped end-to-end" },
  { value: "End-to-end", label: "ownership — database, API, and UI" },
  { value: "B.Tech", label: "Computer Science · Class Representative" },
];

// "Now" strip
export const NOW = [
  { kicker: "Currently", title: "Software Developer", note: "Hiesys Technologies, Dehradun" },
  { kicker: "Building", title: "UHB Inventory System", note: "React SPA + Laravel REST API" },
  { kicker: "Learning", title: "TypeScript · Next.js · Tailwind", note: "Leveling up the stack" },
  { kicker: "Last shipped", title: "Horticulture NMS", note: "Live · horti.hiesys.in" },
];

// Disciplines marquee
export const DISCIPLINES = [
  "React.js", "Laravel (MVC)", "CodeIgniter 4", "PHP", "MySQL", "REST API design",
  "React Native", "JavaScript ES6+", "Responsive UI", "Schema design",
  "Query optimization", "Git & GitHub",
];

// Timeline — "Through the years"
export const TIMELINE = [
  { year: "'22", text: "B.Tech Computer Science begins · Graphic Era Hill University, Dehradun" },
  { year: "'25", text: "Software Development Intern → Software Developer · Hiesys Technologies" },
  { year: "'25", text: "Shipped the Horticulture Nursery Management System (live)" },
  { year: "'25", text: "Built the UHB Inventory System · React + Laravel REST API" },
  { year: "'26", text: "B.Tech graduation · Class Representative" },
  { year: "'26", text: "Open to full-stack developer roles" },
];

// Vitals card
export const VITALS = {
  currently: { role: "Software Developer", where: "Hiesys Technologies Pvt. Ltd, Dehradun · Laravel, CodeIgniter, React" },
  previously: { role: "Software Development Intern", where: "Hiesys Technologies · converted to full-time" },
  based: { place: "Dehradun, India", coords: "30.3165° N · 78.0322° E" },
  open: { role: "Full-Stack Developer", note: "React front-ends + PHP / Laravel back-ends" },
};

// Education + certifications
export const EDUCATION = {
  degree: "B.Tech, Computer Science Engineering",
  school: "Graphic Era Hill University, Dehradun",
  span: "Aug 2022 — Jul 2026",
  detail: "CGPA 7.1 · Class Representative",
};
export const CERTS = ["Python for Data Science — Great Learning"];

// Philosophy — two studies
export const STUDIES = [
  {
    code: "A.01",
    label: "OWNERSHIP",
    title: "Own the whole feature",
    body: "I like taking a feature from database and API design all the way through to a polished, component-based UI. When one person holds the full thread — schema, REST contract, and interface — the seams between layers stop leaking.",
  },
  {
    code: "A.02",
    label: "RELIABILITY",
    title: "MVC, done cleanly",
    body: "Modular MVC architecture, secure session handling, and tuned MySQL queries aren't extras. They're what turn a working demo into software that stays fast and dependable once real data and real users arrive.",
  },
];

// Experience roles
export const ROLES = [
  {
    id: "role-I",
    numeral: "I",
    span: "Aug 2025 — Present",
    kicker: "Production MVC web applications",
    title: "Software Developer",
    org: "Hiesys Technologies Pvt. Ltd · Dehradun (converted from intern)",
    summary:
      "Develop and maintain full-stack web applications end-to-end using Laravel and CodeIgniter (MVC) on the backend with React on the frontend — collaborating across the stack to ship features from database and API design through to UI and testing.",
    highlights: [
      {
        title: "Full-Stack Delivery",
        sub: "Laravel & CodeIgniter (MVC) backends paired with React front-ends.",
        stat: "End-to-end",
        statLabel: "DB → API → UI",
        body: "Ship features across the whole stack, from schema and REST API design to the component-based interface.",
      },
      {
        title: "Responsive React UIs",
        sub: "Component-based interfaces in HTML5 / CSS3 and JavaScript.",
        stat: "REST",
        statLabel: "API integration",
        body: "Build responsive React interfaces wired to backend services through clean REST APIs.",
      },
      {
        title: "MySQL Performance",
        sub: "Schema and query optimization plus production debugging.",
        stat: "Faster",
        statLabel: "response time",
        body: "Design and optimize MySQL schemas and queries, and debug production issues to improve reliability.",
      },
    ],
  },
  {
    id: "role-II",
    numeral: "II",
    span: "2025",
    kicker: "Where it started",
    title: "Software Development Intern",
    org: "Hiesys Technologies Pvt. Ltd · Dehradun",
    summary:
      "Joined as an intern and contributed to production MVC applications across PHP, Laravel, CodeIgniter, and MySQL — building the fundamentals that earned a conversion to a full-time Software Developer role.",
    highlights: [
      {
        title: "Production from day one",
        sub: "Real CodeIgniter & Laravel applications, not toy projects.",
        stat: "Intern → FT",
        statLabel: "converted to full-time",
        body: "Delivered enough production value to convert into a permanent Software Developer position.",
      },
      {
        title: "Core fundamentals",
        sub: "MVC, REST, CRUD, MySQL, and a Git / GitHub workflow.",
        stat: "CRUD",
        statLabel: "REST · SPA",
        body: "Built a solid foundation in database-backed, API-driven application development.",
      },
    ],
  },
];

// Build Log — real projects from resume
export const PROJECTS = [
  {
    plate: "I",
    code: "B.01",
    kicker: "Inventory · Full-stack",
    name: "UHB Inventory System",
    quote: "Real-time inventory and orders, in one SPA.",
    body: "A full-stack inventory management system: a React single-page front-end consuming a Laravel REST API. Implements CRUD, authentication, and state-driven UI updates for real-time inventory and order tracking, backed by a modeled and optimized MySQL database for stock, order, and billing data.",
    role: "Full-Stack Developer",
    period: "2025",
    status: "Production",
    stack: ["React", "Laravel", "REST API", "MySQL"],
    image: "uhb",
    link: "#",
  },
  {
    plate: "II",
    code: "B.02",
    kicker: "Govtech · Uttarakhand Horticulture Board",
    name: "Horticulture Nursery Management System",
    quote: "Digitizing nursery operations across Uttarakhand.",
    body: "A role-based nursery management system for the Uttarakhand Horticulture Board, handling inventory, orders, billing, and plant records. Built on a modular MVC architecture with secure session handling and automated stock and invoicing workflows that cut manual data entry, with tuned MySQL queries for performance.",
    role: "Software Developer",
    period: "2025",
    status: "Live",
    stack: ["CodeIgniter", "PHP", "MySQL", "MVC"],
    image: "horti",
    link: "https://horti.hiesys.in/",
  },
];

// Toolkit — grouped from resume skills
export const TOOLKIT = [
  {
    code: "T.01",
    title: "Frontend",
    items: ["React.js", "React Native", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive design", "Component-based UI"],
  },
  {
    code: "T.02",
    title: "Backend",
    items: ["PHP", "Laravel (MVC)", "CodeIgniter 4 (MVC)", "REST API design", "JSON"],
  },
  {
    code: "T.03",
    title: "Databases",
    items: ["MySQL", "SQL", "Schema design", "Query optimization"],
  },
  {
    code: "T.04",
    title: "Tools & Practices",
    items: ["Git", "GitHub", "VS Code", "Postman", "Android Studio", "MVC · CRUD · SPA"],
  },
  {
    code: "T.05",
    title: "Currently Learning",
    items: ["TypeScript", "Next.js", "Tailwind CSS"],
  },
];

export const CONTACT_TYPES = ["Full-time role", "Contract / freelance", "Collaboration", "Other"];
