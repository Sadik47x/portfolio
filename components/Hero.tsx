"use client";

import React from "react";
import Image from "next/image";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section
      className="max-w-container-max-width mx-auto px-gutter pt-28 md:pt-40 pb-20 md:pb-32 flex flex-col md:flex-row items-center gap-12 md:gap-16 bg-background"
    >
      {/* Hero Left Column: Text Content */}
      <div className="w-full md:w-[60%] flex flex-col items-start gap-8">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-[64px] tracking-tight leading-[1.1] text-text-primary hero-fade-up">
          Hi, I'm Sadik —
          <br />I build products
          <br />for the web.
        </h1>
        
        <p className="text-base sm:text-lg leading-relaxed text-text-secondary max-w-[540px] hero-fade-up delay-100">
          I'm a Computer Science student at Aliah University and a full-stack developer who ships. My work spans real-time booking systems, secure authentication, and interactive UI — built with React, Node, and modern cloud infrastructure, and backed by a daily DSA practice.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 hero-fade-up delay-200">
          <Button href="#work" variant="primary">
            View my work
          </Button>
          
          <Button href="#contact" variant="secondary">
            Let's connect
          </Button>
          
          <Button href="/resume.pdf" variant="link" className="ml-2">
            Resume <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </div>
      </div>

      {/* Hero Right Column: Profile Image / Monogram Placeholder */}
      <div className="w-full md:w-[40%] flex justify-center hero-fade-up delay-300">
        <div className="relative aspect-square w-full max-w-[340px] md:max-w-none rounded-2xl overflow-hidden project-frame bg-surface-low border border-border-muted group">
          {/* Subtle duotone gradient filter overlay */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-color-burn z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-20"></div>
          
          <Image
            src="/images/hero-portrait.png"
            alt="Sadik Mondal - Full-Stack Developer & CS Student"
            fill
            priority
            sizes="(max-width: 768px) 340px, 450px"
            className="object-cover transition-all duration-300 filter grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:scale-102"
          />
          
          {/* Soft vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
