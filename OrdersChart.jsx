import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin"],
  datasets: [
    {
      label: "Nombre de commandes",
      data: [100, 150, 300, 250, 400, 600],
      borderColor: "blue",
      fill: false,
    },
  ],
};

function OrdersChart() {
  return <Line data={data} />;
}

export default OrdersChart;
