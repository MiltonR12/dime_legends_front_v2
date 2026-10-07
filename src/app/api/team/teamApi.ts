import axios from "@/lib/axios";
import type { ApiResponse } from "../response";
import type { PCreateTeam, PUpdateStatusTeam, PUpdateTeam } from "./team";
import type { Team } from "./team.types";

export const getTeamByTournamentApi = async (tournamentId: string) => {
  const { data } = await axios.get<ApiResponse<Team[]>>(`/team/tournament/${tournamentId}`);
  return data.data;
};

export const createTeamApi = async (payload: PCreateTeam) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("captain", payload.captain);
  formData.append("phone", payload.phone);
  if (payload.image) formData.append("image", payload.image);
  payload.players.forEach((player) => formData.append("players", player));
  if (payload.voucher) formData.append("voucher", payload.voucher);

  const { data } = await axios.post<ApiResponse<Team>>(`/team/${payload.id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const updateTeamApi = async (payload: PUpdateTeam) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("captain", payload.captain);
  if (payload.image) formData.append("image", payload.image);
  payload.players.forEach((player) => formData.append("players", player));

  const { data } = await axios.put<ApiResponse<Team>>(`/team/${payload.id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const updateStatusTeamApi = async (payload: PUpdateStatusTeam) => {
  const { data } = await axios.put<ApiResponse<Team>>(`/team/update-status/${payload.id}`, payload);
  return data.data;
};

export const deleteTeamApi = async (id: string) => {
  await axios.delete<ApiResponse>(`/team/${id}`);
};
