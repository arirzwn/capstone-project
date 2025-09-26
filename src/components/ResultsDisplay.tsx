import { HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { PredictionResult, PredictionFormData } from "../types";
import { formatIDR } from "../utils";

interface ResultsDisplayProps {
  isLoading: boolean;
  prediction: PredictionResult | null;
  error: string | null;
  formData: PredictionFormData;
  onClearError: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  isLoading,
  prediction,
  error,
  formData,
  onClearError,
}) => {
  return (
    <div
      id="results-section"
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 min-h-[600px]"
    >
      {/* Results Content */}
      {!isLoading && !prediction && !error && (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <HomeIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Siap untuk Prediksi
          </h3>
          <p className="text-slate-600 max-w-sm">
            Isi detail properti di sebelah kiri, lalu klik “Prediksi Harga” untuk melihat hasilnya di sini.
          </p>
        </div>
      )}

      {isLoading && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Analyzing Property...
          </h3>
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded-lg mb-4"></div>
            <div className="h-12 bg-slate-200 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Prediction Error
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="text-red-600">
                <XMarkIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-red-800 font-semibold">
                  Prediction Failed
                </h4>
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={onClearError}
                  className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {prediction && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Price Prediction
          </h3>

          {/* Main Price Display */}
          <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-2">
                {formatIDR(prediction.price)}
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                ML Model Prediction (Est. Confidence: {prediction.confidence}%)
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-900 mb-3">
              Estimated Price Factors
            </h4>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> The breakdown below is estimated for
                reference. The actual prediction is based on machine learning
                analysis of all factors combined.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Bedrooms ({formData.kamar_tidur})
                </span>
                <span className="font-medium">
                  {formatIDR(prediction.breakdown.bedrooms)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Land Area ({formData.luas_tanah}m²)
                </span>
                <span className="font-medium">
                  {formatIDR(prediction.breakdown.land)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Building Area ({formData.luas_bangunan}m²)
                </span>
                <span className="font-medium">
                  {formatIDR(prediction.breakdown.building)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Location ({formData.lokasi})
                </span>
                <span className="font-medium">
                  {formatIDR(prediction.breakdown.location)}
                </span>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Price Range</h4>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex justify-between items-center text-sm">
                <div className="text-center">
                  <div className="text-slate-600 mb-1">Min</div>
                  <div className="font-medium">
                    {formatIDR(prediction.priceRange.min)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-600 mb-1">Likely</div>
                  <div className="font-medium text-indigo-600">
                    {formatIDR(prediction.priceRange.likely)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-600 mb-1">Max</div>
                  <div className="font-medium">
                    {formatIDR(prediction.priceRange.max)}
                  </div>
                </div>
              </div>
              {/* Visual price range bar */}
              <div className="mt-4 h-2 bg-slate-200 rounded-full">
                <div className="h-full bg-gradient-to-r from-amber-400 via-emerald-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
