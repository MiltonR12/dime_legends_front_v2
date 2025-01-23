import { TBattle } from "@/app/redux/battle/battle";
import { groupBattlesByRound } from "@/lib/sort";

interface Equipo {
  name: string;
  id: string;
  score?: number;
}

interface Match {
  id: string;
  date: string | undefined;
  teams: Equipo[];
  // winner: string | undefined;
}

interface Round {
  title: string;
  seeds: Match[];
  nextMatch?: Match;
}

export const transformBrackets = (data: TBattle[]): Round[] => {
  const roundGroup = groupBattlesByRound(data);

  const rounds: Round[] = [];

  roundGroup.forEach((elem) => {
    const newRound: Round = {
      title: elem.name,
      seeds: [],
    };

    elem.battles.forEach((battle) => {
      const newMatch: Match = {
        id: battle._id,
        date: new Date(battle.date).toLocaleString("es", {
          month: "long",
          day: "numeric",
        }) + " " + battle.hour,
        teams: [
          {
            id: battle.teamOne?._id || "",
            name: battle.teamOne?.name || "TBD",
            score: battle.teamOne?._id === battle.winner ? 1 : 0,
          },
          {
            id: battle.teamTwo?._id || "",
            name: battle.teamTwo?.name || "TBD",
            score: battle.teamTwo?._id === battle.winner ? 1 : 0,
          },
        ],
      };
      newRound.seeds.push(newMatch);
    });
    rounds.push(newRound);
  });

  return rounds;
};
