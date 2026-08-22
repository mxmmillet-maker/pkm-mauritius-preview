const measurementId = (process.env.PUBLIC_GA_MEASUREMENT_ID ?? '').trim();

if (!/^G-[A-Z0-9]+$/i.test(measurementId)) {
  console.error(
    'PUBLIC_GA_MEASUREMENT_ID est absent ou invalide. Configurez le workflow de production avec une valeur de type G-XXXXXXXXXX.',
  );
  process.exit(1);
}

console.log('Configuration de production validée — identifiant GA4 présent.');
