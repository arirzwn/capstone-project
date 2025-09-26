import { HomeIcon } from "@heroicons/react/24/outline";
import { API_CONFIG } from "../../data/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 ">
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

          <div className="flex gap-5 items-center">
            <a href="/#">Beranda</a>
            <a href="/#about-section">Tentang</a>
            <a href="/#technology-section">Teknologi</a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Fitur</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>
                  <a href="/predict-page">Prediksi Harga Rumah</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/dashboard-analytics">
                    Dashboard Analitik Rumah Bandung
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <HoverCard>
              <HoverCardTrigger asChild>
                <a href="/#contact-section">
                  <button
                    className="p-2 text-slate-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg cursor-pointer"
                    aria-label="How prediction works"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                      />
                    </svg>
                  </button>
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit">
                <div className="flex justify-between gap-4">
                  <p className="text-sm">Kontak kami disini</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </header>
  );
};
