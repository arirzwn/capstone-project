import { Footer } from "@components/reusable/Footer";
import { Navbar } from "@components/reusable/Navbar";
import { Outlet } from "react-router-dom";

interface AppLayout {
  onInfoClick: () => void;
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="flex" style={{ minHeight: "calc(100vh - 200px)" }}>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
