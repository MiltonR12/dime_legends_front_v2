import { Link, useParams } from "react-router-dom"
import { usePublicTeam } from "@/hooks/team"
import { Button } from "@/components/ui/button"

const PHASE_LABEL: Record<string, string> = {
  inscription: "Inscripción",
  running: "En curso",
  finished: "Finalizado",
}

function TeamPublicPage() {
  const { id } = useParams()
  const { data: team, isLoading, isError } = usePublicTeam(id)

  if (isLoading) {
    return <main className="min-h-screen bg-black px-4 py-24 text-center text-purple-300">Cargando equipo...</main>
  }

  if (isError || !team) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
        <h1 className="text-3xl font-bold text-white">Equipo no encontrado</h1>
        <Button asChild className="mt-6 bg-purple-600 text-white hover:bg-purple-700">
          <Link to="/torneos">Ver torneos</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-black px-4 py-16 text-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {team.image ? (
          <img src={team.image} alt="" className="h-28 w-28 rounded-full border border-purple-700 object-cover" />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-purple-700 text-2xl">
            {team.name.slice(0, 1)}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-semibold">{team.name}</h1>
          <p className="mt-1 text-purple-300">Capitán: {team.captain}</p>
        </div>
        <ul className="flex flex-wrap justify-center gap-2">
          {team.players.map((player) => (
            <li key={player} className="rounded-full border border-purple-800 px-3 py-1 text-sm text-purple-200">
              {player}
            </li>
          ))}
        </ul>
        <section className="w-full text-left">
          <h2 className="mb-3 text-lg font-medium">Torneos</h2>
          {team.tournaments.length === 0 ? (
            <p className="text-sm text-purple-300">Todavía no tiene torneos aceptados.</p>
          ) : (
            <ul className="divide-y divide-purple-900 rounded-lg border border-purple-800">
              {team.tournaments.map((item) => (
                <li key={item._id}>
                  <Link to={`/torneo/${item._id}`} className="flex items-center justify-between px-4 py-3 hover:bg-purple-900/40">
                    <span>{item.name}</span>
                    <span className="text-sm text-purple-300">{PHASE_LABEL[item.phase ?? "inscription"]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default TeamPublicPage
