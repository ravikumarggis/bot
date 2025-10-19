"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { PAYPAL_CLIENT_ID } from "../config/index";

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
  currency: "INR",
  intent: "capture",
  environment: "sandbox",
};

const ClientProvider = ({ children }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

export default ClientProvider;
