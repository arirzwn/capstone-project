export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-12">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-2">
            Price predictions are generated using machine learning models
            trained on Bandung housing data and may not reflect actual current
            market values. Use as reference only.
          </p>
          <p className="text-sm text-slate-500">Copyright © 2025 by Ara-Ara </p>
        </div>
      </div>
    </footer>
  );
};
