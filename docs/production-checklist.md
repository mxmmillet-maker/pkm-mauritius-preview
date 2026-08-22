# Mise en production technique PKM

## Déjà intégré

- Mentions légales et confidentialité en français, anglais et allemand.
- Identité légale publique, licence Tourism Authority et point GPS du spot.
- Métadonnées Open Graph/Twitter, canonical, hreflang, données structurées et page 404.
- Redirections des anciennes URL courtes pour Cloudflare, avec reprise côté 404 pour GitHub Pages.
- Suivi anonyme des clics principaux et conversions du formulaire, sans numéro, e-mail ni contenu WhatsApp.
- Consentement analytics avant chargement de Google Analytics.
- Retrait du consentement accessible sur toutes les pages et renouvellement du choix après 180 jours.
- Contrôle automatique du build, des dépendances et de la présence de GA4 avant chaque déploiement.

## Deux connexions à faire avec les comptes de PKM

### 1. Google Analytics 4

La propriété doit appartenir à un compte Google contrôlé durablement par PKM,
pas au compte personnel d'un prestataire.

1. Dans Google Analytics, créer une propriété `Paradise Kitesurfing Mauritius`
   avec le fuseau `Mauritius` et la devise `MUR`.
2. Créer un flux Web pour `https://paradisekitesurfingmauritius.com`.
3. Dans **Administration > Gestion des accès à la propriété**, ajouter les
   prestataires avec le rôle minimal nécessaire (`Éditeur` le plus souvent),
   sans retirer au propriétaire PKM son accès administrateur.
4. L'identifiant de mesure `G-87ERM5TB25` est intégré au workflow de déploiement.
   Il est public par nature et n'a pas besoin d'être enregistré comme secret.
5. Dans GA4, marquer `generate_lead` comme événement clé après sa première
   réception. Ne pas marquer les simples clics de navigation comme conversions.

Le déploiement échoue volontairement si l'identifiant est absent ou invalide.
Le script GA4 ne se charge qu'après consentement.

### Événements mesurés

- `generate_lead` : formulaire valide ouvrant WhatsApp ; événement clé principal.
- `whatsapp_click` : clic direct vers WhatsApp, sans formulaire.
- `booking_click` et `pricing_click` : progression dans le tunnel.
- `phone_click`, `email_click` et `outbound_click` : contacts et sorties utiles.
- `form_validation_error` : formulaire incomplet, sans valeur de champ.

Les paramètres envoyés décrivent la langue, l'emplacement du CTA, la méthode
et le type de programme. Aucun prénom, téléphone, date de séjour ou contenu de
message n'est transmis à GA4. `generate_lead` mesure l'intention validée sur le
site ; il ne prouve pas que le message WhatsApp a ensuite été envoyé.

### Recette après activation

1. Ouvrir une fenêtre privée et vérifier qu'aucune requête Google Analytics ne
   part avant le consentement.
2. Accepter la mesure, puis vérifier `page_view` dans **Temps réel** et
   **DebugView**.
3. Tester un CTA WhatsApp, un accès aux tarifs et le formulaire de réservation.
4. Refuser ensuite via **Gérer mes cookies** et vérifier que les requêtes
   Analytics cessent après le rechargement.

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
- Dans **GitHub > Settings > Pages**, activer **Enforce HTTPS**.
- Pour de vraies redirections HTTP 301 et un hébergement commercial pérenne,
  migrer la publication vers Cloudflare Pages ; le fichier `_redirects` est
  déjà prêt pour cette plateforme.
