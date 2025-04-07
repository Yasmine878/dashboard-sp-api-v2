import { useEffect, useState } from "react";
import axios from "axios";

const checkAnomalies = (orders) => {
  return orders.filter((order) => order.nbCommandes < 10);
};

const DashboardData = () => {
  const [data, setData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.amazonsp.com/orders") // Remplace par ton vrai endpoint
      .then((response) => {
        setData(response.data);
        setAnomalies(checkAnomalies(response.data)); // ✅ détecte anomalies ici
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      {anomalies.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <strong>⚠️ Anomalies détectées !</strong>
          <ul className="list-disc pl-5 mt-2">
            {anomalies.map((a, idx) => (
              <li key={idx}>
                {a.fournisseur} ({a.date}) - {a.nbCommandes} commandes
              </li>
            ))}
          </ul>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th>Fournisseur</th>
            <th>Date</th>
            <th>Commandes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={index}>
              <td>{order.fournisseur}</td>
              <td>{order.date}</td>
              <td>{order.nbCommandes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardData;
