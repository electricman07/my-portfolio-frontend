import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FaBars, FaX } from "react-icons/fa6";
import { ThemeToggle } from "../layout/ThemeToggle";
import { SOCIALS } from "../../lib/socials";

import { DesktopNav } from "../navigation/DesktopNav";
import { MoreMenu } from "../navigation/MoreMenu";
import { MobileNav } from "../navigation/MobileNav";
import { ClientOnly } from "../ui/ClientOnly";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b-2 border-slate-300 dark:border-slate-800 bg-slate-200/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-500 shadow-[0_4px_20px_-5px_rgba(15,23,42,0.1)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
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
            GP Digital Design<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-6">
          <DesktopNav />
          <MoreMenu />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-3 border-r border-slate-300 dark:border-slate-700 pr-4">
            {SOCIALS.map(({ Icon, href, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="aspect-square bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800 group shadow-sm"
              >
                <span className="text-blue-500 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </span>
              </a>
            ))}
          </div>

          <ThemeToggle />

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-60 relative"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? (
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

      {/* Mobile Menu */}
      <ClientOnly>
        <MobileNav open={open} close={() => setOpen(false)} />
      </ClientOnly>
    </nav>
  );
}
