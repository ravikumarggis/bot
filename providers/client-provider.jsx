"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { PAYPAL_CLIENT_ID } from "../config/index";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { qieChain, QieCustomWallet } from "@/const/index";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [QieCustomWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
  }
);
const config = createConfig({
  connectors,
  appName: "My RainbowKit App",

  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, qieChain],
  ssr: true,
});

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
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
