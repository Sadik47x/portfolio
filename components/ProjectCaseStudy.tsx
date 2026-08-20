"use client";

import React from "react";
import { Project } from "@/data/projects";
import ScreenshotFrame from "./ui/ScreenshotFrame";
import TechBadge from "./ui/TechBadge";
import Button from "./ui/Button";

type ProjectCaseStudyProps = {
  project: Project;
};

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  // Pad the index to two digits (e.g., 01, 02)
  const formattedIndex = project.order.toString().padStart(2, "0");

  return (
    <article className="reveal flex flex-col gap-10 md:gap-14 border-t border-border-muted pt-16 md:pt-24 first:border-t-0 first:pt-0">
      {/* Project Title and Header Block */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="font-mono text-sm tracking-widest font-semibold text-primary uppercase block mb-2">
            Project {formattedIndex}
          </span>
          <h3 className="font-bold text-3xl md:text-4xl text-text-primary tracking-tight mb-3">
            {project.name}
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>
        
        {/* Project Links CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <Button href={project.liveUrl} variant="primary" className="px-5 py-2.5 text-xs">
            Live Demo
          </Button>
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="secondary" className="px-5 py-2.5 text-xs">
              GitHub
            </Button>
          )}
        </div>
      </div>

      {/* Visual Mockup Showcase Frame */}
      <div className="w-full reveal-signature">
        <ScreenshotFrame
          screenshots={project.screenshots}
          projectName={project.name}
          url={project.liveUrl}
          layoutType={project.layoutType}
        />
      </div>

      {/* Narrative: Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase">
            The Problem
          </h4>
          <p className="text-sm md:text-base leading-relaxed text-text-secondary">
            {project.problem}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase">
            The Solution
          </h4>
          <p className="text-sm md:text-base leading-relaxed text-text-secondary">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Deep Dive Section: Highlights and Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-border-muted pt-8 md:pt-12">
        {/* Key Features (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <h4 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase">
            Key Capabilities
          </h4>
          <ul className="space-y-3.5">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-text-secondary leading-relaxed">
                <span className="text-primary mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engineering Highlights & Tech Stack (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          {/* Highlighted Architecture Decision */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase">
              Engineering Deep Dive
            </h4>
            <div className="space-y-4">
              {project.highlights.map((highlight, idx) => {
                const [title, desc] = highlight.split(": ");
                return (
                  <div key={idx} className="bg-surface-low border border-border-muted p-4 rounded-xl">
                    <h5 className="font-semibold text-sm text-text-primary mb-1">
                      {title}
                    </h5>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack Badge List */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs tracking-widest font-bold text-text-primary uppercase">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <TechBadge key={tech.technology}>
                  {tech.technology}
                </TechBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
