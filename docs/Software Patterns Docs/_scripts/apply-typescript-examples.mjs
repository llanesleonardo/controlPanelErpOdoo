import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { PATTERN_TS_EXAMPLES } = require('./pattern-typescript-examples.js');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['old', '_scripts', 'node_modules']);
const SKIP_FILES = /^(INDEX|README)\.md$/i;
const TS_SECTION_RE = /(## TypeScript Example\r?\n)```typescript\r?\n[\s\S]*?\r?\n```/;

const missing = [];
let updated = 0;

for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;

  const dir = path.join(ROOT, entry.name);
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md') || SKIP_FILES.test(file)) continue;

    const filePath = path.join(dir, file);
    const example = PATTERN_TS_EXAMPLES[file];

    if (!example) {
      missing.push(`${entry.name}/${file}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    if (!TS_SECTION_RE.test(content)) {
      missing.push(`${entry.name}/${file} (no ## TypeScript Example section)`);
      continue;
    }

    const newContent = content.replace(
      TS_SECTION_RE,
      (_match, header) => `${header}\`\`\`typescript\n${example.trim()}\n\`\`\``,
    );
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      updated++;
    }
  }
}

const mapCount = Object.keys(PATTERN_TS_EXAMPLES).length;
console.log(`Examples in map: ${mapCount}`);
console.log(`Files updated: ${updated}`);
if (missing.length === 0) {
  console.log('Missing keys: none');
} else {
  console.log(`Missing keys (${missing.length}):`);
  for (const m of missing) console.log(`  ${m}`);
}
