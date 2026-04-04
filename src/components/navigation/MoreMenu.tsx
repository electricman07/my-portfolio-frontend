import { useState, useRef, useEffect } from "react";
import type { NavLink } from "../../lib/navigation";

import { NavLinkItem } from "./NavLinkItem";
import {
  NAV_LINKS_SECONDARY,
  SUPPORT_LINKS,
  LEGAL_LINKS,
} from "../../lib/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";

type SectionProps = {
  links: NavLink[];
  onClick?: () => void;
};

export function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors"
      >
        More
        <span
          className={`text-[10px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <FaChevronDown />
        </span>
      </button>

      {open && (
        <div className="text-[20px] absolute top-full mt-4 w-64 left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-black/10 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-200">
          {/* Secondary Links */}
          <div className="flex flex-col gap-2">
            {NAV_LINKS_SECONDARY.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg 
          text-xs font-black uppercase tracking-widest 
          hover:bg-slate-100 dark:hover:bg-slate-800/60 
          transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-300 dark:bg-slate-700/60" />

          {/* Support Links */}
          <div className="flex flex-col gap-2">
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg 
          text-xs font-black uppercase tracking-widest text-slate-500 
          hover:bg-slate-100 dark:hover:bg-slate-800/60 
          transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-300 dark:bg-slate-700/60" />

          {/* Legal Links */}
          <div className="flex flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg 
          text-xs font-black uppercase tracking-widest text-slate-400 
          hover:bg-slate-100 dark:hover:bg-slate-800/60 
          transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Section({ links, onClick }: SectionProps) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      {links.map((link) => (
        <NavLinkItem key={link.to} link={link} onClick={onClick} />
      ))}
    </div>
  );
}
