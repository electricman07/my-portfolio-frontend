import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function LoadingBar() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // 1. Ensure we only run logic on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: any;
    if (isLoading) {
      timer = setTimeout(() => setVisible(true), 100);
    } else {
      setVisible(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  // 2. DO NOT render anything during SSR or before mounting
  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="loader-bar"
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "90%", opacity: 1 }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{
            width: { type: "spring", stiffness: 10, damping: 20 },
            opacity: { duration: 0.2 },
          }}
          className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-blue-400 z-9999 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        />
      )}
    </AnimatePresence>
  );
}
