"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { PAYPAL_CLIENT_ID } from "../config/index";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
  currency: "INR",
  intent: "capture",
  environment: "sandbox",
};

const ClientProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <PayPalScriptProvider options={initialOptions}>
          {children}
        </PayPalScriptProvider>
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default ClientProvider;
