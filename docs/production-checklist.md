# Mise en production technique PKM

## Déjà intégré

- Mentions légales et confidentialité en français, anglais et allemand.
- Identité légale publique, licence Tourism Authority et point GPS du spot.
- Métadonnées Open Graph/Twitter, canonical, hreflang, données structurées et page 404.
- Redirections des anciennes URL courtes pour Cloudflare, avec reprise côté 404 pour GitHub Pages.
- Suivi anonyme des clics principaux et conversions du formulaire, sans numéro, e-mail ni contenu WhatsApp.
- Consentement analytics avant chargement de Google Analytics.

## Deux connexions à faire avec les comptes de PKM

### 1. Google Analytics 4

Créer une propriété GA4 appartenant à PKM, puis ajouter le secret GitHub Actions `PUBLIC_GA_MEASUREMENT_ID` avec une valeur de type `G-XXXXXXXXXX`. Le script ne se charge qu'après consentement.

### 2. Sauvegarde des demandes dans Google Sheets

Le backend préparé dans `integrations/google-apps-script/Code.gs` doit être copié dans un Apps Script appartenant à PKM :

1. créer un Google Sheet et un projet Apps Script ;
2. définir la propriété de script `SPREADSHEET_ID` ;
3. déployer comme application web exécutée par le propriétaire ;
4. valider explicitement ce classeur comme destination des prénoms, téléphones et dates ;
5. seulement ensuite connecter son URL au formulaire.

Le site ne transmet aucune donnée personnelle à cet endpoint tant que cette validation n'a pas été faite.

## À confirmer administrativement

- BRN de `PARADISE KITESURFING (MAURITIUS) LTD` avant paiement et facturation en ligne.
- Vérifier le BRN et le compléter dans les mentions légales avant d'activer le paiement en ligne.
