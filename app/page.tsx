"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import About from "@/components/About";
import Skills from "@/components/Skills";
import DsaSection from "@/components/DsaSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export default function Home() {
  // 1. Core Reveal IntersectionObserver Logic (for mobile and standard text fade-ups)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Trigger 10% inside viewport bottom
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe standard reveal elements
    const revealElements = document.querySelectorAll(".reveal, .reveal-signature");
    revealElements.forEach((el) => observer.observe(el));

    // Setup MutationObserver to watch client-hydrated elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("reveal") || node.classList.contains("reveal-signature")) {
              observer.observe(node);
            }
            node.querySelectorAll(".reveal, .reveal-signature").forEach((el) => {
              observer.observe(el);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Nav />
      <main className="w-full overflow-x-hidden relative bg-background">
        <Hero />
        
        {/* Selected Work Section */}
        <section id="work" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28">
          <SectionHeading className="reveal">Selected Work</SectionHeading>
          <div className="flex flex-col gap-24 md:gap-36">
            {projects.map((project) => (
              <ProjectCaseStudy key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <About />
        <Skills />
        <DsaSection />
        <ExperienceTimeline />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
