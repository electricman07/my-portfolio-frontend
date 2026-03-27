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
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Title */}
        <Link to="/" className="text-xl font-bold tracking-tighter">
          GLEN.PORTFOLIO
        </Link>

        {/* Middle: Desktop Links */}
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium hover:text-blue-500 transition-colors [&.active]:text-blue-600 [&.active]:font-bold"
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
