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
- Ta progression (questions réussies, questions à revoir, notes) est enregistrée dans le navigateur de chaque appareil.

## Écouter le contenu

Chaque zone a un bouton **Écouter** (ou une icône haut-parleur pour une question, un encadré du mémo, une partie d'exercice) et un réglage de vitesse **− 1× +** juste à côté.

- Pendant la lecture, le bouton devient **Arrêter** ; un nouveau clic ou la touche **Échap** coupe la voix.
- Le passage lu est surligné en jaune clair et le mot prononcé en jaune vif. La page défile toute seule.
- **Cas pratiques** : « Écouter les étapes » enchaîne toutes les étapes ; cliquer sur une autre étape relance la lecture depuis celle-ci.
- **Fiches en cartes** : le terme, 2 s pour réciter, la carte se retourne, la réponse, puis la carte suivante. **En liste** : lecture à partir de la première fiche visible.
- **Quiz** : le bouton **Auto** lit chaque nouvelle question puis sa correction dès que tu réponds.
- La vitesse est mémorisée sur l'appareil. La voix française est choisie automatiquement (voix « Natural » d'Edge en priorité, sinon une voix installée sur l'appareil si la voix en ligne ne répond pas).

Le lecteur est dans `assets/reader.js` (synthèse vocale du navigateur, aucun service externe).

## Modifier le contenu

- Définitions : `assets/data-fiches.js`
- Questions : `assets/data-questions.js` (une ligne `qcm(...)`, `vf(...)`, `open(...)` ou `ordre(...)` par question)
- Cas pratiques : `assets/data-cases.js`

Si tu modifies des fichiers après la mise en ligne, augmente le numéro de version (`revis-manag-v2` → `revis-manag-v3`…) dans `sw.js` pour que les téléphones récupèrent la nouvelle version.
