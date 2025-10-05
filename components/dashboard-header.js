"use client";

import { useState } from "react";
import { Copy, Menu, X, LogOut, User } from "lucide-react";

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText("ldaxdoyq");
  };

  const handleLogout = () => {
    // 👉 Add your logout logic here
    console.log("Logged out");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-[#0B0B12]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* --- Left: Logo / Project Name --- */}
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-white">🚀 CryptoBot</div>
          </div>

          {/* --- Right: Profile & Actions --- */}
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/yourcommunity" // <- update link
              target="_blank"
              className="hidden sm:inline-block bg-[#EE3379] text-[white] font-semibold rounded-[10px]  px-4 py-1.5 text-sm transition-colors"
            >
              Need Help? Join Telegram
            </a>

            {/* --- Desktop Profile Menu --- */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-10 h-10 bg-[#EE3379] text-[white] font-semibold rounded-[10px] flex items-center justify-center hover:ring-2 hover:ring-violet-400 transition"
              >
                <User className="w-5 h-5 text-white" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111118] border border-white/10 rounded-xl shadow-lg py-2">
                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-white/10"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* --- Mobile Menu Toggle --- */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* --- Mobile Dropdown --- */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 mt-2 py-3 space-y-3 text-sm text-gray-300">
            <div className="space-y-1">
              <div>
                Plan Status: <span className="text-red-500">Inactive</span>
              </div>
              <div>
                Referral Earning: <span className="text-red-500">Off</span>
              </div>
              <div>
                DCA: <span className="text-red-500">Off</span>
              </div>
              <div className="flex items-center gap-2">
                Referral Code: <span className="text-white">ldaxdoyq</span>
                <button onClick={handleCopyReferralCode}>
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <a
              href="https://t.me/yourcommunity"
              target="_blank"
              className="block bg-violet-400 hover:bg-violet-500 text-violet-950 font-medium rounded-full px-4 py-2 text-center transition"
            >
              Join Telegram
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
