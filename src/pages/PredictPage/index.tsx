import { useState } from "react";
import type { PredictionFormData, PredictionResult } from "@/types";
import { API_CONFIG } from "@/data/constants";
import { scrollToForm, scrollToResults } from "@/utils";
import { makePrediction } from "@/services/api";
import { useFormValidation } from "@/hooks/useFormValidation";
import {
    HeroSection,
    InfoModal,
    PredictionForm,
    ResultsDisplay,
} from "@/components";
import { Navbar } from "@components/reusable/Navbar";
import { Footer } from "@components/reusable/Footer";

function PredictPage() {
    // Log current API mode on app start
    console.log(
        `🏠 HomeValue App - ${API_CONFIG.USE_REAL_API ? "Production" : "Development"
        } Mode`
    );
    console.log(
        `📡 API Endpoint: ${API_CONFIG.USE_REAL_API ? API_CONFIG.BASE_URL : "Dummy Data Generator"
        }`
    );

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [formData, setFormData] = useState<PredictionFormData>({
        kamar_tidur: 2,
        kamar_mandi: 1,
        garasi: 1,
        luas_tanah: 100,
        luas_bangunan: 80,
        lokasi: "",
        waktu_penjualan: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { formErrors, validateForm, clearFieldError, clearAllErrors } =
        useFormValidation();

    const handleStepperChange = (
        field: keyof PredictionFormData,
        increment: boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: Math.max(0, (prev[field] as number) + (increment ? 1 : -1)),
        }));
        // Clear error for this field
        clearFieldError(field);
    };

    const handleInputChange = (
        field: keyof PredictionFormData,
        value: string | number
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        clearFieldError(field);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData)) return;

        setIsLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const result = await makePrediction(formData);
            setPrediction(result);

            setTimeout(() => {
                if (window.innerWidth < 1024) {
                    scrollToResults();
                }
            }, 100);
        } catch (err) {
            console.error("Prediction failed:", err);
            if (err instanceof Error) {
                setError(`Failed to predict house price: ${err.message}`);
            } else {
                setError(
                    API_CONFIG.USE_REAL_API
                        ? "Failed to predict house price. Please check your internet connection."
                        : "Failed to predict house price. Please check if the backend server is running."
                );
            }

            // Scroll to results section to show error (mobile only)
            setTimeout(() => {
                if (window.innerWidth < 1024) {
                    scrollToResults();
                }
            }, 100); // Small delay to ensure error is rendered
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            kamar_tidur: 2,
            kamar_mandi: 1,
            garasi: 1,
            luas_tanah: 100,
            luas_bangunan: 80,
            lokasi: "",
            waktu_penjualan: "",
        });
        clearAllErrors();
        setPrediction(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <InfoModal
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
            />

            <HeroSection onStartPrediction={scrollToForm} />

            <section id="prediction-form" className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Column */}
                        <div className="order-1">
                            <PredictionForm
                                formData={formData}
                                onInputChange={handleInputChange}
                                onStepperChange={handleStepperChange}
                                onSubmit={handleSubmit}
                                onReset={handleReset}
                                isLoading={isLoading}
                                formErrors={formErrors}
                            />
                        </div>

                        {/* Results Column */}
                        <div className="order-2 lg:order-2">
                            <ResultsDisplay
                                isLoading={isLoading}
                                prediction={prediction}
                                error={error}
                                formData={formData}
                                onClearError={() => setError(null)}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PredictPage;