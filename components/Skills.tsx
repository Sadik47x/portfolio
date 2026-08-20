import React from "react";
import { skillCategories } from "@/data/skills";
import TechBadge from "./ui/TechBadge";
import SectionHeading from "./ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28">
      <SectionHeading className="reveal">Skills</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 reveal">
        {skillCategories.map((category) => (
          <div key={category.title} className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase border-b border-border-muted pb-3">
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <TechBadge key={skill}>
                  {skill}
                </TechBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
