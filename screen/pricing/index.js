// "use client";
// import { CheckCircle } from "lucide-react";
// import React, { useState } from "react";
// import ToggleTabs from "../../components/toggle-Tabs";

// const Pricing = () => {
//   const [plan, setPlan] = useState("monthly");

//   return (
//     <div className="relative w-full flex flex-col bg-[#05060f]  py-30 px-5 md:px-20 gap-10">
//       <div className="w-full md:w-[90%] flex flex-col gap-2">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ">
//           Enjoy Automated Trading at
//         </h1>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
//           Competitive Pricing
//         </h1>
//       </div>
//       <div className="flex flex-col md:flex-row justify-between items-center gap-10">
//         <div className="w-full md:w-[70%]">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl ">Plans & Pricing</h1>
//           <p className="w-full text-sm sm:text-base md:text-lg text-gray-200">
//             Qbot offers affordable subscription plans with minimal upfront
//             costs, providing access to multiple exchanges while ensuring maximum
//             trading efficiency. Choose between monthly or yearly plans and take
//             control of your trading journey.
//           </p>
//         </div>

//         <ToggleTabs
//           options={[
//             { label: "Monthly", value: "monthly" },
//             { label: "Yearly", value: "yearly" },
//           ]}
//           active={plan}
//           onChange={setPlan}
//         />
//       </div>
//       <div className="relative bg-gradient-to-b from-[#1b1b2f] to-[#141424] rounded-3xl p-8 w-full max-w-sm shadow-lg border border-purple-800/30 mt-5">
//         <div className="absolute top-10 left-[-20px] bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-semibold px-4 py-1 rounded-r-full transform -rotate-45 origin-left">
//           🔥 Special Offer
//         </div>

//         <div className="text-center mb-4">
//           <span className="bg-purple-600/20 text-primary text-sm px-4 py-1 rounded-full">
//             {plan === "monthly" ? "Monthly" : "Yearly"}
//           </span>
//         </div>

//         <div className="text-center mb-6">
//           <p className="text-gray-500 line-through text-lg">
//             ${plan === "monthly" ? "2000" : "24000"}
//           </p>
//           <p className="text-5xl font-bold">
//             ${plan === "monthly" ? "1200" : "12000"}
//           </p>
//         </div>

//         <ul className="space-y-4 mb-6">
//           <li className="flex items-center gap-3 text-gray-300">
//             <CheckCircle className="text-primary" size={20} />
//             Duration: {plan === "monthly" ? "1 MONTH" : "12 MONTHS"}
//           </li>
//           <li className="flex items-center gap-3 text-gray-300">
//             <CheckCircle className="text-primary" size={20} />
//             Exchanges: Binance
//           </li>
//           <li className="flex items-center gap-3 text-gray-300">
//             <CheckCircle className="text-primary" size={20} />
//             Profit Cap: $200
//           </li>
//         </ul>

//         <div className="border-t border-gray-700 pt-4 text-sm text-gray-400 mb-6">
//           Expand arbitrage on Binance. Higher profit potential with advanced
//           automated trading. Limited-time offer!
//         </div>

//         <div className=" w-full flex justify-center items-center">
//           <button className=" justify-center items-center mt-2 px-6 py-3 bg-primary text-[white] font-semibold rounded-[10px] shadow hover:opacity-90 transition">
//             Login To Buy
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;


import React from "react";

/**
 * PricingHero.jsx
 * Single-file React component (Next.js compatible) using Tailwind CSS.
 * Paste into /components and import into a page.
 *
 * This reproduces the pricing layout from the provided screenshot:
 * - Left: large headline, subtitle, exchange icons, trust line
 * - Right: tall pricing card with ribbon, price, bullet list and CTA
 *
 * Requires Tailwind CSS in your project. Small inline styles / keyframes are included for effects.
 */

