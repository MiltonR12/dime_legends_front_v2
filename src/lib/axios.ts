import { URL_API } from "@/config";
import axios from "axios";
import { CustomToast } from "@/lib/handleToast";

const instance = axios.create({
  baseURL: URL_API,
  timeout: 6000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 201) {
      CustomToast.success("Se creo con exito");
    }

    return response;
  },
  (error) => {
    if (error.response.status >= 400) {
      CustomToast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
