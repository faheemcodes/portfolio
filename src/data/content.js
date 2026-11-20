// Centralized content. Edit this file to update copy, skills, and projects
// without touching component markup.

export const profile = {
  name: "Faheem Ahmed Soomro",
  brand: "faheem.devlabs",
  role: "Full-Stack Software Engineering Student",
  status: "Final-Year BS Software Engineering Student",
  institution: "University of Sindh, Jamshoro",
  location: "Hyderabad, Sindh, Pakistan",
  availabilityBadge: "Open to Internships, Remote & Flexible Roles",
  email: "faheem.devlabs@gmail.com",
  github: "https://github.com/faheemcodes",
  linkedin: "https://www.linkedin.com/in/mr-faheem/",
  availability:
    "Open to software engineering internships, junior/associate roles, and flexible part-time work alongside final-year studies.",
};

export const heroMeta = [
  { value: "Final Yr", label: "BS Software Engineering (UoS)" },
  { value: "Custom MVC", label: "PHP 8, MySQL & REST Architecture" },
  { value: "Hyd / Remote", label: "Open to Remote & Flexible Roles" },
];

export const skillDomains = [
  {
    index: "01",
    code: "SYS::BACKEND",
    title: "Backend & Database Engineering",
    description:
      "Architecting clean server-side logic from scratch using custom PHP 8 MVC patterns, normalized relational schemas, and defensive security measures.",
    skills: [
      "Custom PHP 8 (MVC)",
      "Object-Oriented Programming (OOP)",
      "MySQL (3NF / Relational Design)",
      "Prepared Statements / PDO",
      "CSRF (hash_equals) & XSS Mitigation",
      "RESTful API Design",
      "Session & RBAC Middleware",
    ],
  },
  {
    index: "02",
    code: "SYS::FRONTEND",
    title: "Frontend Architecture & UI/UX",
    description:
      "Engineering responsive, intuitive client interfaces with clear information hierarchy, high performance, and accessible component structures.",
    skills: [
      "JavaScript (ES6+)",
      "React.js",
      "Tailwind CSS",
      "Bootstrap 5",
      "HTML5 & Semantic Markup",
      "Modern CSS & Dual-Theme Tokens",
      "Chart.js & Data Visualization",
    ],
  },
  {
    index: "03",
    code: "SYS::PRACTICES",
    title: "Engineering Practices & Tooling",
    description:
      "Core developer tooling, software testing principles, version control workflows, and database querying used in real-world application cycles.",
    skills: [
      "Git & GitHub Version Control",
      "SQL Window Functions & Indexing",
      "Role-Based Access Control (RBAC)",
      "PHPMailer (SMTP Automation)",
      "Postman API Testing",
      "Defensive Input & Upload Validation",
    ],
  },
];

