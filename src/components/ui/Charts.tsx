import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface PriceDistributionChartProps {
  data: number[];
  className?: string;
}

export const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({
  data,
  className = "",
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(amount);
  };

  const chartData = {
    labels: ["High Price Range", "Medium Price Range", "Low Price Range"],
    datasets: [
      {
        label: "Price Distribution",
        data: data,
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Price Distribution",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${formatCurrency(
              context.parsed.y
            )}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

interface LocationPriceChartProps {
  data: Array<{ harga: number; lokasi: string }>;
  className?: string;
}

export const LocationPriceChart: React.FC<LocationPriceChartProps> = ({
  data,
  className = "",
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(amount);
  };

  const chartData = {
    labels: data.map((item) => item.lokasi),
    datasets: [
      {
        label: "Average Price by Location",
        data: data.map((item) => item.harga),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Average Price by Location",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${formatCurrency(
              context.parsed.y
            )}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

interface BedroomProportionChartProps {
  data: Array<{ jumlah_kamar: number; jumlah_rumah: number }>;
  className?: string;
}

export const BedroomProportionChart: React.FC<BedroomProportionChartProps> = ({
  data,
  className = "",
}) => {
  const chartData = {
    labels: data.map((item) => `${item.jumlah_kamar} Bedrooms`),
    datasets: [
      {
        label: "Number of Houses",
        data: data.map((item) => item.jumlah_rumah),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Property Distribution by Bedroom Count",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label;
            const value = context.parsed;
            const total = data.reduce(
              (sum, item) => sum + item.jumlah_rumah,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString(
              "id-ID"
            )} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default {
  PriceDistributionChart,
  LocationPriceChart,
  BedroomProportionChart,
};
