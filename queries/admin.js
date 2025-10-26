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
  