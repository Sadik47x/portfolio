"use client";

import Image from "next/image";
import { useState } from "react";

type Screenshot = {
  src: string;
  alt: string;
};

type ScreenshotFrameProps = {
  screenshots: Screenshot[];
  projectName: string;
  url: string;
  layoutType?: "desktop" | "mobile";
};

export default function ScreenshotFrame({
  screenshots,
  projectName,
  url,
  layoutType = "desktop",
}: ScreenshotFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="project-frame bg-surface-low aspect-video w-full flex items-center justify-center border border-border-muted rounded-xl">
        <span className="text-text-secondary/30 font-medium tracking-wider text-xl uppercase">
          {projectName}
        </span>
      </div>
    );
  }

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const selectSlide = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // Convert url to a clean format for browser address bar, e.g. "cleanmess.app"
  const cleanUrl = url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  // Render Mobile Device Mockup
  if (layoutType === "mobile") {
    return (
      <div className="w-full bg-[#f5f5f4] dark:bg-[#141416]/50 border border-border-muted rounded-2xl flex items-center justify-center p-6 md:p-8 relative group overflow-hidden aspect-[9/16.5] max-w-[280px] mx-auto md:max-w-none md:aspect-video select-none shadow-ambient">
        {/* Phone Mockup Frame */}
        <div className="w-full h-full md:h-full md:w-auto md:aspect-[9/19] bg-[#0c0c0e] border-[8px] md:border-[10px] border-[#242426] rounded-[2.2rem] md:rounded-[2.6rem] shadow-2xl overflow-hidden relative flex flex-col items-center select-none ring-1 ring-border-muted/30">
          
          {/* Dynamic Island / Speaker notch */}
          <div className="absolute top-2 w-[40%] h-4 bg-[#0c0c0e] rounded-full z-30 flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full mr-2"></div>
            <div className="w-1 h-1 bg-[#0a0a0a] rounded-full"></div>
          </div>
          
          {/* Screen Content */}
          <div className="relative w-full h-full bg-[#111111] overflow-hidden rounded-[1.8rem] md:rounded-[2.2rem]">
            {screenshots.map((shot, idx) => (
              <div
                key={shot.src}
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 260px, 350px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls - placed on the outer canvas for easy interaction */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous screenshot"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card/85 dark:bg-card/75 border border-border-muted flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next screenshot"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card/85 dark:bg-card/75 border border-border-muted flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination indicators on the canvas */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-card/80 backdrop-blur-sm border border-border-muted px-2.5 py-1 rounded-full shadow-sm">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => selectSlide(idx, e)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                    idx === currentIndex
                      ? "bg-primary scale-110"
                      : "bg-text-secondary/30 hover:bg-text-secondary/60"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Render Desktop Browser Mockup
  return (
    <div className="project-frame bg-card border border-border-muted rounded-xl flex flex-col w-full relative group shadow-ambient select-none">
      {/* Browser chrome header */}
      <div className="h-10 border-b border-border-muted flex items-center px-4 bg-[#FAFAF9] dark:bg-[#141416] select-none rounded-t-xl">
        {/* Window controls */}
        <div className="flex gap-1.5 w-1/4">
          <div className="w-2.5 h-2.5 rounded-full bg-border-muted dark:bg-border-muted/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-border-muted dark:bg-border-muted/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-border-muted dark:bg-border-muted/30"></div>
        </div>
        
        {/* Address bar */}
        <div className="w-2/4 flex justify-center">
          <div className="bg-background dark:bg-[#0B0B0D] border border-border-muted text-[11px] text-text-secondary/70 px-4 py-0.5 rounded-md truncate max-w-xs text-center">
            {cleanUrl}
          </div>
        </div>
        
        <div className="w-1/4"></div>
      </div>

      {/* Screen area with image and controls */}
      <div className="relative aspect-video w-full overflow-hidden bg-background dark:bg-[#0B0B0D] flex items-center justify-center">
        {screenshots.map((shot, idx) => (
          <div
            key={shot.src}
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              priority={idx === 0}
              className="object-cover object-top rounded-b-xl select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1120px"
            />
          </div>
        ))}

        {/* Navigation arrows (shown on hover if multiple images) */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous screenshot"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card/85 dark:bg-card/75 border border-border-muted flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next screenshot"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card/85 dark:bg-card/75 border border-border-muted flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Pagination indicators */}
      {screenshots.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-card/80 backdrop-blur-sm border border-border-muted px-2.5 py-1 rounded-full shadow-sm">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => selectSlide(idx, e)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                idx === currentIndex
                  ? "bg-primary scale-110"
                  : "bg-text-secondary/30 hover:bg-text-secondary/60"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
