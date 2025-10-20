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
    });
    console.log(response, "createPayPalOrder>>>");

    return response?.data?.id;
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    throw error;
  }
};
export const capturOrderPaypal = async ({ subscriptionId, orderID }) => {
  try {
    const response = await api({
      method: "POST",
      url: `/paypal/orders/${orderID}/capture`,
      data: {
        subscriptionId: subscriptionId,
      },
    });
    console.log(response?.data, "response>>>");

    return response?.data;
  } catch (error) {
    console.error("Error in order capture:", error);
    throw error?.response?.data;
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
    if (response?.data?.status == "paid") {
      return response?.data;
    } else {
      throw new Error("Invoice not paid yet");
    }
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
