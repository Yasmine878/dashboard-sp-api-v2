import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import "../styles/filters.css";
import { Line } from 'react-chartjs-2';
import DashboardFilters from './DashboardFilters';

const fournisseursList = [
  'Biotech S.A.',
  'Pharmaco Inc.',
  'HealthGenix',
  'PharmaLab',
  'Prbamch A.A.',
];

const moisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul'];

function Dashboard() {
  const [fournisseur, setFournisseur] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [orders, setOrders] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pageOrders, setPageOrders] = useState(1);
  const [pageLaunches, setPageLaunches] = useState(1);

  const paginate = (data, page = 1, perPage = 5) =>
    data.slice((page - 1) * perPage, page * perPage);

  const handleFilterChange = (selected) => setFournisseur(selected);
  const handleDateChange = (range) => setDateRange(range);

  const filterByDate = (mois, annee) => {
    if (!dateRange.start && !dateRange.end) return true;
    const moisIndex = moisLabels.indexOf(mois);
    const date = new Date(`${annee}-${moisIndex + 1}-01`);
    const start = dateRange.start ? new Date(`${dateRange.start}-01`) : null;
    const end = dateRange.end ? new Date(`${dateRange.end}-01`) : null;
    return (!start || date >= start) && (!end || date <= end);
  };

  const applyFilters = () => {
    const filteredO = orders.filter(o =>
      (!fournisseur || o.laboratoire === fournisseur) && filterByDate(o.mois, o.annee));
    const filteredL = launches.filter(l =>
      (!fournisseur || l.fournisseur === fournisseur) && filterByDate(l.mois, l.annee));
    setFilteredOrders(filteredO);
    setFilteredLaunches(filteredL);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch('http://localhost:5000/orders');
        const launchesResponse = await fetch('http://localhost:5000/launches');
        if (!ordersResponse.ok || !launchesResponse.ok) throw new Error('API error');

        const ordersData = await ordersResponse.json();
        const launchesData = await launchesResponse.json();

        setOrders(ordersData);
        setLaunches(launchesData);
      } catch (error) {
        console.error('Erreur API, fallback aux données locales :', error);
        const ordersData = [
          { laboratoire: 'Biotech S.A.', mois: 'Jan', annee: 2025, commandes: 160, caht: 15000, cattc: 18000 },
          { laboratoire: 'Pharmaco Inc.', mois: 'Feb', annee: 2025, commandes: 180, caht: 17000, cattc: 20000 },
          { laboratoire: 'Biotech S.A.', mois: 'Mar', annee: 2025, commandes: 250, caht: 22000, cattc: 26000 },
          { laboratoire: 'PharmaLab', mois: 'Apr', annee: 2025, commandes: 450, caht: 30000, cattc: 36000 },
          { laboratoire: 'HealthGenix', mois: 'Mai', annee: 2025, commandes: 340, caht: 25000, cattc: 29000 },
          { laboratoire: 'Pharmaco Inc.', mois: 'Jun', annee: 2025, commandes: 300, caht: 28000, cattc: 33000 },
          { laboratoire: 'Prbamch A.A.', mois: 'Jul', annee: 2025, commandes: 90, caht: 8000, cattc: 9500 },
        ];
        const launchesData = [
          { id: 1, fournisseur: 'Biotech S.A.', mois: 'Jan', annee: 2025, heure: '09:00', durée: '15 min', commandes: 160 },
          { id: 2, fournisseur: 'Pharmaco Inc.', mois: 'Feb', annee: 2025, heure: '10:00', durée: '20 min', commandes: 180 },
          { id: 3, fournisseur: 'Biotech S.A.', mois: 'Mar', annee: 2025, heure: '11:00', durée: '18 min', commandes: 250 },
          { id: 4, fournisseur: 'PharmaLab', mois: 'Apr', annee: 2025, heure: '12:00', durée: '25 min', commandes: 450 },
          { id: 5, fournisseur: 'HealthGenix', mois: 'Mai', annee: 2025, heure: '13:00', durée: '22 min', commandes: 8 },
          { id: 6, fournisseur: 'Pharmaco Inc.', mois: 'Jun', annee: 2025, heure: '14:00', durée: '19 min', commandes: 300 },
          { id: 7, fournisseur: 'Prbamch A.A.', mois: 'Jul', annee: 2025, heure: '15:00', durée: '12 min', commandes: 9 },
        ];
        setOrders(ordersData);
        setLaunches(launchesData);
      }
    };
    fetchData();
  }, [refreshKey]);

  useEffect(() => {
    applyFilters();
  }, [orders, launches, fournisseur, dateRange]);

  const chartData = {
    labels: moisLabels,
    datasets: [
      {
        label: 'Commandes',
        data: moisLabels.map((m) => {
          const order = filteredOrders.find((o) => o.mois === m);
          return order ? order.commandes : 0;
        }),
        borderColor: '#007bff',
        backgroundColor: 'rgba(75,192,192,0.4)',
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'CA HT (€)',
        data: moisLabels.map((m) => {
          const order = filteredOrders.find((o) => o.mois === m);
          return order ? order.caht : 0;
        }),
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.4)',
        yAxisID: 'y1',
        tension: 0.3,
      },
      {
        label: 'CA TTC (€)',
        data: moisLabels.map((m) => {
          const order = filteredOrders.find((o) => o.mois === m);
          return order ? order.cattc : 0;
        }),
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.4)',
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Statistiques par mois',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Commandes',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Chiffre d\'Affaires (€)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <h2>Tableau de Bord Amazon SP</h2>

      <DashboardFilters
        fournisseurs={fournisseursList}
        selectedFournisseur={fournisseur}
        onFilterChange={handleFilterChange}
        onDateChange={handleDateChange}
      />

      <button className="refresh-button" onClick={handleRefresh}>🔄 Rafraîchir les données</button>

      <div className="dashboard-section">
        <div className="chart-container">
          <h3>Commandes / CA par Mois</h3>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div style={{ flex: 1 }}>
          <h3>Commandes</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Mois</th>
                <th>Année</th>
                <th>Fournisseur</th>
                <th>Commandes</th>
                <th>CA HT</th>
                <th>CA TTC</th>
              </tr>
            </thead>
            <tbody>
              {paginate(filteredOrders, pageOrders).map((row, i) => (
                <tr key={i}>
                  <td>{row.mois}</td>
                  <td>{row.annee}</td>
                  <td>{row.laboratoire}</td>
                  <td>{row.commandes}</td>
                  <td>{row.caht} €</td>
                  <td>{row.cattc} €</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setPageOrders((p) => Math.max(p - 1, 1))}>⬅️</button>
            <span>Page {pageOrders}</span>
            <button onClick={() => setPageOrders((p) => p + 1)}>➡️</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Lancements</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fournisseur</th>
              <th>Mois</th>
              <th>Année</th>
              <th>Heure</th>
              <th>Durée</th>
              <th>Commandes</th>
              <th>Anomalie</th>
            </tr>
          </thead>
          <tbody>
            {paginate(filteredLaunches, pageLaunches).map((row) => (
              <tr key={row.id} className={row.commandes < 10 ? 'anomaly-row' : ''}>
                <td>{row.id}</td>
                <td>{row.fournisseur}</td>
                <td>{row.mois}</td>
                <td>{row.annee}</td>
                <td>{row.heure}</td>
                <td>{row.durée}</td>
                <td>{row.commandes}</td>
                <td>{row.commandes < 10 && (
                  <span className="anomaly-alert">⚠️ Anomalie détectée</span>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => setPageLaunches((p) => Math.max(p - 1, 1))}>⬅️</button>
          <span>Page {pageLaunches}</span>
          <button onClick={() => setPageLaunches((p) => p + 1)}>➡️</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
