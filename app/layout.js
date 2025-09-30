import Navbar, { Header } from "../components/Navbar";
import "./globals.css";
import "./index.css";
import { Roboto } from "next/font/google";
import Footer from "../screen/home/footer";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto Bot",
  description: "AI-powered crypto bo assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="antialiased bg-gradient-to-br from-[#3c2d7b] via-[#5a45a5] to-[#847abd] text-[#EE3379] ">
        {children}
      </body>
    </html>
  );
}
