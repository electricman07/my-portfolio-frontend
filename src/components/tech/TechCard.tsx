import { useState } from "react";

import { Link } from "@tanstack/react-router";

interface TechCardProps {
  id: string;
  name: string;
  Icon: any;
  color: string;
}

const premiumCardClasses = `
    p-6 flex flex-col items-center justify-center gap-4 text-center
    bg-[#F8FAFC] dark:bg-slate-900 
    border-2 border-slate-300 dark:border-slate-600 
    rounded-[2rem] shadow-sm hover:border-blue-500 transition-all duration-300
  `;

export function TechCard({ id, name, Icon, color }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/tech-stack/$techId"
      params={{ techId: id }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={premiumCardClasses}
    >
      <div className="w-20 h-20 flex items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors duration-500 shadow-inner">
        <Icon
          size={48}
          style={{
            color: isHovered ? color : "#94a3b8",
            filter: isHovered ? `drop-shadow(0 0 8px ${color}44)` : "none",
          }}
          className="transform group-hover:scale-110 transition-all duration-500 will-change-transform"
        />
      </div>

      <span className="font-black text-sm uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-500">
        {name}
      </span>
    </Link>
  );
}
