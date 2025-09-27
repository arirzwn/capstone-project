import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface PriceDistributionChartProps {
  data: number[];
  className?: string;
}

export const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({
  data,
  className = "",
}) => {

  // Create price ranges based on the data
  const createPriceRanges = (prices: number[]) => {
    if (!prices || prices.length === 0) return { ranges: [], counts: [] };
    
    const ranges = [
      { label: "< 500 jt", min: 0, max: 500000000, color: 'rgba(34, 197, 94, 0.8)' },
      { label: "500 jt - 1 M", min: 500000000, max: 1000000000, color: 'rgba(59, 130, 246, 0.8)' },
      { label: "1 M - 2 M", min: 1000000000, max: 2000000000, color: 'rgba(245, 158, 11, 0.8)' },
      { label: "2 M - 3 M", min: 2000000000, max: 3000000000, color: 'rgba(139, 92, 246, 0.8)' },
      { label: "3 M - 5 M", min: 3000000000, max: 5000000000, color: 'rgba(236, 72, 153, 0.8)' },
      { label: "> 5 M", min: 5000000000, max: Infinity, color: 'rgba(239, 68, 68, 0.8)' }
    ];

    const counts = ranges.map(range => {
      return prices.filter(price => price >= range.min && price < range.max).length;
    });

    return { ranges, counts };
  };

  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribusi Harga
        </h3>
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
  }

  const { ranges, counts } = createPriceRanges(data);
  
  // Filter out ranges with zero count
  const filteredData = ranges
    .map((range, index) => ({ ...range, count: counts[index] }))
    .filter(item => item.count > 0);

  const chartData = {
    labels: filteredData.map(item => item.label),
    datasets: [
      {
        label: 'Jumlah Properti',
        data: filteredData.map(item => item.count),
        backgroundColor: filteredData.map(item => item.color),
        borderColor: filteredData.map(item => item.color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      title: {
        display: true,
        text: 'Distribusi Harga Properti',
        font: {
          size: 16,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} properti (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="h-96">
        <Doughnut data={chartData} options={options} />
      </div>
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
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Harga Rata-rata per Lokasi
        </h3>
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map(item => item.lokasi),
    datasets: [
      {
        label: 'Harga (Milyar Rupiah)',
        data: data.map(item => item.harga / 1000000000), // Convert to billions
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Harga Rata-rata per Lokasi',
        font: {
          size: 16,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Rp ${context.parsed.y.toFixed(2)}M`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `Rp ${Number(value).toFixed(1)}M`;
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
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
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribusi Properti berdasarkan Jumlah Kamar Tidur
        </h3>
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.jumlah_rumah, 0);

  const chartData = {
    labels: data.map(item => `${item.jumlah_kamar} Kamar`),
    datasets: [
      {
        label: 'Jumlah Rumah',
        data: data.map(item => item.jumlah_rumah),
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(236, 72, 153, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      title: {
        display: true,
        text: 'Distribusi Properti berdasarkan Jumlah Kamar Tidur',
        font: {
          size: 16,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed.toLocaleString('id-ID')} rumah (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="h-96">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default {
  PriceDistributionChart,
  LocationPriceChart,
  BedroomProportionChart,
};
