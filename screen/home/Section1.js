import React, { useState } from "react";
import CommonCard from "../../components/CommonCard";

const Section1 = () => {
  const [activeImage, setActiveImage] = useState("/assets/homepage/img1.avif");
  const items = [
    {
      title: "Effortless Profits with Triangular Arbitrage",
      description:
        "Automate trades to capitalize on price differences among three cryptocurrencies within the same exchange.",
      image: "/assets/homepage/dashboardimage.avif",
      link: "/analytics",
    },
    {
      title: "Seamless Gains with Intra-Exchange Arbitrage",
      description:
        "Leverage small price variations across trading pairs within one exchange for quick profits.",
      image: "/assets/homepage/dashboardimage.avif",
      link: "/users",
    },
    {
      title: "Steady Growth with Dollar-Cost Averaging (DCA)",
      description:
        "Automate regular crypto purchases to reduce volatility and grow wealth steadily.",
      image: "/assets/homepage/dashboardimage.avif",
      link: "/notifications",
    },
  ];
  return (
    <div className=" mx-[-1%] bg-[#05060f] gap-5 p-[2%]">
      <div className=" items-center w-full justify-center  ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Strategies Offered by Arbique: Simple and Secure
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-200  text-center">
          Arbique provides easy-to-use trading strategies designed for all
          levels of traders. Automate your trades, maximize profits, and
          simplify your crypto trading journey with our powerful tools.
        </p>
      </div>

      <CommonCard items={items} className="gap-4" />
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold  w-full sm:w-[40%]">
          Discover How Arbique Simplifies Trading
        </h1>
        <p className="mt-4 sm:mt-0 w-full sm:w-[50%]  sm:text-md">
          Experience advanced automated crypto trading with a seamless and
          secure process designed for both beginners and experts.
        </p>
      </div>
      <div className="w-full  text-white py-16 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div
              onMouseEnter={() => setActiveImage("/assets/homepage/img1.avif")}
              className="bg-[#141424] p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                👤 Sign Up The Account
              </h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Join Arbique by quickly creating your account with a few basic
                details.
              </p>
            </div>

            <div
              onMouseEnter={() => setActiveImage("/assets/homepage/img2.avif")}
              className="bg-[#141424] p-6 rounded-2xl   shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2 text-purple-400">
                🔗 Connect Your Exchange APIs
              </h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Link your preferred exchanges — Binance, Kraken, or BitMart —
                securely and select your desired trading strategy.
              </p>
            </div>

            <div
              onMouseEnter={() => setActiveImage("/assets/homepage/img3.avif")}
              className="bg-[#141424] p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                📊 Start Trading
              </h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Leverage automation to execute profitable trades while Arbique
                handles market fluctuations.
              </p>
            </div>

            <div
              onMouseEnter={() => setActiveImage("/assets/homepage/img4.avif")}
              className="bg-[#141424] p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                🤝 Refer & Earn
              </h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Invite friends and earn exciting rewards. The more you refer,
                the more you earn!
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center transition-all duration-500">
            <img
              src={activeImage}
              alt="Step Preview"
              className="w-full max-w-[500px] h-auto rounded-3xl shadow-2xl border border-gray-800 object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold  w-full sm:w-[40%]">
          Why Choose Arbique! Your Gateway to Smarter Trading.
        </h1>
        <div className="w-full sm:w-[50%] gap-5 items-center">
          <p className="mt-4 sm:mt-0   sm:text-md">
            Take the complexity out of crypto trading with our automated
            arbitrage system. Whether you're a beginner or an experienced
            trader.
          </p>
          <button className=" mt-2 px-6 py-3 bg-[#c1a8ff] text-[#1e0042] font-semibold rounded-full shadow hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>
      <div className="w-full p-5 items-center justify-center flex">
        {" "}
        <img
          src="/assets/homepage/dashboardimage.avif"
          alt="Crypto Bot Logo"
          className="w-[90%] sm:w-[60%] h-auto items-center justify-center"
        />
      </div>

      <div className=" items-center w-full justify-center  ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Supports Multiple Exchanges </h1>
<p className="mt-6 text-sm sm:text-base md:text-lg text-gray-200  text-center">
        Gain broader market access and enhanced trading opportunities across multiple exchanges.
        </p>
      </div>

      <div className="w-full p-5 items-center justify-center flex">
        {" "}
        <img
          src="/assets/homepage/suportExchange.png"
          alt="Crypto Bot Logo"
          className="w-[90%] sm:w-[60%] h-auto items-center justify-center"
        />
      </div>
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold  w-full sm:w-[40%]">
        Referral – Earn up to 10% on
        Every Subscription!
        </h1>
        <div className="w-full sm:w-[50%] gap-5 items-center">
          <p className="mt-4 sm:mt-0   sm:text-md">
          Turn your network into earnings! Invite your friends to Arbique and get rewarded when they subscribe to a plan.
          </p>
          <button className=" mt-2 px-6 py-3 bg-[#c1a8ff] text-[#1e0042] font-semibold rounded-full shadow hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
