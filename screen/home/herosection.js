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
          YOUR GATEWAY TO SMARTER TRADING
        </div>
      </div>
      <div className=" items-center w-full flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  leading-snug">
          Crypto Bot Trade Smarter With AI–
          <br className="hidden sm:block" />
          Powered{" "}
          <span className="text-primary relative">
            Crypto
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/60 rounded-full"></span>
          </span>
        </h1>

        <p className="mt-6 w-full md:w-[70%]  text-sm sm:text-base md:text-lg  text-center">
          Grow your portfolio effortlessly with Qbot’s intelligent arbitrage
          assistant. Designed for traders of all levels, our AI-powered system
          identifies and executes profitable trades across multiple exchanges in
          real-time.
        </p>
      </div>

      <div className="mt-8 flex flex-row sm:flex-row gap-4 justify-center">
        <button className="px-6 py-3 bg-primary text-[white] font-semibold rounded-[10px] shadow hover:opacity-90 transition">
          Start Free Trial
        </button>
        <button className="px-6 py-3 bg-white/10 border border-white text-white rounded-[10px] font-medium shadow hover:bg-white hover:text-[#1e0042] transition">
          Learn More
        </button>
      </div>
      <div className="items-center justify-center w-full p-5 flex my-4 ">
        <img
          src="/assets/homepage/dashboardimage.avif"
          alt="Crypto Bot Logo"
          className="w-[90%] sm:w-[60%] h-auto items-center justify-center z-10"
        />
      </div>
     
    </div>
  );
};

export default Herosection;
