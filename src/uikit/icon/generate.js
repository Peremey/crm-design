import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICONS_DIR = path.join(__dirname, 'icons');
const OUTPUT_FILE = path.join(
  __dirname,
  '..',
  '..',
  'shared',
  'types',
  'icon-names.ts'
);

function normalizeIconName(fileName) {
  return fileName.replace('.svg', '');
}

async function generateIconNames() {
  const files = await fs.readdir(ICONS_DIR);

  const rawNames = files
    .filter((file) => file.endsWith('.svg'))
    .map(normalizeIconName);

  // Убираем дубликаты
  const uniqueNames = Array.from(new Set(rawNames)).sort();

  const iconType = `export type IconName = ${uniqueNames
    .map((name) => `'${name}'`)
    .join(' | ')};\n`;

  const content = `${iconType}`;
  await fs.writeFile(OUTPUT_FILE, content, 'utf8');
}

generateIconNames().catch((err) => {
  console.error('Error generating icon names:', err);
  process.exit(1);
});
