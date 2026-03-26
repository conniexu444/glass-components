import { useEffect, useRef, useState, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  /** Height of the card in px — used to know when to unpin from viewport */
  cardHeight?: number;
  bottomOffset?: number;
}

export default function GlassCard({
  children,
  cardHeight = 160,
  bottomOffset = 32,
}: GlassCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
      setIsFixed(sectionBottom > cardHeight + bottomOffset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardHeight, bottomOffset]);

  return (
    <div ref={sectionRef} className="relative">
      <div
        className="max-w-sm rounded-2xl border border-white/20 p-8 z-40"
        style={{
          position: isFixed ? "fixed" : "absolute",
          bottom: `${bottomOffset}px`,
          left: "2rem",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          background: "linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.07))",
          boxShadow: "rgba(0,0,0,0.15) 0px 2px 6px 0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
