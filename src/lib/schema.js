// Générateurs de données structurées (schema.org). Chaque fonction renvoie un objet
// JS simple ; les pages l'assemblent dans un tableau passé à <Layout jsonLd={[...]}>.
// Voir le doc stratégie du projet, §5 "Données structurées" pour le rôle de chaque schéma.
import site from '../data/site.json';

export function sportsActivityLocation() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: site.name,
    url: site.url,
    address: site.spot,
    telephone: site.phones?.[0],
    email: site.email,
    ...(site.geo.latitude && site.geo.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude } }
      : {}),
    ...(site.googleReviews.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: site.googleReviews.rating,
            reviewCount: site.googleReviews.count,
          },
        }
      : {}),
  };
}

export function offer({ name, description, price, currency = site.prices.currency, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name,
    description,
    price,
    priceCurrency: currency,
    url,
  };
}

export function faqPage(qas) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function course({ name, description, provider = site.name }) {
  // Schema Course — voir doc stratégie §5 : Google affiche les cours dans des
  // blocs dédiés, peu d'écoles de kite le font. Un CourseInstance (dates,
  // horaires précis) pourra s'ajouter une fois le planning réel disponible.
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: { '@type': 'Organization', name: provider, url: site.url },
  };
}

export function breadcrumbList(items) {
  // items: [{ name, url }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
