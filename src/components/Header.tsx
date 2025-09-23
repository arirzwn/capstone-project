import { HomeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { API_CONFIG } from "../data/constants";

interface HeaderProps {
  onInfoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-slate-900">HomeValue</h1>
            {!API_CONFIG.USE_REAL_API && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Dev Mode
              </span>
            )}
          </div>
          <button
            onClick={onInfoClick}
            className="p-2 text-slate-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            aria-label="How prediction works"
          >
            <InformationCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
