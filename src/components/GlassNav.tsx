interface NavLink {
  label: string;
  href: string;
}

interface GlassNavProps {
  links: NavLink[];
}

export default function GlassNav({ links }: GlassNavProps) {
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
    >
      <div className="flex items-center gap-6 px-3 py-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white font-medium text-[15px] hover:opacity-70 transition-opacity no-underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
