import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export default function SectionHeading({ children, id, className = "" }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`font-semibold tracking-tight text-3xl md:text-4xl text-text-primary mb-12 md:mb-16 border-b border-border-muted pb-4 ${className}`}
    >
      {children}
    </h2>
  );
}
