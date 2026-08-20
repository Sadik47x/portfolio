export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Build with",
    skills: ["C++", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3", "Responsive Design", "Component Architecture"]
  },
  {
    title: "Think with",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "Socket.io", "PostgreSQL", "Supabase", "MongoDB", "Mongoose"]
  },
  {
    title: "Ship with",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render", "npm"]
  },
  {
    title: "CS Fundamentals",
    skills: ["Data Structures & Algorithms", "OOP", "Recursion", "Trees", "Linked Lists", "Arrays"]
  }
];
