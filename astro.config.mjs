import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const githubRepository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const customDomain = process.env.CUSTOM_DOMAIN?.trim();
const isGitHubPages = process.env.GITHUB_PAGES === 'true' && githubRepository && !customDomain;
const githubOwner = process.env.GITHUB_REPOSITORY?.split('/')[0];

// Site statique, hébergé sur Cloudflare Pages (0 € — voir le doc stratégie du projet).
// Pas d'adaptateur SSR : Astro construit du HTML pur dans dist/, servi tel quel.
export default defineConfig({
  site: isGitHubPages
    ? `https://${githubOwner}.github.io`
    : `https://${customDomain || 'paradisekitesurfingmauritius.com'}`,
  base: isGitHubPages ? `/${githubRepository}` : '/',
  trailingSlash: 'always', // cohérent avec les URLs en /fr/, /tarifs/ etc. du doc architecture
  integrations: [sitemap()],
});
