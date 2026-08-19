import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Un domaine personnalisé GitHub Pages est servi à la racine : aucun préfixe
// de dépôt ne doit être ajouté aux liens du build.
if (process.env.CUSTOM_DOMAIN) process.exit(0);

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];

if (!repository) {
  throw new Error('GITHUB_REPOSITORY doit être défini sous la forme propriétaire/dépôt.');
}

const prefix = `/${repository}`;
const escapedRepository = repository.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const unprefixedHref = new RegExp(`href="/(?!${escapedRepository}/)`, 'g');
const unprefixedSrc = new RegExp(`src="/(?!${escapedRepository}/)`, 'g');
const unprefixedRefresh = new RegExp(`content="0; url=/(?!${escapedRepository}/)`, 'g');
const textExtensions = new Set(['.html', '.css', '.js']);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }

    if (!textExtensions.has(extname(entry.name))) continue;

    const source = await readFile(path, 'utf8');
    const prefixed = source
      .replace(unprefixedHref, `href="${prefix}/`)
      .replace(unprefixedSrc, `src="${prefix}/`)
      .replace(unprefixedRefresh, `content="0; url=${prefix}/`);

    if (prefixed !== source) await writeFile(path, prefixed);
  }
}

await walk(fileURLToPath(new URL('../dist', import.meta.url)));
