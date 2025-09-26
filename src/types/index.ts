export interface PredictionFormData {
  kamar_tidur: number;
  kamar_mandi: number;
  garasi: number;
  luas_tanah: number;
  luas_bangunan: number;
  lokasi: string;
  waktu_penjualan: string;
}

export interface PredictionResult {
  price: number;
  confidence: number;
  breakdown: {
    bedrooms: number;
    land: number;
    building: number;
    location: number;
  };
  priceRange: {
    min: number;
    likely: number;
    max: number;
  };
}

export interface ApiResponse {
  pesan: string;
  prediksi_harga: number;
  success: boolean;
}

export interface ApiErrorResponse {
  error: string;
}

export interface ApiConfig {
  USE_REAL_API: boolean;
  BASE_URL: string;
  LOCAL_URL: string;
}


