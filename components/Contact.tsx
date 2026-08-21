"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";

type FormState = "idle" | "validating" | "transmitting" | "success";

interface ToastState {
  show: boolean;
  title: string;
  message: string;
}

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormState>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Trigger global toast notifications
  const showToastNotification = (title: string, message: string) => {
    setToast({ show: true, title, message });
  };

  // Auto-hide toast notification after 4.5 seconds
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const copyEmail = () => {
    navigator.clipboard.writeText("sadikmondal789@gmail.com");
    showToastNotification(
      "Email Address Copied!",
      "sadikmondal789@gmail.com has been copied to your clipboard."
    );
  };

  const handleDirectMailClick = (e: React.MouseEvent) => {
    // Backup copy to clipboard in case mailto link fails to launch
    navigator.clipboard.writeText("sadikmondal789@gmail.com");
    showToastNotification(
      "Launching Email Client",
      "sadikmondal789@gmail.com copied to clipboard. Opening mail client..."
    );
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFormOpen(false);
        setFormStatus("idle");
        setLogs([]);
      }
    };

    if (isFormOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsFormOpen(false);
      setFormStatus("idle");
      setLogs([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("validating");
    setLogs(["Connecting to server...", "Verifying message details..."]);

    try {
      // Step 1: Validate details
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogs((prev) => [...prev, "[✓] Message details verified.", "Sending message..."]);
      setFormStatus("transmitting");

      // Step 2: Make actual network request to Web3Forms directly (Client-side)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "29d571a4-a309-47aa-baf9-53550f7bf176",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Sadik Mondal Portfolio",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email via Web3Forms.");
      }

      // Step 3: Trigger local background logging (for terminal output & messages.txt)
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (localLogErr) {
        console.warn("Local logging API call failed:", localLogErr);
      }

      // Step 4: Complete transmission & display success message
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLogs([
        "Connecting to server...",
        "[✓] Message details verified.",
        "Sending message...",
        "[✓] Server response: 200 OK",
        `[✓] Success! Thank you ${formData.name}, your message is logged.`,
      ]);
      setFormStatus("success");
      
      // Trigger success toast notification!
      showToastNotification(
        "Message Transmitted!",
        `Connection established. Thank you ${formData.name}, your message was successfully sent to Sadik.`
      );
    } catch (error: any) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogs((prev) => [
        ...prev,
        `[✗] Error: ${error.message || "Failed to send message."}`,
      ]);
      setFormStatus("idle");
      showToastNotification(
        "Transmission Failed",
        error.message || "Failed to send message. Please try again."
      );
    }
  };

  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sadik-mondal",
      username: "in/sadik-mondal",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/Sadik47x",
      username: "github.com/Sadik47x",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      )
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/Sadik47x",
      username: "u/Sadik47x",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6" />
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sadik.fl",
      username: "sadik.fl",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="max-w-container-max-width mx-auto px-gutter py-20 md:py-28 text-center relative">
      
      {/* Premium Toast Notification Popup */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 max-w-sm w-full bg-card/95 border border-border-muted rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-slide-in-right backdrop-blur-md">
          <div className="p-2 bg-primary/10 rounded-xl text-primary shrink-0">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <h4 className="text-xs font-bold text-text-primary leading-none">{toast.title}</h4>
            <p className="text-[10px] text-text-secondary leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 reveal">
        <span className="font-mono text-xs tracking-widest font-bold text-primary uppercase">
          Get In Touch
        </span>
        
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-text-primary leading-[1.15]">
          Have a project, opportunity, or problem worth solving?
        </h2>
        
        <p className="text-sm md:text-base leading-relaxed text-text-secondary max-w-lg mx-auto">
          I'm looking for internships and opportunities to build. Reach out — I read everything.
        </p>

        {/* Primary Let's Talk CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button
            onClick={() => setIsFormOpen(true)}
            variant="primary"
            className="px-8 py-4 text-sm"
          >
            Let's talk
          </Button>

          {/* Copy-to-clipboard email button */}
          <button
            onClick={copyEmail}
            className="px-6 py-4 text-xs font-semibold rounded-xl border border-border-muted hover:border-primary transition-all duration-150 flex items-center gap-2 bg-card text-text-primary group"
          >
            <svg className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>sadikmondal789@gmail.com</span>
          </button>
        </div>

        {/* Social Link Grid (4 Columns) */}
        <div className="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card border border-border-muted hover:border-primary rounded-xl text-text-secondary hover:text-primary transition-all duration-200"
            >
              <span className="shrink-0 text-text-secondary/70 group-hover:text-primary">
                {social.icon}
              </span>
              <div className="flex flex-col items-start text-left truncate">
                <span className="text-xs font-semibold text-text-primary leading-none mb-1">
                  {social.name}
                </span>
                <span className="text-[10px] text-text-secondary leading-none truncate max-w-full">
                  {social.username}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Developer-Themed Modal Form */}
      {isFormOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 dark:bg-[#0B0B0D]/95 backdrop-blur-md modal-backdrop-animate"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            className="bg-card border border-border-muted rounded-2xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden relative modal-content-animate text-left"
          >
            {/* Header */}
            <div className="h-14 border-b border-border-muted flex items-center justify-between px-6 bg-[#FAFAF9] dark:bg-[#141416]">
              <h3 className="font-mono text-xs tracking-wider font-bold text-text-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Transmit Message
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setFormStatus("idle");
                  setLogs([]);
                }}
                className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-low border border-transparent hover:border-border-muted transition-all duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-6 bg-[#FAFAF9] dark:bg-[#0B0B0D]">
              {formStatus !== "success" ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-mono font-semibold text-text-secondary uppercase">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={formStatus !== "idle"}
                      className="px-4 py-3 text-sm rounded-xl border border-border-muted bg-card text-text-primary focus:outline-none focus:border-primary disabled:opacity-50"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-mono font-semibold text-text-secondary uppercase">
                      Your Email Address (For my reply)
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={formStatus !== "idle"}
                      className="px-4 py-3 text-sm rounded-xl border border-border-muted bg-card text-text-primary focus:outline-none focus:border-primary disabled:opacity-50"
                      placeholder="your.name@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono font-semibold text-text-secondary uppercase">
                      Your Message
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={formStatus !== "idle"}
                      className="px-4 py-3 text-sm rounded-xl border border-border-muted bg-card text-text-primary focus:outline-none focus:border-primary resize-none disabled:opacity-50"
                      placeholder="Write your proposal, idea, or questions here..."
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono text-text-secondary">
                      Prefer standard mail?{" "}
                      <a 
                        onClick={handleDirectMailClick}
                        href="mailto:sadikmondal789@gmail.com" 
                        className="text-primary hover:underline font-bold cursor-pointer"
                      >
                        Direct Link
                      </a>
                    </span>
                    <Button
                      type="submit"
                      variant="primary"
                      className="px-6 py-3 text-xs"
                      disabled={formStatus !== "idle"}
                    >
                      {formStatus === "idle" ? "Send Message" : "Processing..."}
                    </Button>
                  </div>
                </form>
              ) : null}

              {/* Console log output area */}
              {logs.length > 0 && (
                <div className="w-full bg-[#0B0B0D] border border-border-muted rounded-xl p-4 font-mono text-[10px] text-emerald-400 overflow-x-auto shadow-inner flex flex-col gap-1.5">
                  {logs.map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-relaxed">
                      {log}
                    </div>
                  ))}
                  {formStatus === "transmitting" && (
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      <span className="animate-pulse">Uploading bytes to server...</span>
                    </div>
                  )}
                  {formStatus === "success" && (
                    <div className="mt-4 flex flex-col items-start gap-4">
                      <div className="text-emerald-500 font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Message dispatched successfully.
                      </div>
                      <Button
                        onClick={() => {
                          setIsFormOpen(false);
                          setFormData({ name: "", email: "", message: "" });
                          setFormStatus("idle");
                          setLogs([]);
                        }}
                        variant="secondary"
                        className="px-4 py-2 text-[10px] font-mono border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:text-emerald-300"
                      >
                        Exit Session
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
