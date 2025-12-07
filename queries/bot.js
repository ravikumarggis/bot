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

export const useGetDCABot = ({ id }) => {
  return useQuery({
    queryKey: ["getDCABot", id],
    queryFn: () => {
      return getDCABot({ id });
    },
    // select: (data) => {
    //   return data?.result || {};
    // },
  });
};

export const getDCABot = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `${DCAbaseUrl}/bots/${id}`,
    });
    console.log(response, id, "response>>>>");

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useGetDCABotList = (params = {}) => {
  const { selectExchange } = params;
  return useQuery({
    queryKey: ["getDCBotList", selectExchange],
    queryFn: () => {
      return getDCBotList(selectExchange);
    },
    select: (data) => {
      return data?.data || [];
    },
  });
};

export const getDCBotList = async (selectExchange) => {
  try {
    const response = await api({
      method: "GET",
      url: `${DCAbaseUrl}/bots`,
      params: { exchange: selectExchange },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteDCABot = async ({ id }) => {
  try {
    const response = await api({
      method: "DELETE",
      url: `${DCAbaseUrl}/bots/${id}`,
    });

    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const updateDCABotStatus = async ({ id, status }) => {
  try {
    const urlToHit =
      status == "running" ? `/bots/${id}/stop` : `/bots/${id}/start`;
    const response = await api({
      method: "POST",
      url: `${DCAbaseUrl}${urlToHit}`,
    });
    console.log(response, "asdasdasd>>");

    return response?.data;
  } catch (error) {
    console.error("Error creating bot:", error);
    throw error;
  }
};

export const useGetDCABotPNL = ({ id }) => {
  return useQuery({
    queryKey: ["useGetDCABotPNL", id],
    queryFn: () => {
      return getDCABotPNL({ id });
    },
  });
};

export const getDCABotPNL = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `${DCAbaseUrl}/bots/${id}/pnl`,
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useDCAGetLogList = ({ id }) => {
  return useQuery({
    queryKey: ["getDCALogList", id],
    queryFn: () => {
      return getDCALogList({ id });
    },
  });
};

export const getDCALogList = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `${DCAbaseUrl}/bot-logs/${id}/logs`,
    });

    return response?.data || [];
  } catch (error) {
    throw error;
  }
};

export const useGetDCAOrder = ({ id, filter }) => {
  return useQuery({
    queryKey: ["getDCAOrder", id, filter],
    queryFn: () => {
      return getDCAOrder({ id, filter });
    },
  });
};

export const getDCAOrder = async ({ id, filter }) => {
  try {
    const response = await api({
      method: "GET",
      url: `${DCAbaseUrl}/bots/${id}/orders`,
    });

    console.log(response, "wdfadfsdfsf");

    return response?.data;
  } catch (error) {
    throw error;
  }
};
