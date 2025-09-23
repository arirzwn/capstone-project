interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  unit?: string;
  helpText?: string;
  error?: string;
  min?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  unit,
  helpText,
  error,
  min = 1,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className={`w-full rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            unit ? "pr-12" : ""
          }`}
          placeholder={placeholder}
          aria-describedby={
            error ? `${id}-error` : helpText ? `${id}-help` : undefined
          }
        />
        {unit && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">
            {unit}
          </span>
        )}
      </div>
      {helpText && (
        <p id={`${id}-help`} className="mt-1 text-xs text-slate-500">
          {helpText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
