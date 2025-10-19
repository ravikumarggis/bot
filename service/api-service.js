import axios from "axios";
import { getCookie } from "cookies-next";

export const baseUrl = "https://backend.qbots.trade/api/v1";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    token: getCookie("token"),
  },
});
