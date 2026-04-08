import { useState } from "react";

interface GlassMuteButtonProps {
  defaultMuted?: boolean;
  onChange?: (muted: boolean) => void;
}

export default function GlassMuteButton({
  defaultMuted = false,
  onChange,
}: GlassMuteButtonProps) {
  const [muted, setMuted] = useState(defaultMuted);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute" : "Mute"}
      aria-pressed={muted}
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
      {muted ? (
        // Volume off
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
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      ) : (
        // Volume on
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
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
