#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const components = {
  GlassNav: {
    file: path.join(rootDir, "src/components/GlassNav.tsx"),
    description: "Floating frosted-glass navigation bar.",
  },
  GlassNavAnimated: {
    file: path.join(rootDir, "src/components/GlassNavAnimated.tsx"),
    description: "Glass navigation bar with an animated hover indicator.",
  },
  GlassCard: {
    file: path.join(rootDir, "src/components/GlassCard.tsx"),
    description: "Sticky frosted-glass card pinned near the viewport bottom-left.",
  },
};

const aliases = Object.fromEntries(
  Object.keys(components).flatMap((name) => {
    const normalized = normalizeName(name);
    return [[normalized, name], [name.toLowerCase(), name]];
  }),
);

function normalizeName(value) {
  return value.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function resolveComponentName(value) {
  return aliases[normalizeName(value)] ?? null;
}

function printHelp() {
  console.log(`glass-components CLI

Usage:
  glass-components list
  glass-components get <component>
  glass-components <component>

Examples:
  npm run component -- GlassNav
  npm run component -- get glass-card
  node ./bin/glass-components.js list`);
}

function printList() {
  const entries = Object.entries(components)
    .map(([name, component]) => `${name} - ${component.description}`)
    .join("\n");

  console.log(entries);
}

function printComponent(name) {
  const resolvedName = resolveComponentName(name);

  if (!resolvedName) {
    console.error(`Unknown component: ${name}`);
    console.error("\nAvailable components:");
    printList();
    process.exitCode = 1;
    return;
  }

  const source = readFileSync(components[resolvedName].file, "utf8");
  process.stdout.write(source);
}

const [command, maybeName] = process.argv.slice(2);

if (!command || command === "--help" || command === "-h" || command === "help") {
  printHelp();
} else if (command === "list" || command === "--list") {
  printList();
} else if (command === "get") {
  if (!maybeName) {
    console.error("Missing component name.\n");
    printHelp();
    process.exitCode = 1;
  } else {
    printComponent(maybeName);
  }
} else {
  printComponent(command);
}
