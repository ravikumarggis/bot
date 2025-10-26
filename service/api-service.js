"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React from "react";

// export const baseUrl = "http://139.59.42.213:8080/api/v1"; // local
export const baseUrl = "https://backend.qbots.trade/api/v1"; // live

// socket
// export const wssBaseUrl = "ws://139.59.42.213:8082";  //local
export const wssBaseUrl = "wss://wsocket.qbots.trade/"; // live

export const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = getCookie("token");

  return {
    ...config,
    headers: {
      ...config.headers,
      token: token,
    },
  };
});export const UserList = () => {
    return (
        <div>UserList</div>
    )
}