export const caseStudies = [
  {
    index: "CS-01",
    repoSlug: "faheemcodes/fyp-management",
    status: "Live Production",
    title: "Faculty FYP Management Portal",
    tagline:
      "5-role academic lifecycle portal automating university project proposals, rubric defense grading, real-time mentorship chat, and AI advisory.",
    metrics: [
      { value: "5 Roles", label: "RBAC Hierarchy" },
      { value: "11", label: "MVC Controllers" },
      { value: "20 Tables", label: "MySQL 3NF Schema" },
      { value: "PDO + CSRF", label: "Security Layer" },
    ],
    highlights: [
      "5-role RBAC isolating Students, Supervisors, Committee, Coordinators & HOD",
      "Single-roundtrip SQL window query (SUM() OVER()) for live notification state",
      "32-byte CSRF tokens verified via timing-safe hash_equals() + HttpOnly cookies",
      "Guardrailed 'FYP Buddy' AI Advisor, PHPMailer SMTP & printable grading sheets",
    ],
    problem:
      "Departmental Final-Year Project workflows—spanning group formation, multi-stage proposal reviews (Supervisor → Committee → HOD), defense rubric grading, and notice distribution—were fragmented across spreadsheets and chat groups with zero auditability.",
    architecture:
      "PSR-style autoloaded PHP 8 MVC front controller (`public/index.php`) dispatching 11 role controllers (`StudentController`, `SupervisorController`, `CommitteeController`, `CoordinatorController`, `HodController`, `ChatbotController`, etc.) over a 20-table MySQL schema (`proposals`, `groups`, `evaluations`, `grades`, `meetings`, `notifications`).",
    security:
      "Cryptographic CSRF tokens (`bin2hex(random_bytes(32))`) checked via `hash_equals()` on all POST/AJAX mutations; `HttpOnly` + `SameSite=Lax` cookies; 100% PDO prepared statements; and an isolated AI prompt boundary with zero DB record access.",
    codebaseSpec: {
      pattern: "Custom PHP 8 MVC (spl_autoload_register + BaseController)",
      modules: "Auth, Student, Supervisor, Committee, Coordinator, Hod, Chat, Chatbot, Admin",
      schema: "20 Tables (users, proposals, projects, groups, evaluations, grades, meetings...)",
    },
    stack: [
      "Custom PHP 8 MVC",
      "PDO / MySQL",
      "JavaScript (ES6+)",
      "Bootstrap 5",
      "PHPMailer (SMTP)",
      "AI Integration",
    ],
    github: "https://github.com/faheemcodes/fyp-management",
    liveDemo: "https://faheem-fyp.alwaysdata.net/",
  },
  {
    index: "CS-02",
    repoSlug: "faheemcodes/hostel_management_system",
    status: "Core MVC Architecture",
    title: "University Hostel Management System (UHMS)",
    tagline:
      "Full-stack PHP 8 MVC system featuring regex route dispatching, middleware pipelines, automated room allocation, and fee/defaulter analytics.",
    metrics: [
      { value: "3 Roles", label: "Admin / Warden / Student" },
      { value: "10", label: "MVC Controllers" },
      { value: "15 Tables", label: "Relational Schema" },
      { value: "Regex Router", label: "Middleware Pipeline" },
    ],
    highlights: [
      "Custom Core\\Router with dynamic {param} regex extraction & chained middleware",
      "Brute-force login rate-limiting with automatic account lockout protection",
      "Automated room occupancy tracking, student allocation & transfer workflows",
      "Monthly fee invoicing, late-fee calculation & Chart.js revenue/defaulter analytics",
    ],
    problem:
      "Hostel administration required a centralized, auditable platform to manage online student admission documents, room capacity allocation, monthly fee invoicing with late-fee calculation, and maintenance complaint resolution.",
    architecture:
      "Engineered a dedicated `Core\\Router` supporting regex URI parameters and middleware guards (`AuthMiddleware`, `AdminMiddleware`), dispatching 10 controllers (`AdmissionController`, `RoomController`, `FeeController`, `ComplaintController`, `ReportController`, `LogController`) across 5 models and 15 MySQL tables.",
    security:
      "Login attempt tracking with automated account locking, middleware-enforced role boundaries, validated document upload pipelines (CNIC, Student ID, Photos), and an immutable `activity_logs` audit trail recording every state mutation.",
    codebaseSpec: {
      pattern: "Custom Core\\Router (Regex URI Params) + Middleware Pipeline",
      modules: "Admission, Room, Fee, Complaint, Report, Log, Student, Profile, Dashboard",
      schema: "15 Tables (roles, users, students, rooms, room_allocations, fees, payments, activity_logs...)",
    },
    stack: [
      "PHP 8 (Custom MVC)",
      "OOP & Middleware",
      "MySQL (15 Tables)",
      "Bootstrap 5",
      "Chart.js",
      "Apache mod_rewrite",
    ],
    github: "https://github.com/faheemcodes/hostel_management_system",
    liveDemo: null,
  },
  {
    index: "CS-03",
    repoSlug: "faheemcodes/salonhub",
    status: "Live Frontend + PHP Core",
    title: "SalonHub — Multi-Vendor Salon & Booking Platform",
    tagline:
      "3-tier B2B2C marketplace connecting customers, salon owners, and platform admins with real-time shop status, booking slots, and subscription control.",
    metrics: [
      { value: "3 Portals", label: "User / Vendor / Admin" },
      { value: "OOP MySQLi", label: "Prepared Wrapper" },
      { value: "4 Tables", label: "Booking & Ledger DB" },
      { value: "WhatsApp", label: "Booking Triggers" },
    ],
    highlights: [
      "3-tier architecture separating Customer Discovery, Vendor Dashboard & Admin Panel",
      "Synchronized real-time shop Open/Closed state across relational vendor tables",
      "Dual revenue ledger tracking online bookings & walk-in manual_payments",
      "Admin onboarding verification (CNIC/payment proof) & subscription renewal engine",
    ],
    problem:
      "Independent salons lacked a shared marketplace to onboard their shops, display service pricing, toggle real-time open/closed availability, track walk-in vs. online revenue, and confirm bookings without manual phone coordination.",
    architecture:
      "Built as three dedicated portals (`user/index.php`, `vendor/VendorShop.php`, `admin/AdminPanel.php`) backed by a custom OOP `Database` wrapper using parameterized `mysqli` statements (`prepare` / `bind_param`) over `register_shop`, `vendor_accounts`, `appointments`, and `manual_payments`.",
    security:
      "Parameterized `mysqli` query binding (`bind_param`), strict `htmlspecialchars()` output encoding across session state, CNIC and payment-proof verification prior to shop activation, and atomic status updates.",
    codebaseSpec: {
      pattern: "3-Tier Portal System + Custom OOP MySQLi Database Wrapper",
      modules: "VendorShop.php, Registershop.php, AdminPanel.php, user/index.php",
      schema: "4 Tables (register_shop, vendor_accounts, appointments, manual_payments)",
    },
    stack: [
      "PHP (OOP MySQLi)",
      "MySQL",
      "JavaScript (ES6+)",
      "Responsive CSS3",
      "Swiper.js",
      "WhatsApp URL API",
    ],
    github: "https://github.com/faheemcodes/salonhub",
    liveDemo: "https://salonhub-phi.vercel.app",
  },
];

