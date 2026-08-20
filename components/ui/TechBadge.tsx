import React from "react";

type TechBadgeProps = {
  children: string;
};

export default function TechBadge({ children }: TechBadgeProps) {
  return (
    <span className="tech-chip whitespace-nowrap">
      {children}
    </span>
  );
}
