"use client";

import { useEffect, useRef } from "react";
import Button from "./ui/Button";

type CertificateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
};

export default function CertificateModal({ isOpen, onClose, pdfUrl, title }: CertificateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle clicking outside modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 dark:bg-[#0B0B0D]/90 backdrop-blur-sm modal-backdrop-animate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-card border border-border-muted rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden relative modal-content-animate"
      >
        {/* Modal Header */}
        <div className="h-14 border-b border-border-muted flex items-center justify-between px-6 bg-[#FAFAF9] dark:bg-[#141416]">
          <h3 id="modal-title" className="font-semibold text-sm text-text-primary truncate pr-4">
            Credential: {title}
          </h3>
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-low border border-transparent hover:border-border-muted transition-all duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body / PDF Iframe */}
        <div className="flex-1 bg-[#FAFAF9] dark:bg-[#0B0B0D] relative flex flex-col justify-between">
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            title={title}
            className="w-full h-full border-0 hidden md:block"
          />
          
          {/* Mobile Fallback or Quick actions */}
          <div className="md:hidden flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
            <svg className="w-16 h-16 text-text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div>
              <h4 className="font-semibold text-text-primary mb-1">View Certificate PDF</h4>
              <p className="text-xs text-text-secondary max-w-xs mx-auto">
                Direct PDF viewing is optimized for larger screens. Click below to view or download the credential.
              </p>
            </div>
            <Button href={pdfUrl} variant="primary" className="py-2.5 text-xs">
              Open Certificate
            </Button>
          </div>
        </div>

        {/* Modal Footer (Actions) */}
        <div className="h-14 border-t border-border-muted flex items-center justify-end px-6 gap-3 bg-[#FAFAF9] dark:bg-[#141416]">
          <Button href={pdfUrl} variant="secondary" className="px-4 py-1.5 text-xs">
            Open in new tab
          </Button>
          <Button onClick={onClose} variant="primary" className="px-4 py-1.5 text-xs">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
