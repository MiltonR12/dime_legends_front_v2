import axios from "@/lib/axios";
import { uploadFile } from "../upload/uploadApi";
import type { ApiResponse } from "../response";
import type { PCreatePage, PLogin, PRegister } from "./auth";
import type { User } from "./auth.types";

type Session = { token: string; user: User };

const saveSession = ({ token, user }: Session) => {
  localStorage.setItem("token", token);
  return user;
};

export const authLoginGoogleApi = async (token: string) => {
  const { data } = await axios.post<ApiResponse<Session>>("/google", { token });
  return saveSession(data.data);
};

export const authLoginApi = async ({ email, password }: PLogin) => {
  const { data } = await axios.post<ApiResponse<Session>>("/login", { email, password });
  return saveSession(data.data);
};

export const authRegisterApi = async (payload: PRegister) => {
  await axios.post<ApiResponse>("/register", payload);
};

export const validateTokenApi = async () => {
  const { data } = await axios.get<ApiResponse<Session>>("/validate-token");
  return saveSession(data.data);
};

export const createPageApi = async (payload: PCreatePage) => {
  const image = await uploadFile(payload.image, "page");
  const { data } = await axios.post<ApiResponse<User>>("/page", {
    name: payload.name,
    description: payload.description,
    image,
  });
  return data.data;
};
