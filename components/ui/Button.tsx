import Link from "next/link";
import React from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link";
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
  ariaLabel,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-medium text-sm transition-all duration-150 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "btn-primary px-6 py-3 text-white shadow-sm hover:scale-[0.98]",
    secondary: "btn-secondary px-6 py-3 border border-border-muted hover:border-primary hover:text-primary",
    link: "text-text-secondary hover:text-primary transition-colors duration-150 link-underline font-medium",
  };

  const selectedClass = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          className={selectedClass}
          target={target || (href.startsWith("mailto:") ? undefined : "_blank")}
          rel={rel || (href.startsWith("mailto:") ? undefined : "noopener noreferrer")}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={selectedClass} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={selectedClass}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
