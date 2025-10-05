"use client";

import React from "react";
import { motion } from "framer-motion";
import { LineChart, Target, PlayCircle, Cloud } from "lucide-react";
import { InfiniteMovingCards } from "../../components/ui/moving-card";

const steps = [
  {
    id: 1,
    title: "Initialization",
    description:
      "Begin by integrating your exchange accounts securely via API. Our platform ensures secure and encrypted connections, allowing seamless data flow between ARBIQUE and your exchanges.",
    icon: <Cloud size={48} />,
  },
  {
    id: 2,
    title: "Market Monitoring",
    description:
      "Once connected, ARBIQUE continuously tracks market movements in real time, analyzing price fluctuations, liquidity, and emerging trends across multiple exchanges.",
    icon: <LineChart size={48} />,
  },
  {
    id: 3,
    title: "Opportunity Detection",
    description:
      "Our intelligent system identifies potential trading opportunities, including arbitrage gaps, price variations, and strategic trade signals that can enhance profitability.",
    icon: <Target size={48} />,
  },
  {
    id: 4,
    title: "Trade Execution",
    description:
      "When the system detects a profitable opportunity, it executes trades instantly based on your defined strategy, ensuring efficient and precise order placements while reducing risks and delays.",
    icon: <PlayCircle size={48} />,
  },
];

const testimonials = [
  {
    name: "Binance",
    icon: "/assets/exchange/bitmart.png",
  },
  {
    name: "CoinSwitch",
    icon: "/assets/exchange/binance_1.png",
  },
  {
    name: "Mudrex",
    icon: "/assets/exchange/kraken.png",
  },
];

const Exchange = () => {
  return (
    <div className="relative w-full flex flex-col   py-30 px-5 md:px-20 gap-10">
      <div className="w-full md:w-[90%] flex flex-col  gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ">
          Securely Integrate Your
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Exchange APIs on ARBIQUE
        </h1>
      </div>
      <div className="w-full  items-center justify-center flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          ARBIQUE Supports Multiple Exchanges
        </h1>
        <p className=" w-full   text-sm sm:text-base md:text-lg text-gray-200 items-center text-center">
          Our platform allows users to connect and trade across leading
          cryptocurrency exchanges, ensuring a unified, efficient, and secure
          trading experience.
        </p>

        <InfiniteMovingCards items={testimonials} direction="right" speed="" />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-center ">
          How Does It Work?
        </h2>

        <p className=" w-full   text-sm sm:text-base md:text-lg text-gray-200 items-center text-center">
          ARBIQUE is a powerful automated trading platform that helps you
          monitor, identify, and execute trading opportunities across multiple
          cryptocurrency exchanges. Our system ensures fast execution and
          efficiency, making trading seamless and optimized for profitability.
        </p>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-16 mt-2">
          {steps?.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center max-w-xs"
            >
              <div className="bg-purple-600/20 border border-purple-500 rounded-2xl p-6 mb-6 flex items-center justify-center">
                {step.icon}
              </div>

              <span className="text-primary text-lg font-semibold mb-2">
                Step {step.id}
              </span>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exchange;
