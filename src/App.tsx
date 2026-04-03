import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import GlassNav from './components/GlassNav'
import ShowcaseCard from './components/ShowcaseCard'
import CodeBlock from './components/CodeBlock'
import glassNavSource from './components/GlassNav.tsx?raw'
import glassNavAnimatedSource from './components/GlassNavAnimated.tsx?raw'
import glassNavActiveTabSource from './components/GlassNavActiveTab.tsx?raw'
import glassCardSource from './components/GlassCard.tsx?raw'

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

// Inline preview for GlassNavAnimated (can't use fixed positioning inside a showcase box)
function GlassNavAnimatedPreview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const links = ["About", "Journal", "Miscellaneous", "Food Reviews"];
  return (
    <div
      className="rounded-xl border flex items-center"
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
        {links.map((label) => (
          <div
            key={label}
            className="relative px-3 py-1.5 text-white font-medium text-[15px] cursor-pointer"
            onMouseEnter={() => setHovered(label)}
          >
            <AnimatePresence initial={false}>
              {hovered === label && (
                <motion.div
                  layoutId="glass-nav-preview-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlassNavActiveTabPreview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>("About");
  const links = ["About", "Journal", "Miscellaneous", "Food Reviews"];
  const indicatorOn = hovered ?? active;
  return (
    <div
      className="rounded-xl border flex items-center"
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
        {links.map((label) => (
          <div
            key={label}
            className="relative px-3 py-1.5 text-white font-medium text-[15px] cursor-pointer"
            onMouseEnter={() => setHovered(label)}
            onClick={() => setActive(label)}
          >
            <AnimatePresence initial={false}>
              {indicatorOn === label && (
                <motion.div
                  layoutId="glass-nav-active-tab-preview-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      active === label && hovered === null
                        ? "rgba(255,255,255,0.22)"
                        : "rgba(255,255,255,0.15)",
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
            variants={[
              {
                label: "Default",
                code: glassNavSource,
                preview: (
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
                ),
              },
              {
                label: "Animated",
                code: glassNavAnimatedSource,
                preview: <GlassNavAnimatedPreview />,
              },
              {
                label: "Active Tab",
                code: glassNavActiveTabSource,
                preview: <GlassNavActiveTabPreview />,
              },
            ]}
          />
        </div>

        {/* GlassCard */}
        <div id="glasscard">
          <ShowcaseCard
            title="GlassCard"
            description="Sticky frosted-glass card pinned to the bottom-left. Scrolls away when the section ends."
            code={glassCardSource}
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
                    Lorem ipsum dolor sit amet.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>
                    Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
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
