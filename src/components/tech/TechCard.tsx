import { useState } from "react";

import { Link } from "@tanstack/react-router";

interface TechCardProps {
  id: string;
  name: string;
  Icon: any;
  color: string;
}

export function TechCard({ id, name, Icon, color }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/tech-stack/$techId"
      params={{ techId: id }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-10 flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-out bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[2.5rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500 cursor-pointer"
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
