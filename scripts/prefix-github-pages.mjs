import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];

if (!repository) {
  throw new Error('GITHUB_REPOSITORY doit être défini sous la forme propriétaire/dépôt.');
}

const prefix = `/${repository}`;
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
      .replaceAll('href="/', `href="${prefix}/`)
      .replaceAll('src="/', `src="${prefix}/`)
      .replaceAll('content="0; url=/', `content="0; url=${prefix}/`);

    if (prefixed !== source) await writeFile(path, prefixed);
  }
}

await walk(fileURLToPath(new URL('../dist', import.meta.url)));
