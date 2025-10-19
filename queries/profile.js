import { api } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["viewProfile"],
    queryFn: async () => {
      return getUserProfile(); 
    },
    select: (data) => {
      if (data?.data?.responseCode == 200) {
       
        return data?.data?.result;
      }

      return {};
    },
  });
};

export const getUserProfile = async () => {
    try {
      const response = await api({
        method: "POST",
        url: "/user/viewProfile",
      });
  
      return response;
    } catch (error) {
      return error?.response;
    }
  };
  