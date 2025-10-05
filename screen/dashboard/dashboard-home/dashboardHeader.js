"use client";

import { Copy } from "lucide-react";

export default function DashboardHeader() {
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText("ldaxdoyq");
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex gap-12">
        <div className="space-y-1">
          <div className="text-sm text-gray-400">
            Plan Status : <span className="text-red-500">Inactive</span>
          </div>
          <div className="text-sm text-gray-400">
            Referral Earning : <span className="text-red-500">Off</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-400">
            DCA : <span className="text-red-500">Off</span>
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            Referral Code : <span className="text-white">ldaxdoyq</span>
            <button
              onClick={handleCopyReferralCode}
              className="hover:text-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    
    </div>
  );
}
