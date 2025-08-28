# 🌸 robot-flower-princess UI

Interface utilisateur React moderne et interactive pour le jeu Wall-E. Aidez Wall-E à naviguer dans un monde rempli de déchets pour livrer une précieuse fleur à la princesse !

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4.5-green?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue?logo=tailwindcss)

## 🎮 Aperçu du jeu

### 📱 Interface moderne
- **Design responsive** adapté desktop et mobile
- **Animations fluides** et interactions intuitives
- **Palette de couleurs thématique** inspirée de Wall-E
- **Feedback visuel** en temps réel

### 🎯 Fonctionnalités
- 🎲 **Création de parties** avec dimensions personnalisables (3x3 à 50x50)
- 📋 **Gestion des parties** - Voir toutes les parties et leur statut
- 🎮 **Contrôles intuitifs** - Boutons directionnels pour chaque action
- 🎨 **Plateau visuel** avec icônes et couleurs distinctives
- 🏆 **Système de statuts** - En cours, Gagné, Perdu

### 🤖 Éléments de jeu
- 🤖 **Wall-E (Robot)** - Votre personnage contrôlable
- 👑 **Princesse** - Destination finale pour la fleur
- 🌸 **Fleur** - Objet précieux à transporter
- 🗑️ **Déchets** - Obstacles à nettoyer
- ⬜ **Cases vides** - Espaces de navigation

## 🚀 Installation

### Prérequis

- Node.js 16.0+
- npm ou yarn
- API robot-flower-princess en fonctionnement sur le port 8000

### Installation rapide

```bash
# Cloner le projet
git clone https://github.com/remi-picard/robot-flower-princess-ui.git
cd robot-flower-princess-ui

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

### Configuration complète

```bash
# 1. Créer le projet
mkdir robot-flower-princess-ui
cd robot-flower-princess-ui

# 2. Initialiser le projet
npm init -y

# 3. Installer les dépendances principales
npm install react react-dom lucide-react

# 4. Installer les dépendances de développement
npm install --save-dev @types/react @types/react-dom @vitejs/plugin-react typescript vite tailwindcss postcss autoprefixer

# 5. Initialiser Tailwind CSS
npx tailwindcss init -p

# 6. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur : `http://localhost:3000`

## 🔧 Configuration

### 🌐 Proxy API (Anti-CORS)

Le projet inclut une configuration Vite qui proxifie automatiquement les appels API :

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}
```

**Avantages :**
- ✅ Aucun problème CORS
- ✅ Développement simplifié
- ✅ Logs détaillés des requêtes

### 🎨 Personnalisation des couleurs

Modifiez les couleurs dans `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      'walle': {
        50: '#f0f9ff',
        500: '#3b82f6',
        900: '#1e3a8a'
      }
    }
  }
}
```

### 🌍 Variables d'environnement

Créez un fichier `.env.local` :

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE=Robot Flower Princess UI
VITE_MAX_BOARD_SIZE=25
```

## 🎯 Guide d'utilisation

### 1️⃣ **Créer une nouvelle partie**

1. Ajustez la **largeur** et **hauteur** du plateau (3-50)
2. Cliquez sur **"Créer une partie"**
3. Le plateau se génère automatiquement avec Wall-E, la princesse, la fleur et les déchets

### 2️⃣ **Naviguer dans le jeu**

- **Déplacer** 🤖 : Utilisez les flèches directionnelles pour bouger Wall-E
- **Nettoyer** 🗑️ : Supprimez les déchets adjacent (impossible en portant la fleur)
- **Ramasser** 🌸 : Prenez la fleur quand vous êtes à côté
- **Déposer** 🌸 : Livrez la fleur à la princesse pour gagner !

### 3️⃣ **Gérer les parties**

- **Liste des parties** : Voir toutes vos parties avec leur statut
- **Reprendre** : Cliquez sur une partie pour la reprendre
- **Statuts** :
    - 🔵 **En cours** : Partie active
    - 🟢 **Gagné** : Mission accomplie !
    - 🔴 **Perdu** : Mouvement invalide
