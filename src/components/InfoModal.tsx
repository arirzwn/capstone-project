import { XMarkIcon } from "@heroicons/react/24/outline";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-slate-500/75 transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              How Prediction Works
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="text-sm text-slate-600 space-y-3">
            <p>
              Our AI model analyzes multiple factors to predict house prices:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Number of bedrooms and bathrooms</li>
              <li>Land and building area</li>
              <li>Location market trends</li>
              <li>Expected selling timeframe</li>
            </ul>
            <p className="text-xs text-slate-500 mt-4">
              Predictions are estimates based on historical data and market
              trends. Actual prices may vary based on property condition, exact
              location, and market conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
