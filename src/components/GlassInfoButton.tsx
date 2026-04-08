interface GlassInfoButtonProps {
  onClick?: () => void;
}

export default function GlassInfoButton({ onClick }: GlassInfoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Information"
      className="relative flex items-center justify-center rounded-xl border transition-opacity hover:opacity-80"
      style={{
        width: "44px",
        height: "44px",
        backdropFilter: "blur(9px)",
        WebkitBackdropFilter: "blur(9px)",
        background:
          "linear-gradient(to right, rgba(249,250,247,0.12), rgba(249,250,247,0.18))",
        borderColor: "rgba(255,255,255,0.2)",
        boxShadow: "rgba(0,0,0,0.15) 0px 2px 6px 0px",
        cursor: "pointer",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="12" y1="7.5" x2="12" y2="7.5" />
      </svg>
    </button>
  );
}
