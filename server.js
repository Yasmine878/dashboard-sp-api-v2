// server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Amazon SP est en ligne');
});

app.get('/orders', (req, res) => {
  res.json([
    { mois: 'Jan', fournisseur: 'Biotech S.A.', commandes: 160 },
    { mois: 'Feb', fournisseur: 'Pharmaco Inc.', commandes: 180 },
    { mois: 'Mar', fournisseur: 'Biotech S.A.', commandes: 250 },
    { mois: 'Apr', fournisseur: 'HealthGenix', commandes: 450 },
    { mois: 'Mai', fournisseur: 'PharmaLab', commandes: 340 },
    { mois: 'Jun', fournisseur: 'Pharmaco Inc.', commandes: 300 },
    { mois: 'Jul', fournisseur: 'Prbamch A.A.', commandes: 90 },
  ]);
});

app.get('/launches', (req, res) => {
  res.json([
    { id: 1, fournisseur: 'Biotech S.A.', mois: 'Jan', annee: 2025, heure: '09:00', durée: '15 min', commandes: 160 },
    { id: 2, fournisseur: 'Pharmaco Inc.', mois: 'Feb', annee: 2025, heure: '10:00', durée: '20 min', commandes: 180 },
    { id: 3, fournisseur: 'Biotech S.A.', mois: 'Mar', annee: 2025, heure: '11:00', durée: '18 min', commandes: 250 },
    { id: 4, fournisseur: 'PharmaLab', mois: 'Apr', annee: 2025, heure: '12:00', durée: '25 min', commandes: 450 },
    { id: 5, fournisseur: 'HealthGenix', mois: 'Mai', annee: 2025, heure: '13:00', durée: '22 min', commandes: 8 },
    { id: 6, fournisseur: 'Pharmaco Inc.', mois: 'Jun', annee: 2025, heure: '14:00', durée: '19 min', commandes: 300 },
    { id: 7, fournisseur: 'Prbamch A.A.', mois: 'Jul', annee: 2025, heure: '15:00', durée: '12 min', commandes: 9 },
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
