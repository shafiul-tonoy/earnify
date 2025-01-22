import DashboardNav from "../components/dashboard/DashboardNav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import MainSideNav from "../pages/dashboard/navigation/MainSideNav";

export default function DashboardLayout() {
  return (
    <>
      {/* Dashboard Navbar */}
      <div className="p-4 md:p-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 ">
        <DashboardNav />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <aside className="col-span-1 bg-gray-100 md:border-r border-gray-300 p-5 md:p-6">
          <MainSideNav />
        </aside>

        {/* Main Content */}
        <main className="col-span-1 md:col-span-3 flex flex-col justify-between">
          {/* Outlet Content */}
          <div className="min-h-[65vh] bg-white  rounded-md p-5 md:p-10">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="mt-5 bg-gray-50 text-center p-4 md:p-6  rounded-md">
            <Footer />
          </footer>
        </main>
      </div>
    </>
  );
}

