# Révis'Manag — Management des entreprises (IBAM M1)

Site statique de révision : 348 questions (QCM, vrai/faux, réponses à écrire, remises en ordre), 145 définitions en flashcards, devoir blanc chronométré, 14 cas pratiques expliqués pas à pas avec exercices corrigés, et un mémo des pièges du QCM.

Aucune installation, aucun serveur : que des fichiers HTML, CSS et JavaScript.

## Mettre en ligne sur GitHub Pages

1. Crée un compte sur https://github.com si ce n'est pas fait.
2. Clique sur **New repository**, nomme-le par exemple `revis-manag`, laisse-le **Public**, puis **Create repository**.
3. Sur la page du dépôt, clique sur **uploading an existing file**.
4. Glisse **tout le contenu** du dossier décompressé (le fichier `index.html`, les dossiers `assets`, les icônes, `sw.js`, `manifest.webmanifest`…) — pas le dossier lui-même, son contenu. Clique sur **Commit changes**.
5. Va dans **Settings → Pages**. Dans *Branch*, choisis `main` et `/ (root)`, puis **Save**.
6. Après 1 à 2 minutes, ton site est disponible à l'adresse `https://TON-PSEUDO.github.io/revis-manag/`.

## L'utiliser partout, même sans internet

- Ouvre l'adresse une première fois avec internet : le site s'enregistre pour fonctionner ensuite hors connexion.
- Sur téléphone, menu du navigateur → **Ajouter à l'écran d'accueil** : il s'ouvre comme une application.
- Ta progression (questions réussies, fiches sues, notes) est enregistrée dans le navigateur de chaque appareil.

## Modifier le contenu

- Définitions : `assets/data-fiches.js`
- Questions : `assets/data-questions.js` (une ligne `qcm(...)`, `vf(...)`, `open(...)` ou `ordre(...)` par question)
- Cas pratiques : `assets/data-cases.js`

Si tu modifies des fichiers après la mise en ligne, augmente le numéro de version (`revis-manag-v2` → `revis-manag-v3`…) dans `sw.js` pour que les téléphones récupèrent la nouvelle version.
