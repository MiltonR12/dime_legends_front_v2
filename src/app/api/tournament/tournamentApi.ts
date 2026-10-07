import axios from "@/lib/axios";
import type { ApiResponse } from "../response";
import type { PTournament, PUpdateTournament } from "./tournament";
import type { ListTournament, MyTournament, TournamentOne } from "./tournament.types";

const multipart = { headers: { "Content-Type": "multipart/form-data" } };

export const getTournamentByIdApi = async (id: string) => {
  const { data } = await axios.get<ApiResponse<TournamentOne>>(`/tournament/${id}`);
  return data.data;
};

export const getListTournamentApi = async () => {
  const { data } = await axios.get<ApiResponse<ListTournament[]>>("/tournament/list");
  return data.data;
};

export const getMyTournamentApi = async () => {
  const { data } = await axios.get<ApiResponse<MyTournament[]>>("/tournament/mis-torneos");
  return data.data;
};

export const createTournamentApi = async (tournament: PTournament) => {
  const formData = new FormData();
  formData.append("name", tournament.name ?? "");
  formData.append("description", tournament.description);
  formData.append("game", tournament.game);
  formData.append("dateStart", tournament.dateStart);
  formData.append("formUrl", tournament.formUrl);
  tournament.award.forEach((item) => formData.append("award", item));
  tournament.rules.forEach((item) => formData.append("rules", item));
  formData.append("image", tournament.image);
  tournament.banners?.forEach((file) => formData.append("banner", file));

  // Configuración
  formData.append("maxPlayers", tournament.config.maxPlayers.toString());
  formData.append("maxTeams", tournament.config.maxTeams.toString());
  formData.append("minPlayers", tournament.config.minPlayers.toString());
  formData.append("registrationEnd", tournament.config.registrationEnd.toString());
  formData.append("tipo", tournament.config.tipo);

  // Pago
  if (tournament.payment && tournament.payment.qrImage) {
    formData.append("qr", tournament.payment.qrImage);
    formData.append("account", tournament.payment.account);
    formData.append("amount", tournament.payment.amount.toString());
  }

  const { data } = await axios.post<ApiResponse<TournamentOne>>("/tournament", formData, multipart);
  return data.data;
};

export const updateTournamentApi = async (tournament: PUpdateTournament) => {
  const formData = new FormData();
  if (tournament.name) formData.append("name", tournament.name);
  if (tournament.description) formData.append("description", tournament.description);
  if (tournament.game) formData.append("game", tournament.game);
  if (tournament.dateStart) formData.append("dateStart", tournament.dateStart);
  if (tournament.formUrl) formData.append("formUrl", tournament.formUrl);

  if (tournament.status !== undefined) {
    formData.append("status", tournament.status.toString());
  }

  const appendList = (key: "award" | "rules", items?: string[]) => {
    if (!items) return;
    const clean = items.map((item) => item.trim()).filter(Boolean);
    if (clean.length === 0) {
      formData.append(key, "");
      return;
    }
    clean.forEach((item) => formData.append(key, item));
  };

  appendList("award", tournament.award);
  appendList("rules", tournament.rules);

  if (tournament.image) formData.append("image", tournament.image);
  if (tournament.bannerOrder) {
    if (tournament.bannerOrder.length === 0) formData.append("bannerOrder", "");
    tournament.bannerOrder.forEach((token) => formData.append("bannerOrder", token));
  }
  tournament.bannerFiles?.forEach((file) => formData.append("banner", file));

  // Configuración
  if (tournament.config?.maxPlayers) {
    formData.append("maxPlayers", tournament.config.maxPlayers.toString());
  }
  if (tournament.config?.maxTeams) {
    formData.append("maxTeams", tournament.config.maxTeams.toString());
  }
  if (tournament.config?.minPlayers) {
    formData.append("minPlayers", tournament.config.minPlayers.toString());
  }
  if (tournament.config?.registrationEnd) {
    formData.append("registrationEnd", tournament.config.registrationEnd.toString());
  }
  if (tournament.config?.tipo) {
    formData.append("tipo", tournament.config.tipo);
  }

  if (tournament.payment && tournament.payment.qrImage) {
    formData.append("qr", tournament.payment.qrImage);
    formData.append("account", tournament.payment.account);
    formData.append("amount", tournament.payment.amount.toString());
  }

  const { data } = await axios.put<ApiResponse<TournamentOne>>(
    `/tournament/${tournament._id}`,
    formData,
    multipart,
  );
  return data.data;
};

export const deleteTournamentApi = async (id: string) => {
  await axios.delete<ApiResponse>(`/tournament/${id}`);
};
