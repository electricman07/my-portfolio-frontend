import { useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { NavLinkItem } from "./NavLinkItem";
import {
  NAV_LINKS_PRIMARY,
  NAV_LINKS_SECONDARY,
  SUPPORT_LINKS,
  LEGAL_LINKS,
} from "../../lib/navigation";

type MobileNavProps = {
  open: boolean;
  close: () => void;
};

export function MobileNav({ open, close }: MobileNavProps) {
  const allLinks = [
    ...NAV_LINKS_PRIMARY,
    ...NAV_LINKS_SECONDARY,
    ...SUPPORT_LINKS,
    ...LEGAL_LINKS,
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  // Focus trap + initial focus
  useEffect(() => {
    if (!open) return;

    const previousActive = document.activeElement as HTMLElement | null;

    // Focus first focusable (we'll add a hidden button)
    firstFocusableRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActive?.focus();
    };
  }, [open, close]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    // If user swipes down with enough distance or velocity → close
    if (info.offset.y > 80 || info.velocity.y > 600) {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            className="fixed inset-0 z-50 p-8 pt-24 overflow-y-auto min-h-screen 
                       bg-white/95 dark:bg-slate-950/95"
          >
            {/* Hidden focus sentinel for initial focus */}
            <button
              ref={firstFocusableRef}
              className="sr-only"
              aria-hidden="true"
              tabIndex={0}
            >
              Open mobile navigation
            </button>

            <motion.div
              id="mobile-nav"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col gap-6 text-center"
            >
              {allLinks.map((link) => (
                <motion.div
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLinkItem link={link} onClick={close} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
