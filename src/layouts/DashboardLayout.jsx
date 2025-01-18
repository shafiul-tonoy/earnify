import DashboardNav from "../components/dashboard/DashboardNav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import MainSideNav from "../pages/dashboard/navigation/MainSideNav";

export default function DashboardLayout() {
  return (
    <>
      <div className="p-5">
        <DashboardNav />
      </div>
      <div className="grid grid-col-1 md:grid-cols-4 ">
        <div className="col-span-1 md:col-span-1  p-10 border-r-2">
          <MainSideNav />
        </div>
        <div className="col-span-1 md:col-span-3 ">
          <div className= 'min-h-[60vh] p-10' >
            <Outlet />
          </div>
          <div id="footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
