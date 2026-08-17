# Paradise Kitesurfing Mauritius

Refonte statique et bilingue du site de l'école PKM au Morne. Le projet est
construit avec Astro et produit des fichiers HTML prêts pour Cloudflare Pages.

## État actuel

- 23 routes générées : accueil, cours, perfectionnement, tarifs, réservation,
  FAQ, spot du Morne et quatre guides, en français et en anglais.
- URLs préfixées par langue (`/fr/` et `/en/`) avec balises canonical,
  `hreflang` et `x-default` anglais.
- Redirection permanente de `/` vers `/en/` pour Cloudflare Pages.
- Composants communs pour la navigation, les CTA, les prix, le formulaire,
  la FAQ et le pied de page.
- Mise en page mobile-first avec un premier traitement desktop.
- Données structurées schema.org pour l'école, les offres, les cours, les
  FAQ et les fils d'Ariane.
- Photos principales hébergées localement dans le projet, sans dépendance au
  site actuellement en ligne.

## Photos de démonstration

Les visuels de la page d’accueil servent à évaluer la direction photo et
ne représentent pas Le Morne ni l’équipe PKM. Ils sont proposés gratuitement
par Pexels :

- vue aérienne de kitesurf par Sergio Hurtado —
  https://www.pexels.com/photo/kitesurfing-at-shore-of-exotic-island-14762340/
- cours de kitesurf par Serg Alesenko —
  https://www.pexels.com/photo/kite-surfing-learner-with-instructor-13179593/
- apprentissage en famille par Serg Alesenko —
  https://www.pexels.com/photo/a-couple-learning-kite-surfing-12729769/
- saut freestyle par Serg Alesenko —
  https://www.pexels.com/photo/man-kitesurfing-over-waves-15944400/
- navigation dans les vagues par Serg Alesenko —
  https://www.pexels.com/photo/kitesurfing-on-waves-on-sea-coast-18696580/
- wingfoil par Fuka jaz —
  https://www.pexels.com/photo/teenager-boy-gliding-over-turquoise-seas-surface-on-a-wing-foil-board-18388674/

Licence : https://www.pexels.com/license/

Les marques Google et TripAdvisor restent la propriété de leurs détenteurs.
Leurs logos servent uniquement à identifier les plateformes d'avis et suivent
les ressources de marque publiées par Google et les outils marketing proposés
par TripAdvisor :

- https://about.google/intl/fr/brand-resource-center/
- https://www.tripadvisor.com/business/marketing-tools

Les courts extraits affichés sur l'accueil renvoient vers les fiches publiques
pour permettre de consulter le contexte et les avis complets.

Les faits variables (tarifs, téléphones, avis, politique de réservation) sont
centralisés dans `src/data/site.json`. Les données de vent sont dans
`src/data/wind.js`.

## Points à valider avant publication

1. Faire confirmer par l'école les données de vent mois par mois et le tarif
   exact du coaching, actuellement présenté sur devis.
2. Recontrôler les compteurs Google et TripAdvisor au moment de publier ; ils évoluent.
3. Demander à Gary l'année exacte du parc Duotone destiné à la location. La
   valeur reste volontairement vide dans `src/data/site.json` et n'est pas
   annoncée au public.
4. Remplacer ou valider les photos d'ambiance et ajouter les images réelles du
   camion, du pick-up, du bateau et du matériel dès que l'école les fournit.
5. Décider si le formulaire doit seulement ouvrir WhatsApp ou aussi enregistrer
   la demande dans un outil de suivi. Aucun contact n'est stocké aujourd'hui.
6. Tester le rendu dans les navigateurs et sur les appareils cibles avant la
   bascule du domaine.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Démonstration GitHub Pages

Le dépôt public se déploie automatiquement après chaque push sur `main` :

https://mxmmillet-maker.github.io/pkm-mauritius-preview/fr/

Le build final est généré dans `dist/`. Les références de design d'origine
sont conservées dans `docs/reference/` à titre documentaire ; elles ne sont pas
des instructions d'exécution.
