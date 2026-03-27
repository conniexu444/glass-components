import { useState, type ReactNode } from "react";
import CodeBlock from "./CodeBlock";

interface Variant {
  label: string;
  preview: ReactNode;
  code: string;
}

interface ShowcaseCardProps {
  title: string;
  description: string;
  preview?: ReactNode;
  code?: string;
  variants?: Variant[];
}

export default function ShowcaseCard({ title, description, preview, code, variants }: ShowcaseCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [activeVariant, setActiveVariant] = useState(0);

  const activePreview = variants ? variants[activeVariant].preview : preview;
  const activeCode = variants ? variants[activeVariant].code : code;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 className="text-white font-semibold text-lg m-0">{title}</h2>
        <p className="text-sm mt-1 m-0" style={{ color: "rgba(255,255,255,0.5)" }}>{description}</p>
      </div>

      {/* Tabs row */}
      <div className="flex items-center justify-between px-5 pt-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Variant pills (left) */}
        <div className="flex gap-1">
          {variants && variants.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setActiveVariant(i)}
              className="px-3 py-1 text-xs font-medium rounded-full transition-colors"
              style={{
                color: activeVariant === i ? "#ffffff" : "rgba(255,255,255,0.4)",
                background: activeVariant === i ? "rgba(255,255,255,0.12)" : "transparent",
                border: activeVariant === i ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                cursor: "pointer",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Preview / Code tabs (right) */}
        <div className="flex gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 text-sm font-medium rounded-t-md capitalize transition-colors"
              style={{
                color: tab === t ? "#ffffff" : "rgba(255,255,255,0.4)",
                borderBottom: tab === t ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
                background: "none",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {tab === "preview" ? (
          <div
            className="rounded-xl flex items-center justify-center overflow-hidden"
            style={{
              minHeight: "220px",
              background: "linear-gradient(135deg, #1a2a4a 0%, #2d1b4e 50%, #1a3a2a 100%)",
              position: "relative",
            }}
          >
            {activePreview}
          </div>
        ) : (
          <CodeBlock code={activeCode ?? ""} />
        )}
      </div>
    </div>
  );
}
