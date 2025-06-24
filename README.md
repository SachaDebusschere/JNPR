# JNPR - Expérience Sensorielle

Une nouvelle expérience sensorielle interactive pour découvrir l'univers des cocktails JNPR, développée avec React, GSAP et Tailwind CSS.

## 🚀 Technologies utilisées

- **React 18** - Framework JavaScript pour l'interface utilisateur
- **Vite** - Bundler moderne et rapide
- **GSAP** - Bibliothèque d'animations haute performance
- **Tailwind CSS** - Framework CSS utilitaire
- **Vercel** - Plateforme de déploiement

## 📦 Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez votre navigateur à l'adresse `http://localhost:5173`

## 🔧 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 🚀 Déploiement sur Vercel

Le projet est configuré pour être déployé automatiquement sur Vercel :

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration Vite
3. Le déploiement se fera automatiquement à chaque push sur la branche main

## 🎨 Structure du projet

```
src/
├── components/         # Composants React réutilisables
│   └── Hero.jsx       # Composant d'accueil avec animations GSAP
├── App.jsx            # Composant principal
├── main.jsx           # Point d'entrée de l'application
└── index.css          # Styles CSS avec Tailwind
```

## 🎭 Animations GSAP

Le projet utilise GSAP pour créer des animations fluides et performantes :
- Animations d'entrée de page
- Transitions entre les éléments
- Effets d'hover interactifs
- Timeline pour orchestrer les animations

## 🎨 Design System

Les couleurs de la marque JNPR sont configurées dans Tailwind :
- `jnpr-primary` : #1a1a1a (noir principal)
- `jnpr-secondary` : #f5f5f5 (gris clair)
- `jnpr-accent` : #ff6b35 (orange accent)

## 📱 Responsive Design

L'interface est optimisée pour tous les appareils grâce à Tailwind CSS avec des breakpoints adaptatifs.
