import axios from "axios";

export const api = axios.create({
  baseURL: "putURLHERE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor (optional)
// api.interceptors.response.use(
//   (response) => response, // Return data as-is
//   (error) => {
//     // Handle errors globally
//     if (error.response) {
//       // Server responded with a status outside 2xx
//       console.error("API Error:", error.response.data);
//     } else if (error.request) {
//       // No response received
//       console.error("No response from server:", error.request);
//     } else {
//       // Something went wrong setting up the request
//       console.error("Axios error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
