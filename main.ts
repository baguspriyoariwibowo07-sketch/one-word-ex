// One Word From Your Ex
// Writes a single one-word entry to /output/entry.txt.
//
// The word: "Rebound" — the word an ex would use to describe you if
// they were being painfully honest: you were never the destination,
// just the in-between after the real one. The field saturates with
// Practice (three entries), Almost (three), Placeholder,
// Exhausting, Forgettable, Potential and Deprecated; "Rebound" is
// the sting nobody used, and it cuts both ways — it says what you
// were to them and quietly admits they went back to comparing
// everyone to the person before you. One word, and it hurts because
// it is a role, not an insult: insults can be argued with, a role
// just gets remembered.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Rebound";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 24 characters, not only white space. The brief asks for
// exactly one word, so validate the word against the same limits
// before writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 24) {
    throw new Error(`word must be 1-24 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word");
  }
}

validateEntry(LINE);

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored word");
  }
}

main();
