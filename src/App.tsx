import './index.css'
import GlassNav from './components/GlassNav'
import GlassCard from './components/GlassCard'

const links = [
  { label: "About", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Miscellaneous", href: "#" },
  { label: "Food Reviews", href: "#" },
]

export default function App() {
  return (
    <main
      className="min-h-[150vh] relative flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ background: "linear-gradient(to bottom, #87CEEB, #4a90d9, #1a3a6e)" }}
    >
      <GlassNav links={links} />

      <div className="flex-1 flex items-center justify-center">
        <h1
          className="text-6xl"
          style={{ fontFamily: "Georgia, serif", color: "#ffffff" }}
        >
          Your Name
        </h1>
      </div>

      <GlassCard cardHeight={160} bottomOffset={32}>
        <p className="text-white text-lg font-medium leading-snug mb-3">
          Your headline here.
        </p>
        <p className="text-white/70 text-sm leading-relaxed">
          A short description about yourself.
        </p>
      </GlassCard>
    </main>
  )
}
