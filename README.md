# 📊 Dashboard SP API V2

Ce projet est une application front-end React permettant de visualiser les données issues de l'API Amazon SP. Il comprend deux tableaux de bord :  
1. Un pour le suivi des **commandes par mois et par laboratoire**  
2. Un pour le suivi des **lancements de scripts d'importation**

---

## 🧩 Fonctionnalités principales

### ✅ Tableau de bord des commandes
- Affichage du **nombre de commandes**, **CA HT** et **CA TTC** par mois, année et laboratoire
- Filtres :
  - Par fournisseur
  - Par plage de date (**mois + année**)
- Graphique interactif avec :
  - Nombre de commandes
  - Chiffre d’affaires HT / TTC

### ✅ Tableau de bord des lancements
- Liste des scripts lancés avec :
  - Heure de début, durée
  - Nombre de commandes par fournisseur
- Filtres par fournisseur et date
- **Pagination** et **rafraîchissement manuel des données**

### ⚠️ Détection d’anomalies
- Alertes si un fournisseur a moins de **10 commandes** dans un lancement
- Mise en surbrillance visuelle des lignes concernées

---

## 🧪 Tests

- Tests unitaires et fonctionnels (à développer avec `Jest` ou `React Testing Library`)
- Vérification de la cohérence des données entre back-end et affichage

---

## 🚀 Déploiement

Le projet est déployé avec **Vercel** :

🌐 [Lien vers le déploiement](https://dashboard-sp-api-v2.vercel.app)

---

## 🛠️ Installation

### Prérequis
- Node.js 18+
- Git

### Étapes

```bash
# Cloner le projet
git clone https://github.com/votre-utilisateur/dashboard-sp-api-v2.git
cd dashboard-sp-api-v2

# Installer les dépendances
npm install

# Lancer le projet en local
npm run dev
