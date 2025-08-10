import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip,
  Legend
);

const ChartGraph = ({ region, boshlangich, natija, yakuniy }) => {
  const labels = region;
  console.log(region);

  const data = {
    labels,
    datasets: [
      {
        label: "Boshlang'ich %",

        data: boshlangich,
        backgroundColor: "#a78bfa", // light purple
      },
      {
        label: "Yakuniy %",
        data: yakuniy,
        backgroundColor: "#34d399", // green
      },
      {
        label: "O'sish %",
        data: natija,
        backgroundColor: "#facc15", // yellow
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
        },
      },
      datalabels: {
        color: "#000",
        anchor: "end",
        align: "end",
        formatter: (value) => `${value}%`,
        font: {
          weight: "400",
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        ticks: {
          maxRotation: 30,
          minRotation: 30,
        },
      },
    },
  };

  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow-md max-w-full">
        <Bar data={data} options={options} />
        <p className="text-center text-gray-600 mt-4 text-sm">
          Jadval o'zgarishlar va o'sishlarni vizual tarzda ko'rsatadi.
        </p>
      </div>
    </>
  );
};

export default ChartGraph;
