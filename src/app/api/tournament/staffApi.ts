import axios from "@/lib/axios";
import type { ApiResponse } from "../response";
import type {
  CreatedInvite,
  CreatorHit,
  InvitePreview,
  TournamentStaff,
} from "./staff.types";

export const searchCreatorsApi = async (query: string) => {
  const { data } = await axios.get<ApiResponse<CreatorHit[]>>("/tournament/creators", {
    params: { q: query },
  });
  return data.data ?? [];
};

export const getStaffApi = async (id: string) => {
  const { data } = await axios.get<ApiResponse<TournamentStaff>>(
    `/tournament/${id}/staff`,
  );
  return data.data;
};

export const createInviteApi = async (id: string, userId: string) => {
  const { data } = await axios.post<ApiResponse<CreatedInvite>>(
    `/tournament/${id}/invites`,
    { userId },
  );
  return data.data;
};

export const cancelInviteApi = async (id: string, inviteId: string) => {
  await axios.delete(`/tournament/${id}/invites/${inviteId}`);
};

export const removeOrganizerApi = async (id: string, userId: string) => {
  await axios.delete(`/tournament/${id}/organizers/${userId}`);
};

export const leaveTournamentApi = async (id: string) => {
  await axios.delete(`/tournament/${id}/leave`);
};

export const previewInviteApi = async (token: string) => {
  const { data } = await axios.get<ApiResponse<InvitePreview>>(
    `/tournament/invite/${token}`,
  );
  return data.data;
};

export const acceptInviteApi = async (token: string) => {
  const { data } = await axios.post<ApiResponse<{ tournamentId: string }>>(
    `/tournament/invite/${token}/accept`,
  );
  return data.data;
};

export const rejectInviteApi = async (token: string) => {
  await axios.post(`/tournament/invite/${token}/reject`);
};
