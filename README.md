# Kasa

## Description du projet

Kasa est une plateforme de location de logements entre particuliers. Ce dépôt contient la refonte front-end (Next.js / React) d'un site historiquement développé en ASP.NET, connectée à une API Express.js existante gérant les utilisateurs (rôles Owner, Client, Admin) et les propriétés.

Fonctionnalités principales :
- Consultation des logements et de leurs détails
- Inscription et connexion
- Gestion des favoris
- Ajout d'une propriété (photos, équipements, catégories) côté propriétaire
- Messagerie (maquette)
- Protection des routes sensibles et données structurées SEO

## Stack technique

- [Next.js](https://nextjs.org/) 16.2.10 — `npm install next`
- [React](https://react.dev/) 19.2.4 — `npm install react react-dom`
- [TypeScript](https://www.typescriptlang.org/) — `npm install -D typescript`
- [Tailwind CSS](https://tailwindcss.com/) 4 — `npm install -D tailwindcss @tailwindcss/postcss`
- [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers) (formulaires et validation) — `npm install react-hook-form zod @hookform/resolvers`
- [js-cookie](https://github.com/js-cookie/js-cookie) (gestion des cookies d'authentification) — `npm install js-cookie`
- [lucide-react](https://lucide.dev/) (icônes) — `npm install lucide-react`
- [ESLint](https://eslint.org/) — `npm install -D eslint eslint-config-next`

## Pré-requis

- Node.js v24.15.0
- npm

## Scripts disponibles

### Front-end (`front_end_kasa`)
- `npm run dev` — lance le serveur de développement (port 8000)
- `npm run build` — build de production
- `npm start` — lance le build de production
- `npm run lint` — vérifie le code avec ESLint

### Back-end (`back_end_kasa`)
- `npm start` — lance le serveur Express (port 3000)

## Installation

Cloner le dépôt, puis installer les dépendances du back-end et du front-end séparément :

```bash
git clone <url-du-dépôt>
cd back_end_kasa
npm install
```

```bash
cd ../front_end_kasa
npm install
```

Configuration : créer un fichier `.env.local` dans `front_end_kasa` avec :
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Aucune configuration particulière n'est nécessaire côté `back_end_kasa`.

## Lancement du projet

Démarrer le back-end (port 3000) :
```bash
cd back_end_kasa
npm start
```

Démarrer le front-end (port 8000) :
```bash
cd front_end_kasa
npm run dev
```

Le site est ensuite accessible sur http://localhost:8000.

## Compte de test

Un compte propriétaire (`owner`) est disponible pour tester les fonctionnalités connectées (favoris, messagerie, ajout d'une propriété) :

- Email : `nathalie.jean@test.com`
- Mot de passe : `password123`

Vous pouvez consulter le fichier dans `back_end_kasa/data/kasa.sqlite3`.

Pour le lire, il vous faut l'extension SQLite Viewer (extension VS Code) ou DB Browser for SQLite (sqlitebrowser.org).