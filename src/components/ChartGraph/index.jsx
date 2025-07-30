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

// ChartJS modullarini ro‘yxatdan o‘tkazish
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip,
  Legend
);

const ChartGraph = ({ region, boshlangich, natija, yakuniy }) => {
  // Null yoki noaniq datalardan himoya
  if (
    !region || !boshlangich || !natija || !yakuniy ||
    region.length !== boshlangich.length ||
    region.length !== natija.length ||
    region.length !== yakuniy.length
  ) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md max-w-full text-center">
        <p className="text-red-500">Grafik uchun to‘liq ma'lumotlar mavjud emas.</p>
      </div>
    );
  }

  const labels = region;

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
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y?.toFixed(1)}%`,
        },
      },
      datalabels: {
        color: "#000",
        anchor: "end",
        align: "end",
        formatter: (value) =>
          value !== undefined && value !== null ? `${value.toFixed(1)}%` : "",
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
        title: {
          display: true,
          text: "Foiz (%)",
          font: {
            size: 14,
          },
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
    <div className="p-4 bg-white rounded-xl shadow-md max-w-full">
      <Bar data={data} options={options} />
      <p className="text-center text-gray-600 mt-4 text-sm">
        Ushbu jadval boshlang‘ich va yakuniy foizlar o‘rtasidagi o‘zgarishlarni ko‘rsatadi.
      </p>
    </div>
  );
};

export default ChartGraph;
