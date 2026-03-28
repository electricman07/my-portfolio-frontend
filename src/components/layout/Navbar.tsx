import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FaBars, FaX } from "react-icons/fa6";
import { ThemeToggle } from "./ThemeToggle";
import { SOCIALS } from "../../lib/socials";
import { NAV_LINKS } from "../../lib/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-slate-300 dark:border-slate-800 bg-slate-200/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-500 shadow-[0_4px_20px_-5px_rgba(15,23,42,0.1)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-sm group-hover:border-blue-500 transition-all">
              <img
                src="../../../public/Avatar50.png"
                alt="Glen"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                G
              </div>
            </div>

            <span className="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">
              Glen<span className="text-blue-500">.</span>
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

        {/* Middle: Desktop Links */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-2 lg:gap-4 mx-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                link.isCTA
                  ? "px-5 py-2.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 ml-2"
                  : `text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors 
            ${link.name === "FAQ" || link.name === "Tech Stack" ? "hidden 2xl:block" : ""}`
              }
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Socials & Toggle */}
        <div className="flex items-center gap-4">
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
        <div
          className={`
      fixed inset-0 
      z-40 
      flex flex-col 
      h-screen w-screen
      bg-white dark:bg-slate-950 
      p-8 pt-24
      transition-all duration-500 ease-in-out
      ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
    `}
        >
          <div className="flex flex-col gap-6 text-center grow justify-center">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-8">
            {SOCIALS.map(({ Icon, href }, i) => (
              <a key={i} href={href}>
                <Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
