import { useRef, useState, useEffect, useCallback } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface GlassNavActiveTabProps {
  links: NavLink[];
  defaultActive?: string;
}

export default function GlassNavActiveTab({ links, defaultActive }: GlassNavActiveTabProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(defaultActive ?? null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const indicatorOn = hovered ?? active;

  const updateIndicator = useCallback(() => {
    if (!indicatorOn || !navRef.current) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const el = linkRefs.current.get(indicatorOn);
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - navRect.left,
      top: elRect.top - navRect.top,
      width: elRect.width,
      height: elRect.height,
      opacity: 1,
      background:
        active === indicatorOn && hovered === null
          ? "rgba(255,255,255,0.22)"
          : "rgba(255,255,255,0.15)",
    });
  }, [indicatorOn, active, hovered]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  return (
    <nav
      ref={navRef}
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
      {/* Single indicator that slides via CSS transition */}
      <div
        className="absolute rounded-lg pointer-events-none"
        style={{
          ...indicatorStyle,
          transition: "left 0.45s ease, width 0.45s ease, opacity 0.2s ease, background 0.2s ease",
        }}
      />

      <div className="relative flex items-center gap-1 px-2 py-1.5">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linkRefs.current.set(link.href, el);
            }}
            className="relative px-3 py-1.5 text-white font-medium text-[15px] no-underline"
            onMouseEnter={() => setHovered(link.href)}
            onClick={() => setActive(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
