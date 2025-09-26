import React from "react";

interface StatisticsCardProps {
  title: string;
  value: number;
  label?: string;
  icon?: React.ReactNode;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
  className?: string;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  label,
  icon,
  showSeeAll = false,
  onSeeAll,
  className = "",
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString("id-ID");
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {formatNumber(value)}
          </p>
          {label && <p className="text-sm text-gray-500 mt-1">{label}</p>}
        </div>
      </div>

      {showSeeAll && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={onSeeAll}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Lihat semua</span>
            <div className="ml-2 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
