# Argent Bank – Utilisez une API pour un compte utilisateur bancaire

````markdown
# Argent Bank – Frontend (P13, JavaScript)

Application React (JavaScript) pour l’authentification et la gestion du profil utilisateur d’Argent Bank.
Phase 1 implémentée (Login, Profil). Phase 2 fournie sous forme de **proposition d’API Transactions** (OpenAPI YAML).

## 🚀 Stack

- React (Vite, JavaScript)
- React Router v6
- Redux Toolkit + RTK Query
- MSW (mocks en dev, optionnel)
- Vitest + Testing Library (tests)
- ESLint + Prettier

## ✅ Fonctionnalités (Phase 1)

- Page d’accueil, page de connexion, page profil, 404
- Connexion → stockage du token → redirection vers `/profile`
- Accès au profil uniquement si authentifié (route protégée)
- Lecture/édition du profil via API
- États de chargement et d’erreur visibles, a11y de base

## 📦 Prérequis

- Node 18+

## 🧑‍💻 Démarrage rapide

```bash
npm create vite@latest argent-bank -- --template react
cd argent-bank
npm i @reduxjs/toolkit react-redux react-router-dom@6 axios
npm i -D eslint prettier vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom msw
printf "VITE_API_URL=https://localhost:3001/api/v1
" > .env
npm run dev
```
````

## 🔧 Scripts

- `npm run dev` – lancer l’appli en mode dev
- `npm run build` – build de production
- `npm run preview` – servir le build localement
- `npm run test` – exécuter les tests (Vitest)

## 🗂️ Structure

```
src/
  app/          # store redux + hooks
  components/   # header, etc.
  features/
    auth/       # authSlice, ProtectedRoute
    user/       # endpoints RTK Query (login/profile)
  pages/        # Home, Login, Profile, NotFound
  router/       # routes
  services/     # baseApi, token utils
  mocks/        # MSW (optionnel)
```

## 🔗 Endpoints (Phase 1)

- `POST /api/v1/user/login` → `{ token }`
- `POST /api/v1/user/profile` → lecture du profil (Authorization: Bearer)
- `PUT  /api/v1/user/profile` → mise à jour du profil

## 🔐 Auth

- Le **token** est stocké en `localStorage` (clé `argbank_token`).
- `baseApi` ajoute `Authorization: Bearer <token>` si présent.
- 401 → purge du token ; la route protégée redirige vers `/login`.

## 🧪 Tests

- `vitest`, `@testing-library/react`
- Exemple : test du `authSlice` et tests des pages `Login`/`Profile`.

## ♿ Accessibilité

- Labels explicites, `role="alert"` pour les erreurs, focus visible, contrastes AA.

## 🧰 Mocks (MSW) — optionnel mais recommandé

1. Installer et initialiser :

   ```bash
   npm i -D msw
   npx msw init public/ --save
   ```

2. Créer `src/mocks/handlers.js` et `src/mocks/browser.js` (exemples fournis dans le codebase).
3. Dans `src/main.jsx` (dev uniquement) :

   ```js
   if (import.meta.env.DEV) {
     const {worker} = await import("./mocks/browser");
     await worker.start({serviceWorker: {url: "/mockServiceWorker.js"}});
   }
   ```

> Les handlers simulent `POST /user/login`, `POST /user/profile`, `PUT /user/profile`.

## 🧭 User Stories & AC (extrait)

1. **Visiteur** : voir la Home.
2. **Utilisateur** : se connecter → token stocké → redirection `/profile` ; erreurs visibles.
3. **Utilisateur** : se déconnecter → purge token → retour Home.
4. **Utilisateur (auth)** : accéder à `/profile`, voir ses infos.
5. **Utilisateur (auth)** : éditer prénom/nom ; feedback succès/erreur.

## 🧪 Swagger – Phase 2 (Transactions)

- La proposition `transactions.openapi.yaml` définit :
  - `GET /accounts`, `GET/POST /transactions`, `GET/PATCH/DELETE /transactions/{id}`
  - Filtres (mois courant, accountId, pagination), sécurité **Bearer**

- Le fichier YAML peut être importé dans editor.swagger.io pour vérification.

## 🧹 Qualité

- Lint & format : ESLint/Prettier (config de base)
- Commits conventionnels (ex: `feat:`, `fix:`, `refactor:`)

## 🩹 Dépannage

- **CORS/HTTPS** : utilisez la bonne URL dans `VITE_API_URL`.
- **Slash final** : évitez le `/` final (`/api/v1` ✅).
- **401** : vérifiez l’envoi du Bearer et le stockage `localStorage`.
- **.env poussé par erreur** : régénérez les secrets et nettoyez l’historique (ex. BFG Repo-Cleaner), puis force-push.

## 📜 Licence

Usage éducatif dans le cadre du projet P13 OpenClassroom.
