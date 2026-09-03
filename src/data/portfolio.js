export const profile = {
  name: "Divya Vikash",
  initials: "DV",
  role: "Computer Science Student",
  avatar: "/profile.png",
  school: "Lovely Professional University",
  statement: "I like understanding how things work beneath the surface — so I learn by building.",
  email: "divyavikash620@gmail.com",
  phone: "+91 93152 92325",
  phoneHref: "tel:+919315292325",
  address: "Phagwara, Punjab, India",
  location: "Phagwara, Punjab",
  linkedin: "https://linkedin.com/in/divya-vikash-518776384",
  github: "https://github.com/divyavikash620",
  githubUser: "divyavikash620",
  leetcodeUser: "vikash_divya",
  gfgUser: "divyavik48hv",
  leetcode: "https://leetcode.com/u/vikash_divya",
  gfg: "https://www.geeksforgeeks.org/user/divyavik48hv/",
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=divyavikash620@gmail.com&su=Hello%20Divya",
};

export const heroStats = [
  { value: "9.64", label: "CGPA", note: "B.Tech CSE · LPU" },
  { value: "3", label: "Systems built", note: "Java · C++ · JS" },
  { value: "500+", label: "Problems solved", note: "LeetCode · GfG" },
  { value: "2026", label: "Open to intern", note: "Summer cohort" },
];

export const projects = [
  {
    id: "sms",
    number: "01",
    title: ["Student", "Management", "System"],
    flat: "Student Management System",
    date: "July 2025",
    role: "Console application · Java",
    summary:
      "A Java console application to manage student records and academic information — marks, attendance, fees, payments and courses.",
    points: [
      "OOP principles with ArrayList-based data management",
      "CRUD operations, searching, sorting and validation",
      "Basic reporting and file-based persistence",
    ],
    tech: ["Java", "OOP", "ArrayList", "File Handling"],
    repo: "https://github.com/divyavikash620/student-management-system",
    demo: "https://example.com/sms-demo",
  },
  {
    id: "minidb",
    number: "02",
    title: ["MiniDB"],
    flat: "MiniDB",
    date: "July 2025",
    role: "In-memory database engine · C++",
    summary:
      "A C++ in-memory relational database system built with OOP principles — database, table, schema, column and row components.",
    points: [
      "Typed data system using std::variant",
      "Schema validation and constraint validation",
      "Full CRUD operations over in-memory tables",
    ],
    tech: ["C++", "OOP", "STL", "std::variant"],
    repo: "https://github.com/divyavikash620/minidb",
    demo: "https://example.com/minidb-demo",
  },
  {
    id: "wdte",
    number: "03",
    title: ["WDTE", "Why Does", "This Exist?"],
    flat: "WDTE — Why Does This Exist?",
    date: "August 2025",
    role: "AI product · JavaScript + Gemini",
    summary:
      "An AI-powered UI reverse-engineering platform that analyzes uploaded interface screenshots, tracing visible components back to the user needs and product decisions behind them.",
    points: [
      "Feature detection with a 5-stage analytical pipeline",
      "7-part feature breakdown with observed vs inferred boundaries",
      "Responsive dark / light themes",
    ],
    tech: ["JavaScript", "CSS", "Gemini API"],
    repo: "https://github.com/divyavikash620/wdte",
    demo: "https://example.com/wdte-demo",
  },
];

export const education = [
  {
    place: "Lovely Professional University",
    location: "Punjab, India",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    score: "CGPA 9.64",
    period: "Since August 2025",
  },
  {
    place: "Satyam International",
    location: "Patna, Bihar",
    degree: "Intermediate",
    field: "",
    score: "88%",
    period: "April 2022 – March 2024",
  },
  {
    place: "New Era High School",
    location: "Patna, Bihar",
    degree: "Matriculation",
    field: "",
    score: "98%",
    period: "April 2020 – March 2022",
  },
];

export const skills = [
  {
    name: "C++",
    icon: "cplusplus",
    group: "Languages",
    note: "Powers MiniDB — its typed rows and schema engine.",
  },
  {
    name: "C",
    icon: "c",
    group: "Languages",
    note: "Where data structures and algorithms were learned first.",
  },
  {
    name: "Java",
    icon: "java",
    group: "Languages",
    note: "Used to build the Student Management System.",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    group: "Languages",
    note: "The language behind WDTE's analysis interface.",
  },
  {
    name: "Python",
    icon: "python",
    group: "Languages",
    note: "Scripting and quick problem solving.",
  },
  { name: "HTML", icon: "html", group: "Web", note: "Structure for WDTE and the web work." },
  { name: "CSS", icon: "css", group: "Web", note: "Responsive dark / light theming in WDTE." },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    group: "Data",
    note: "Relational thinking that fed into MiniDB.",
  },
  { name: "MongoDB", icon: "mongodb", group: "Data", note: "Document-oriented storage." },
  { name: "Git", icon: "git", group: "Tooling", note: "Version control across every project." },
  { name: "GitHub", icon: "github", group: "Tooling", note: "Where the projects live." },
];

export const codingHighlights = [
  { platform: "LeetCode", title: "100 Days Badge", note: "Daily streak, 2025" },
  { platform: "Contests", title: "Biweekly Contest 96", note: "LeetCode" },
  { platform: "Competitive", title: "Starters 76", note: "Division 3" },
];

export const certificates = [
  {
    number: "01",
    title: "Programming using C++",
    issuer: "Infosys Springboard",
    meta: "13 hours",
    view: "https://example.com/certificates/cpp",
    download: "https://example.com/certificates/cpp.pdf",
  },
  {
    number: "02",
    title: "Computer Programming",
    issuer: "NeoColab",
    meta: "6 months",
    view: "https://example.com/certificates/neocolab",
    download: "https://example.com/certificates/neocolab.pdf",
  },
  {
    number: "03",
    title: "Mastering Data Structures and Algorithms using C and C++",
    issuer: "Abdul Bari — Udemy",
    meta: "76 hours",
    view: "https://example.com/certificates/dsa",
    download: "https://example.com/certificates/dsa.pdf",
  },
];
