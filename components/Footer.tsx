import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: "https://github.com/Sadik47x" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sadik-mondal" },
    { label: "LeetCode", href: "https://leetcode.com/u/Sadik47x" },
    { label: "Instagram", href: "https://www.instagram.com/sadik.fl" },
    { label: "Email", href: "mailto:sadikmondal789@gmail.com" }
  ];

  return (
    <footer className="w-full bg-[#FAFAF9] dark:bg-[#0B0B0D] border-t border-border-muted py-12 md:py-16 mt-20 transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding & Role */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="font-bold text-base text-text-primary tracking-tight">
            Sadik Mondal
          </span>
          <span className="text-xs text-text-secondary">
            Full-Stack Developer &amp; Software Engineering Student
          </span>
        </div>

        {/* Footer Text Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1">
          <span className="text-xs text-text-secondary">
            &copy; {currentYear} Sadik Mondal. All rights reserved.
          </span>
          <span className="text-[10px] font-mono text-text-secondary/70">
            Built with Next.js &middot; Shipped with intent
          </span>
        </div>
      </div>
    </footer>
  );
}
