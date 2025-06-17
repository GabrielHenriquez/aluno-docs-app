import axios from "axios";
import { sleep } from "@utils/sleep";

export const API = axios.create({
  baseURL: "/",
  timeout: 5000,
});

API.interceptors.request.use(async (config) => {
  await sleep(800);
  console.log(
    `🚀 [API] REQUEST EM: ${config.method?.toUpperCase()} ${config.url}`
  );
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ [API ERROR]:", error);
    return Promise.reject(error);
  }
);
