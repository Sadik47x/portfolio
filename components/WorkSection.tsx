"use client";

import React, { useRef, useLayoutEffect } from "react";
import { projects } from "@/data/projects";
import ScreenshotFrame from "./ui/ScreenshotFrame";
import TechBadge from "./ui/TechBadge";
import Button from "./ui/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);

  const cleanMess = projects.find((p) => p.slug === "cleanmess")!;
  const beatMess = projects.find((p) => p.slug === "beatmess")!;
  const railVista = projects.find((p) => p.slug === "railvista")!;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: Pinned timeline transition
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: true,
          },
        });

        // 1. Work Intro -> CleanMess (Slide 1)
        // CleanMess enters via a circular expanding clip-path
        tl.fromTo(
          p1Ref.current,
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(130% at 50% 50%)", duration: 25, ease: "none" }
        );

        // Within CleanMess, animate content elements sequentially
        const p1 = p1Ref.current;
        if (p1) {
          const info = p1.querySelector(".project-info-block");
          const visual = p1.querySelector(".project-visual-block");
          if (info && visual) {
            tl.fromTo(info, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 10, ease: "power2.out" }, "<+=2");
            tl.fromTo(visual, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 10, ease: "power2.out" }, "<");
          }
        }

        // --- STABLE STATE 1: Keep CleanMess fully visible and resting for a bit ---
        tl.to({}, { duration: 40 });

        // 2. CleanMess -> BeatMess (Slide 2)
        // CleanMess scales down slightly and fades
        tl.to(p1Ref.current, { scale: 0.96, opacity: 0.75, duration: 15, ease: "none" });

        // BeatMess enters via inset clip path from the right
        tl.fromTo(
          p2Ref.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 25, ease: "none" },
          "<"
        );

        // BeatMess details reveal
        const p2 = p2Ref.current;
        if (p2) {
          const info = p2.querySelector(".project-info-block");
          const visual = p2.querySelector(".project-visual-block");
          if (info && visual) {
            tl.fromTo(info, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 10, ease: "power2.out" }, "<+=2");
            tl.fromTo(visual, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 10, ease: "power2.out" }, "<");
          }
        }

        // --- STABLE STATE 2: Keep BeatMess fully visible and resting ---
        tl.to({}, { duration: 40 });

        // 3. BeatMess -> RailVista (Slide 3)
        // BeatMess scales down and fades
        tl.to(p2Ref.current, { scale: 0.96, opacity: 0.75, duration: 15, ease: "none" });

        // RailVista enters via diagonal clip path
        tl.fromTo(
          p3Ref.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 25, ease: "none" },
          "<"
        );

        // RailVista details reveal
        const p3 = p3Ref.current;
        if (p3) {
          const info = p3.querySelector(".project-info-block");
          const visual = p3.querySelector(".project-visual-block");
          if (info && visual) {
            tl.fromTo(info, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 10, ease: "power2.out" }, "<+=2");
            tl.fromTo(visual, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 10, ease: "power2.out" }, "<");
          }
        }

        // --- STABLE STATE 3: Keep RailVista resting before unpinning ---
        tl.to({}, { duration: 25 });
      });

      // Mobile/Tablet layout: No pinning, static block flow elements
      mm.add("(max-width: 768px)", () => {
        gsap.set([p1Ref.current, p2Ref.current, p3Ref.current], {
          clipPath: "none",
          scale: 1,
          opacity: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full md:h-[1600vh]">
      <div className="relative md:sticky md:top-0 md:left-0 w-full h-auto md:h-screen overflow-visible md:overflow-hidden bg-background flex flex-col justify-center md:z-20">
        
        {/* Layer 0: Work Intro */}
        <div
          ref={introRef}
          className="relative md:absolute md:inset-0 w-full h-auto md:h-full flex flex-col justify-center bg-background z-10 py-20 md:py-0 border-t border-border-muted md:border-t-0"
        >
          <div className="max-w-container-max-width mx-auto px-gutter w-full text-center flex flex-col items-center justify-center gap-6">
            <span className="font-mono text-xs tracking-widest font-bold text-primary uppercase">
              Selected Work
            </span>
            <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary max-w-3xl leading-[1.1]">
              A few things I've designed, built, and shipped.
            </h2>
            <div className="w-12 h-[1px] bg-border-muted my-4"></div>
            <p className="text-sm md:text-base text-text-secondary max-w-md">
              Scroll down to explore the case studies, structural layouts, and engineering highlights.
            </p>
          </div>
        </div>

        {/* Layer 1: CleanMess (Text left, Mockup right) */}
        <div
          ref={p1Ref}
          className="relative md:absolute md:inset-0 w-full h-auto md:h-full flex flex-col justify-center bg-card z-20 py-20 md:py-0 border-t border-border-muted md:border-t-0 overflow-hidden"
          style={{ clipPath: typeof window !== "undefined" && window.innerWidth > 768 ? "circle(0% at 50% 50%)" : "none" }}
        >
          <div className="max-w-container-max-width mx-auto px-gutter w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Info (Scrollable details panel) */}
            <div className="project-info-block md:col-span-5 flex flex-col gap-4 text-left order-1 max-h-[80vh] overflow-y-auto pr-3 custom-scrollbar">
              <span className="font-mono text-xs tracking-widest font-semibold text-primary uppercase">
                Project 01 / 03
              </span>
              <h3 className="font-bold text-3xl text-text-primary tracking-tight">
                {cleanMess.name}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
                {cleanMess.tagline}
              </p>

              {/* Problem / Solution Narrative */}
              <div className="flex flex-col gap-3 mt-1 bg-surface-low border border-border-muted p-4 rounded-xl">
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-1">The Problem</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{cleanMess.problem}</p>
                </div>
                <div className="border-t border-border-muted pt-2.5">
                  <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-1">The Solution</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{cleanMess.solution}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-2">Key Features</h4>
                <ul className="list-disc pl-4 text-xs text-text-secondary flex flex-col gap-1.5 leading-relaxed">
                  {cleanMess.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cleanMess.techStack.map((tech) => (
                    <TechBadge key={tech.technology}>{tech.technology}</TechBadge>
                  ))}
                </div>
              </div>

              {/* Engineering Highlight */}
              <div className="text-xs text-text-secondary border-l-2 border-primary/30 pl-4 py-1.5 italic leading-relaxed bg-surface-low/30 rounded-r-lg">
                <span className="font-bold text-text-primary block not-italic text-[10px] font-mono uppercase mb-0.5">Concurrency Highlight</span>
                {cleanMess.highlights[0]}
              </div>

              <div className="flex items-center gap-3 mt-3 pt-2 border-t border-border-muted">
                <Button href={cleanMess.liveUrl} variant="primary" className="px-6 py-3 text-xs">
                  Live Demo
                </Button>
                {cleanMess.githubUrl && (
                  <Button href={cleanMess.githubUrl} variant="secondary" className="px-6 py-3 text-xs">
                    GitHub
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column: Visual */}
            <div className="project-visual-block md:col-span-7 w-full order-2">
              <ScreenshotFrame
                screenshots={cleanMess.screenshots}
                projectName={cleanMess.name}
                url={cleanMess.liveUrl}
                layoutType={cleanMess.layoutType}
              />
            </div>
          </div>
        </div>

        {/* Layer 2: BeatMess (Mockup left, Text right on desktop) */}
        <div
          ref={p2Ref}
          className="relative md:absolute md:inset-0 w-full h-auto md:h-full flex flex-col justify-center bg-background z-30 py-20 md:py-0 border-t border-border-muted md:border-t-0 overflow-hidden"
          style={{ clipPath: typeof window !== "undefined" && window.innerWidth > 768 ? "inset(0% 0% 0% 100%)" : "none" }}
        >
          <div className="max-w-container-max-width mx-auto px-gutter w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Visual Column */}
            <div className="project-visual-block md:col-span-7 w-full order-2 md:order-1">
              <ScreenshotFrame
                screenshots={beatMess.screenshots}
                projectName={beatMess.name}
                url={beatMess.liveUrl}
                layoutType={beatMess.layoutType}
              />
            </div>

            {/* Info Column */}
            <div className="project-info-block md:col-span-5 flex flex-col gap-4 text-left order-1 md:order-2 max-h-[80vh] overflow-y-auto pr-3 custom-scrollbar">
              <span className="font-mono text-xs tracking-widest font-semibold text-primary uppercase">
                Project 02 / 03
              </span>
              <h3 className="font-bold text-3xl text-text-primary tracking-tight">
                {beatMess.name}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
                {beatMess.tagline}
              </p>

              {/* Problem / Solution Narrative */}
              <div className="flex flex-col gap-3 mt-1 bg-surface-low border border-border-muted p-4 rounded-xl">
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-1">The Problem</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{beatMess.problem}</p>
                </div>
                <div className="border-t border-border-muted pt-2.5">
                  <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-1">The Solution</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{beatMess.solution}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-2">Key Features</h4>
                <ul className="list-disc pl-4 text-xs text-text-secondary flex flex-col gap-1.5 leading-relaxed">
                  {beatMess.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {beatMess.techStack.map((tech) => (
                    <TechBadge key={tech.technology}>{tech.technology}</TechBadge>
                  ))}
                </div>
              </div>

              {/* Engineering Highlight */}
              <div className="text-xs text-text-secondary border-l-2 border-primary/30 pl-4 py-1.5 italic leading-relaxed bg-surface-low/30 rounded-r-lg">
                <span className="font-bold text-text-primary block not-italic text-[10px] font-mono uppercase mb-0.5">Algorithm Highlight</span>
                {beatMess.highlights[0]}
              </div>

              <div className="flex items-center gap-3 mt-3 pt-2 border-t border-border-muted">
                <Button href={beatMess.liveUrl} variant="primary" className="px-6 py-3 text-xs">
                  Live Demo
                </Button>
                {beatMess.githubUrl && (
                  <Button href={beatMess.githubUrl} variant="secondary" className="px-6 py-3 text-xs">
                    GitHub
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: RailVista (Text left, Mockup right) */}
        <div
          ref={p3Ref}
          className="relative md:absolute md:inset-0 w-full h-auto md:h-full flex flex-col justify-center bg-card z-40 py-20 md:py-0 border-t border-border-muted md:border-t-0 overflow-hidden"
          style={{ clipPath: typeof window !== "undefined" && window.innerWidth > 768 ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" : "none" }}
        >
          <div className="max-w-container-max-width mx-auto px-gutter w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Info */}
            <div className="project-info-block md:col-span-5 flex flex-col gap-4 text-left order-1 max-h-[80vh] overflow-y-auto pr-3 custom-scrollbar">
              <span className="font-mono text-xs tracking-widest font-semibold text-primary uppercase">
                Project 03 / 03
              </span>
              <h3 className="font-bold text-3xl text-text-primary tracking-tight">
                {railVista.name}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
                {railVista.tagline}
              </p>

              {/* Problem / Solution Narrative */}
              <div className="flex flex-col gap-3 mt-1 bg-surface-low border border-border-muted p-4 rounded-xl">
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-1">The Problem</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{railVista.problem}</p>
                </div>
                <div className="border-t border-border-muted pt-2.5">
                  <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-1">The Solution</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{railVista.solution}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-2">Key Features</h4>
                <ul className="list-disc pl-4 text-xs text-text-secondary flex flex-col gap-1.5 leading-relaxed">
                  {railVista.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {railVista.techStack.map((tech) => (
                    <TechBadge key={tech.technology}>{tech.technology}</TechBadge>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="flex flex-col gap-2 bg-surface-low/30 p-3 border-l-2 border-primary/30 rounded-r-lg">
                <h4 className="font-mono text-[10px] tracking-wider font-bold text-text-primary uppercase">Security & Scale Highlights</h4>
                <ul className="list-disc pl-4 text-xs text-text-secondary flex flex-col gap-1 leading-relaxed">
                  {railVista.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 mt-3 pt-2 border-t border-border-muted">
                <Button href={railVista.liveUrl} variant="primary" className="px-6 py-3 text-xs">
                  Live Demo
                </Button>
                {railVista.githubUrl && (
                  <Button href={railVista.githubUrl} variant="secondary" className="px-6 py-3 text-xs">
                    GitHub
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column: Visual */}
            <div className="project-visual-block md:col-span-7 w-full order-2">
              <ScreenshotFrame
                screenshots={railVista.screenshots}
                projectName={railVista.name}
                url={railVista.liveUrl}
                layoutType={railVista.layoutType}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
