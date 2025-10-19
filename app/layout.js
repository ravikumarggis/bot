import Navbar, { Header } from "../components/Navbar";
import "./globals.css";
import "./index.css";
import { Roboto } from "next/font/google";
import Footer from "../screen/home/footer";
import QueryProvider from "../providers/query-provider";
import { Toaster, toast } from "sonner";
import AuthGuard from "../guard/auth-guard";
import GoogleAuthProvider from "../providers/google-auth";

import ClientProvider from "../providers/client-provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Qbot",
  description: "AI-powered crypto bot assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="antialiased  ">
        <Toaster />
        <ClientProvider>
          <QueryProvider>
            <AuthGuard>
              <GoogleAuthProvider>{children}</GoogleAuthProvider>
            </AuthGuard>
          </QueryProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
