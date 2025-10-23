import { api } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";

export const createBot = async ({
  botName,
  exchangeKeyId,
  symbol,
  status,
  params,
  pausedUntil,
}) => {
  try {
    const response = await api({
      method: "POST",
      url: "/bot/createBot",
      data: {
        botName: botName || undefined,
        exchangeKeyId: exchangeKeyId || undefined,
        symbol: symbol || undefined,
        status: status || undefined,
        params,
        pausedUntil: pausedUntil || undefined,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const useGetBot = ({ id }) => {
  return useQuery({
    queryKey: ["getBot", id],
    queryFn: () => {
      return getBot({ id });
    },
    select: (data) => {
      return data?.result || {};
    },
  });
};

export const getBot = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `/bot/getBot/${id}`,
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const updateBotStatus = async ({ id, status }) => {
  try {
    const urlToHit =
      status == "pending" || status == "paused" || status == "stopped"
        ? `/bot/${id}/start`
        : `/bot/${id}/stop`;
    const response = await api({
      method: "GET",
      url: urlToHit,
      params: {
        id,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const useGetBotList = () => {
  return useQuery({
    queryKey: ["getBotList"],
    queryFn: () => {
      return getBotList();
    },
    select: (data) => {
      return data?.result || [];
    },
  });
};

export const getBotList = async () => {
  try {
    const response = await api({
      method: "GET",
      url: `/bot/getBotList`,
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useGetOrder = ({ id }) => {
  return useQuery({
    queryKey: ["getOrder", id],
    queryFn: () => {
      return getOrder({ id });
    },
    select: (data) => {
      return data?.result || {};
    },
  });
};

export const getOrder = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `/order/getOrder`,
      params: {
        botId: id,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const updateBot = async ({
  botName,
  exchangeKeyId,
  symbol,
  status,
  params,
  pausedUntil,
  botId,
}) => {
  try {
    const response = await api({
      method: "PUT",
      url: "/bot/updateBot",
      data: {
        botId: botId,
        botName: botName || undefined,
        // exchangeKeyId: exchangeKeyId || undefined,
        // symbol: symbol || undefined,
        status: status || undefined,
        params,
        pausedUntil: pausedUntil || undefined,
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};
