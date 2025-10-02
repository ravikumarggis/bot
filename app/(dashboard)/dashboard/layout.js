"use client";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex overflow-hidden">
      <div className=" h-screen w-0 md:w-64">
        <Sidebar />
      </div>

     

        <main className=" overflow-y-scroll p-4 md:p-6">
          {children}
        </main>
    
    </div>
  );
}
