import './index.css'
import GlassNav from './components/GlassNav'
import ShowcaseCard from './components/ShowcaseCard'
import CodeBlock from './components/CodeBlock'

const GLASS_NAV_CODE = `import { useRef } from "react";

interface NavLink {
  label: string;
  href: string;
}

export default function GlassNav({ links }: { links: NavLink[] }) {
  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border"
      style={{
        backdropFilter: "blur(9px)",
        WebkitBackdropFilter: "blur(9px)",
        background:
          "linear-gradient(to right, rgba(249,250,247,0.12), rgba(249,250,247,0.18))",
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
}`;

const GLASS_CARD_CODE = `import { useEffect, useRef, useState, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
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
          bottom: \`\${bottomOffset}px\`,
          left: "2rem",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.07))",
          boxShadow: "rgba(0,0,0,0.15) 0px 2px 6px 0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}`;

const USAGE_CODE = `// Install TailwindCSS v4 first:
// npm install -D tailwindcss @tailwindcss/vite

// In vite.config.ts:
import tailwindcss from '@tailwindcss/vite'
export default { plugins: [tailwindcss()] }

// In index.css:
@import "tailwindcss";
@theme {
  --color-white: #ffffff; /* required for text-white to work */
}

// Usage:
import GlassNav from './components/GlassNav'
import GlassCard from './components/GlassCard'

const links = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
]

export default function Page() {
  return (
    <main className="min-h-[150vh] relative">
      <GlassNav links={links} />
      <GlassCard cardHeight={160} bottomOffset={32}>
        <p className="text-white text-lg font-medium">Your headline.</p>
        <p className="text-white/70 text-sm">A short description.</p>
      </GlassCard>
    </main>
  )
}`;

const navLinks = [
  { label: "GlassNav", href: "#glassnav" },
  { label: "GlassCard", href: "#glasscard" },
  { label: "GitHub", href: "https://github.com/conniexu444/glass-components" },
]

export default function App() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <GlassNav links={navLinks} />

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center pt-40 pb-20 px-6">
        <span
          className="text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
        >
          React + TailwindCSS v4
        </span>
        <h1 className="text-5xl font-bold mb-4" style={{ color: "#ffffff", letterSpacing: "-0.02em" }}>
          Glass Components
        </h1>
        <p className="text-lg max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
          Frosted-glass UI primitives for React. Copy, paste, done.
        </p>
        <a
          href="https://github.com/conniexu444/glass-components"
          target="_blank"
          rel="noreferrer"
          className="mt-8 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          View on GitHub →
        </a>
      </div>

      {/* Components */}
      <div className="max-w-3xl mx-auto px-6 pb-32 flex flex-col gap-8">

        {/* Setup */}
        <div>
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Setup
          </h2>
          <CodeBlock code={USAGE_CODE} />
        </div>

        {/* GlassNav */}
        <div id="glassnav">
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Components
          </h2>
          <ShowcaseCard
            title="GlassNav"
            description="Floating frosted-glass navigation bar. Fixed to the top center of the viewport."
            code={GLASS_NAV_CODE}
            preview={
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <nav
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backdropFilter: "blur(9px)",
                    WebkitBackdropFilter: "blur(9px)",
                    background: "linear-gradient(to right, rgba(249,250,247,0.12), rgba(249,250,247,0.18))",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "rgba(0,0,0,0.15) 0px 2px 6px 0px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div style={{ display: "flex", gap: "24px", padding: "8px 12px", alignItems: "center" }}>
                    {["About", "Journal", "Miscellaneous", "Food Reviews"].map((l) => (
                      <span key={l} style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>{l}</span>
                    ))}
                  </div>
                </nav>
              </div>
            }
          />
        </div>

        {/* GlassCard */}
        <div id="glasscard">
          <ShowcaseCard
            title="GlassCard"
            description="Sticky frosted-glass card pinned to the bottom-left. Scrolls away when the section ends."
            code={GLASS_CARD_CODE}
            preview={
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: "24px" }}>
                <div
                  style={{
                    maxWidth: "280px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "24px",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    background: "linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.07))",
                    boxShadow: "rgba(0,0,0,0.15) 0px 2px 6px 0px",
                  }}
                >
                  <p style={{ color: "#fff", fontSize: "17px", fontWeight: 500, margin: "0 0 8px" }}>
                    Software engineer based in New York.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>
                    I like building things, writing, and exploring the city.
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
