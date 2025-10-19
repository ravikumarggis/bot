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
