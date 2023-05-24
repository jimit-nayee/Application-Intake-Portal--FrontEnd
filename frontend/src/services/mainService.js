import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({ withCredentials: true })

api.interceptors.request.use((config) => {

  // const xsrfToken= Cookies.get('XSRF-TOKEN');
  const xsrfCookie = Cookies.get("XSRF-TOKEN")


  const token = Cookies.get("token")
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    if (config.url === "http://localhost:8080/registerCustomer" || config.url === "http://localhost:8080/approveCustomer") {
      config.headers['Content-type'] = "multipart/form-data";

    }

  }
  return config;
});

export default api;