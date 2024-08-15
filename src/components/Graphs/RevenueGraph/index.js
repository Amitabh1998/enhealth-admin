import React from "react";
import { Bar } from "react-chartjs-2";

import { CategoryScale, Chart, ArcElement, registerables } from "chart.js";

Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(...registerables);

const RevenueGraph = ({ data, title }) => {
  const dates = data.map((item) => item.date);
  const orderRevenues = data.map((item) => item.orderRevenue);
  const labTestRevenues = data.map((item) => item.labTestRevenue);
  const appointmentRevenues = data.map((item) => item.appointmentRevenue);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Order Revenue",
        data: orderRevenues,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Lab Test Revenue",
        data: labTestRevenues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Appointment Revenue",
        data: appointmentRevenues,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true, // Stack bars on the x-axis
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true, // Start y-axis from 0
        stacked: true, // Stack bars on the y-axis
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueGraph;
