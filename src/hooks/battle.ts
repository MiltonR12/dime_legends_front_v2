import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  autoGenerateApi,
  createBattleApi,
  deleteBattleApi,
  getBattleApi,
  linkBattleApi,
  migrateBattlesApi,
  updateBattleApi,
  updatePositionsApi,
  updateWinnerBattleApi,
} from "@/app/api/battle/battleApi"
import type {
  PAutoGenerate,
  PBattlePosition,
  PCreateBattle,
  PLinkBattle,
  PUpdateBattle,
  PWinnerBattle,
} from "@/app/api/battle/battle"
import type { TBattle } from "@/app/api/battle/battle.types"
import { queryKeys } from "./queryKeys"

export function useBattles(tournamentId?: string) {
  return useQuery({
    queryKey: queryKeys.battles.list(tournamentId ?? ""),
    queryFn: () => getBattleApi(tournamentId!),
    enabled: !!tournamentId,
  })
}

function useInvalidateBattles() {
  const qc = useQueryClient()
  return () => qc.invalidateQueries({ queryKey: queryKeys.battles.all })
}

export function useCreateBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (data: PCreateBattle) => createBattleApi(data),
    onSuccess: invalidate,
  })
}

export function useUpdateBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (data: PUpdateBattle) => updateBattleApi(data),
    onSuccess: invalidate,
  })
}

export function useAutoGenerate() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (data: PAutoGenerate) => autoGenerateApi(data),
    onSuccess: invalidate,
  })
}

export function useMigrateBattles() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (tournamentId: string) => migrateBattlesApi(tournamentId),
    onSuccess: invalidate,
  })
}

// Guarda posiciones: la caché se actualiza al instante y no se vuelve a pedir al servidor.
export function useMoveBattles() {
  const qc = useQueryClient()
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (positions: PBattlePosition[]) => updatePositionsApi(positions),
    onMutate: (positions) => {
      const byId = new Map(positions.map((p) => [p.id, p]))
      qc.setQueriesData<TBattle[]>({ queryKey: queryKeys.battles.all }, (old) =>
        Array.isArray(old)
          ? old.map((battle) => {
              const next = byId.get(battle._id)
              return next ? { ...battle, position: { x: next.x, y: next.y } } : battle
            })
          : old,
      )
    },
    onError: invalidate,
  })
}

// Conectar o desconectar: el servidor mueve los equipos, por eso se vuelve a pedir la lista.
export function useLinkBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (data: PLinkBattle) => linkBattleApi(data),
    onSettled: invalidate,
  })
}

const setWinner = (battles: TBattle[], payload: PWinnerBattle) =>
  battles.map((battle) => (battle._id === payload.id ? { ...battle, winner: payload.winner } : battle))

export function useSetBattleWinner() {
  const qc = useQueryClient()
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (payload: PWinnerBattle) => updateWinnerBattleApi(payload),
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: queryKeys.battles.all })
      const previous = qc.getQueriesData({ queryKey: queryKeys.battles.all })

      qc.setQueriesData<TBattle[]>({ queryKey: queryKeys.battles.all }, (old) =>
        Array.isArray(old) ? setWinner(old, payload) : old,
      )

      return { previous }
    },
    onError: (_error, _payload, context) => {
      context?.previous.forEach(([key, data]) => qc.setQueryData(key, data))
    },
    // El servidor lleva ganador y perdedor a los versus conectados.
    onSettled: invalidate,
  })
}

export function useDeleteBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (id: string) => deleteBattleApi(id),
    onSuccess: invalidate,
  })
}
