// Langues du site. "live" = pages réellement publiées, "planned" = prévu mais pas encore
// écrit (FR, EN et DE sont publiés ; RU reste prévu pour une phase ultérieure).
// x-default pointe vers l'anglais, comme convenu dans le doc stratégie.
export const LOCALES = {
  fr: { label: 'FR', name: 'Français', live: true },
  en: { label: 'EN', name: 'English', live: true },
  de: { label: 'DE', name: 'Deutsch', live: true },
  ru: { label: 'RU', name: 'Русский', live: false },
};

export const DEFAULT_LOCALE = 'en'; // x-default

// Navigation du site — n'ajouter un lien ici que lorsque la page existe vraiment.
// Décision technique prise dans le brief : toutes les langues ont un préfixe
// (/fr/, /en/, /de/, /ru/), y compris le français. Le doc architecture-urls-seo
// montre des exemples français sans préfixe par souci de lisibilité du tableau —
// à reconfirmer avec Max avant de publier si un vrai "/tarifs/" sans /fr/ est voulu.
export const NAV = {
  fr: [
    { label: 'Accueil', href: '/fr/' },
    { label: 'Cours de kitesurf', href: '/fr/cours-de-kitesurf/' },
    { label: 'Perfectionnement', href: '/fr/perfectionnement/' },
    { label: 'Tarifs', href: '/fr/tarifs/' },
    { label: 'Guides', href: '/fr/guide/' },
    { label: 'Questions fréquentes', href: '/fr/questions-frequentes/' },
    { label: 'Réserver', href: '/fr/reserver/' },
  ],
  en: [
    { label: 'Home', href: '/en/' },
    { label: 'Kitesurf lessons', href: '/en/kitesurf-lessons/' },
    { label: 'Wave & freestyle', href: '/en/wave-freestyle-coaching/' },
    { label: 'Prices', href: '/en/prices/' },
    { label: 'Guides', href: '/en/guide/' },
    { label: 'FAQ', href: '/en/faq/' },
    { label: 'Book', href: '/en/book/' },
  ],
  de: [
    { label: 'Startseite', href: '/de/' },
    { label: 'Kitesurfkurse', href: '/de/kitesurf-kurse/' },
    { label: 'Wellen & Freestyle', href: '/de/wellen-freestyle-coaching/' },
    { label: 'Preise', href: '/de/preise/' },
    { label: 'Guides', href: '/de/guide/' },
    { label: 'FAQ', href: '/de/faq/' },
    { label: 'Buchen', href: '/de/buchen/' },
  ],
};

/**
 * Construit les balises hreflang réciproques pour une page.
 * `translations` : objet { fr: '/fr/tarifs/', en: '/en/prices/' } — uniquement
 * les langues où CETTE page existe réellement, jamais une langue à venir.
 */
export function hreflangLinks(translations, siteUrl, base = '/') {
  const basePath = base === '/' ? '' : base.replace(/\/$/, '');
  const localizedUrl = (path) => new URL(`${basePath}/${path.replace(/^\/+/, '')}`, siteUrl).toString();
  const links = Object.entries(translations).map(([locale, path]) => ({
    hreflang: locale,
    href: localizedUrl(path),
  }));
  if (translations[DEFAULT_LOCALE]) {
    links.push({ hreflang: 'x-default', href: localizedUrl(translations[DEFAULT_LOCALE]) });
  }
  return links;
}
