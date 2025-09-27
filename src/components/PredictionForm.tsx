import React from "react";
import type { PredictionFormData } from "../types";
import { locations, timeOptions } from "../data/constants";
import { StepperInput, NumberInput, SelectInput } from "./ui";

interface PredictionFormProps {
  formData: PredictionFormData;
  onInputChange: (
    field: keyof PredictionFormData,
    value: string | number
  ) => void;
  onStepperChange: (
    field: keyof PredictionFormData,
    increment: boolean
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  isLoading: boolean;
  formErrors: Record<string, string>;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  formData,
  onInputChange,
  onStepperChange,
  onSubmit,
  onReset,
  isLoading,
  formErrors,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 sticky top-24">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Detail Properti
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Bedrooms */}
        <StepperInput
          id="kamar_tidur"
          label="Kamar Tidur"
          value={formData.kamar_tidur}
          onChange={(value) => onInputChange("kamar_tidur", value)}
          onIncrement={() => onStepperChange("kamar_tidur", true)}
          onDecrement={() => onStepperChange("kamar_tidur", false)}
          error={formErrors.kamar_tidur}
          ariaLabel="bedrooms"
        />

        {/* Bathrooms */}
        <StepperInput
          id="kamar_mandi"
          label="Kamar Mandi
"
          value={formData.kamar_mandi}
          onChange={(value) => onInputChange("kamar_mandi", value)}
          onIncrement={() => onStepperChange("kamar_mandi", true)}
          onDecrement={() => onStepperChange("kamar_mandi", false)}
          error={formErrors.kamar_mandi}
          ariaLabel="bathrooms"
        />

        {/* Garage */}
        <StepperInput
          id="garasi"
          label="Kapasitas Garasi"
          value={formData.garasi}
          onChange={(value) => onInputChange("garasi", value)}
          onIncrement={() => onStepperChange("garasi", true)}
          onDecrement={() => onStepperChange("garasi", false)}
          error={formErrors.garasi}
          ariaLabel="garage capacity"
        />

        {/* Land Area */}
        <NumberInput
          id="luas_tanah"
          label="Luas Tanah (m²)"
          value={formData.luas_tanah}
          onChange={(value) => onInputChange("luas_tanah", value)}
          placeholder="e.g., 120"
          unit="m²"
          helpText="Masukkan total luas tanah dalam meter persegi."
          error={formErrors.luas_tanah}
          min={1}
        />

        {/* Building Area */}
        <NumberInput
          id="luas_bangunan"
          label="Luas Bangunan (m²)"
          value={formData.luas_bangunan}
          onChange={(value) => onInputChange("luas_bangunan", value)}
          placeholder="e.g., 80"
          unit="m²"
          helpText="Masukkan luas lantai bangunan dalam meter persegi."
          error={formErrors.luas_bangunan}
          min={1}
        />

        {/* Location */}
        <SelectInput
          id="lokasi"
          label="Wilayah"
          value={formData.lokasi}
          onChange={(value) => onInputChange("lokasi", value)}
          options={locations}
          placeholder="Pilih Wilayah"
          helpText="Pilih wilayah tempat properti berada."
          error={formErrors.lokasi}
        />

        {/* Expected Selling Time */}
        <SelectInput
          id="waktu_penjualan"
          label="Waktu pembelian/penjualan yang Diperkirakan"
          value={formData.waktu_penjualan}
          onChange={(value) => onInputChange("waktu_penjualan", value)}
          options={timeOptions}
          placeholder="Pilih rentang waktu"
          helpText="Kapan Anda berencana membeli/menjual properti?"
          error={formErrors.waktu_penjualan}
        />

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:flex-1 inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-5 py-3 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Sedang memprediksi..." : "Prediksi Harga"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 text-slate-700 px-5 py-3 font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
