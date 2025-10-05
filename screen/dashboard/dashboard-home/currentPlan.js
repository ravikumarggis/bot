"use client";


export default function CurrentPlan() {
  return (
    <div className="bg-[#12121a] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white text-lg font-normal">Current Plan</h3>
        <button
          
          className="text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          Update Plan
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-64 h-64 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="currentColor"
              strokeWidth="16"
              fill="none"
              className="text-gray-800"
            />
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="currentColor"
              strokeWidth="16"
              fill="none"
              strokeDasharray="628"
              strokeDashoffset="628"
              className="text-gray-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-semibold text-white">0.00</div>
            <div className="text-sm text-gray-400 mt-1">Available Cap</div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            variant="outline"
            className="w-full bg-transparent border-gray-700/50 text-white hover:bg-gray-800/50 rounded-full py-6 text-base"
          >
            Profit Cap 0 USDT
          </button>
          <button
            className="w-full bg-primary text-[white] rounded-[10px] py-6 text-base font-semibold"
          >
            Buy Plan
          </button>
        </div>
      </div>
    </div>
  );
}
