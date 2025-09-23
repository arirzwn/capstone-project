import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface StepperInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  error?: string;
  ariaLabel?: string;
}

export const StepperInput: React.FC<StepperInputProps> = ({
  id,
  label,
  value,
  onChange,
  onIncrement,
  onDecrement,
  error,
  ariaLabel,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onDecrement}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-300 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={`Decrease ${ariaLabel || label.toLowerCase()}`}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <input
          id={id}
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-20 text-center rounded-xl border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={onIncrement}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-300 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={`Increase ${ariaLabel || label.toLowerCase()}`}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
