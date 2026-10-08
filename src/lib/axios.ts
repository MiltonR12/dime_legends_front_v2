import { URL_API } from "@/config";
import axios from "axios";
import { CustomToast } from "@/lib/handleToast";

export const SESSION_EXPIRED_EVENT = "session-expired";

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

const messageOf = (data: unknown) =>
  typeof data === "object" && data !== null && "message" in data && typeof data.message === "string"
    ? data.message
    : null;

instance.interceptors.response.use(
  (response) => {
    if (response.status === 201) {
      CustomToast.success(messageOf(response.data) ?? "Se creó con éxito");
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // Con un token que ya no sirve se cierra la sesión una sola vez.
      if (status === 401 && localStorage.getItem("token")) {
        localStorage.removeItem("token");
        CustomToast.error("Tu sesión expiró. Inicia sesión de nuevo");
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
      } else if (status >= 400) {
        CustomToast.error(messageOf(data) ?? "Ocurrió un error");
      }
    } else {
      CustomToast.error(error.message || "No se pudo conectar con el servidor");
    }
    return Promise.reject(error);
  }
);

export default instance;
