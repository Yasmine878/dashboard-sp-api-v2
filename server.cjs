// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// 👉 Données simulées directement ici (pas besoin de fetch)
const orders = [
  { laboratoire: 'Biotech S.A.', mois: 'Jan', annee: 2025, commandes: 160, caht: 15000, cattc: 18000 },
  { laboratoire: 'Pharmaco Inc.', mois: 'Feb', annee: 2025, commandes: 180, caht: 17000, cattc: 20000 },
  { laboratoire: 'Biotech S.A.', mois: 'Mar', annee: 2025, commandes: 250, caht: 22000, cattc: 26000 },
  { laboratoire: 'PharmaLab', mois: 'Apr', annee: 2025, commandes: 450, caht: 30000, cattc: 36000 },
  { laboratoire: 'HealthGenix', mois: 'Mai', annee: 2025, commandes: 340, caht: 25000, cattc: 29000 },
  { laboratoire: 'Pharmaco Inc.', mois: 'Jun', annee: 2025, commandes: 300, caht: 28000, cattc: 33000 },
  { laboratoire: 'Prbamch A.A.', mois: 'Jul', annee: 2025, commandes: 90, caht: 8000, cattc: 9500 }
];

const launches = [
  { id: 1, fournisseur: 'Biotech S.A.', mois: 'Jan', annee: 2025, heure: '09:00', durée: '15 min', commandes: 160 },
  { id: 2, fournisseur: 'Pharmaco Inc.', mois: 'Feb', annee: 2025, heure: '10:00', durée: '20 min', commandes: 180 },
  { id: 3, fournisseur: 'Biotech S.A.', mois: 'Mar', annee: 2025, heure: '11:00', durée: '18 min', commandes: 250 },
  { id: 4, fournisseur: 'PharmaLab', mois: 'Apr', annee: 2025, heure: '12:00', durée: '25 min', commandes: 450 },
  { id: 5, fournisseur: 'HealthGenix', mois: 'Mai', annee: 2025, heure: '13:00', durée: '22 min', commandes: 8 },
  { id: 6, fournisseur: 'Pharmaco Inc.', mois: 'Jun', annee: 2025, heure: '14:00', durée: '19 min', commandes: 300 },
  { id: 7, fournisseur: 'Prbamch A.A.', mois: 'Jul', annee: 2025, heure: '15:00', durée: '12 min', commandes: 9 }
];

// 👉 Routes API
app.get('/orders', (req, res) => res.json(orders));
app.get('/launches', (req, res) => res.json(launches));

// 👉 Démarrer le serveur
app.listen(5000, () => {
  console.log('✅ API mock écoutée sur http://localhost:5000');
});
