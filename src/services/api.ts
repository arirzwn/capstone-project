import type {
  PredictionFormData,
  ApiResponse,
  PredictionResult,
  AnalyticsResponse,
  AnalyticsErrorResponse,
} from "../types";
import { API_CONFIG } from "../data/constants";
import { formatWaktuPenjualan, generateDummyPrediction } from "../utils";

export const makePrediction = async (
  formData: PredictionFormData
): Promise<PredictionResult> => {
  let result: ApiResponse;

  if (API_CONFIG.USE_REAL_API) {
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

export const getAnalyticsData = async (): Promise<AnalyticsResponse> => {
  if (API_CONFIG.USE_REAL_API) {
    console.log("🚀 Calling analytics API...");

    const response = await fetch(`${API_CONFIG.BASE_URL}/data-analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData: AnalyticsErrorResponse = await response.json();

      // Check if this is the Qwen credits exhausted error (402)
      if (
        response.status === 402 ||
        errorData.error?.includes("exceeded your monthly included credits")
      ) {
        console.log(
          "⚠️ Qwen credits exhausted, using fallback data without insights"
        );

        // Return dummy analytics data with maintenance message for insights
        return {
          grafik: {
            distribusi_harga: [1600000000.0, 850000000.0, 725000000.0],
            harga_per_lokasi: [
              { harga: 7400000000.0, lokasi: "Braga, Bandung" },
              { harga: 5531839080.45977, lokasi: "Riau, Bandung" },
              { harga: 4656923076.923077, lokasi: "Cipaganti, Bandung" },
              { harga: 3200000000.0, lokasi: "Dago, Bandung" },
              { harga: 2800000000.0, lokasi: "Setiabudhi, Bandung" },
            ],
            proporsi_kamar_tidur: [
              { jumlah_kamar: 3, jumlah_rumah: 23381 },
              { jumlah_kamar: 4, jumlah_rumah: 14648 },
              { jumlah_kamar: 2, jumlah_rumah: 14240 },
              { jumlah_kamar: 5, jumlah_rumah: 4921 },
            ],
          },
          insight: "MAINTENANCE_MODE", // Special flag to indicate insights are in maintenance
          kpi_cards: {
            avg_kamar_mandi: 2.26,
            avg_kamar_tidur: 3.18,
            harga_maksimum: 8750000000,
            harga_median: 1650000000,
            harga_minimum: 18500000,
            harga_per_meter_rata: 13725047,
            harga_rata_rata: 1982341517,
            lokasi_termahal: {
              harga: 8750000000,
              lokasi: "Bandung Kota, Bandung",
            },
            lokasi_termurah: { harga: 18500000, lokasi: "Cimahi, Bandung" },
            persentase_garasi: 75.24,
            total_rumah: 57190,
          },
          message:
            "Data berhasil dimuat dengan mode pemeliharaan untuk insights",
          success: true,
          tabel: {
            top_5_mahal: [
              {
                harga: 8750000000,
                lokasi: "Bandung Kota, Bandung",
                luas_bangunan: 250,
                luas_tanah: 300,
              },
              {
                harga: 7400000000,
                lokasi: "Braga, Bandung",
                luas_bangunan: 200,
                luas_tanah: 250,
              },
              {
                harga: 5531839080,
                lokasi: "Riau, Bandung",
                luas_bangunan: 180,
                luas_tanah: 220,
              },
              {
                harga: 4656923077,
                lokasi: "Cipaganti, Bandung",
                luas_bangunan: 160,
                luas_tanah: 200,
              },
              {
                harga: 3200000000,
                lokasi: "Dago, Bandung",
                luas_bangunan: 150,
                luas_tanah: 180,
              },
            ],
            top_5_murah: [
              {
                harga: 18500000,
                lokasi: "Cimahi, Bandung",
                luas_bangunan: 45,
                luas_tanah: 60,
              },
              {
                harga: 150000000,
                lokasi: "Soreang, Bandung",
                luas_bangunan: 50,
                luas_tanah: 72,
              },
              {
                harga: 200000000,
                lokasi: "Majalaya, Bandung",
                luas_bangunan: 55,
                luas_tanah: 80,
              },
              {
                harga: 250000000,
                lokasi: "Banjaran, Bandung",
                luas_bangunan: 60,
                luas_tanah: 85,
              },
              {
                harga: 300000000,
                lokasi: "Katapang, Bandung",
                luas_bangunan: 65,
                luas_tanah: 90,
              },
            ],
          },
        };
      }

      throw new Error(errorData.error || "Failed to get analytics data");
    }

    const result: AnalyticsResponse = await response.json();
    return result;
  } else {
    // Use dummy data for development
    console.log("🔧 Using dummy analytics data (development mode)");
    return {
      grafik: {
        distribusi_harga: [1600000000.0, 850000000.0, 725000000.0],
        harga_per_lokasi: [
          { harga: 7400000000.0, lokasi: "Braga, Bandung" },
          { harga: 5531839080.45977, lokasi: "Riau, Bandung" },
          { harga: 4656923076.923077, lokasi: "Cipaganti, Bandung" },
          { harga: 3200000000.0, lokasi: "Dago, Bandung" },
          { harga: 2800000000.0, lokasi: "Setiabudhi, Bandung" },
        ],
        proporsi_kamar_tidur: [
          { jumlah_kamar: 3, jumlah_rumah: 23381 },
          { jumlah_kamar: 4, jumlah_rumah: 14648 },
          { jumlah_kamar: 2, jumlah_rumah: 14240 },
          { jumlah_kamar: 5, jumlah_rumah: 4921 },
        ],
      },
      insight:
        "Properti di Bandung Kota dan Batununggal memiliki harga per meter persegi hingga Rp29 juta—lebih dari dua kali lipat rata-rata Rp13,7 juta—sedangkan Cimahi menawarkan harga terendah Rp411 ribu per meter. Perbedaan signifikan ini menunjukkan bahwa lokasi menjadi faktor krusial dalam menentukan nilai properti di Bandung.",
      kpi_cards: {
        avg_kamar_mandi: 2.26,
        avg_kamar_tidur: 3.18,
        harga_maksimum: 8750000000,
        harga_median: 1650000000,
        harga_minimum: 18500000,
        harga_per_meter_rata: 13725047,
        harga_rata_rata: 1982341517,
        lokasi_termahal: { harga: 8750000000, lokasi: "Bandung Kota, Bandung" },
        lokasi_termurah: { harga: 18500000, lokasi: "Cimahi, Bandung" },
        persentase_garasi: 75.24,
        total_rumah: 57190,
      },
      message: "Data analitik berhasil diambil!",
      success: true,
      tabel: {
        top_5_mahal: [
          {
            harga: 8750000000.0,
            lokasi: "Bandung Kota, Bandung",
            luas_bangunan: 300,
            luas_tanah: 321,
          },
          {
            harga: 8750000000.0,
            lokasi: "Mekar Wangi, Bandung",
            luas_bangunan: 300,
            luas_tanah: 244,
          },
          {
            harga: 8750000000.0,
            lokasi: "Bandung Kota, Bandung",
            luas_bangunan: 300,
            luas_tanah: 321,
          },
          {
            harga: 8700000000.0,
            lokasi: "Batununggal, Bandung",
            luas_bangunan: 247,
            luas_tanah: 300,
          },
          {
            harga: 8700000000.0,
            lokasi: "Batununggal, Bandung",
            luas_bangunan: 247,
            luas_tanah: 300,
          },
        ],
        top_5_murah: [
          {
            harga: 18500000.0,
            lokasi: "Cimahi, Bandung",
            luas_bangunan: 45,
            luas_tanah: 72,
          },
          {
            harga: 18500000.0,
            lokasi: "Cihanjuang, Bandung",
            luas_bangunan: 68,
            luas_tanah: 120,
          },
          {
            harga: 19500000.0,
            lokasi: "Bojongsoang, Bandung",
            luas_bangunan: 50,
            luas_tanah: 36,
          },
          {
            harga: 27000000.0,
            lokasi: "Rancasari, Bandung",
            luas_bangunan: 90,
            luas_tanah: 100,
          },
          {
            harga: 29000000.0,
            lokasi: "Kopo, Bandung",
            luas_bangunan: 55,
            luas_tanah: 100,
          },
        ],
      },
    };
  }
};
