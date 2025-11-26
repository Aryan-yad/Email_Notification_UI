// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8080", // your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosClient;
//    

// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: false,
// });

// // Attach token automatically if present in localStorage
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosClient;





// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: false,
// });

// // Attach token automatically if present in localStorage
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log("🔐 Axios Interceptor - Token:", token);
//   console.log("🔐 Axios Interceptor - URL:", config.url);
  
//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers["Authorization"] = `Bearer ${token}`;
//     console.log("🔐 Authorization header set");
//   } else {
//     console.warn("⚠️ No token found in localStorage!");
//   }
  
//   return config;
// });

// // Add response interceptor for debugging
// axiosClient.interceptors.response.use(
//   (response) => {
//     console.log("✅ Response received:", response.status, response.data);
//     return response;
//   },
//   (error) => {
//     console.error("❌ API Error:", error.response?.status, error.response?.data);
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;




import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Attach token automatically if present in localStorage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔐 Axios Interceptor - Token:", token);
  console.log("🔐 Axios Interceptor - URL:", config.url);
  
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("🔐 Authorization header set");
  } else {
    console.warn("⚠️ No token found in localStorage!");
  }
  
  return config;
});

// Add response interceptor for debugging
axiosClient.interceptors.response.use(
  (response) => {
    console.log("✅ Response received:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosClient;