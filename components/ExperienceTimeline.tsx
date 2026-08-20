"use client";

import React, { useState } from "react";
import { timelineItems, certifications } from "@/data/experience";
import SectionHeading from "./ui/SectionHeading";
import CertificateModal from "./CertificateModal";

export default function ExperienceTimeline() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePdfUrl, setActivePdfUrl] = useState("");
  const [activePdfTitle, setActivePdfTitle] = useState("");

  const openCertificate = (pdfUrl: string, title: string) => {
    setActivePdfUrl(pdfUrl);
    setActivePdfTitle(title);
    setModalOpen(true);
  };

  return (
    <section id="experience" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 reveal">
        {/* Left Column: Experience Timeline (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <SectionHeading className="!mb-8">Experience</SectionHeading>
          
          <div className="relative border-l border-border-muted pl-6 ml-2 space-y-12">
            {timelineItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute w-3 h-3 rounded-full -left-[31px] top-1.5 bg-background dark:bg-[#0B0B0D] border-2 border-primary group-hover:scale-110 transition-transform"></div>
                
                <div className="flex flex-col items-start gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-base md:text-lg text-text-primary">
                      {item.role}
                    </h3>
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-primary px-2 py-0.5 border border-primary/20 bg-primary/5 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  
                  <span className="text-xs font-medium text-text-secondary">
                    {item.company} &middot; {item.duration}
                  </span>
                  
                  <p className="text-xs md:text-sm leading-relaxed text-text-secondary mt-2">
                    {item.description}
                  </p>

                  {item.credentialUrl && (
                    <button
                      onClick={() => openCertificate(item.credentialUrl!, `${item.role} - ${item.company}`)}
                      className="mt-3 text-xs font-medium text-primary hover:text-primary-hover hover:underline flex items-center gap-1 group/btn"
                    >
                      View Credential
                      <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <SectionHeading className="!mb-8">Certifications</SectionHeading>
          
          <div className="flex flex-col gap-5">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-card border border-border-muted hover:border-primary/30 p-4 rounded-xl shadow-sm flex items-start justify-between gap-4 transition-all duration-200"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-sm text-text-primary leading-snug pr-2">
                    {cert.name}
                  </h4>
                  <span className="text-xs text-text-secondary">
                    {cert.issuer} &middot; {cert.date}
                  </span>
                </div>
                
                <div className="flex flex-col items-end justify-between h-full shrink-0 gap-2">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                      cert.status === "Completed"
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                        : "text-text-secondary bg-surface-low border-border-muted"
                    }`}
                  >
                    {cert.status}
                  </span>

                  {cert.credentialUrl && cert.status === "Completed" && (
                    <button
                      onClick={() => openCertificate(cert.credentialUrl!, cert.name)}
                      className="text-xs text-primary hover:text-primary-hover hover:underline"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Viewer Lightbox */}
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl={activePdfUrl}
        title={activePdfTitle}
      />
    </section>
  );
}
