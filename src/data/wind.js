// Données vent brutes, mois par mois, Le Morne. Source : agrégation de
// données vent publiques pour Maurice (alizés SE + effet venturi local
// +3-5 nœuds), cohérente avec la fourchette "mai-octobre, 15-25 nœuds"
// déjà retenue dans le doc stratégie du projet.
// À FAIRE VALIDER PAR GARY avant publication — donnée de sécurité, pas
// seulement de confort. Une seule fois ces chiffres modifiés ici, toutes
// les pages (FR + EN) qui utilisent WindMonthTable se mettent à jour.
export const WIND_MONTHS = [
  { i: 0, wind: '10–18 nds', reliability: 'faible à moyenne', water: '~27 °C', kite: '12–14 m²' },
  { i: 1, wind: '10–18 nds', reliability: 'faible à moyenne', water: '~27 °C', kite: '12–14 m²' },
  { i: 2, wind: '12–18 nds', reliability: 'moyenne', water: '~27 °C', kite: '10–12 m²' },
  { i: 3, wind: '14–20 nds', reliability: 'bonne', water: '~27 °C', kite: '10–12 m²' },
  { i: 4, wind: '15–22 nds', reliability: 'bonne à très bonne', water: '~25 °C', kite: '9–12 m²' },
  { i: 5, wind: '18–25 nds', reliability: 'très bonne', water: '~23 °C', kite: '9–10 m²' },
  { i: 6, wind: '20–28 nds', reliability: 'excellente', water: '~22 °C', kite: '7–9 m²' },
  { i: 7, wind: '20–28 nds', reliability: 'excellente', water: '~22 °C', kite: '7–9 m²' },
  { i: 8, wind: '18–25 nds', reliability: 'très bonne', water: '~23 °C', kite: '8–10 m²' },
  { i: 9, wind: '15–22 nds', reliability: 'bonne à très bonne', water: '~25 °C', kite: '9–12 m²' },
  { i: 10, wind: '12–20 nds', reliability: 'moyenne', water: '~27 °C', kite: '10–12 m²' },
  { i: 11, wind: '10–18 nds', reliability: 'faible à moyenne', water: '~27 °C', kite: '12–14 m²' },
];

export const MONTH_NAMES = {
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const RELIABILITY_EN = {
  'faible à moyenne': 'low to medium',
  'moyenne': 'medium',
  'bonne': 'good',
  'bonne à très bonne': 'good to very good',
  'très bonne': 'very good',
  'excellente': 'excellent',
};

export function windRows(locale) {
  const names = MONTH_NAMES[locale] ?? MONTH_NAMES.fr;
  return WIND_MONTHS.map((m) => ({
    month: names[m.i],
    wind: locale === 'en' ? m.wind.replace('nds', 'kn') : m.wind,
    reliability: locale === 'en' ? RELIABILITY_EN[m.reliability] : m.reliability,
    water: m.water,
    kite: m.kite,
  }));
}
