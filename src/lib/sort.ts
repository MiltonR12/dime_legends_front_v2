import { TBattle } from "@/app/redux/battle/battle";

export const groupBattlesByRound = (battles: TBattle[]) => {
  const grouped = battles.reduce((acc, battle) => {
    if (!acc[battle.round]) {
      acc[battle.round] = [];
    }
    acc[battle.round].push(battle);
    return acc;
  }, {} as { [key: number]: TBattle[] });

  const result = Object.keys(grouped).map(round => ({
    name: `Ronda ${round}`,
    battles: grouped[parseInt(round)]
  }));

  return result;
}