import { useState, useEffect } from "react";
import { StatisticsCard, PropertyTable } from "../../components/ui";
import {
  PriceDistributionChart,
  LocationPriceChart,
  BedroomProportionChart,
} from "../../components/ui/SimpleCharts";
import ErrorBoundary from "../../components/ErrorBoundary";
import { getAnalyticsData } from "../../services/api";
import type { AnalyticsResponse } from "../../types";

function DashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const data = await getAnalyticsData();
        setAnalyticsData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch analytics data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Gagal Memuat Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Data tidak tersedia</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Analitik
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatisticsCard
              title="HARGA MAKSIMUM"
              value={analyticsData.kpi_cards.harga_maksimum}
              label={formatCurrency(analyticsData.kpi_cards.harga_maksimum)}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
            />

            <StatisticsCard
              title="HARGA RATA-RATA"
              value={analyticsData.kpi_cards.harga_rata_rata}
              label={formatCurrency(analyticsData.kpi_cards.harga_rata_rata)}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
            />

            <StatisticsCard
              title="HARGA MINIMUM"
              value={analyticsData.kpi_cards.harga_minimum}
              label={formatCurrency(analyticsData.kpi_cards.harga_minimum)}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              }
            />
          </div>

          {/* Additional KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatisticsCard
              title="RATA-RATA KAMAR TIDUR"
              value={Math.round(analyticsData.kpi_cards.avg_kamar_tidur)}
              label={`${Math.round(
                analyticsData.kpi_cards.avg_kamar_tidur
              )} kamar`}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 0H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
              }
            />

            <StatisticsCard
              title="RATA-RATA KAMAR MANDI"
              value={Math.round(analyticsData.kpi_cards.avg_kamar_mandi)}
              label={`${Math.round(
                analyticsData.kpi_cards.avg_kamar_mandi
              )} kamar`}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M8 6l4-4 4 4M6 10h12v11H6V10z"
                  />
                </svg>
              }
            />

            <StatisticsCard
              title="PERSENTASE GARASI"
              value={
                Math.round(analyticsData.kpi_cards.persentase_garasi * 100) /
                100
              }
              label={`${analyticsData.kpi_cards.persentase_garasi.toFixed(1)}%`}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
            />
          </div>

          {/* Insights Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mb-8 text-white">
            <h2 className="text-xl font-semibold mb-4">Insight Pasar</h2>
            {analyticsData.insight === "MAINTENANCE_MODE" ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Pemeliharaan Sistem
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Mohon tunggu, fitur insight pasar sedang dalam pemeliharaan
                  sistem. Silakan coba lagi nanti. Sementara itu, Anda masih
                  dapat melihat grafik dan statistik lainnya.
                </p>
              </div>
            ) : (
              <p className="text-blue-100 leading-relaxed">
                {analyticsData.insight}
              </p>
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PriceDistributionChart
              data={analyticsData.grafik.distribusi_harga}
            />
            <BedroomProportionChart
              data={analyticsData.grafik.proporsi_kamar_tidur}
            />
          </div>

          {/* Location Price Chart */}
          <div className="mb-8">
            <LocationPriceChart
              data={analyticsData.grafik.harga_per_lokasi.slice(0, 10)}
            />
          </div>

          {/* Data Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PropertyTable
              title="5 Lokasi Properti Termahal"
              data={analyticsData.tabel.top_5_mahal}
            />
            <PropertyTable
              title="5 Lokasi Properti Termurah"
              data={analyticsData.tabel.top_5_murah}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default DashboardPage;
