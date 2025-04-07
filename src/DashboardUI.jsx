import React, { useState } from "react";
import Select from "react-select";
import DashboardData from "./components/DashboardData";
import OrdersChart from "../OrdersChart";

// ✅ Style personnalisé pour react-select
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "8px",
    borderColor: "#d1d5db",
    padding: "2px",
    fontSize: "1rem",
    boxShadow: "none",
    '&:hover': {
      borderColor: "#2563eb",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0e7ff" : "#fff",
    color: "#1f2937",
  }),
};

// ✅ Données simulées
const dummyData = [
  {
    heureDebut: "10:00",
    heureFin: "10:15",
    fournisseur: "Biotech S.A.",
    commandes: 324,
    mois: "Avril",
    annee: "2024",
    caHt: "591.40 €",
    caTtc: "709.68 €",
  },
  {
    heureDebut: "09:30",
    heureFin: "09:45",
    fournisseur: "Pharmaco Inc.",
    commandes: 320,
    mois: "Juin",
    annee: "2022",
    caHt: "554.60 €",
    caTtc: "665.52 €",
  },
  {
    heureDebut: "14:00",
    heureFin: "14:20",
    fournisseur: "HealthGenix",
    commandes: 250,
    mois: "Mars",
    annee: "2023",
    caHt: "439.00 €",
    caTtc: "526.80 €",
  },
  {
    heureDebut: "12:00",
    heureFin: "12:15",
    fournisseur: "PharmaLab",
    commandes: 280,
    mois: "Mars",
    annee: "2023",
    caHt: "453.10 €",
    caTtc: "543.72 €",
  },
  {
    heureDebut: "15:00",
    heureFin: "15:10",
    fournisseur: "Prbamch A.A.",
    commandes: 248,
    mois: "Janvier",
    annee: "2021",
    caHt: "326.00 €",
    caTtc: "391.20 €",
  },
];

// Fournisseurs uniques pour la liste déroulante
const uniqueSuppliers = Array.from(new Set(dummyData.map(item => item.fournisseur)));
const supplierOptions = uniqueSuppliers.map(f => ({ value: f, label: f }));

function DashboardUI() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);

  const filteredData = dummyData.filter(item => {
    const matchFournisseur = selectedFournisseur ? item.fournisseur === selectedFournisseur.value : true;
    return matchFournisseur;
  });

  const anomalies = filteredData.filter(item => item.commandes < 10);

  return (
    <div className="dashboard-container">
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        📊 Suivi SP-API
      </h1>

      {/* 🚀 Tableau des lancements */}
      <section className="card">
        <h2>🚀 Tableau de bord des lancements</h2>
        <div className="filter-bar" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>Fournisseur</label>
            <Select
              styles={customSelectStyles}
              options={[{ value: "", label: "Tous" }, ...supplierOptions]}
              value={selectedFournisseur}
              onChange={setSelectedFournisseur}
              placeholder="Tous"
              isClearable
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>Plage de dates</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Démarrage</th>
              <th>Fin</th>
              <th>Fournisseur</th>
              <th>Commandes</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.heureDebut}</td>
                <td>{item.heureFin}</td>
                <td>{item.fournisseur}</td>
                <td>{item.commandes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 📦 Commandes */}
      <section className="card">
        <h2>📦 Tableau de bord des commandes</h2>
        <div className="filter-bar" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>Fournisseur</label>
            <Select
              styles={customSelectStyles}
              options={[{ value: "", label: "Tous" }, ...supplierOptions]}
              value={selectedFournisseur}
              onChange={setSelectedFournisseur}
              placeholder="Tous"
              isClearable
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>Plage de dates</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </div>
        </div>

        {anomalies.length > 0 && (
          <div className="alert">
            <p>⚠️ Anomalie détectée : certains fournisseurs ont moins de 10 commandes</p>
            <ul>
              {anomalies.map((a, idx) => (
                <li key={idx}>
                  {a.fournisseur} — {a.commandes} commandes
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Mois</th>
                <th>Année</th>
                <th>Fournisseur</th>
                <th>Nb commandes</th>
                <th>CA HT</th>
                <th>CA TTC</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.mois}</td>
                  <td>{item.annee}</td>
                  <td>{item.fournisseur}</td>
                  <td>{item.commandes}</td>
                  <td>{item.caHt}</td>
                  <td>{item.caTtc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart-container">
          <OrdersChart data={filteredData} />
        </div>
      </section>

      {/* 📡 Données API */}
      <section className="card">
        <h2>📡 Données en direct depuis l’API</h2>
        <DashboardData />
      </section>
    </div>
  );
}

export default DashboardUI;
