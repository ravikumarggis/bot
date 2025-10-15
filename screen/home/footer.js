// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#141424] text-white px-6 py-10">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
//           <aside className="col-span-2 lg:col-span-1">
//             <svg
//               width="50"
//               height="50"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//               fillRule="evenodd"
//               clipRule="evenodd"
//               className="fill-current mb-4"
//             >
//               <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
//             </svg>
//             <p>
//               <span className="font-semibold text-lg">Qbot</span>
//               <br />
//               Providing reliable tech since 1992
//             </p>
//           </aside>

//           <div>
//             <h6 className="text-lg font-semibold mb-3">Services</h6>
//             <ul className="space-y-2 text-gray-300">
//               <li><a className="hover:underline cursor-pointer">Branding</a></li>
//               <li><a className="hover:underline cursor-pointer">Design</a></li>
//               <li><a className="hover:underline cursor-pointer">Marketing</a></li>
//               <li><a className="hover:underline cursor-pointer">Advertisement</a></li>
//             </ul>
//           </div>

//           <div>
//             <h6 className="text-lg font-semibold mb-3">Company</h6>
//             <ul className="space-y-2 text-gray-300">
//               <li><a className="hover:underline cursor-pointer">About us</a></li>
//               <li><a className="hover:underline cursor-pointer">Contact</a></li>
//               <li><a className="hover:underline cursor-pointer">Jobs</a></li>
//               <li><a className="hover:underline cursor-pointer">Press kit</a></li>
//             </ul>
//           </div>

//           <div>
//             <h6 className="text-lg font-semibold mb-3">Legal</h6>
//             <ul className="space-y-2 text-gray-300">
//               <li><a className="hover:underline cursor-pointer">Terms of use</a></li>
//               <li><a className="hover:underline cursor-pointer">Privacy policy</a></li>
//               <li><a className="hover:underline cursor-pointer">Cookie policy</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
//           © {new Date().getFullYear()} Qbot. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  Globe2,
  DollarSign,
} from "lucide-react";

/**
 * Responsive Footer component for Next.js + Tailwind CSS
 * Place your assets in /public:
 *  - /public/logo-square.png
 *  - /public/binance-logo.png
 *  - /public/bybit-logo.png
 *
 * This component is mobile-first and will adapt across screens.
 */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("en-US");
  const [currency, setCurrency] = useState("USD");

  function handleSubscribe(e) {
    e.preventDefault();
    // Replace with your subscribe logic
    alert(`(demo) Subscribed: ${email || "(empty)"}`);
    setEmail("");
  }

  return (
    <footer className="bg-transparent">
      <div className="max-w-full mx-auto ">
        {/* Card */}
        <div className="bg-[#071028]  p-6 sm:p-8 lg:p-10  text-slate-100 shadow-xl border border-white/6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left column: Logo + subscribe */}
            <div className="md:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12  flex items-center justify-center shrink-0">
                <img src="/assets/logo1.png" alt="Qbot Logo" className="w-6 h-8" />
                </div>
                <span className="text-2xl font-semibold leading-none">Crypto Bot</span>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
                <p className="text-slate-300 text-sm">
                  Stay updated with the latest news and exclusive offers.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-3">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 px-4 py-2 rounded-md bg-[#0d1726] border border-white/6 placeholder:text-slate-400 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium justify-center"
                >
                  <Mail className="w-4 h-4" />
                  Subscribe
                </button>
              </form>

              <p className="text-slate-400 text-sm mt-2">
                We send occasional emails. Unsubscribe anytime.
              </p>
            </div>

            {/* Middle columns: links */}
            <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <h5 className="text-slate-200 font-semibold mb-3">Subscribe</h5>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><a className="hover:text-white" href="#">Email amOus</a></li>
                  <li><a className="hover:text-white" href="#">Pricing</a></li>
                  <li><a className="hover:text-white" href="#">Tutorials</a></li>
                  <li><a className="hover:text-white" href="#">Blog</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-slate-200 font-semibold mb-3">Product</h5>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><a className="hover:text-white" href="#">About</a></li>
                  <li><a className="hover:text-white" href="#">Contact</a></li>
                  <li><a className="hover:text-white" href="#">Careers</a></li>
                  <li><a className="hover:text-white" href="#">Press</a></li>
                </ul>
              </div>

              <div className="hidden sm:block">
                <h5 className="text-slate-200 font-semibold mb-3">Resources</h5>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><a className="hover:text-white" href="#">Security</a></li>
                  <li><a className="hover:text-white" href="#">Terms of Service</a></li>
                  <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
                </ul>
              </div>

              {/* On very small screens, show Resources as last column (stacked) */}
              <div className="sm:hidden">
                <h5 className="text-slate-200 font-semibold mb-3">Resources</h5>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><a className="hover:text-white" href="#">Security</a></li>
                  <li><a className="hover:text-white" href="#">Terms of Service</a></li>
                  <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Right column: partners & socials */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-slate-200 font-semibold mb-2">Resources</h5>

              <div className="flex gap-3 items-center">
                <div className="p-1.5 sm:p-1.5 md:p-2 rounded-md bg-[#0d1726] border border-white/6 w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center">
                <img src="././../assets/homepage/binance.png" alt="Binance" className="w-12 h-12 object-contain"/>

                </div>
                <div className="p-1.5 sm:p-1.5 md:p-1.5 rounded-md bg-[#0d1726] border border-white/6 w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center">
                <img src="././../assets/homepage/bybit.webp" alt="Bybit" className="w-12 h-12 object-contain"/>

                </div>
                {/* <div className="p-2 sm:p-3 md:p-3 rounded-md bg-[#0d1726] border border-white/6 w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center">
                  <div className="text-xs text-slate-300">AFS 256</div>
                </div> */}
              </div>

              <div className="pt-2">
                <div className="flex gap-3">
                  <a aria-label="Twitter" className="p-2 rounded-full bg-[#0c1724] border border-white/6 hover:bg-[#0f2a3e] transition" href="#">
                    <Twitter className="w-4 h-4 text-slate-200"/>
                  </a>
                  <a aria-label="Facebook" className="p-2 rounded-full bg-[#0c1724] border border-white/6 hover:bg-[#0f2a3e] transition" href="#">
                    <Facebook className="w-4 h-4 text-slate-200"/>
                  </a>
                  <a aria-label="YouTube" className="p-2 rounded-full bg-[#0c1724] border border-white/6 hover:bg-[#0f2a3e] transition" href="#">
                    <Youtube className="w-4 h-4 text-slate-200"/>
                  </a>
                  <a aria-label="LinkedIn" className="p-2 rounded-full bg-[#0c1724] border border-white/6 hover:bg-[#0f2a3e] transition" href="#">
                    <Linkedin className="w-4 h-4 text-slate-200"/>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/6 mt-6 pt-6" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-300 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Crypto Bot. All rights reserved.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-3 border border-white/6 rounded-md px-3 py-1 bg-[#071028]">
                <Globe2 className="w-4 h-4 text-slate-300" />
                <label htmlFor="select-lang" className="sr-only">Language</label>
                <select
                  id="select-lang"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-slate-200 text-sm outline-none"
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (GB)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div className="flex items-center gap-3 border border-white/6 rounded-md px-3 py-1 bg-[#071028]">
                <DollarSign className="w-4 h-4 text-slate-300" />
                <label htmlFor="select-currency" className="sr-only">Currency</label>
                <select
                  id="select-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent text-slate-200 text-sm outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
