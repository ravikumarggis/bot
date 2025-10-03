"use client";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/Navbar";
import DashboardHeader from "../../../components/dashboard-header";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex overflow-hidden">
      {/* --- Sidebar --- */}
      <div className="h-screen w-0 md:w-64 fixed md:static">
        <Sidebar />
      </div>

    
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Fixed Top Header */}
        <DashboardHeader />

        {/* Content area with padding to avoid header overlap */}
        <main className="flex-1 overflow-y-auto   pt-12">
          {children}
        </main>
      </div>
    </div>
  );
}
