"use client";
import { useState } from "react";
import { Check, Lock } from "lucide-react";

export default function PricingCard() {
  const [planType, setPlanType] = useState("monthly");

  return (
    <section className="bg-[#0a0f1e] text-white py-24 px-6 flex justify-center items-center">
      <div className="max-w-sm w-full text-center">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8 bg-[#11182f] p-1 rounded-full border border-white/10 w-fit mx-auto">
          <button
            onClick={() => setPlanType("monthly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              planType === "monthly"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPlanType("yearly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              planType === "yearly"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Pricing Card */}
        <div className="relative rounded-2xl p-8 text-left shadow-lg bg-gradient-to-br from-blue-500/30 via-purple-600/40 to-pink-500/30">
          {/* Ribbon */}
          <div className="absolute -top-3 left-0 bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-semibold px-4 py-1 rounded-tr-lg rounded-bl-lg shadow-sm">
            Limited-Time Offer
          </div>

          {/* Plan Type */}
          <div className="inline-block bg-[#11182f]/80 px-4 py-1 rounded-full text-sm text-gray-200 mb-4">
            {planType === "monthly" ? "Monthly Plan" : "Yearly Plan"}
          </div>

          {/* Price */}
          <h2 className="text-5xl font-extrabold text-blue-300 mb-6">
            {planType === "monthly" ? "₹1200" : "₹12000"}
          </h2>

          {/* Features */}
          <ul className="space-y-3 mb-6 text-gray-200">
            <li className="flex items-center space-x-2">
              <Check className="text-cyan-400 w-5 h-5" />
              <span>
                Duration: {planType === "monthly" ? "1 Month" : "12 Months"}
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="text-cyan-400 w-5 h-5" />
              <span>Exchange: Binance</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="text-cyan-400 w-5 h-5" />
              <span>Profit Cap: {planType === "monthly" ? "$200" : "$3000"}</span>
            </li>
          </ul>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">
            Expand arbitrage with AI-driven automation. Limited-time offer.
            Instant activation.
          </p>

          {/* CTA Button */}
          <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition">
            Activate Plan
          </button>

          {/* Secure Info */}
          <div className="flex items-center justify-center mt-5 text-gray-300 text-sm space-x-2">
            <Lock className="w-4 h-4" />
            <span>Secure API-based integration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
