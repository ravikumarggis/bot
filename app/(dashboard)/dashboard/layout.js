"use client";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/Navbar";
import DashboardHeader from "../../../components/dashboard-header";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex overflow-hidden">
      <div className="h-screen w-0 md:w-64 fixed md:static">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden ">
        <DashboardHeader />

<<<<<<< HEAD
        <main className="flex-1 overflow-y-auto   pt-20 px-5">
          {children}
        </main>
=======
        {/* Content area with padding to avoid header overlap */}
        <main className="flex-1 overflow-y-auto   pt-12">{children}</main>
>>>>>>> a1836b880216b3dfdb6f7ac9b7c8bc17162b4dcb
      </div>
    </div>
  );
}
