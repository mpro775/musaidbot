import axios from "axios";
import { API_BASE } from "../context/config";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // لو كنت تستخدم refresh-token عبر كوكيز httpOnly فغيّره إلى true
});

// قبل كل طلب، ضَع الـ Bearer token إن وُجد
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Current token is", token);

  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// عند الاستجابة بخطأ 401، توجهّ إلى صفحة /login تلقائيًا
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
