#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// ─── Component definitions ────────────────────────────────────────────────────

const COMPONENTS = {
  GlassNav: {
    name: "GlassNav",
    description:
      "Floating frosted-glass navigation bar. Fixed to the top center of the viewport. Accepts an array of { label, href } links.",
    props: [
      { name: "links", type: "{ label: string; href: string }[]", required: true, description: "Navigation links to render" },
    ],
    source: `interface NavLink {
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
}`,
    usage: `import GlassNav from './components/GlassNav'

const links = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Food Reviews", href: "/food-reviews" },
]

export default function Page() {
  return (
    <main>
      <GlassNav links={links} />
      {/* page content */}
    </main>
  )
}`,
  },

  GlassCard: {
    name: "GlassCard",
    description:
      "Sticky frosted-glass card pinned to the bottom-left of the viewport. Stays fixed while scrolling through its parent section, then naturally scrolls away when the section ends.",
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Content to render inside the card" },
      { name: "cardHeight", type: "number", required: false, description: "Approximate card height in px (default: 160). Used to calculate when to unpin." },
      { name: "bottomOffset", type: "number", required: false, description: "Distance from viewport bottom in px (default: 32)" },
    ],
    source: `import { useEffect, useRef, useState, type ReactNode } from "react";

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
}`,
    usage: `import GlassCard from './components/GlassCard'

export default function Page() {
  return (
    <main className="min-h-[150vh] relative">
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
}`,
  },
} as const;

type ComponentName = keyof typeof COMPONENTS;

const SETUP_INSTRUCTIONS = `## Setup — React + TailwindCSS v4

1. Install TailwindCSS v4:
   npm install -D tailwindcss @tailwindcss/vite

2. In vite.config.ts:
   import tailwindcss from '@tailwindcss/vite'
   export default { plugins: [tailwindcss()] }

3. In index.css:
   @import "tailwindcss";
   @theme {
     --color-white: #ffffff; /* required — text-white won't work without this */
     --color-black: #000000;
   }

4. Copy the component files into src/components/

Source: https://github.com/conniexu444/glass-components
Demo:   https://conniexu444.github.io/glass-components/`;

// ─── MCP Server ───────────────────────────────────────────────────────────────

const server = new Server(
  { name: "glass-components", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {} } }
);

// ── Tools ────────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_components",
      description: "List all available glass components with their descriptions and props.",
      inputSchema: { type: "object", properties: {}, required: [] },
    },
    {
      name: "get_component",
      description: "Get the full source code and usage example for a specific component.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            enum: Object.keys(COMPONENTS),
            description: "Component name (GlassNav or GlassCard)",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_setup",
      description: "Get TailwindCSS v4 setup instructions required to use these components.",
      inputSchema: { type: "object", properties: {}, required: [] },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "list_components") {
    const list = Object.values(COMPONENTS).map((c) => {
      const propSummary = c.props
        .map((p) => `  • ${p.name}${p.required ? "" : "?"}: ${p.type} — ${p.description}`)
        .join("\n");
      return `### ${c.name}\n${c.description}\n\nProps:\n${propSummary}`;
    });
    return {
      content: [{ type: "text", text: list.join("\n\n---\n\n") }],
    };
  }

  if (name === "get_component") {
    const parsed = z.object({ name: z.enum(["GlassNav", "GlassCard"]) }).parse(args);
    const component = COMPONENTS[parsed.name as ComponentName];
    const text = [
      `# ${component.name}`,
      `${component.description}`,
      `## Props`,
      component.props.map((p) => `- \`${p.name}${p.required ? "" : "?"}: ${p.type}\` — ${p.description}`).join("\n"),
      `## Source`,
      "```tsx",
      component.source,
      "```",
      `## Usage`,
      "```tsx",
      component.usage,
      "```",
    ].join("\n\n");
    return { content: [{ type: "text", text }] };
  }

  if (name === "get_setup") {
    return { content: [{ type: "text", text: SETUP_INSTRUCTIONS }] };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// ── Resources ────────────────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: Object.values(COMPONENTS).map((c) => ({
    uri: `glass-components://component/${c.name}`,
    name: c.name,
    description: c.description,
    mimeType: "text/plain",
  })),
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const match = uri.match(/^glass-components:\/\/component\/(.+)$/);
  if (!match) throw new Error(`Unknown resource: ${uri}`);

  const componentName = match[1] as ComponentName;
  const component = COMPONENTS[componentName];
  if (!component) throw new Error(`Component not found: ${componentName}`);

  return {
    contents: [
      {
        uri,
        mimeType: "text/plain",
        text: component.source,
      },
    ],
  };
});

// ── Start ─────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
