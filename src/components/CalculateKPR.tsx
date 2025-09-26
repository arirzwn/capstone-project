import { useReducer, useEffect } from "react"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"
import { formatIDR } from "../utils";

const defaultValue = {
    downPayment: 25, /* % */
    interestRate: 8, /* % */
    loanTenor: 10, /* tahun */
    loanAmount: 0,
    monthlyInstallments: 0
}

function calcKPRReducer(
    state: typeof defaultValue,
    action: {
        type: 'assignDownPayment' | 'assignInterestRate' | 'assignLoanTenor' | 'assignLoanAmount' | 'assignMonthlyInstallments',
        payload?: any
    }
): typeof defaultValue {
    switch (action.type) {
        case 'assignDownPayment':
            return {
                ...state,
                downPayment: action.payload
            }
        case 'assignInterestRate':
            return {
                ...state,
                interestRate: action.payload
            }
        case 'assignLoanTenor':
            return {
                ...state,
                loanTenor: action.payload
            }
        case 'assignLoanAmount':
            return {
                ...state,
                loanAmount: action.payload
            }
        case 'assignMonthlyInstallments':
            return {
                ...state,
                monthlyInstallments: action.payload
            }
        default:
            return state;
    }
}

function CalculateKPR({ predictionPrice }: { predictionPrice: number }) {
    const [calcAttr, dispatch] = useReducer(calcKPRReducer, defaultValue)

    // Hitung otomatis saat predictionPrice, downPayment, interestRate, atau loanTenor berubah
    useEffect(() => {
        if (predictionPrice > 0) {
            // Hitung Uang Muka
            const dpAmount = predictionPrice * (calcAttr.downPayment / 100);
            // Hitung Jumlah Pinjaman
            const loanAmount = predictionPrice - dpAmount;
            dispatch({ type: 'assignLoanAmount', payload: loanAmount });

            // Hitung Angsuran Bulanan
            const monthlyInterest = calcAttr.interestRate / 100 / 12;
            const totalMonths = calcAttr.loanTenor * 12;

            let monthlyPayment;
            if (monthlyInterest === 0) {
                monthlyPayment = loanAmount / totalMonths;
            } else {
                monthlyPayment = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) / (Math.pow(1 + monthlyInterest, totalMonths) - 1);
            }

            dispatch({ type: 'assignMonthlyInstallments', payload: monthlyPayment });
        }
    }, [predictionPrice, calcAttr.downPayment, calcAttr.interestRate, calcAttr.loanTenor]);

    // Fungsi untuk merender slider dengan angka di bawah
    const renderSliderWithLabels = ({ label, maxLabel, minLabel, stepLabel, max, min, onChange, step, value }: { value: number, min: number, max: number, step: number, minLabel: number, maxLabel: number, stepLabel: number, onChange: (value: number) => void, label: string }) => {
        const marks = [];
        for (let i = minLabel; i <= maxLabel; i += stepLabel) {
            marks.push(i);
        }

        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h4>{label}</h4>
                    <div
                        className='flex items-center rounded-md border border-input bg-background has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2'
                    >
                        <Input
                            className="text-center w-16 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            type="number"
                            min={min}
                            max={max}
                            step={step}
                        />
                        <span className="px-3 text-muted-foreground">%</span>
                    </div>
                </div>
                <div className="relative">
                    <Slider
                        value={[value]}
                        onValueChange={(v) => onChange(v[0])}
                        max={max}
                        step={step}
                        className={''}
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        {marks.map((mark) => (
                            <div key={mark} className="absolute" style={{ left: `${((mark - min) / (max - min)) * 100}%` }}>
                                {mark}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Fungsi untuk merender tombol tenor
    const renderTenorButtons = () => {
        const tenors = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, 3, ..., 10]

        return (
            <div className="flex flex-wrap gap-2">
                {tenors.map((year) => (
                    <button
                        key={year}
                        onClick={() => dispatch({ type: 'assignLoanTenor', payload: year })}
                        className={`px-4 py-2 rounded-md border ${calcAttr.loanTenor === year ? 'bg-primary text-white' : 'bg-white text-slate-900 border-input hover:bg-gray-50'}`}
                    >
                        {year} Tahun
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <h3 className="text-2xl font-bold text-slate-900 my-6">
                Kalkulator Pinjaman KPR
            </h3>

            <div className="flex flex-col gap-10">
                {/* Uang Muka */}
                {/* {renderSliderWithLabels(calcAttr.downPayment, 0, 100, 5, (v) => dispatch({ type: 'assignDownPayment', payload: v }), "Uang Muka")} */}
                {renderSliderWithLabels({
                    label: 'Uang Muka',
                    value: calcAttr.downPayment,
                    minLabel: 10,
                    maxLabel: 60,
                    stepLabel: 10,
                    onChange: (v) => dispatch({ type: 'assignDownPayment', payload: v }),
                    min: 10,
                    max: 60,
                    step: 1
                })}

                {/* Suku Bunga */}
                {renderSliderWithLabels({
                    label: 'Suku Bunga',
                    value: calcAttr.interestRate,
                    minLabel: 6,
                    maxLabel: 36,
                    stepLabel: 4,
                    onChange: (v) => dispatch({ type: 'assignInterestRate', payload: v }),
                    min: 6,
                    max: 36,
                    step: 0.1
                })}

                {/* Lama Cicilan */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h4>Lama Cicilan</h4>
                    </div>
                    {renderTenorButtons()}
                </div>

                {/* Hasil Perhitungan */}
                <div className="mt-4 p-4 bg-muted rounded-md">
                    <div className="flex justify-between mb-2">
                        <span>Harga Prediksi:</span>
                        <span className="font-medium">{formatIDR(predictionPrice)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Uang Muka ({calcAttr.downPayment}%):</span>
                        <span className="font-medium">{formatIDR(predictionPrice * (calcAttr.downPayment / 100))}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Jumlah Pinjaman:</span>
                        <span className="font-medium">{formatIDR(calcAttr.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                        <span>Angsuran Bulanan:</span>
                        <span className="text-primary">{formatIDR(calcAttr.monthlyInstallments)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalculateKPR