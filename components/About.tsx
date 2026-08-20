import React from "react";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  const principles = [
    {
      title: "Build",
      description: "I turn ideas into working software, not slide decks. Delivery is the ultimate verification of design."
    },
    {
      title: "Understand",
      description: "APIs, databases, state, and performance are where the real engineering lives. I care about the layers below the interface."
    },
    {
      title: "Improve",
      description: "Code and understanding both get revised, not written once. Continuous refactoring leads to reliable software."
    }
  ];

  return (
    <section id="about" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28">
      <SectionHeading className="reveal">About</SectionHeading>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start reveal">
        {/* About Paragraph (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-bold text-xl md:text-2xl text-text-primary tracking-tight">
            I learn best by building.
          </h3>
          
          <p className="text-sm md:text-base leading-relaxed text-text-secondary">
            I'm a Computer Science student at Aliah University, and most of what I know about engineering came from finishing things — not from finishing a course. I build full-stack products end to end: UI, API, database, deployment.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed text-text-secondary">
            I care about what's happening underneath the interface — how a query performs under load, how auth actually keeps data private, and how a seat reservation stays correct when two people click &ldquo;book&rdquo; at the same time.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed text-text-secondary">
            Alongside building, I practice data structures and algorithms daily, because the two skills sharpen each other: DSA teaches you to reason about correctness and cost; shipping teaches you to reason about tradeoffs and users.
          </p>
        </div>

        {/* Mindset / How I Think Principles (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h4 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase border-b border-border-muted pb-3">
            Mindset
          </h4>
          
          <div className="flex flex-col gap-6">
            {principles.map((principle) => (
              <div key={principle.title} className="flex gap-4 items-start">
                <span className="font-mono text-xs tracking-widest font-bold text-primary w-24 shrink-0 uppercase mt-1">
                  {principle.title}
                </span>
                
                <p className="text-xs md:text-sm leading-relaxed text-text-secondary">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
