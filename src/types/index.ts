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

// New comprehensive analytics interfaces
export interface LocationPrice {
  harga: number;
  lokasi: string;
}

export interface BedroomProportion {
  jumlah_kamar: number;
  jumlah_rumah: number;
}

export interface PropertyData {
  harga: number;
  lokasi: string;
  luas_bangunan: number;
  luas_tanah: number;
}

export interface AnalyticsGrafik {
  distribusi_harga: number[];
  harga_per_lokasi: LocationPrice[];
  proporsi_kamar_tidur: BedroomProportion[];
}

export interface AnalyticsKpiCards {
  avg_kamar_mandi: number;
  avg_kamar_tidur: number;
  harga_maksimum: number;
  harga_median: number;
  harga_minimum: number;
  harga_per_meter_rata: number;
  harga_rata_rata: number;
  lokasi_termahal: LocationPrice;
  lokasi_termurah: LocationPrice;
  persentase_garasi: number;
  total_rumah: number;
}

export interface AnalyticsTabel {
  top_5_mahal: PropertyData[];
  top_5_murah: PropertyData[];
}

export interface AnalyticsResponse {
  grafik: AnalyticsGrafik;
  insight: string;
  kpi_cards: AnalyticsKpiCards;
  message: string;
  success: boolean;
  tabel: AnalyticsTabel;
}

export interface AnalyticsErrorResponse {
  error: string;
}
