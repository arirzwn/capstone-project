import { useEffect, useRef, useState } from "react"
import CLOUDS from 'vanta/dist/vanta.clouds.min'

function Jumbotron() {
    const [vantaEffect, setVantaEffect] = useState(null)
    const jumbotronSection = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(CLOUDS({
                el: jumbotronSection.current
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return (
        <section ref={jumbotronSection} id="jumbotron-section" className="flex flex-col justify-center items-center gap-10 h-[calc(100vh-100px)] md:h-[calc(100vh-65px)] text-center p-10">
            <h1 className="text-5xl font-semibold leading-16">Prediksi Harga Rumah di Bandung dengan AI</h1>
            <p className="lg:text-xl w-3/4">Teknologi machine learning terkini digunakan untuk menganalisis dan memprediksi harga rumah di Bandung dengan akurasi tinggi. Dapatkan estimasi nilai pasar rumah Anda dalam hitungan detik.</p>
            <div className="flex gap-3 lg:text-xl">
                <a href="/predict-page">
                    <button className="bg-indigo-500 rounded-lg py-2 px-3 lg:py-3 lg:px-10 text-white cursor-pointer hover:bg-indigo-400">
                        Coba Sekarang
                    </button>
                </a>
                <a href="/#about-section">
                    <button className="border-3 border-indigo-500 rounded-lg py-2 px-3 lg:py-3 lg:px-10 cursor-pointer box-border hover:text-white hover:bg-indigo-400 transition-all hover:border-none">
                        Pelajari lebih lanjut
                    </button>
                </a>
            </div>
        </section>
    )
}

export default Jumbotron
