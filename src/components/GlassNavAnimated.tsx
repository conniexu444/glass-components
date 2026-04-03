import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface GlassNavAnimatedProps {
  links: NavLink[];
}

export default function GlassNavAnimated({ links }: GlassNavAnimatedProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border"
      style={{
        backdropFilter: "blur(9px)",
        WebkitBackdropFilter: "blur(9px)",
        background: "linear-gradient(to right, rgba(249,250,247,0.12), rgba(249,250,247,0.18))",
        borderColor: "rgba(255,255,255,0.2)",
        boxShadow: "rgba(0,0,0,0.15) 0px 2px 6px 0px",
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex items-center gap-1 px-2 py-1.5">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative px-3 py-1.5 text-white font-medium text-[15px] transition-opacity no-underline"
            onMouseEnter={() => setHovered(link.href)}
          >
            <AnimatePresence initial={false}>
              {hovered === link.href && (
                <motion.div
                  layoutId="glass-nav-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
