"use client";
import { useState } from "react";
import { LayoutDashboard, Settings, LogOut, Home } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-gray-800 border-r border-gray-700 w-64 min-h-screen p-5">
        <h2 className="text-2xl font-semibold mb-10 text-[#EE3379]">My App</h2>
        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard/home"
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md"
          >
            <Home /> Dashboard
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md"
          >
            <Settings /> Settings
          </Link>
          <button className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md mt-auto">
            <LogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 bg-purple-600 p-2 rounded-lg z-1000"
      >
        <LayoutDashboard size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
          <div className="bg-gray-800 w-64 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold text-[#EE3379]">My App</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link
                href="/dashboard/home"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <Home /> Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <Settings /> Settings
              </Link>
              <button className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md mt-auto">
                <LogOut /> Logout
              </button>
            </nav>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}
