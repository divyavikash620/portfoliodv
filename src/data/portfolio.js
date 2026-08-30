export const profile = {
  name: "Divya Vikash",
  initials: "DV",
  role: "Computer Science Student",
  school: "Lovely Professional University",
  statement:
    "I like understanding how things work beneath the surface — so I learn by building.",
  email: "divyavikash620@gmail.com",
  linkedin: "https://linkedin.com/in/divya-vikash-518776384",
  github: "https://github.com/divyavikash620",
};

export const projects = [
  {
    id: "sms",
    number: "01",
    title: ["Student", "Management", "System"],
    flat: "Student Management System",
    date: "July 2025",
    summary:
      "A Java console application to manage student records and academic information — marks, attendance, fees, payments and courses.",
    points: [
      "OOP principles with ArrayList-based data management",
      "CRUD operations, searching, sorting and validation",
      "Basic reporting and file-based persistence",
    ],
    tech: ["Java", "OOP", "ArrayList", "File Handling"],
  },
  {
    id: "minidb",
    number: "02",
    title: ["MiniDB"],
    flat: "MiniDB",
    date: "July 2025",
    summary:
      "A C++ in-memory relational database system built with OOP principles — database, table, schema, column and row components.",
    points: [
      "Typed data system using std::variant",
      "Schema validation and constraint validation",
      "Full CRUD operations over in-memory tables",
    ],
    tech: ["C++", "OOP", "STL", "std::variant"],
  },
  {
    id: "wdte",
    number: "03",
    title: ["WDTE", "Why Does", "This Exist?"],
    flat: "WDTE — Why Does This Exist?",
    date: "August 2025",
    summary:
      "An AI-powered UI reverse-engineering platform that analyzes uploaded interface screenshots, tracing visible components back to the user needs and product decisions behind them.",
    points: [
      "Feature detection with a 5-stage analytical pipeline",
      "7-part feature breakdown with observed vs inferred boundaries",
      "Responsive dark / light themes",
    ],
    tech: ["JavaScript", "CSS", "Gemini API"],
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
  { name: "C++", group: "Language", note: "Powers MiniDB — its typed rows and schema engine." },
  { name: "JavaScript", group: "Language", note: "The language behind WDTE's analysis interface." },
  { name: "C", group: "Language", note: "Where data structures and algorithms were learned first." },
  { name: "Java", group: "Language", note: "Used to build the Student Management System." },
  { name: "Python", group: "Language", note: "Scripting and quick problem solving." },
  { name: "HTML", group: "Web", note: "Structure for WDTE and the web work." },
  { name: "CSS", group: "Web", note: "Responsive dark / light theming in WDTE." },
  { name: "PostgreSQL", group: "Data", note: "Relational thinking that fed into MiniDB." },
  { name: "MongoDB", group: "Data", note: "Document-oriented storage." },
  { name: "Git", group: "Tooling", note: "Version control across every project." },
  { name: "GitHub", group: "Tooling", note: "Where the projects live." },
];

export const coding = {
  headline: "500+",
  headlineLabel: "Problems Solved",
  headlineNote: "Across coding platforms",
  cards: [
    { platform: "LeetCode", title: "100 Days", note: "Badge Earned" },
    { platform: "Contests", title: "Biweekly Contest 96", note: "LeetCode" },
    { platform: "Competitive Programming", title: "Starters 76", note: "Division 3" },
  ],
};

export const certificates = [
  { number: "01", title: "Programming using C++", issuer: "Infosys Springboard", meta: "13 hours" },
  { number: "02", title: "Computer Programming", issuer: "NeoColab", meta: "6 months" },
  {
    number: "03",
    title: "Mastering Data Structures and Algorithms using C and C++",
    issuer: "Abdul Bari — Udemy",
    meta: "76 hours",
  },
];
