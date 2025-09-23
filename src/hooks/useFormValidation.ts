import { useState } from "react";
import type { PredictionFormData } from "../types";

export const useFormValidation = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: PredictionFormData): boolean => {
    const errors: Record<string, string> = {};

    if (formData.kamar_tidur < 0)
      errors.kamar_tidur = "Bedrooms must be 0 or greater";
    if (formData.kamar_mandi < 0)
      errors.kamar_mandi = "Bathrooms must be 0 or greater";
    if (formData.garasi < 0)
      errors.garasi = "Garage capacity must be 0 or greater";
    if (formData.luas_tanah <= 0)
      errors.luas_tanah = "Land area must be greater than 0";
    if (formData.luas_bangunan <= 0)
      errors.luas_bangunan = "Building area must be greater than 0";
    if (!formData.lokasi) errors.lokasi = "Please select a location";
    if (!formData.waktu_penjualan)
      errors.waktu_penjualan = "Please select expected selling time";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (field: string) => {
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const clearAllErrors = () => {
    setFormErrors({});
  };

  return {
    formErrors,
    validateForm,
    clearFieldError,
    clearAllErrors,
  };
};
