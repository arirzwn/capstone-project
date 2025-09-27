const technologyItem = [
  {
    icon: "/react-icon.webp",
    alt: "React Technology on Home Value Web App",
    label: "React.js",
    field: "Front End",
  },
  {
    icon: "/flask-icon.webp",
    alt: "Flask Technology on Home Value Web App",
    label: "Flask Python",
    field: "Back End",
  },
  {
    icon: "/xgboost-icon.webp",
    alt: "XGBoost Model on Home Value Web App",
    label: "XGBoost",
    field: "Machine Learning Model",
  },
  {
    icon: "/cloudrun-icon.webp",
    alt: "Cloud Run Technology on Home Value Web App",
    label: "Cloud Run",
    field: "Deployment",
  },
];
const systemStrength = [
  {
    title: "Kecepatan Tinggi",
    description: "Mampu memproses prediksi harga dalam hitungan milidetik.",
  },
  {
    title: "Akurasi Presisi",
    description:
      "Tingkat akurasi hingga 85% dalam prediksi harga rumah di Bandung berdasarkan data riil.",
  },
  {
    title: "Prediksi Regresi Linear",
    description:
      "  Menggunakan model regresi lanjutan (XGBoost) yang mampu menangkap pola kompleks dari berbagai fitur rumah seperti lokasi, luas tanah, dan jumlah kamar.",
  },
];

function Technology() {
  return (
    <section
      className="flex flex-col py-20 px-10 items-center bg-white"
      id="technology-section"
    >
      <h2 className="text-3xl font-semibold">Teknologi Home Value</h2>
      <p className="mt-3 text-center">
        Home Value adalah platform prediksi harga rumah berbasis machine
        learning yang dirancang khusus untuk pasar properti Bandung.
      </p>

      <div className="flex justify-center items-center w-full">
        <div className="flex gap-16 justify-center items-center w-2/5 p-10 rounded-xl flex-wrap">
          {technologyItem.map((i, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 w-32 aspect-[144/200] items-center justify-between text-center shrink-0"
            >
              <h5 className="font-semibold">{i.field}</h5>
              <img
                src={i.icon}
                alt={i.alt}
                className={`w-full shrink-0 ${
                  i.icon === "/xgboost-icon.webp"
                    ? " aspect-[397/167]"
                    : "aspect-square"
                }`}
              />
              <p>{i.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full px-5 py-3 flex flex-col gap-8">
        <h4 className="font-semibold text-xl">Mengapa Home Value?</h4>
        <ul className="w-fit flex flex-col gap-3">
          {systemStrength.map((i, index) => (
            <li className="flex gap-5 items-center" key={index}>
              <div className="bg-indigo-500 w-5 aspect-square rounded-full shrink-0" />
              <div className="flex flex-col gap-1">
                <h5 className="font-semibold text-lg">{i.title}</h5>
                <p>{i.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Technology;
