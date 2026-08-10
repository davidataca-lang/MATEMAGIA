import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const allowed = new Set(['.js', '.css', '.html', '.md', '.json', '.yml', '.gitkeep']);
const issues = [];

const walk = async (dir) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'dist'].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    if (entry.isFile()) {
      const extension = entry.name.includes('.') ? entry.name.slice(entry.name.lastIndexOf('.')) : '';
      if (!allowed.has(extension)) continue;
      const content = await readFile(path, 'utf8');
      if (/[^\S\r\n]$/m.test(content)) issues.push(`${path}: contiene espacios al final de línea`);
      if (!content.endsWith('\n')) issues.push(`${path}: debe terminar con salto de línea`);
    }
  }
};

await walk('.');
if (issues.length > 0) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log('Lint básico completado sin problemas.');
