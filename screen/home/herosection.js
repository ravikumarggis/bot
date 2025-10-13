import React from "react";
import { SparklesCore } from "../../components/ui/sparkles";

const Herosection = () => {
  return (

    <div className="pt-30 w-full items-center justify-center flex-col text-center gap-5 ">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="w-full text-center justify-center">
        <div className="text-center justify-center inline-block px-6 py-2 text-xs sm:text-sm font-medium bg-primary/10 backdrop-blur-md rounded-full shadow-md">
        Your Gateway to Smarter Automated Trading
        </div>
      </div>
      <div className=" items-center w-full flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  leading-snug">
        Qbot — Intelligent Crypto Trading 

          <br className="hidden sm:block" />
          Simplified{" "}
         
        </h1>

        <p className="mt-6 w-full md:w-[70%]  text-sm sm:text-base md:text-lg  text-center">
        Grow your portfolio effortlessly with Qbot’s powerful automated trading engine.
Whether you’re a beginner or a pro, Qbot’s advanced Grid and DCA strategies execute trades with precision on Bybit and Binance — helping you maximize profits and minimize emotions.
Stay ahead of the market with smart, data-driven automation — and more strategies coming soon.
        </p>
      </div>

      <div className="mt-8 flex flex-row sm:flex-row gap-4 justify-center">
        <button className="px-6 py-3 bg-primary text-[white] font-semibold rounded-[10px] shadow hover:opacity-90 transition z-10">
          Start Free Trial
        </button>
        <button className="px-6 py-3 bg-white/10 border border-white text-white rounded-[10px] font-medium shadow hover:bg-white hover:text-[#1e0042] transition z-10">
          Learn More
        </button>
      </div>
      <div className="items-center justify-center w-full p-5 flex my-4 ">
        <img
          src="/assets/homepage/dashboardimage.png"
          alt="Crypto Bot Logo"
          className="w-[90%] sm:w-[60%] rounded-xl sm:rounded-2xl h-auto items-center justify-center z-10"
        />
      </div>
     
    </div>
  );
};

export default Herosection;
