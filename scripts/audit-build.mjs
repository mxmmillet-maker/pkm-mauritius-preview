import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const failures = [];
const warnings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(root.pathname);
const htmlFiles = files.filter((file) => extname(file) === '.html');

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const name = relative(root.pathname, file);
  const isRedirect = /http-equiv="refresh"/i.test(html);
  const is404 = name === '404.html';
  if (!/<html\s+lang="[a-z]{2}"/i.test(html)) failures.push(`${name}: attribut lang absent`);
  if (!/<title>[^<]{8,}<\/title>/i.test(html)) failures.push(`${name}: title absent ou trop court`);
  if (!isRedirect && !/<meta\s+name="description"\s+content="[^"]{40,}"/i.test(html)) failures.push(`${name}: meta description absente ou trop courte`);
  if (!isRedirect && !is404 && !/<link\s+rel="canonical"/i.test(html)) failures.push(`${name}: canonical absente`);
  if (!isRedirect && !is404 && !/<meta\s+property="og:image"/i.test(html)) failures.push(`${name}: image de partage absente`);
  if (/<img(?![^>]*\salt=)[^>]*>/i.test(html)) failures.push(`${name}: image sans attribut alt`);
}

for (const file of files.filter((item) => /\.(css|js)$/i.test(item))) {
  const size = (await stat(file)).size;
  if (size > 200 * 1024) warnings.push(`${relative(root.pathname, file)}: ressource de ${(size / 1024).toFixed(0)} Ko`);
}

if (warnings.length) console.warn(`Avertissements (${warnings.length})\n- ${warnings.join('\n- ')}`);
if (failures.length) {
  console.error(`Échecs (${failures.length})\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`Audit statique OK — ${htmlFiles.length} pages HTML contrôlées.`);
