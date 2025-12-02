import { api, DCAbaseUrl } from "@/service/api-service";
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

export const useGetBotList = (params = {}) => {
  const { selectExchange } = params;
  return useQuery({
    queryKey: ["getBotList", selectExchange],
    queryFn: () => {
      return getBotList(selectExchange);
    },
    select: (data) => {
      return data?.result || [];
    },
  });
};

export const getBotList = async (selectExchange) => {
  try {
    const response = await api({
      method: "GET",
      url: `/bot/getBotList`,
      params: { exchange: selectExchange },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useGetOrder = ({ id, filter }) => {
  return useQuery({
    queryKey: ["getOrder", id, filter],
    queryFn: () => {
      return getOrder({ id, filter });
    },
    select: (data) => {
      return data?.result || {};
    },
  });
};

export const getOrder = async ({ id, filter }) => {
  try {
    const response = await api({
      method: "GET",
      url: `/order/getOrder`,
      params: {
        botId: id,
        status: filter,
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
    const stopResponse = await updateBotStatus({
      id: botId,
      status: "running",
    });
    if (stopResponse?.responseCode == 200) {
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
    }
    return stopResponse?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const deleteBot = async ({ id }) => {
  try {
    const stopResponse = await updateBotStatus({ id: id, status: "running" });
    if (stopResponse?.responseCode == 200) {
      const response = await api({
        method: "DELETE",
        url: `/bot/deleteBot/${id}`,
      });
      return response?.data;
    }

    return stopResponse?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const useGetSymbolList = ({ exchange }) => {
  return useQuery({
    queryKey: ["getSymbolList", exchange],
    queryFn: () => {
      return getSymbolList({ exchange });
    },
    select: (data) => {
      return data?.result || [];
    },
  });
};

export const getSymbolList = async ({ exchange }) => {
  try {
    const response = await api({
      method: "GET",
      url: `/keys/getSymbolList`,
      params: {
        exchange: exchange,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useGetLogList = ({ id }) => {
  return useQuery({
    queryKey: ["getLogList", id],
    queryFn: () => {
      return getLogList({ id });
    },
    select: (data) => {
      return data?.result || {};
    },
  });
};

export const getLogList = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `/logs/getLogList`,
      params: {
        botId: id,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = async ({ id }) => {
  try {
    const response = await api({
      method: "PATCH",
      url: `/order/cancelOrder/${id}`,
    });
    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const createDCABots = async ({
  portfolioUsd,
  perBuyPct,
  maxEntries,
  takeProfitPct,
  stopLossPct,
  minOrderUsd,
  maxAllocPct,
  enableIndicators,
  pair,
}) => {
  try {
    const response = await api({
      method: "POST",
      url: `${DCAbaseUrl}/bots`,
      data: {
        pair: pair,
        config: {
          portfolioUsd,
          perBuyPct,
          maxEntries,
          takeProfitPct,
          stopLossPct,
          minOrderUsd,
          maxAllocPct,
          enableIndicators,
        },
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};
