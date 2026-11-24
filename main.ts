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

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Rebound";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 24 characters, not only white space. The brief asks for
// exactly one word, so the entry must also carry no whitespace at
// all. Check those limits before writing.
if (LINE.length < 1 || LINE.length > 24) {
  throw new Error(`word must be 1-24 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("word must not be only whitespace");
}
if (/\s/.test(LINE)) {
  throw new Error("entry must be exactly one word");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
