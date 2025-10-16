import axios from "axios";

export const baseUrl = "http://139.59.42.213:8080/api/v1";

export const api = axios.create({
  baseURL: baseUrl,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});
