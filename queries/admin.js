import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api-service";


export const useGetAdminDashboard = () => {
    return useQuery({
      queryKey: ["adminDashboard"],
      queryFn: () => {
        return getAdminDashboardDetail();
      },
    });
  };
  
  export const getAdminDashboardDetail = async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/admin/dashboard",
      });
      return response?.data?.result || {};
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };
  




export const useAdminProfile = () => {
    return useQuery({
      queryKey: ["getAdminProfile"],
      queryFn: async () => {
        return getAdminProfile(); 
      },
      select: (data) => {
        if (data?.data?.responseCode == 200) {
         
          return data?.data?.result;
        }
  
        return {};
      },
    });
  };
  
  export const getAdminProfile = async () => {
      try {
        const response = await api({
          method: "GET",
          url: "/admin/getAdminProfile",
        });
    
        return response;
      } catch (error) {
        return error?.response;
      }
    };
    
  