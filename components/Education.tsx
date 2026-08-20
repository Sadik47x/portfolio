import React from "react";
import SectionHeading from "./ui/SectionHeading";

export default function Education() {
  const educationList = [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Aliah University, Kolkata",
      duration: "2024 – 2028",
      details: "Currently in 3rd year (5th semester). Focus on solid software engineering principles, web systems, database design, and algorithmic problem-solving."
    },
    {
      degree: "Higher Secondary (Class XII, Science)",
      institution: "Ramakrishna Mission Vidyapith, Purulia",
      duration: "2021 – 2023",
      details: "Graduated with 87% overall score. Built strong analytical foundations in Mathematics, Physics, and Chemistry within a rigorous boarding school environment."
    }
  ];

  const courses = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems (DBMS)",
    "Operating Systems (OS)",
    "Computer Networks (CN)",
    "Discrete Mathematics"
  ];

  return (
    <section id="education" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 reveal">
        {/* Left Column: Degrees (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <SectionHeading className="!mb-8">Education</SectionHeading>
          
          <div className="flex flex-col gap-8">
            {educationList.map((edu, idx) => (
              <div key={idx} className="flex flex-col gap-2 pb-6 border-b border-border-muted last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h3 className="font-semibold text-base md:text-lg text-text-primary leading-snug">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-mono text-text-secondary shrink-0 mt-0.5 sm:mt-1">
                    {edu.duration}
                  </span>
                </div>
                
                <span className="text-sm font-medium text-primary">
                  {edu.institution}
                </span>
                
                <p className="text-xs md:text-sm leading-relaxed text-text-secondary mt-1">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Relevant Coursework (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <SectionHeading className="!mb-8">Relevant Coursework</SectionHeading>
          
          <div className="bg-surface-low border border-border-muted p-6 md:p-8 rounded-xl flex flex-col gap-4">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              My academic curriculum is augmented by practical development and covers key computer science disciplines:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {courses.map((course) => (
                <div key={course} className="flex items-center gap-2 text-xs md:text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
