// "use client";
// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const linkClass = (path) =>
//     `relative transition-all duration-300 ${
//       pathname === path
//         ? "text-white font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white after:rounded-full"
//         : "text-white/70 hover:text-white"
//     }`;

//   return (
//     <motion.header
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`fixed top-3 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] z-50 border border-white/20 rounded-[20px] backdrop-blur-xl px-4 sm:px-8 py-3 flex justify-between items-center transition-all duration-500 ${
//         isScrolled
//           ? "bg-white/20 border-white/30 shadow-lg"
//           : "bg-white/10 shadow-md"
//       }`}
//     >
//       <Link href={"/"}>
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="flex items-center gap-2 cursor-pointer"
//         >
//           <img src="/assets/logo1.png" alt="Qbot Logo" className="w-5 h-6" />
//           <p className="text-md sm:text-lg lg:text-2xl font-semibold text-white">
//             Qbot
//           </p>
//         </motion.div>
//       </Link>

//       <nav className="hidden lg:flex items-center gap-3 lg:gap-6 text-sm font-medium">
//         {[
//           { href: "/exchange", label: "Exchanges" },
//           { href: "/pricing", label: "Pricing" },
//           { href: "/tutorials", label: "Tutorials" },
//         ].map(({ href, label }) => (
//           <motion.div key={href} whileHover={{ scale: 1.1 }}>
//             <Link href={href} className={linkClass(href)}>
//               {label}
//             </Link>
//           </motion.div>
//         ))}

//         <motion.div whileHover={{ scale: 1.1 }}>
//           <Link
//             href="https://Qbot.gitbook.io/helper/"
//             className={linkClass("/docs")}
//           >
//             Docs
//           </Link>
//         </motion.div>

//         <Link
//           href="/login"
//           className={`border px-4 py-1 rounded-[10px] transition ${
//             pathname === "/login"
//               ? "bg-white text-[#1e0042]"
//               : "text-white border-white hover:bg-white hover:text-[#1e0042]"
//           }`}
//         >
//           LOGIN
//         </Link>
//         <Link
//           href="/signup"
//           className={`px-4 py-1 rounded-[10px] font-semibold transition ${
//             pathname === "/signup"
//               ? "bg-white text-[#1e0042]"
//               : "bg-white text-[#1e0042] hover:opacity-90"
//           }`}
//         >
//           SIGN UP
//         </Link>
//       </nav>

//       <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
//         {isOpen ? <X size={26} /> : <Menu size={26} />}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20, scale: 0.95 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="absolute top-[110%] right-0 w-[75%] sm:w-[60%] bg-[#05060f]/95 backdrop-blur-md shadow-xl rounded-xl p-6 flex flex-col gap-4 text-white lg:hidden"
//           >
//             <Link href="/exchange" onClick={() => setIsOpen(false)} className={linkClass("/exchange")}>
//               Exchanges
//             </Link>
//             <Link href="/pricing" onClick={() => setIsOpen(false)} className={linkClass("/pricing")}>
//               Pricing
//             </Link>
//             <Link href="/tutorials" onClick={() => setIsOpen(false)} className={linkClass("/tutorials")}>
//               Tutorials
//             </Link>
//             <Link href="https://Qbot.gitbook.io/helper/" onClick={() => setIsOpen(false)} className={linkClass("/docs")}>
//               Docs
//             </Link>

//             <Link
//               href="/login"
//               onClick={() => setIsOpen(false)}
//               className={`border px-4 py-2 rounded-[10px] transition text-center ${
//                 pathname === "/login"
//                   ? "bg-white text-[#1e0042]"
//                   : "text-white border-white hover:bg-white hover:text-[#1e0042]"
//               }`}
//             >
//               LOGIN
//             </Link>
//             <Link
//               href="/signup"
//               onClick={() => setIsOpen(false)}
//               className={`px-4 py-2 rounded-[10px] font-semibold transition text-center ${
//                 pathname === "/signup"
//                   ? "bg-white text-[#1e0042]"
//                   : "bg-white text-[#1e0042] hover:opacity-90"
//               }`}
//             >
//               SIGN UP
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#030b1f]/70 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
            Q
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">Qbot</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-300">
          <Link href="/exchange" className="hover:text-white transition">Exchanges</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="#" className="hover:text-white transition">Docs</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            className="px-5 py-1.5 border border-white/30 text-gray-200 rounded-full hover:bg-white/10 transition"
          >
            LOGIN
          </Link>
          <Link
            href="#"
            className="px-5 py-1.5 bg-white/10 text-white rounded-full hover:bg-white/20 border border-white/30 transition"
          >
            SIGN UP
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#030b1f]/95 border-t border-white/10">
          <div className="flex flex-col px-6 py-4 space-y-3 text-gray-300">
            <Link href="#" className="hover:text-white transition">Exchanges</Link>
            <Link href="#" className="hover:text-white transition">Pricing</Link>
            <Link href="#" className="hover:text-white transition">Docs</Link>
            <div className="flex space-x-2 pt-3">
              <Link
                href="/login"
                className="flex-1 text-center border bg-primary rounded-full py-2 hover:bg-white/10 transition"
              >
                LOGIN
              </Link>
              <Link
                href="#"
                className="flex-1 text-center bg-white/10 border border-white/30 text-white rounded-full py-2 hover:bg-white/20 transition"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
