import React from "react";
import Button from "./ui/Button";

export default function DsaSection() {
  const points = [
    "100+ algorithmic problems solved across LeetCode and GeeksforGeeks.",
    "Solid coverage of core structures: arrays, strings, trees, linked lists, recursion, and dynamic programming.",
    "Completed Apna College's comprehensive C++ & DSA course (2025).",
    "Familiarity and exposure to heaps, graphs, tries, and segment trees.",
    "Maintains a consistent daily problem-solving habit to refine algorithmic thinking."
  ];

  return (
    <section id="dsa" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28 reveal">
      <div className="bg-surface-low border border-border-muted p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-8 items-center justify-between">
        {/* Left Column: Heading and Description */}
        <div className="max-w-xl flex flex-col items-start gap-4">
          <span className="font-mono text-xs tracking-widest font-bold text-primary uppercase">
            Problem Solving
          </span>
          <h3 className="font-bold text-2xl md:text-3xl tracking-tight text-text-primary">
            Beyond the UI, I care about how things work.
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-text-secondary">
            Writing front-ends is only half the battle. Algorithmic training teaches me to reason about runtime complexity, memory cost, and edge cases. I apply this rigorous analysis directly to application scaling and optimization.
          </p>
          <Button href="https://leetcode.com/u/Sadik47x" variant="secondary" className="mt-2 text-xs px-5 py-2.5">
            LeetCode Profile 
            <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </div>

        {/* Right Column: Key Details */}
        <div className="w-full md:w-auto md:min-w-[320px] bg-card border border-border-muted p-6 md:p-8 rounded-xl shadow-sm self-stretch flex flex-col justify-center gap-4">
          <h4 className="font-mono text-[10px] tracking-widest font-bold text-text-primary uppercase border-b border-border-muted pb-2">
            Algorithms & DSA Focus
          </h4>
          <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex gap-2 text-xs md:text-sm text-text-secondary leading-normal">
                <span className="text-primary font-bold shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
