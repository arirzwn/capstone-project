import type { PredictionFormData, ApiResponse } from "../types";

export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format waktu_penjualan to match API format (YYYY-MM)
export const formatWaktuPenjualan = (waktu: string): string => {
  const currentYear = new Date().getFullYear();
  const monthMap: { [key: string]: string } = {
    "< 6 bulan": `${currentYear}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}`,
    "6 - 12 bulan": `${currentYear}-${String(
      new Date().getMonth() + 6
    ).padStart(2, "0")}`,
    "> 12 bulan": `${currentYear + 1}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}`,
  };
  return (
    monthMap[waktu] ||
    `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );
};

// Dummy data function for development (saves GCP costs)
export const generateDummyPrediction = (
  formData: PredictionFormData
): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const basePrice = 1000000000;
      const landFactor = formData.luas_tanah * 5000000;
      const buildingFactor = formData.luas_bangunan * 8000000;
      const bedroomFactor = formData.kamar_tidur * 100000000;
      const bathroomFactor = formData.kamar_mandi * 50000000;
      const garageFactor = formData.garasi * 30000000;

      // Location multiplier
      const locationMultipliers: { [key: string]: number } = {
        "Bandung Barat": 0.8,
        "Bandung Kota": 1.2,
        "Bandung Timur": 0.9,
        "Bandung Utara": 1.1,
        "Bandung Selatan": 1.0,
        Cimahi: 0.85,
        Garut: 0.6,
        Sumedang: 0.7,
      };

      const locationMultiplier = locationMultipliers[formData.lokasi] || 1.0;

      const totalPrice = Math.round(
        (basePrice +
          landFactor +
          buildingFactor +
          bedroomFactor +
          bathroomFactor +
          garageFactor) *
          locationMultiplier
      );

      resolve({
        pesan: "Prediksi harga rumah berhasil!",
        prediksi_harga: totalPrice,
        success: true,
      });
    }, 1500); // Simulate network delay
  });
};

export const scrollToForm = () => {
  document.getElementById("prediction-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export const scrollToResults = () => {
  document.getElementById("results-section")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
