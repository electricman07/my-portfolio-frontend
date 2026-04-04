import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { SOCIALS } from "../../lib/socials";
import {
  NAV_LINKS_PRIMARY,
  NAV_LINKS_SECONDARY,
  SUPPORT_LINKS,
  LEGAL_LINKS,
} from "../../lib/navigation";
import { FaBars, FaX, FaChevronDown } from "react-icons/fa6";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-slate-300 dark:border-slate-800 bg-slate-200/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-500 shadow-[0_4px_20px_-5px_rgba(15,23,42,0.1)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-sm group-hover:border-blue-500 transition-all">
              <img
                src="/Avatar50.png"
                alt="Glen"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">
              GP Digital Studio<span className="text-blue-500">.</span>
            </span>
          </Link>

          <div className="flex flex-row items-center whitespace-nowrap gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-800">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Accepting Projects
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 justify-center gap-6">
          {NAV_LINKS_PRIMARY.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.name}
            </Link>
          ))}

          {/* More Options Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              More{" "}
              <span
                className={` text-[10px] transition-transform duration-300 ${isMoreOpen ? "rotate-180" : ""}`}
              >
                <FaChevronDown />
              </span>
            </button>

            {isMoreOpen && (
              <div className="absolute top-full mt-4 w-56 right-0 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                {/* Secondary Links */}
                <div className="flex flex-col gap-1">
                  {NAV_LINKS_SECONDARY.map((link) => (
                    <div
                      key={link.to}
                      className="px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-500 transition-all"
                    >
                      <Link
                        to={link.to}
                        className={
                          link.isCTA
                            ? "px-5 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                            : "text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors"
                        }
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-2" />

                {/* Support Links */}
                <div className="flex flex-col gap-1">
                  {SUPPORT_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMoreOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-500 transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-2" />

                {/* Legal Links */}
                <div className="flex flex-col gap-1">
                  {LEGAL_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMoreOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Socials & Toggle */}
        <div
          className="flex items-center gap-4"
          aria-label="Social Media links"
        >
          <div className="hidden lg:flex gap-3 border-r border-slate-300 dark:border-slate-700 pr-4">
            {SOCIALS.map(({ Icon, href, name }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1  hover:bg-white dark:hover:bg-slate-800 group shadow-sm"
              >
                {/* Using the consistent Blue-500 to match your Email icon above */}
                <span className="text-blue-500 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </span>
              </a>
            ))}
          </div>
          <ThemeToggle />
          {/* Mobile Hamburger Morph */}
          <button
            className="md:hidden z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <span className="text-[28px] animate-in spin-in-90 duration-300">
                <FaX />
              </span>
            ) : (
              <span className="text-[28px] animate-in fade-in duration-300">
                <FaBars />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-slate-950 p-8 pt-24 overflow-y-auto animate-in slide-in-from-top duration-500">
          <div className="flex flex-col gap-6 text-center">
            {[
              ...NAV_LINKS_PRIMARY,
              ...NAV_LINKS_SECONDARY,
              ...SUPPORT_LINKS,
              ...LEGAL_LINKS,
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-xl font-black uppercase tracking-widest hover:text-blue-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
