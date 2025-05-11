import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { type RootState, useAppDispatch } from "@/app/store"
import { getTournamentIdThunk } from "@/app/redux/tournament/tournamentSlice"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Users, Shield, Info, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Steps } from "@/components/ui/steps"
import CreateTeamForm from "@/components/form/CreateTeamForm"
import LoadingTournament from "@/components/loader/LoadingTournament"

function RegisterTeamPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { tournament, isLoading } = useSelector((state: RootState) => state.tournament)
  const [currentStep, setCurrentStep] = useState(1)
  const [totalSteps, setTotalSteps] = useState(2)

  useEffect(() => {
    if (id) dispatch(getTournamentIdThunk(id))
  }, [id, dispatch])

  useEffect(() => {
    if (tournament?.payment) {
      setTotalSteps(3)
    } else {
      setTotalSteps(2)
    }
  }, [tournament])

  if (isLoading) return <LoadingTournament />

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black pt-20 pb-10 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Torneo no encontrado</h1>
          <p className="text-purple-300 mb-6">
            No pudimos encontrar el torneo que estás buscando. Por favor, verifica el enlace o regresa a la lista de torneos.
          </p>
          <Button
            asChild
            variant="default"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Link to="/torneos">Volver a Torneos</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const registrationEndDate = tournament.config?.registrationEnd ?
    new Date(tournament.config.registrationEnd) : null

  const isRegistrationClosed = registrationEndDate ? new Date() > registrationEndDate : false
  const isTournamentFull = tournament.teams?.length || 0 >= tournament.config?.maxTeams || false

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black pb-10">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-black z-10"></div>
        <div className="h-[25vh] overflow-hidden">
          <img
            src={tournament.image || "/placeholder.svg"}
            alt={tournament.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/torneo/${id}`)}
            className="mb-4 border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al torneo
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {tournament.name}
              </h2>
              <Separator className="my-4 bg-purple-700/30" />

              <div className="space-y-4 text-purple-200">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span>
                    Equipos: {tournament.teams?.length || 1} / {tournament.config?.maxTeams || 1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <span>
                    Jugadores: {tournament.config?.minPlayers || 1} - {tournament.config?.maxPlayers || 10}
                  </span>
                </div>
                {registrationEndDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <span>Inscripciones hasta: {registrationEndDate.toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-purple-400" />
                  <span>Costo: {tournament.payment ? `${tournament.payment.amount} Bs` : "Gratis"}</span>
                </div>
              </div>

              {(isRegistrationClosed || isTournamentFull) && (
                <Alert className="mt-6 bg-red-900/30 border-red-800 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>¡Atención!</AlertTitle>
                  <AlertDescription>
                    {isRegistrationClosed
                      ? "El período de inscripción ha finalizado."
                      : "El torneo ha alcanzado el máximo de equipos permitidos."}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="md:col-span-2">
            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Registro de Equipo</h1>
                <p className="text-purple-300">
                  Completa el formulario para inscribir a tu equipo en el torneo de {tournament.game}
                </p>

                <div className="mt-6 mb-8">
                  <Steps
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    labels={
                      tournament.payment ? ["Información", "Pago", "Confirmación"] : ["Información", "Confirmación"]
                    }
                  />
                </div>

                {!isRegistrationClosed && !isTournamentFull ? (
                  <CreateTeamForm id={id || ""} torneo={tournament} onStepChange={handleStepChange} />
                ) : (
                  <div className="text-center py-10">
                    <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {isRegistrationClosed ? "Inscripciones cerradas" : "Torneo completo"}
                    </h3>
                    <p className="text-purple-300 mb-6 max-w-md mx-auto">
                      {isRegistrationClosed
                        ? "El período de inscripción para este torneo ha finalizado."
                        : "Este torneo ha alcanzado el máximo de equipos permitidos."}
                    </p>
                    <Button
                      asChild
                      variant="default"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Link to="/torneos">Explorar otros torneos</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterTeamPage
