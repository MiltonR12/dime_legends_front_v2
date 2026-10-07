import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { useAuth } from "@/hooks/auth";
import { useTournament } from "@/hooks/tournament";
import {
  useInscribeTeam,
  useMyTeams,
  useTeamsByTournament,
} from "@/hooks/team";
import type { OwnedTeam, Team } from "@/app/api/team/team.types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UploadField from "@/components/form/UploadField";
import LoadingTournament from "@/components/loader/LoadingTournament";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Info,
  Loader2,
  Shield,
  Users,
} from "lucide-react";

const NO_MINE: OwnedTeam[] = [];
const NO_TEAMS: Team[] = [];

function CreateTeamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: tournament, isLoading } = useTournament(id);
  const { data: mine = NO_MINE, isLoading: loadingMine } =
    useMyTeams(isAuthenticated);
  const { data: inscribed = NO_TEAMS } = useTeamsByTournament(id);
  const { mutateAsync: inscribe } = useInscribeTeam();
  const [done, setDone] = useState(false);

  if (authLoading || isLoading) return <LoadingTournament />;
  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(`/torneo/team/create/${id}`)}`}
        replace
      />
    );
  }
  if (!tournament || !id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 to-black pt-20">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">
            Torneo no encontrado
          </h1>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          >
            <Link to="/torneos">Volver a Torneos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const registrationEnd = tournament.config?.registrationEnd
    ? new Date(tournament.config.registrationEnd)
    : null;
  const closed = (tournament.phase ?? "inscription") !== "inscription";
  const taken = inscribed.filter((team) => team.status !== "inactive").length;
  const maxTeams = tournament.config?.maxTeams;
  const full =
    typeof maxTeams === "number" && maxTeams > 0 && taken >= maxTeams;
  const inscribedIds = new Set(inscribed.map((team) => team._id));
  const available = mine.filter((team) => !inscribedIds.has(team._id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black pb-10">
      <div className="container mx-auto px-4 pt-24">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/torneo/${id}`)}
          className="mb-6 border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al torneo
        </Button>

        <div className="grid items-start gap-8 md:grid-cols-3">
          <aside className="rounded-xl border border-purple-800/50 bg-purple-900/20 p-6 backdrop-blur-sm md:sticky md:top-24">
            <h2 className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
              {tournament.name}
            </h2>
            <Separator className="my-4 bg-purple-700/30" />
            <div className="space-y-4 text-purple-200">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-400" />
                <span>
                  Equipos: {taken}
                  {maxTeams ? ` / ${maxTeams}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-purple-400" />
                <span>
                  Jugadores: {tournament.config?.minPlayers || 1} -{" "}
                  {tournament.config?.maxPlayers || 10}
                </span>
              </div>
              {registrationEnd && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <span>
                    Inscripciones hasta: {registrationEnd.toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-purple-400" />
                <span>
                  Costo:{" "}
                  {tournament.payment
                    ? `${tournament.payment.amount} Bs`
                    : "Gratis"}
                </span>
              </div>
            </div>
          </aside>

          <section className="rounded-xl border border-purple-800/50 bg-purple-900/20 p-6 backdrop-blur-sm md:col-span-2">
            {done ? (
              <div className="py-8 text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
                <h1 className="mb-2 text-3xl font-bold text-white">
                  Inscripción enviada
                </h1>
                <p className="mb-6 text-purple-300">
                  Tu equipo quedó pendiente de aprobación en {tournament.name}.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Link to={`/torneo/${id}`}>Volver al torneo</Link>
                </Button>
              </div>
            ) : closed || full ? (
              <div className="py-8 text-center">
                <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-400" />
                <h1 className="mb-2 text-2xl font-bold text-white">
                  {closed ? "Inscripciones cerradas" : "Torneo completo"}
                </h1>
                <p className="text-purple-300">
                  {closed
                    ? "Este torneo ya no acepta inscripciones."
                    : "Este torneo ya alcanzó el máximo de equipos."}
                </p>
              </div>
            ) : loadingMine ? (
              <p className="text-purple-300">Cargando tus equipos...</p>
            ) : mine.length === 0 ? (
              <div>
                <h1 className="mb-2 text-3xl font-bold text-white">
                  Primero arma tu equipo
                </h1>
                <p className="mb-6 text-purple-300">
                  Se guarda en tu cuenta. Después vuelves aquí para inscribirlo.
                </p>
                <Button
                  asChild
                  className="bg-admin-accent text-white hover:bg-admin-accent-hover"
                >
                  <Link
                    to={`/admin/equipos?nuevo=1&next=${encodeURIComponent(`/torneo/team/create/${id}`)}`}
                  >
                    Crear equipo
                  </Link>
                </Button>
              </div>
            ) : (
              <Formik
                enableReinitialize
                initialValues={{
                  teamId: available[0]?._id ?? "",
                  voucher: null as File | null,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  inscribe({
                    teamId: values.teamId,
                    tournamentId: id,
                    voucher: values.voucher,
                  })
                    .then(() => setDone(true))
                    .catch(() => undefined)
                    .finally(() => setSubmitting(false));
                }}
              >
                {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h1 className="mb-2 text-3xl font-bold text-white">
                        Inscribir equipo
                      </h1>
                      <p className="text-purple-300">
                        Elige cuál de tus equipos entra a {tournament.name}.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {mine.map((team) => {
                        const already = inscribedIds.has(team._id);
                        return (
                          <label
                            key={team._id}
                            className={`flex items-center gap-3 rounded-xl border p-4 ${
                              already
                                ? "border-purple-900 opacity-60"
                                : values.teamId === team._id
                                  ? "border-purple-400 bg-purple-900/40"
                                  : "border-purple-800/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="teamId"
                              value={team._id}
                              checked={values.teamId === team._id}
                              disabled={already}
                              onChange={() => setFieldValue("teamId", team._id)}
                            />
                            <span className="text-white">
                              {team.name}
                              <span className="ml-2 text-sm text-purple-300">
                                {already ? "Ya inscrito" : team.captain}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {available.length === 0 && (
                      <Alert className="border-purple-700 bg-purple-900/30 text-purple-100">
                        <AlertTitle>
                          Todos tus equipos ya están en este torneo
                        </AlertTitle>
                        <AlertDescription>
                          <Link
                            to={`/admin/equipos?nuevo=1&next=${encodeURIComponent(`/torneo/team/create/${id}`)}`}
                            className="underline"
                          >
                            Crea otro equipo
                          </Link>{" "}
                          si quieres inscribir uno distinto.
                        </AlertDescription>
                      </Alert>
                    )}

                    {tournament.payment && (
                      <div className="rounded-xl border border-purple-800/50 bg-purple-900/30 p-6">
                        <h2 className="mb-2 text-xl font-semibold text-white">
                          Comprobante de pago
                        </h2>
                        <p className="mb-4 text-purple-200">
                          Paga {tournament.payment.amount} Bs y sube el
                          comprobante.
                        </p>
                        {tournament.payment.qrImage && (
                          <img
                            src={tournament.payment.qrImage}
                            alt="Código QR para pago"
                            className="mb-4 max-h-64 rounded-lg border border-purple-600 object-contain"
                          />
                        )}
                        <UploadField
                          name="voucher"
                          className="max-h-80 w-full"
                        />
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !values.teamId ||
                        (!!tournament.payment && !values.voucher)
                      }
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-white hover:from-purple-700 hover:to-pink-700"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />{" "}
                          Inscribiendo...
                        </span>
                      ) : (
                        "Inscribir equipo"
                      )}
                    </Button>
                  </form>
                )}
              </Formik>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CreateTeamPage;
