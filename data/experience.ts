export type TimelineItem = {
  role: string;
  company: string;
  duration: string;
  type: "Internship" | "Job Simulation" | "Certification";
  description: string;
  credentialUrl?: string; // Pointing to the PDFs in /certificates
};

export const timelineItems: TimelineItem[] = [
  {
    role: "Web Development Intern",
    company: "VaultofCodes",
    duration: "August 2025",
    type: "Internship",
    description: "Developed and maintained core features for internal web applications, focusing on responsive design, database schema updates, and REST API routes.",
    credentialUrl: "/certificates/vaultofcodes-internship.pdf"
  },
  {
    role: "Cybersecurity Analyst",
    company: "Tata (via Forage)",
    duration: "July 2025",
    type: "Job Simulation",
    description: "Completed simulated cybersecurity exercises focusing on Identity & Access Management (IAM) fundamentals, strategic vulnerability assessment, and custom security solution design.",
    credentialUrl: "/certificates/forage-cybersecurity.pdf"
  }
];

export type CertificationItem = {
  name: string;
  issuer: string;
  date: string;
  status: "Completed" | "In Progress";
  credentialUrl?: string;
};

export const certifications: CertificationItem[] = [
  {
    name: "C++ & Data Structures and Algorithms",
    issuer: "Apna College",
    date: "2025",
    status: "Completed"
  },
  {
    name: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata (Forage)",
    date: "July 2025",
    status: "Completed",
    credentialUrl: "/certificates/forage-cybersecurity.pdf"
  },
  {
    name: "Web Development Internship",
    issuer: "VaultofCodes",
    date: "August 2025",
    status: "Completed",
    credentialUrl: "/certificates/vaultofcodes-internship.pdf"
  },
  {
    name: "Frontend Web Development",
    issuer: "Udemy",
    date: "2025",
    status: "In Progress"
  }
];
