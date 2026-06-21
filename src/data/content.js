// Centralized content. Edit this file to update copy, skills, and projects
// without touching component markup.

export const profile = {
  name: "Faheem",
  role: "Full-Stack Developer",
  status: "Final-year Software Engineering Student",
  email: "faheem.webwork@gmail.com",
  github: "https://github.com/faheemcodes/",
  linkedin: "https://www.linkedin.com/in/mr-faheem/",
  location: "Available for remote & on-site engagements",
};

export const heroMeta = [
  { value: "3+", label: "Production case studies" },
  { value: "9", label: "Core technologies" },
  { value: "Final Yr", label: "Software Engineering" },
];

export const skillDomains = [
  {
    index: "01",
    title: "Frontend Engineering",
    description:
      "Interfaces built for clarity and performance, from component architecture to interaction detail.",
    skills: ["React", "JavaScript", "jQuery", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    index: "02",
    title: "Backend & Database",
    description:
      "Server-side systems and data layers engineered for reliability under real production load.",
    skills: ["Laravel", "PHP", "MySQL"],
  },
  {
    index: "03",
    title: "Automation & AI",
    description:
      "Scripts, test harnesses, and AI-assisted workflows that remove repetitive work from the pipeline.",
    skills: ["Python", "Software Testing", "AI Integration"],
  },
];

export const caseStudies = [
  {
    index: "CS-01",
    status: "Live",
    title: "SalonHub",
    tagline: "Multi-tenant marketplace and management portal for grooming services.",
    problem:
      "Independent salons had no shared platform to manage bookings, staff schedules, and customer relationships in real time, forcing fragmented, manual workflows across each location.",
    architecture:
      "A multi-tenant React frontend consumes a Laravel API with tenant-isolated MySQL data, handling real-time booking states, staff availability, and role-based access per salon.",
    result:
      "Salons run bookings, staff, and customers from a single portal, with each tenant fully isolated and able to scale independently as new locations come online.",
    stack: ["Laravel", "MySQL", "React", "Bootstrap"],
  },
  {
    index: "CS-02",
    status: "Internal Tool",
    title: "Automated QA Dashboard",
    tagline: "Centralized testing suite linking Python automation to deployment QA.",
    problem:
      "Pre-deployment quality checks were manual and inconsistent, slowing releases and letting regressions slip through without a single source of truth for test status.",
    architecture:
      "Python automation scripts execute test suites and report results into a Laravel backend, which aggregates pass/fail state into a live dashboard for release decisions.",
    result:
      "Releases are gated on automated, repeatable checks instead of manual sign-off, with a clear historical record of test runs across every deployment.",
    stack: ["Python", "Laravel", "Software Testing", "MySQL"],
  },
  {
    index: "CS-03",
    status: "In Development",
    title: "AI-Driven Workflow Hub",
    tagline: "Middleware platform integrating business tools through AI-assisted automation.",
    problem:
      "Teams relied on disconnected business tools with no shared automation layer, requiring repetitive manual handoffs between systems that should talk to each other.",
    architecture:
      "Python microservices handle AI-driven task routing and tool integrations, coordinated through a Laravel core that manages workflow state and connected-tool credentials.",
    result:
      "Routine cross-tool tasks are automated end-to-end, reducing manual handoffs and giving teams a single hub to monitor and trigger automated workflows.",
    stack: ["Python", "Laravel", "AI Integration", "Microservices"],
  },
];

export const experience = [
  {
    period: "2023 — Present",
    title: "Software Engineering, Final-Year Student",
    description:
      "Coursework and independent projects spanning full-stack development, database design, and software testing methodology, applied directly to production-style case studies.",
    hollow: false,
  },
  {
    period: "Ongoing",
    title: "Independent Full-Stack Projects",
    description:
      "Designing and shipping multi-tenant platforms, automation tooling, and AI-integrated systems end-to-end — from schema to deployment.",
    hollow: true,
  },
];

export const certifications = [
  {
    code: "AI",
    title: "Google AI Fundamentals",
    issuer: "Coursera",
  },
];
