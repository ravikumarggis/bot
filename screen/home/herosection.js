// import React from "react";
// import { SparklesCore } from "../../components/ui/sparkles";

// const Herosection = () => {
//   return (

//     <div className="pt-30 w-full items-center justify-center flex-col text-center gap-5 ">
//       <div className="w-full absolute inset-0 h-screen">
//         <SparklesCore
//           id="tsparticlesfullpage"
//           background="transparent"
//           minSize={0.6}
//           maxSize={1.4}
//           particleDensity={100}
//           className="w-full h-full"
//           particleColor="#FFFFFF"
//         />
//       </div>
//       <div className="w-full text-center justify-center">
//         <div className="text-center justify-center inline-block px-6 py-2 text-xs sm:text-sm font-medium bg-primary/10 backdrop-blur-md rounded-full shadow-md">
//         Your Gateway to Smarter Automated Trading
//         </div>
//       </div>
//       <div className=" items-center w-full flex flex-col justify-center">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  leading-snug">
//         Qbot — Intelligent Crypto Trading 

//           <br className="hidden sm:block" />
//           Simplified{" "}
         
//         </h1>

//         <p className="mt-6 w-full md:w-[70%]  text-sm sm:text-base md:text-lg  text-center">
//         Grow your portfolio effortlessly with Qbot’s powerful automated trading engine.
// Whether you’re a beginner or a pro, Qbot’s advanced Grid and DCA strategies execute trades with precision on Bybit and Binance — helping you maximize profits and minimize emotions.
// Stay ahead of the market with smart, data-driven automation — and more strategies coming soon.
//         </p>
//       </div>

//       <div className="mt-8 flex flex-row sm:flex-row gap-4 justify-center">
//         <button className="px-6 py-3 bg-primary text-[white] font-semibold rounded-[10px] shadow hover:opacity-90 transition z-10">
//           Start Free Trial
//         </button>
//         <button className="px-6 py-3 bg-white/10 border border-white text-white rounded-[10px] font-medium shadow hover:bg-white hover:text-[#1e0042] transition z-10">
//           Learn More
//         </button>
//       </div>
//       <div className="items-center justify-center w-full p-5 flex my-4 ">
//         <img
//           src="/assets/homepage/heroImage.png"
//           alt="Crypto Bot Logo"
//           className="w-[90%] sm:w-[60%] rounded-xl sm:rounded-2xl h-auto items-center justify-center z-10"
//         />
//       </div>
     
//     </div>
//   );
// };

// export default Herosection;


import Image from "next/image";
import { Check } from "lucide-react";


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#030b1f] text-white min-h-screen  items-center justify-center px-6 md:px-20">
      <div className="inline-block px-4 py-1.5 text-sm tracking-wide font-medium text-gray-200">
    YOUR GATEWAY TO SMARTER AUTOMATED
  </div>
      <div className=" mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-12 pt-20 md:pt-28">
      <div className="flex-1 space-y-6 ">
 

  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
    Trade Smarter with{" "}
    <span className="bg-primary to-cyan-400 bg-clip-text text-transparent">
      AI-Powered Bots
    </span>
  </h1>

  <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0">
    Automate trades on Binance & Bybit — minimal setup, continuous optimization.
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-center gap-4 pt-2">
    <button className="px-6 py-3 rounded-lg font-medium text-white bg-primary hover:opacity-90 transition flex items-center space-x-2 shadow-lg shadow-blue-500/30">
      <span>🚀</span>
      <span>Make Money</span>
    </button>

    <button className="px-6 py-3 rounded-lg font-medium border border-white/20 text-gray-200 hover:bg-white/10 transition">
      Learn
    </button>
  </div>

  {/* Feature List */}
  <div className="flex items-center justify-start">
    <div className="pt-6 space-y-3 text-gray-300 flex-col justify-center">
      <Feature text="Trusted by 15k traders" />
      <Feature text="24/7 uptime" />
      <Feature text="Funds stay on Binance & Bybit" />
    </div>
  </div>

  {/* Left-aligned stats line */}
  <div className="flex-1 space-y-6 pt-4 text-sm text-gray-400 flex items-center justify-start px-4 lg:px-0 text-center">
    <span className="text-primary font-medium">Trusted by 18k traders</span> • 24/7 uptime
  </div>
</div>

       

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative w-[100%] max-w-[750px] ">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-200 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
            <Image
             src="/assets/homepage/heroImage.png"
              alt="Dashboard preview"
              width={1000}
              height={1000}
              className="relative rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(0,60,255,0.1),transparent_70%)] pointer-events-none" />
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center space-x-2">
      <Check className="text-cyan-400 w-5 h-5" />
      <span>{text}</span>
    </div>
  );
}

