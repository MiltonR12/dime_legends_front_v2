import axios from "@/lib/axios";
import type { ApiResponse } from "../response";
import { uploadFile } from "../upload/uploadApi";
import type {
  PCreateOwnedTeam,
  PCreateTeam,
  PInscribeTeam,
  PUpdateStatusTeam,
  PUpdateTeam,
} from "./team";
import type {
  ImportPreviewTeam,
  ImportResult,
  ImportTeam,
  OwnedTeam,
  PublicTeam,
  Team,
} from "./team.types";

// La IA puede tardar bastante más que el resto de las peticiones.
const IMPORT_TIMEOUT = 70000;

const uploadedImage = async (image: File | string | null | undefined) => {
  if (image instanceof File) return uploadFile(image, "team" as const);
  if (image === null) return null;
  return undefined;
};

export const getTeamByTournamentApi = async (tournamentId: string) => {
  const { data } = await axios.get<ApiResponse<Team[]>>(
    `/team/tournament/${tournamentId}`,
  );
  return data.data;
};

export const getPublicTeamApi = async (id: string) => {
  const { data } = await axios.get<ApiResponse<PublicTeam>>(`/team/${id}`);
  return data.data;
};

export const getMyTeamsApi = async () => {
  const { data } = await axios.get<ApiResponse<OwnedTeam[]>>("/team/mine");
  return data.data;
};

export const createOwnedTeamApi = async (payload: PCreateOwnedTeam) => {
  const image = await uploadedImage(payload.image);
  const { data } = await axios.post<ApiResponse<OwnedTeam>>("/team", {
    name: payload.name,
    phone: payload.phone,
    players: payload.players,
    image,
  });
  return data.data;
};

export const createTeamApi = async (payload: PCreateTeam) => {
  const image = await uploadedImage(payload.image);
  const { data } = await axios.post<ApiResponse<Team>>(
    `/team/tournament/${payload.id}`,
    {
      name: payload.name,
      captain: payload.captain,
      phone: payload.phone,
      players: payload.players,
      image,
    },
  );
  return data.data;
};

export const inscribeTeamApi = async (payload: PInscribeTeam) => {
  const voucher = payload.voucher
    ? await uploadFile(payload.voucher, "voucher")
    : undefined;
  const { data } = await axios.post<ApiResponse<Team>>(
    `/team/${payload.teamId}/inscribir/${payload.tournamentId}`,
    {
      voucher,
    },
  );
  return data.data;
};

export const updateTeamApi = async (payload: PUpdateTeam) => {
  const image = await uploadedImage(payload.image);
  const { data } = await axios.put<ApiResponse<OwnedTeam>>(
    `/team/${payload.id}`,
    {
      name: payload.name,
      captain: payload.captain,
      phone: payload.phone,
      players: payload.players,
      image,
    },
  );
  return data.data;
};

export const updateStatusTeamApi = async (payload: PUpdateStatusTeam) => {
  const { data } = await axios.put<ApiResponse<Team>>(
    `/team/update-status/${payload.id}`,
    {
      status: payload.status,
      tournament: payload.tournament,
    },
  );
  return data.data;
};

export const previewImportApi = async (payload: {
  tournament: string;
  sheet: string;
}) => {
  const { data } = await axios.post<ApiResponse<ImportPreviewTeam[]>>(
    `/team/import/${payload.tournament}/preview`,
    {
      sheet: payload.sheet,
    },
    { timeout: IMPORT_TIMEOUT },
  );
  return data.data;
};

export const commitImportApi = async (payload: {
  tournament: string;
  teams: ImportTeam[];
}) => {
  const { data } = await axios.post<ApiResponse<ImportResult>>(
    `/team/import/${payload.tournament}`,
    {
      teams: payload.teams,
    },
    { timeout: IMPORT_TIMEOUT },
  );
  return data.data;
};

export const deleteTeamApi = async (payload: {
  id: string;
  tournament: string;
}) => {
  await axios.delete<ApiResponse>(
    `/team/inscripcion/${payload.tournament}/${payload.id}`,
  );
};
