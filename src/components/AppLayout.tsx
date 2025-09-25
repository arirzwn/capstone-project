import { Footer } from "@components/reusable/Footer";
import { Navbar } from "@components/reusable/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <>
            <Navbar onInfoClick={() => {}} />
            <div className="min-h-screen flex">
                <div className="pt-[6rem] w-full">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AppLayout;
