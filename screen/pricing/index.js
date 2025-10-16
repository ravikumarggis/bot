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


"use client";
import React from "react";
import Image from "next/image";

/**
 * PricingHero.jsx
 * A modern pricing section with exchange badges and pricing card.
 * Compatible with Next.js + Tailwind CSS.
 * Place exchange logos in: /public/assets/homepage/
 * Example: /public/assets/homepage/binance.png, /bybit.png, /kucoin.png
 */

export default function PricingHero() {
  return (
    <section className=" bg-gradient-to-b from-[#040414] via-[#070619] to-[#080312] text-white px-6 sm:px-10 py-20 sm:py-28 overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8 items-start">
        {/* LEFT CONTENT */}
        <div className="col-span-10 lg:col-span-7  flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Enjoy Automated Trading at
            <br />
            <span className="block">Competitive Pricing</span>
          </h1>

          <h2 className="mt-4 sm:mt-8 text-3xl font-semibold">Plans & Pricing</h2>

          <p className="mt-4 sm:mt-6 max-w-2xl text-gray-300">
            Automate trades on Binance & Bybit — single API-only connections.
            Your funds remain on the exchange.
          </p>

          {/* Exchanges row */}
          <div className="mt-4 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <ExchangeBadge name="BINANCE" accent="yellow" active />
            <ExchangeBadge name="BYBIT" accent="gold" active />
            <ExchangeBadge name="KUCOIN" accent="gray" comingSoon />
            <ExchangeBadge name="MEXC" accent="gray" comingSoon />
            {/* <div className="ml-2 text-gray-400 text-sm">coming soon</div> */}
          </div>

          <div className="pt-2 sm:pt-12 text-sm text-gray-400 flex items-center gap-2">
            <span className="text-pink-400 font-medium">
              Trusted by 18k traders
            </span>
            • 24/7 uptime
          </div>
        </div>

        {/* RIGHT PRICING CARD */}
        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end lg:ml-12 mt-5">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
            {/* Ribbon */}
            <div className="absolute left-0 sm:-left-4 -top-4 z-20 transform sm:-rotate-18 -rotate-12">
              <div className="bg-pink-600 text-white text-xs px-4 py-1 rounded-md shadow-md">
                FL. limited
              </div>
            </div>

            {/* Card */}
            <div
              className="relative w-[90%] mx-auto rounded-2xl p-6 sm:p-8 pt-10 pb-8 sm:pt-12 sm:pb-10"
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
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-pink-700/20 text-pink-200 px-3 py-1 rounded-full text-[10px] sm:text-xs">
                Special offer
              </div>

              {/* Price */}
              <div className="text-center mt-2 sm:mt-1">
                <div className="text-sm sm:text-md text-gray-400 line-through">
                  $2000
                </div>
                <div className="mt-2 text-4xl sm:text-5xl font-extrabold">
                  $1200
                </div>
              </div>

              {/* Bullet list */}
              <ul className="mt-6 space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <CheckMark />
                  <span className="text-sm font-semibold">
                    Duration: 1 Month
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckMark />
                  <span className="text-sm font-semibold">
                    Exchanges: Binance , Bybit
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckMark />
                  <span className="text-sm font-semibold">
                    Profit Cap: Unlimited
                  </span>
                </li>
              </ul>

              {/* small description */}
              <p className="mt-6 text-gray-400 text-xs sm:text-sm leading-relaxed">
                Explore grid & DCA on Binance & Bybit. Higher price
                programmatically automated and monitored.
              </p>

              {/* CTA */}
              <div className="mt-8">
                <button className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#ff3b7a] to-[#ff6a9a] text-white font-semibold shadow-lg hover:opacity-90 transition">
                  Login To Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------
   Small presentational helpers
   ------------------------- */

function ExchangeBadge({ name, accent = "gray", active = false, comingSoon = false }) {
  // map exchange names to logo paths in /public/assets/homepage/
  const logos = {
    BINANCE: "/assets/homepage/binance.png",
    BYBIT: "/assets/homepage/bybit.webp",
    KUCOIN: "/assets/homepage/kucoin.png",
    MEXC: "/assets/homepage/mexc.png",
  };
  const isKucoin = name === "KUCOIN";
  const logoSize = isKucoin ? 100 : 40;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-10 h-10 rounded-md grid place-items-center ${
          active ? "bg-opacity-100" : "bg-opacity-30"
        }`}
        style={{
          background: active
            ? ""
            : "transparent",
          border: active
            ? "1px solid rgba(255,255,255,0.04)"
            : "1px dashed rgba(255,255,255,0.03)",
        }}
      >
        {logos[name] ? (
          <Image
            src={logos[name]}
            alt={name}
            width={logoSize}
            height={logoSize}

            className={"object-contain"}
          />
        ) : (
          <></>
        )}
      </div>

      <div
        className={`text-sm font-semibold ${
          active ? "text-white" : "text-gray-400"
        }`}
      >
        {name}
      </div>
      {comingSoon && (
          <span className="text-[10px] text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-1.5 py-0.5 rounded">
            Coming Soon
          </span>
        )}
    </div>
  );
}

function CheckMark() {
  return (
    <div className="w-6 h-6 rounded-full bg-primary grid place-items-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
