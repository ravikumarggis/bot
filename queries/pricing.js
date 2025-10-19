import { api } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveSubscription = ({ planType }) => {
  return useQuery({
    queryKey: ["getActiveSubscription", planType],
    queryFn: async () => {
      return getActiveSubscription();
    },
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        if (planType) {
          return data?.data?.result?.filter(
            (item) =>
              String(item?.name)?.toLowerCase() ==
              String(planType)?.toLowerCase()
          );
        }
        return data?.data?.result;
      }

      return [];
    },
  });
};

export const getActiveSubscription = async () => {
  try {
    const response = await api({
      method: "GET",
      url: "/subscription/getActiveSubscription",
    });

    return response;
  } catch (error) {
    return error?.response;
  }
};

export const useGetSubscription = ({ id }) => {
  return useQuery({
    queryKey: ["getSubscription", id],
    queryFn: async () => {
      return getSubscription({ id: id });
    },
    select: (data) => {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result;
      }

      return {};
    },
  });
};

export const getSubscription = async ({ id }) => {
  try {
    const response = await api({
      method: "GET",
      url: `/subscription/getSubscription/${id}`,
    });

    return response;
  } catch (error) {
    return error?.response;
  }
};
