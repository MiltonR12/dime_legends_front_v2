import { createContext, useContext } from "react"
import type { BattleSlot, TBattle } from "@/app/api/battle/battle.types"

export type BracketContextValue = {
  readOnly: boolean
  /** Equipo elegido en el panel para asignarlo con un clic. */
  selectedTeam: string | null
  assignTeam: (battleId: string, slot: BattleSlot, teamId: string) => void
  editBattle: (battle: TBattle) => void
}

export const BracketContext = createContext<BracketContextValue>({
  readOnly: true,
  selectedTeam: null,
  assignTeam: () => undefined,
  editBattle: () => undefined,
})

export const useBracketContext = () => useContext(BracketContext)
