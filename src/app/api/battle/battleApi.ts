import axios from "@/lib/axios";
import type { ApiResponse } from "../response";
import type {
  PAutoGenerate,
  PBattlePosition,
  PCreateBattle,
  PLinkBattle,
  PUpdateBattle,
  PWinnerBattle,
} from "./battle";
import type { TBattle } from "./battle.types";

export const getBattleApi = async (tournamentId: string) => {
  const { data } = await axios.get<ApiResponse<TBattle[]>>(`/battle/${tournamentId}`);
  return data.data;
};

export const createBattleApi = async (payload: PCreateBattle) => {
  const { data } = await axios.post<ApiResponse<TBattle>>(`/battle`, payload);
  return data.data;
};

export const updateBattleApi = async ({ id, ...payload }: PUpdateBattle) => {
  const { data } = await axios.put<ApiResponse<TBattle>>(`/battle/${id}`, payload);
  return data.data;
};

export const updateWinnerBattleApi = async (payload: PWinnerBattle) => {
  await axios.put<ApiResponse>(`/battle/winner`, payload);
};

export const updatePositionsApi = async (positions: PBattlePosition[]) => {
  await axios.patch<ApiResponse>(`/battle/positions`, { positions });
};

export const linkBattleApi = async ({ id, ...payload }: PLinkBattle) => {
  await axios.put<ApiResponse>(`/battle/${id}/link`, payload);
};

export const autoGenerateApi = async ({ tournamentId, ...payload }: PAutoGenerate) => {
  const { data } = await axios.post<ApiResponse<TBattle[]>>(
    `/battle/auto-generate/${tournamentId}`,
    payload,
  );
  return data.data;
};

export const migrateBattlesApi = async (tournamentId: string) => {
  const { data } = await axios.post<ApiResponse<{ migrated: number }>>(
    `/battle/migrate/${tournamentId}`,
  );
  return data.data;
};

export const deleteBattleApi = async (id: string) => {
  await axios.delete<ApiResponse>(`/battle/${id}`);
};
