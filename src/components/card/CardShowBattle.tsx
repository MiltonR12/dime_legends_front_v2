import { TBattle } from "@/app/redux/battle/battle"
import { Team } from "@/app/redux/team/team"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import CardTeam from "./CardTeam"
import { groupBattlesByRound } from "@/lib/sort"
import { Fragment } from "react/jsx-runtime"

type Props = {
  teams: Team[]
  battles: TBattle[]
}

function CardShowBattle({ battles, teams }: Props) {

  const sortRound = groupBattlesByRound(battles)

  return (
    <section className="grid md:grid-cols-2 gap-10 container mx-auto border-secondary border-4 rounded-2xl  p-5 md:p-10" >

      <div className="flex flex-col gap-5" >

        <h3 className="text-2xl font-semibold" >
          Equipos inscritos
        </h3>

        <ul className="text-info flex flex-wrap gap-2" >
          {teams.map((team) => <CardTeam key={team._id} team={team} />)}
        </ul>

      </div>

      <div className="flex flex-col gap-5 overflow-auto" >

        <h3 className="text-2xl font-semibold" >
          Batallas
        </h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Equipo 1
              </TableHead>
              <TableHead>
                Fecha
              </TableHead>
              <TableHead>
                Hora
              </TableHead>
              <TableHead>
                Equipo 2
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortRound.map((round) => (
              <Fragment key={round.name} >
                <TableRow>
                  <TableCell colSpan={4} className="text-center bg-primary py-1 font-semibold" >
                    {round.name}
                  </TableCell>
                </TableRow>
                {round.battles.map((battle) => (
                  <TableRow key={battle._id} >
                    <TableCell >
                      <p className={battle.teamOne?._id === battle.winner ? "text-green-500" : ""} >
                        {battle.teamOne?.teamName || "Sin designar"}
                      </p>
                    </TableCell>
                    <TableCell>
                      {battle.date ? new Date(battle.date).toLocaleDateString("es", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "Sin fecha"}
                    </TableCell>
                    <TableCell>
                      {battle.hour ? battle.hour : "Sin hora"}
                    </TableCell>
                    <TableCell>
                      {battle.teamTwo?.teamName || "Sin designar"}
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

    </section>
  )
}

export default CardShowBattle