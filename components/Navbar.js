"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // 👈 Get current route

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reusable function for active link style
  const linkClass = (path) =>
    `transition hover:text-white ${
      pathname === path
        ? "text-white font-semibold border-b-2 border-white pb-1" // 👈 Active style
        : "text-white/70 hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] z-50 border-2 border-white/20 shadow-md rounded-full backdrop-blur-lg px-4 sm:px-8 py-3 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-white/20 border-white/30 shadow-lg" : "bg-white/10"
      }`}
    >
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/assets/logo.png" alt="Crypto Bot Logo" className="w-10 h-10" />
          <p className="text-md sm:text-lg lg:text-2xl font-semibold text-white">Crypto Bot</p>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-3 lg:gap-6 text-sm font-medium">
        <Link href="/exchange" className={linkClass("/exchange")}>
          Exchanges
        </Link>
        <Link href="/pricing" className={linkClass("/pricing")}>
          Pricing
        </Link>
        <Link href="/tutorials" className={linkClass("/tutorials")}>
          Tutorials
        </Link>
        <Link href="/docs" className={linkClass("/docs")}>
          Docs
        </Link>
        <Link href="/blogs" className={linkClass("/blogs")}>
          Blogs
        </Link>

        <Link
          href="/login"
          className={`border px-4 py-1 rounded-full transition ${
            pathname === "/login"
              ? "bg-white text-[#1e0042]"
              : "text-white border-white hover:bg-white hover:text-[#1e0042]"
          }`}
        >
          LOGIN
        </Link>
        <Link
          href="/signup"
          className={`px-4 py-1 rounded-full font-semibold transition ${
            pathname === "/signup"
              ? "bg-white text-[#1e0042]"
              : "bg-white text-[#1e0042] hover:opacity-90"
          }`}
        >
          SIGN UP
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] right-0 w-[75%] sm:w-[60%] bg-[#847abd]/80 backdrop-blur-md shadow-lg rounded-xl p-6 flex flex-col gap-4 text-white lg:hidden transition-all">
          <Link href="/exchange" className={linkClass("/exchange")}>
            Exchanges
          </Link>
          <Link href="/pricing" className={linkClass("/pricing")}>
            Pricing
          </Link>
          <Link href="/tutorials" className={linkClass("/tutorials")}>
            Tutorials
          </Link>
          <Link href="/docs" className={linkClass("/docs")}>
            Docs
          </Link>
          <Link href="/blogs" className={linkClass("/blogs")}>
            Blogs
          </Link>

          <Link
            href="/login"
            className={`border px-4 py-2 rounded-full transition text-center ${
              pathname === "/login"
                ? "bg-white text-[#1e0042]"
                : "text-white border-white hover:bg-white hover:text-[#1e0042]"
            }`}
          >
            LOGIN
          </Link>
          <Link
            href="/signup"
            className={`px-4 py-2 rounded-full font-semibold transition text-center ${
              pathname === "/signup"
                ? "bg-white text-[#1e0042]"
                : "bg-white text-[#1e0042] hover:opacity-90"
            }`}
          >
            SIGN UP
          </Link>
        </div>
      )}
    </header>
  );
}
