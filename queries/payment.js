import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api-service";

export const createPayPalOrder = async () => {
  try {
    const response = await api({
      method: "POST",
      url: "/paypal/orders",
      data: {
        value: "10.00",
        currency: "USD",
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    throw error;
  }
};

export const useGenerateInvoice = ({ amount, currency, subscriptionId }) => {
  return useQuery({
    queryKey: ["generateInvoice", amount, currency, subscriptionId],
    queryFn: () => {
      return generateInvoice({ amount, currency, subscriptionId });
    },
  });
};

export const generateInvoice = async ({ amount, currency, subscriptionId }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/qie/generateInvoice",
      data: {
        amount: amount,
        currency: currency,
        subscriptionId: subscriptionId,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const useGetInvoiceStatus = ({ invoiceId, walletAddress }) => {
  return useQuery({
    queryKey: ["getInvoiceStatus", invoiceId, walletAddress],
    queryFn: () => {
      return generateInvoice({ invoiceId, walletAddress });
    },
  });
};

export const getInvoiceStatus = async ({ invoiceId, walletAddress }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/qie/getInvoiceStatus",
      data: {
        invoiceId,
        walletAddress,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
