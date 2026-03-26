import { useState } from "react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs px-3 py-1 rounded-md transition-all font-medium"
        style={{
          background: copied ? "rgba(134,239,172,0.2)" : "rgba(255,255,255,0.1)",
          color: copied ? "#86efac" : "rgba(255,255,255,0.7)",
          border: `1px solid ${copied ? "rgba(134,239,172,0.3)" : "rgba(255,255,255,0.15)"}`,
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-5 pr-20 text-sm leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "ui-monospace, monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
