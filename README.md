# JNPR - Questionnaire Cocktail Interactif 🍸

Une expérience interactive immersive pour découvrir le cocktail parfait selon vos goûts et occasions. Développé pour JNPR avec des animations GSAP sophistiquées et un design mobile-first.

## ✨ Fonctionnalités

### 🎯 Questionnaire en 3 étapes
- **Ambiance** : Choisissez votre style (Léger & rafraîchissant, Chaleureux & épicé, Élégant & intense, Surprise)
- **Occasions** : Sélectionnez le moment parfait (Soirée, Entre amis, Tête à tête, Dîner, Moment solo)
- **Ingrédients** : Choisissez parmi 18 ingrédients disponibles dans votre placard

### 🎬 Animations & Interactions
- **Slider horizontal** avec navigation tactile et boutons
- **Éléments décoratifs animés** (verre, ingrédients) qui changent selon la sélection
- **Transitions fluides** entre les questions avec masquage/révélation GSAP
- **Écran de loading** avec logo JNPR qui tourne (4 secondes)
- **Page de résultat** avec transition magique dessin → photo + vibrations

### 📱 Expérience Mobile
- **Design responsive** optimisé pour mobile
- **Swipe gestures** pour naviguer entre les slides
- **Vibrations haptiques** lors de la transition dessin/photo
- **Animations d'écran** pour un effet immersif

## 🚀 Technologies

- **React 18** + **Vite** - Architecture moderne et rapide
- **GSAP** - Animations haute performance avec timelines complexes
- **Tailwind CSS** - Design system cohérent
- **Fonts personnalisées** - Formula Condensed & Suisse Intl Mono

## 📦 Installation

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Ouverture automatique sur http://localhost:5173
```

## 🎨 Structure du projet

```
src/
├── components/
│   ├── Slider.jsx          # Questionnaire principal avec navigation
│   ├── LoadingScreen.jsx   # Écran de chargement avec logo tournant
│   ├── ResultPage.jsx      # Page de résultat avec animations
│   ├── Button.jsx          # Composant bouton réutilisable
│   ├── Header.jsx          # En-tête de l'application
│   └── Hero.jsx            # Page d'accueil (non utilisée)
├── App.jsx                 # Router principal entre les vues
├── main.jsx               # Point d'entrée React
└── index.css              # Styles + fonts + animations CSS

public/
├── img/
│   ├── slider/            # Assets pour le questionnaire
│   │   ├── Categories_PNG/     # Images ambiances
│   │   ├── Moments_PNG/        # Images occasions  
│   │   └── Produits_PNG/       # Images ingrédients
│   ├── logo-jnpr.png      # Logo principal
│   ├── fond-final.png     # Background loading
│   ├── dessin_cocktail.png # Illustration résultat
│   ├── photo_cocktail.png  # Photo réelle résultat
│   └── temps.png, difficulte.png # Icônes indicateurs
└── font/                  # Fonts JNPR (Formula, Suisse)
```

## 🎭 Animations GSAP Détaillées

### Questionnaire
- **Transition entre questions** : Fade out/in coordonné des éléments
- **Slider horizontal** : Translation fluide avec easing personnalisé
- **Éléments décoratifs** : Apparition/disparition avec scale et clip-path
- **Background animé** : Changement de couleur selon l'ambiance sélectionnée

### Loading Screen
- **Logo tournant** : Rotation 360° en 3.8s avec scale et opacity
- **Timeline synchronisée** : Fin exacte avec passage à la page résultat

### Page Résultat
- **Transition dessin → photo** : Dissolution progressive (2.5s)
- **Vibrations d'écran** : Shake pendant la transition
- **Vibrations haptiques** : Pattern mobile pour l'immersion

## 🎨 Design System

### Couleurs
- **Bleu principal** : `#4A7B9C` (titres)
- **Bleu foncé** : `#1D3D56` (textes importants) 
- **Gris texte** : `#151515` (corps de texte)
- **Accents** : `#A3A177` (détails)

### Typographie
- **Formula Condensed** : Titres et éléments importants
- **Suisse Intl Mono** : Textes descriptifs et labels

### Responsive
- **Mobile-first** : Optimisé pour écrans 375px+
- **Breakpoints adaptatifs** : `clamp()` pour toutes les tailles
- **Touch-friendly** : Zones tactiles ≥44px

## 🔧 Scripts

```bash
npm run dev      # Développement avec hot-reload
```

## 🚀 Déploiement

Le projet est configuré pour Vercel avec `vercel.json` :
- **Déploiement automatique** sur push main
- **Redirections SPA** configurées
- **Assets optimisés** automatiquement

## 📝 Fonctionnalités Avancées

- **État persistant** : Sauvegarde des réponses pendant le questionnaire
- **Navigation avancée** : Retour possible à l'étape précédente
- **Validation** : Vérification des sélections avant progression
- **Feedback visuel** : États hover/active sur tous les éléments interactifs
- **Accessibilité** : Labels ARIA et navigation clavier

## 🏆 Performance

- **Lazy loading** des composants
- **Optimisation GSAP** : Transformations GPU
- **Images optimisées** : WebP/PNG selon le support
- **Bundle splitting** automatique avec Vite

---

**Développé avec ❤️ pour JNPR** - *Une expérience cocktail unique*