export default function PricingHero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#061026] via-[#0b0720] to-[#2b0630] text-white px-8 py-16 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 items-start">
        {/* LEFT CONTENT */}
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-extrabold leading-tight">
            Enjoy Automated Trading at
            <br />
            <span className="block">Competitive Pricing</span>
          </h1>

          <h2 className="mt-8 text-2xl font-semibold">Plans & Pricing</h2>

          <p className="mt-4 max-w-2xl text-gray-300">
            Automate trades on Binance & Bybit — single API-only connections. Your funds remain on the exchange.
          </p>

          {/* Exchanges row */}
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <ExchangeBadge name="BINANCE" accent="yellow" active />
            <ExchangeBadge name="BYBIT" accent="gold" active />
            <ExchangeBadge name="KUCOIN" accent="gray" comingSoon />
            <div className="ml-2 text-gray-400">coming soon</div>
          </div>

          <div className="mt-10 text-gray-200 font-medium">
            Trusted by <span className="font-semibold">18k+</span> traders &nbsp; • &nbsp; 24/7 uptime
          </div>
        </div>

        {/* RIGHT PRICING CARD */}
        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[320px]">
            {/* Ribbon */}
            <div className="absolute -left-4 -top-4 z-20 transform rotate-[-18deg]">
              <div className="bg-pink-600 text-white text-xs px-4 py-1 rounded-md shadow-md">
                FL. limited
              </div>
            </div>

            {/* Card */}
            <div
              className="relative rounded-2xl p-8 pt-12 pb-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 10px 40px rgba(167,39,124,0.08)",
                backdropFilter: "blur(8px)",
                overflow: "hidden",
              }}
            >
              {/* inner neon border */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  padding: 1,
                  background:
                    "linear-gradient(180deg, rgba(196,63,192,0.06), rgba(86,55,185,0.06))",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  pointerEvents: "none",
                }}
              />

              {/* badge label */}
              <div className="absolute top-6 right-6 bg-pink-700/20 text-pink-200 px-3 py-1 rounded-full text-xs">
                Special offer
              </div>

              {/* Price */}
              <div className="text-center mt-1">
                <div className="text-sm text-gray-400 line-through">₹2000</div>
                <div className="mt-2 text-5xl font-extrabold">₹1200</div>
              </div>

              {/* Bullet list */}
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckMark />
                  <div>
                    <div className="text-sm font-semibold">Duration. 1 MONTH</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckMark />
                  <div>
                    <div className="text-sm font-semibold">Exchanges, Binance</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckMark />
                  <div>
                    <div className="text-sm font-semibold">Profit Cap, $200</div>
                  </div>
                </li>
              </ul>

              {/* small description */}
              <p className="mt-6 text-gray-400 text-sm leading-relaxed">
                Explore arbitrage on Binance & Bybit. Higher price programmatically automated and monitored.
              </p>

              {/* CTA */}
              <div className="mt-8">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff3b7a] to-[#ff6a9a] text-white font-semibold shadow-lg">
                  Login To Buy
                </button>
              </div>
            </div>

            {/* neon outer glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: 20,
                boxShadow: "0 30px 80px rgba(160,50,140,0.18), inset 0 0 60px rgba(120,30,120,0.08)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* tiny keyframes for subtle animation if desired */}
      <style js>{`
        /* nothing required—kept for future micro-animations */
      `}</style>
    </section>
  );
}

/* -------------------------
   Small presentational helpers
   ------------------------- */

function ExchangeBadge({ name, accent = "gray", active = false, comingSoon = false }) {
  const accentColor =
    accent === "yellow" ? "bg-amber-400 text-amber-400" : accent === "gold" ? "bg-yellow-300 text-yellow-300" : "bg-gray-400 text-gray-400";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-md grid place-items-center ${active ? "bg-opacity-100" : "bg-opacity-30"}`}
        style={{
          background: active ? "linear-gradient(135deg,#0f1724,#142033)" : "transparent",
          border: active ? "1px solid rgba(255,255,255,0.04)" : "1px dashed rgba(255,255,255,0.03)",
        }}
      >
        {/* small check or placeholder icon */}
        {active ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#47d0a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" opacity="0.25">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
          </svg>
        )}
      </div>
      <div className={`text-sm font-semibold ${active ? "text-white" : "text-gray-400"}`}>{name}</div>
    </div>
  );
}

function CheckMark() {
  return (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 grid place-items-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

