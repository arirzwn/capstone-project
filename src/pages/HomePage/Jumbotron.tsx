function Jumbotron() {
    return (
        <section className="flex flex-col justify-center items-center gap-5 h-[calc(100vh-100px)] md:h-[calc(100vh-65px)] text-center p-10">
            <h1 className="text-5xl font-semibold">Prediksi Harga Rumah di Bandung dengan AI</h1>
            <p>Teknologi machine learning terkini digunakan untuk menganalisis dan memprediksi harga rumah di Bandung dengan akurasi tinggi. Dapatkan estimasi nilai pasar rumah Anda dalam hitungan detik.</p>
            <div className="flex gap-3">
                <a href="/predict-page">
                    <button className="bg-indigo-500 rounded-lg py-2 px-3 text-white cursor-pointer">
                        Coba Sekarang
                    </button>
                </a>
                <a href="/#about-section">
                    <button className="border-2 border-indigo-500 rounded-lg py-2 px-3 cursor-pointer">
                        Pelajari lebih lanjut
                    </button>
                </a>
            </div>
        </section>
    )
}

export default Jumbotron
