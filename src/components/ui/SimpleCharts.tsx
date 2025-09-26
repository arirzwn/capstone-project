import React from "react";

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

  const labels = [
    "Rentang Harga Tinggi",
    "Rentang Harga Menengah",
    "Rentang Harga Rendah",
  ];
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Distribusi Harga
      </h3>
      <div className="space-y-4">
        {data.map((value, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {labels[index]}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(value)}
            </span>
          </div>
        ))}
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
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(amount);
  };

  const maxPrice = Math.max(...data.map((item) => item.harga));

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Harga Rata-rata per Lokasi
      </h3>
      <div className="space-y-3">
        {data.slice(0, 8).map((item, index) => {
          const percentage = (item.harga / maxPrice) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700 truncate">
                  {item.lokasi}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(item.harga)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
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
  const total = data.reduce((sum, item) => sum + item.jumlah_rumah, 0);
  const colors = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-purple-500",
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Distribusi Properti berdasarkan Jumlah Kamar Tidur
      </h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.jumlah_rumah / total) * 100;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded ${
                    colors[index] || "bg-gray-500"
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.jumlah_kamar} Kamar Tidur
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {item.jumlah_rumah.toLocaleString("id-ID")}
                </div>
                <div className="text-xs text-gray-500">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default {
  PriceDistributionChart,
  LocationPriceChart,
  BedroomProportionChart,
};
