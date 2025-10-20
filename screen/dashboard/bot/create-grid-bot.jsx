// // app/page.jsx
// 
// import dynamic from "next/dynamic";
// import React from "react";

// const TradingViewWidget = dynamic(() => import("@/components/trading-view-widget"), { ssr: false });

// export default function CreateGridBot() {
//   return (
//     <div style={{ padding: 20 ,flex:1}}>
      
//       <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" ,minHeight:500 ,flex:1 ,backgroundColor:"red"}}>
//         <TradingViewWidget symbol="NASDAQ:GOOGL"  />
//       </div>
//     </div>
//   );
// }
"use client"
import React from "react";
import dynamic from "next/dynamic";

// Next.js + Tailwind React component for a responsive "Create Grid Bot" UI (NO SIDEBAR)
// Usage:
// 1) Save as components/GridBotUI.jsx or pages/gridbot.jsx
// 2) Make sure Tailwind is installed and configured in your Next.js project
// 3) Define a CSS variable --color-primary in your globals.css, for example:
//    :root { --color-primary: #e11d48; } /* example pink-red */
// 4) Import and render <GridBotUI /> in a page

const TradingViewWidget = dynamic(() => import("@/components/trading-view-widget"), { ssr: false });

export default function GridBotUI() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 py-10">

          {/* MAIN CONTENT (no sidebar) */}
          <main className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Chart & controls (span 2 columns on large screens) */}
            <section className="col-span-1 lg:col-span-2 bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create Grid Bot</h1>
                <div className="flex items-center gap-3">
                  <select className="bg-[#0b0b0d] border border-[#222227] rounded-md px-3 py-2 text-sm">
                    <option>binance</option>
                    <option>coinbase</option>
                  </select>
                  <select className="bg-[#0b0b0d] border border-[#222227] rounded-md px-3 py-2 text-sm">
                    <option>BTC/USDT</option>
                    <option>ETH/USDT</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Chart area */}
                <div className="lg:col-span-2">
                <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" ,minHeight:500 ,flex:1 }}>
        <TradingViewWidget symbol="NASDAQ:GOOGL"  />
      </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-[#0b0b0d] border border-[#17171a] rounded-lg p-3">
                      <div className="text-xs text-gray-400">Investment</div>
                      <div className="font-medium mt-1">90.54 USDT</div>
                    </div>
                    <div className="bg-[#0b0b0d] border border-[#17171a] rounded-lg p-3">
                      <div className="text-xs text-gray-400">Estimated Orders</div>
                      <div className="font-medium mt-1">10</div>
                    </div>
                    <div className="bg-[#0b0b0d] border border-[#17171a] rounded-lg p-3">
                      <div className="text-xs text-gray-400">Required</div>
                      <div className="font-medium mt-1">100 USDT</div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-[#0b0b0d] border border-[#151518] rounded-xl p-4 text-sm leading-6">
                    <h3 className="font-semibold mb-2">About Grid Bot</h3>
                    <p className="text-gray-400">A fixed price range over which the trading bot will execute buy and sell orders divided into equal grid levels. Choose your price range and grid settings on the right.</p>
                  </div>
                </div>
              </div>
               
            </section>

            {/* Right: Form */}
            <aside className="bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">Fasy Form</div>
                <div className="text-sm text-gray-400">Advanced form</div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <div className="text-xs text-gray-400 mb-1">High Price</div>
                  <input className="w-full rounded-md border border-[#222227] px-3 py-2 bg-[#0b0b0d]" placeholder="Below 144.291" />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-400 mb-1">Low Price</div>
                  <input className="w-full rounded-md border border-[#222227] px-3 py-2 bg-[#0b0b0d]" placeholder="Above 77665.31" />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-400 mb-1">Quantity per grid</div>
                  <input className="w-full rounded-md border border-[#222227] px-3 py-2 bg-[#0b0b0d]" placeholder="0.0001" />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-400 mb-1">Grid levels</div>
                  <input className="w-full rounded-md border border-[#222227] px-3 py-2 bg-[#0b0b0d]" placeholder="10" />
                </label>

                <div className="pt-2">
                  <div className="text-xs text-gray-400 mb-1">Investment</div>
                  <div className="text-xl font-semibold">90.54 USDT</div>
                </div>

                <label className="block">
                  <div className="text-xs text-gray-400 mb-1">Bot Name</div>
                  <select className="w-full rounded-md border border-[#222227] px-3 py-2 bg-[#0b0b0d]">
                    <option>Bold Luke Skywalker</option>
                    <option>Steady Bot</option>
                  </select>
                </label>

                <button className="w-full mt-2 py-3 rounded-xl text-white font-semibold" style={{ background: "var(--color-primary)" }}>
                  Create Grid Bot
                </button>

                <div className="text-xs text-gray-500 mt-3">Estimated Orders 10 | Required: 100 USDT</div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}

