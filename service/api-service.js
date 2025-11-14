"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React from "react";

// export const baseUrl = "http://139.59.42.213:8080/api/v1"; // local
// export const baseUrl = "https://backend.qbots.trade/api/v1"; // UAT
export const baseUrl = "https://productionb.qbots.trade/api/v1"; // live

// socket
// export const wssBaseUrl = "ws://139.59.42.213:8082";  //local
// export const wssBaseUrl = "wss://wsocket.qbots.trade/"; // UAT
export const wssBaseUrl = "wss://socket-production.qbots.trade/"; // live

export const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = getCookie("token");
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJtb2JpbGVOdW1iZXIiOiJxaWJvdDc4NzBAZ21haWwuY29tIiwidXNlclR5cGUiOiJBRE1JTiIsImlhdCI6MTc2MTY1NDE1OCwiZXhwIjoxNzYxOTEzMzU4fQ.RRqorEflCaD731PAJngYSsXH5rFQzk6J9qpvYvYJpxc";

  return {
    ...config,
    headers: {
      ...config.headers,
      token: token,
    },
  };
});