export const experience = [
  {
    period: "June 2026 — July 2026",
    title: "Team Lead — Web Development (Internship)",
    organization: "TECHNIFY",
    description:
      "Led student developer teams through web development deliverables and sprint milestones. Coordinated task breakdown, reviewed peer code for clean structure and functional accuracy, guided teammates through Git branching and merge conflict resolution, and built responsive UI modules.",
    hollow: false,
  },
  {
    period: "2023 — Present (Final Year)",
    title: "BS Software Engineering",
    organization: "University of Sindh, Jamshoro",
    description:
      "Final-year undergraduate in Software Engineering. Core focus on Database Management Systems (DBMS), Object-Oriented Analysis & Design, Web Engineering, Data Structures, and Information Security. Applying academic theory directly to custom MVC and relational database systems.",
    hollow: false,
  },
  {
    period: "Ongoing Practice",
    title: "Full-Stack Systems & Architecture Lab",
    organization: "faheem.devlabs",
    description:
      "Building and deploying full-stack web applications from scratch — focusing on custom PHP MVC architectures, normalized MySQL schemas, defensive web security (CSRF/XSS/SQLi mitigation), and clean React interfaces.",
    hollow: true,
  },
];

export const certifications = [
  {
    code: "AI",
    title: "Google AI Fundamentals",
    issuer: "Coursera / Google",
  },
  {
    code: "SE",
    title: "BS Software Engineering (Final-Year Track)",
    issuer: "University of Sindh, Jamshoro",
  },
];
