# SAPRES SARL — Frontend Next.js

Site web complet de SAPRES SARL — Énergie Solaire au Cameroun.
Partenaire officiel Blue Carbon.

## Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS + CSS custom (fidèle à la maquette)
- **Fonts** : Raleway (titres) + Lato (corps)
- **HTTP** : Axios
- **Notifications** : react-hot-toast

## Prérequis

- [Node.js](https://nodejs.org) v18+ (télécharger et installer d'abord)
- npm (inclus avec Node.js)

## Installation

```bash
# 1. Aller dans le dossier frontend
cd "C:\Users\Administrateur\OneDrive\Documents\sapres sarl\frontend"

# 2. Copier le fichier d'environnement
copy .env.local.example .env.local

# 3. Éditer .env.local avec les vraies URL API de ton collègue
#    NEXT_PUBLIC_API_URL=https://api.sapres.cm/api/v1
#    NEXT_PUBLIC_WHATSAPP_NUMBER=237677000000

# 4. Installer les dépendances
npm install

# 5. Lancer en développement
npm run dev
```

Le site sera disponible sur http://localhost:3000

## Structure des pages

| URL | Page |
|-----|------|
| `/` | Accueil |
| `/services` | Services |
| `/services/[slug]` | Détail service |
| `/produits` | Catalogue produits |
| `/produits/[slug]` | Détail produit |
| `/realisations` | Portfolio projets |
| `/realisations/[slug]` | Détail projet |
| `/a-propos` | À Propos |
| `/recrutement` | Offres d'emploi |
| `/recrutement/[slug]` | Détail + formulaire candidature |
| `/blog` | Blog & actualités |
| `/blog/[slug]` | Article complet |
| `/calculateur` | Calculateur solaire |
| `/contact` | Contact |
| `/devis` | Demande de devis (3 étapes) |
| `/suivi` | Suivi de commande |

## Variables d'environnement

```env
NEXT_PUBLIC_API_URL=https://api.sapres.cm/api/v1
NEXT_PUBLIC_WHATSAPP_NUMBER=237677000000
```

## Notes importantes

- Le **panier** est stocké en `localStorage` (pas de compte client requis)
- Les **commandes** nécessitent d'abord un `POST /orders/checkout`, puis un paiement
- Les **candidatures** utilisent `multipart/form-data`
- Les **devis** utilisent `multipart/form-data`
- Toutes les images proviennent de **Cloudinary** via `secureUrl`
