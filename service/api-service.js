import axios from "axios";

export const baseUrl = "https://backend.qbots.trade/api/v1";

export const api = axios.create({
  baseURL: baseUrl,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});
