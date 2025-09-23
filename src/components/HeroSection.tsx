interface HeroSectionProps {
  onStartPrediction: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPrediction,
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Predict house prices instantly.
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Get accurate price predictions with our AI-powered model. Your data
          stays private and secure.
        </p>
        <button
          onClick={onStartPrediction}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          Start Prediction
        </button>
      </div>
    </section>
  );
};
