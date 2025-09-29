import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function HomeTab() {
  const [plan, setPlan] = useState("monthly");

  return (
    <div className=" mx-[-1%] bg-[#05060f] gap-5 p-[2%] flex flex-col items-center justify-center px-4 py-16 text-white">
      
      <div className="flex items-center bg-[#12121d] rounded-full p-1 mb-10">
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

      <div className="relative bg-gradient-to-b from-[#1b1b2f] to-[#141424] rounded-3xl p-8 w-full max-w-sm shadow-lg border border-purple-800/30">
        
        <div className="absolute top-10 left-[-20px] bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-semibold px-4 py-1 rounded-r-full transform -rotate-45 origin-left">
          🔥 Special Offer
        </div>

        <div className="text-center mb-4">
          <span className="bg-purple-600/20 text-purple-400 text-sm px-4 py-1 rounded-full">
            {plan === "monthly" ? "Monthly" : "Yearly"}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-500 line-through text-lg">₹{plan === "monthly" ? "2000" : "24000"}</p>
          <p className="text-5xl font-bold">₹{plan === "monthly" ? "1200" : "12000"}</p>
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
          Expand arbitrage on Binance. Higher profit potential with advanced automated trading. Limited-time offer!
        </div>

      <div className=" w-full flex justify-center items-center">
        <button className=" justify-center items-center mt-2 px-6 py-3 bg-[#c1a8ff] text-[#1e0042] font-semibold rounded-full shadow hover:opacity-90 transition">
        Login To Buy
          </button></div>
      </div>
    </div>
  );
}
