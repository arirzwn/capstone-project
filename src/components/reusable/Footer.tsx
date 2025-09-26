export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-2">
            Prediksi harga dihasilkan menggunakan model machine learning yang dilatih dengan data perumahan di Bandung dan mungkin tidak mencerminkan nilai pasar saat ini. Gunakan hanya sebagai referensi.
          </p>
          <p className="text-sm text-slate-500">Hak Cipta © 2025 oleh Ara-Ara </p>
        </div>
      </div>
    </footer>
  );
};
