import { TBattle } from "@/app/api/battle/battle.types";

export const groupBattlesByRound = (battles: TBattle[]) => {
  const grouped = battles.reduce<Record<number, TBattle[]>>((acc, battle) => {
    if (!acc[battle.round]) {
      acc[battle.round] = [];
    }
    acc[battle.round].push(battle);
    return acc;
  }, {});

  const result = Object.keys(grouped).map(round => ({
    name: `Ronda ${round}`,
    battles: grouped[parseInt(round)]
  }));

  return result;
}