"use client";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";

const Pricing = () => {
  const [plan, setPlan] = useState("monthly");

  return (
    <div className="relative w-full flex flex-col bg-[#05060f]  py-30 px-5 md:px-20 gap-10">
      <div className="w-full md:w-[90%] flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ">
          Enjoy Automated Trading at
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Competitive Pricing
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="w-full md:w-[70%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl ">Plans & Pricing</h1>
          <p className="w-full text-sm sm:text-base md:text-lg text-gray-200">
            ARBIQUE offers affordable subscription plans with minimal upfront
            costs, providing access to multiple exchanges while ensuring maximum
            trading efficiency. Choose between monthly or yearly plans and take
            control of your trading journey.
          </p>
        </div>

        <div className="flex items-center justify-center bg-[#12121d] rounded-full p-1 h-12 mb-10 md:mb-0">
          <button
            onClick={() => setPlan("monthly")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              plan === "monthly"
                ? "bg-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPlan("yearly")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              plan === "yearly"
                ? "bg-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="relative bg-gradient-to-b from-[#1b1b2f] to-[#141424] rounded-3xl p-8 w-full max-w-sm shadow-lg border border-purple-800/30 mt-5">
        <div className="absolute top-10 left-[-20px] bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-semibold px-4 py-1 rounded-r-full transform -rotate-45 origin-left">
          🔥 Special Offer
        </div>

        <div className="text-center mb-4">
          <span className="bg-purple-600/20 text-purple-400 text-sm px-4 py-1 rounded-full">
            {plan === "monthly" ? "Monthly" : "Yearly"}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-500 line-through text-lg">
            ₹{plan === "monthly" ? "2000" : "24000"}
          </p>
          <p className="text-5xl font-bold">
            ₹{plan === "monthly" ? "1200" : "12000"}
          </p>
        </div>

        <ul className="space-y-4 mb-6">
          <li className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="text-purple-400" size={20} />
            Duration: {plan === "monthly" ? "1 MONTH" : "12 MONTHS"}
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="text-purple-400" size={20} />
            Exchanges: Binance
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="text-purple-400" size={20} />
            Profit Cap: $200
          </li>
        </ul>

        <div className="border-t border-gray-700 pt-4 text-sm text-gray-400 mb-6">
          Expand arbitrage on Binance. Higher profit potential with advanced
          automated trading. Limited-time offer!
        </div>

        <div className=" w-full flex justify-center items-center">
          <button className=" justify-center items-center mt-2 px-6 py-3 bg-[#c1a8ff] text-[white] font-semibold rounded-full shadow hover:opacity-90 transition">
            Login To Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
