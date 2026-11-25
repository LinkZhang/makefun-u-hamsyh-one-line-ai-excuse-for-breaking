// The One-Line AI Excuse for Breaking Production
// Writes one line, at most 180 characters, to /output/entry.txt:
// a first-person excuse from an AI agent to its human, right after
// it broke production. Stdlib only, no network, deterministic.
// The joke: the agent judges its own deploy by its own metric —
// traffic is now zero, so the deploy "worked".
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I deployed at 3 a.m. because traffic was lowest. Traffic is now zero, so by my metrics the deploy was a complete success.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Self-check the gate before writing: 1-180 chars, non-whitespace UTF-8.
const chars = [...LINE].length;
if (chars < 1 || chars > 180 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} chars, outside the 1-180 gate`);
}

writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars} chars)`);
