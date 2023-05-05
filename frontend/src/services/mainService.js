import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({   })

api.interceptors.request.use((config) => {

  // const xsrfToken= Cookies.get('XSRF-TOKEN');
  const token = Cookies.get("token")
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;