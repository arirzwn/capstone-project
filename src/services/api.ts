import type {
  PredictionFormData,
  ApiResponse,
  PredictionResult,
} from "../types";
import { API_CONFIG } from "../data/constants";
import { formatWaktuPenjualan, generateDummyPrediction } from "../utils";

export const makePrediction = async (
  formData: PredictionFormData
): Promise<PredictionResult> => {
  let result: ApiResponse;

  if (API_CONFIG.USE_REAL_API) {
    // Call the real GCP API - use Indonesian field names as expected by API
    const apiPayload = {
      kamar_tidur: formData.kamar_tidur,
      kamar_mandi: formData.kamar_mandi,
      garasi: formData.garasi,
      luas_tanah: formData.luas_tanah,
      luas_bangunan: formData.luas_bangunan,
      lokasi: formData.lokasi,
      waktu_penjualan: formatWaktuPenjualan(formData.waktu_penjualan),
    };

    console.log("🚀 Calling real API with payload:", apiPayload);

    const response = await fetch(`${API_CONFIG.BASE_URL}/predict-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get prediction");
    }

    result = await response.json();
  } else {
    // Use dummy data for development
    console.log("🔧 Using dummy data (development mode)");
    result = await generateDummyPrediction(formData);
  }

  // Format the result to match the expected PredictionResult interface
  const prediction: PredictionResult = {
    price: result.prediksi_harga,
    confidence: 85, // Default confidence since API doesn't provide this
    breakdown: {
      bedrooms: formData.kamar_tidur * 50000000, // Estimated breakdown for display
      land: formData.luas_tanah * 2500000,
      building: formData.luas_bangunan * 3500000,
      location: 100000000, // Fixed location value for display
    },
    priceRange: {
      min: result.prediksi_harga * 0.8, // ±20% range for display
      likely: result.prediksi_harga,
      max: result.prediksi_harga * 1.2,
    },
  };

  return prediction;
};
