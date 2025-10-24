import axios from "axios";
import { getCookie } from "cookies-next";

// export const baseUrl = "http://139.59.42.213:8080/api/v1"; // local
export const baseUrl = "https://backend.qbots.trade/api/v1"; // live
export const wssBaseUrl = "ws://139.59.42.213:8082";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    token: getCookie("token"),
  },
});
