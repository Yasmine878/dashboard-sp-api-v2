import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/filters.css";

// Données par mois ET par fournisseur
const orderChartData = [
  { mois: "Jan", commandes: 100, fournisseur: "Biotech S.A." },
  { mois: "Feb", commandes: 120, fournisseur: "NeoPharma Group" },
  { mois: "Mar", commandes: 250, fournisseur: "PharmaQuest" },
  { mois: "Apr", commandes: 300, fournisseur: "GenMed Solutions" },
  { mois: "Mai", commandes: 340, fournisseur: "HealthGenix" },
  { mois: "Jun", commandes: 400, fournisseur: "LaboraTech" },
  { mois: "Jul", commandes: 50, fournisseur: "SynBio Research" },
  { mois: "Aug", commandes: 300, fournisseur: "TheraPlus" },
  { mois: "Sep", commandes: 300, fournisseur: "PharmaLab" },
  { mois: "Oct", commandes: 300, fournisseur: "ClinixLab" },
  { mois: "Nov", commandes: 300, fournisseur: "BioSynthèse" },
  { mois: "Dec", commandes: 140, fournisseur: "MedicaLife" },
];


const initialLaunchData = [
  { fournisseur: "Biotech S.A.", date: "07/04/2025", heure: "08:15", durée: "2m35s", commandes: 324 },
  { fournisseur: "Pharmaco Inc.", date: "06/04/2025", heure: "07:50", durée: "1m42s", commandes: 320 },
  { fournisseur: "HealthGenix", date: "05/04/2025", heure: "09:20", durée: "3m10s", commandes: 250 },
  { fournisseur: "PharmaLab", date: "05/04/2025", heure: "10:05", durée: "0m58s", commandes: 5 },
  { fournisseur: "Prbamch A.A.", date: "03/04/2025", heure: "11:00", durée: "1m22s", commandes: 248 },
  { fournisseur: "PharmaLab", date: "02/04/2025", heure: "08:00", durée: "1m10s", commandes: 220 },
];

const fournisseurs = [
  "Tous les laboratoires",
  "Biotech S.A.",
  "Pharmaco Inc.",
  "HealthGenix",
  "PharmaLab",
  "Prbamch A.A.",
  "NeoPharma Group",
  "PharmaQuest",
  "GenMed Solutions",
  "LaboraTech",
  "SynBio Research",
  "TheraPlus",
  "ClinixLab",
  "BioSynthèse",
  "MedicaLife",


];

const Dashboard = () => {
  const [selectedFournisseur, setSelectedFournisseur] = useState("Tous les laboratoires");
  const [selectedDate, setSelectedDate] = useState("");
  const [launchData, setLaunchData] = useState(initialLaunchData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const refreshData = () => {
    console.log("🔄 Rafraîchissement des données...");
    setLaunchData([...initialLaunchData]);
    setCurrentPage(1);
  };

  const formatDate = (isoDate) => {
    const [yyyy, mm, dd] = isoDate.split("-");
    return `${dd}/${mm}/${yyyy}`;
  };

  const filteredLaunchData = launchData.filter((entry) => {
    const matchFournisseur =
      selectedFournisseur === "Tous les laboratoires" ||
      entry.fournisseur === selectedFournisseur;

    const matchDate =
      selectedDate === "" || entry.date === formatDate(selectedDate);

    return matchFournisseur && matchDate;
  });

  const totalPages = Math.ceil(filteredLaunchData.length / itemsPerPage);
  const paginatedLaunchData = filteredLaunchData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔍 Filtrer les données du graphique par fournisseur
  const getFilteredChartData = () => {
    const filtered = selectedFournisseur === "Tous les laboratoires"
      ? orderChartData
      : orderChartData.filter((entry) => entry.fournisseur === selectedFournisseur);

    const monthlyTotals = months.reduce((acc, mois) => {
      acc[mois] = 0;
      return acc;
    }, {});

    filtered.forEach((entry) => {
      monthlyTotals[entry.mois] += entry.commandes;
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Commandes",
          data: months.map((mois) => monthlyTotals[mois]),
          backgroundColor: "rgba(59, 130, 246, 0.7)",
        },
      ],
    };
  };

  const filteredTableData = getFilteredChartData().labels.map((mois, index) => ({
    mois,
    commandes: getFilteredChartData().datasets[0].data[index],
  }));

  const anomalies = filteredTableData.filter((entry) => entry.commandes < 10);

  return (
    <div className="dashboard">
      <h2>Tableau de bord des commandes</h2>

      <div className="filters">
        <select
          className="select-input"
          value={selectedFournisseur}
          onChange={(e) => setSelectedFournisseur(e.target.value)}
        >
          {fournisseurs.map((f, i) => (
            <option key={i}>{f}</option>
          ))}
        </select>

        <input
          type="date"
          className="date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <h4>Commandes importées par mois</h4>
      <Bar data={getFilteredChartData()} />

      <table>
        <thead>
          <tr style={{ backgroundColor: "#1e3a8a", color: "white" }}>
            <th>Mois</th>
            <th>Commandes</th>
            <th>CA HT</th>
            <th>CA TTC</th>
          </tr>
        </thead>
        <tbody>
          {filteredTableData.map((entry) => (
            <tr
              key={entry.mois}
              className={entry.commandes < 10 ? "anomaly-row" : ""}
            >
              <td>{entry.mois}</td>
              <td>{entry.commandes}</td>
              <td>{(entry.commandes * 1).toFixed(2)} €</td>
              <td>{(entry.commandes * 1.2).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      {anomalies.length > 0 && (
        <div className="anomaly-alert">
          ⚠️ Des anomalies ont été détectées : certaines périodes ont moins de 10 commandes.
        </div>
      )}

      <h2 style={{ marginTop: "2rem" }}>Tableau de bord des lancements</h2>

      <button className="refresh-button" onClick={refreshData}>
        🔄 Rafraîchir les données
      </button>

      <table>
        <thead>
          <tr style={{ backgroundColor: "#1e3a8a", color: "white" }}>
            <th>Fournisseur</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Durée</th>
            <th>Commandes</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLaunchData.map((entry, index) => (
            <tr
              key={index}
              className={entry.commandes < 10 ? "anomaly-row" : ""}
            >
              <td>{entry.fournisseur}</td>
              <td>{entry.date}</td>
              <td>{entry.heure}</td>
              <td>{entry.durée}</td>
              <td>{entry.commandes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredLaunchData.some((e) => e.commandes < 10) && (
        <div className="alert-box">
          ⚠️ Anomalie détectée : un fournisseur a moins de 10 commandes dans un lancement.
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant ▶
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
