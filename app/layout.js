import Navbar, { Header } from "../components/Navbar";
import "./globals.css";
import "./index.css";
import { Roboto } from "next/font/google";
import Footer from "../screen/home/footer";
import QueryProvider from "../providers/query-provider";
import { Toaster, toast } from "sonner";
import AuthGuard from "../guard/auth-guard";
import GoogleAuthProvider from "../providers/google-auth";
import "react-circular-progressbar/dist/styles.css";
import ClientProvider from "../providers/client-provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Qbots",
  description: "Automated crypto trading bot that runs 24/7, optimizing trades and maximizing profits with smart algorithmic execution.",
  icons: {
    icon: '/assets/logo.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="antialiased  ">
        <Toaster />
        <QueryProvider>
          <ClientProvider>
            <AuthGuard>
              <GoogleAuthProvider>{children}</GoogleAuthProvider>
            </AuthGuard>
          </ClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
