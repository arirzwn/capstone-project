const aboutList = [
    {
        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        ,
        title: "Akurasi Tinggi",
        caption: 'Model machine learning kami dilatih dengan data riil properti di Bandung, memberikan prediksi harga yang akurat dan dapat diandalkan.'
    },
    {
        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>,
        title: "Cepat & Mudah",
        caption: 'Proses prediksi harga rumah hanya membutuhkan beberapa detik. Cukup masukkan spesifikasi rumah Anda, dan kami akan beri hasilnya secara instan.',
    },
    {
        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
        ,
        title: "Rekomendasi Personal",
        caption: 'Dapatkan insight tambahan seperti simulasi KPR (DP, bunga, cicilan) yang disesuaikan dengan kebutuhan finansial Anda.'
    },
]

function About() {
    return (
        <section className="flex flex-col gap-5 px-10 pt-30 items-center min-h-[calc(80vh)]" id="about-section">

            <h2 className="text-3xl font-semibold">Tentang Home Value</h2>
            <p className="text-center">Platform inovatif yang menggunakan kecerdasan buatan untuk membantu Anda mengetahui nilai pasar rumah di Bandung dengan lebih baik.</p>

            <div className="flex gap-5 flex-wrap items-start justify-center">
                {aboutList.map((aboutItem, i) => {
                    return (
                        <div key={i} className="flex flex-col gap-2 items-center text-center justify-center bg-indigo-100 rounded-lg p-5 max-w-[30rem] aspect-video relative">
                            <div className="rounded-full bg-indigo-500 p-3 w-16 aspect-square flex justify-center items-center">
                                {aboutItem.svg}
                            </div>

                            <h4 className="font-semibold text-lg">
                                {aboutItem.title}
                            </h4>
                            <p>
                                {aboutItem.caption}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default About
