import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { usePageTitle } from "@/lib/pageTitle";
import { useAcceptInvite, useInvitePreview, useRejectInvite } from "@/hooks/staff";

function InvitePage() {
  const { token = "" } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: sessionLoading } = useAuth();
  const { data, isLoading, error } = useInvitePreview(
    isAuthenticated ? token : undefined,
  );
  const { mutate: accept, isPending: accepting } = useAcceptInvite(token);
  usePageTitle(data?.tournament.name);
  const { mutate: reject, isPending: rejecting } = useRejectInvite(token);
  const next = `/login?next=${encodeURIComponent(`/invitacion/${token}`)}`;

  const message =
    axios.isAxiosError(error) &&
    typeof error.response?.data?.message === "string"
      ? error.response.data.message
      : "Esta invitación no está disponible";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 to-black px-4">
      <div className="w-full max-w-md rounded-xl border border-purple-800/50 bg-purple-900/20 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Invitación a organizar</h1>
        {sessionLoading || (isAuthenticated && isLoading) ? (
          <p className="mt-4 text-purple-200">Cargando la invitación...</p>
        ) : !isAuthenticated ? (
          <>
            <p className="mt-4 text-purple-200">
              Entra con la cuenta del creador invitado para aceptar o rechazar.
            </p>
            <Button asChild className="mt-6 bg-purple-600 text-white hover:bg-purple-700">
              <Link to={next}>Iniciar sesión</Link>
            </Button>
          </>
        ) : error || !data ? (
          <p className="mt-4 text-purple-200">{message}</p>
        ) : (
          <>
            <p className="mt-4 text-purple-200">
              Te invitaron a organizar{" "}
              <span className="font-semibold text-white">{data.tournament.name}</span>
              {data.tournament.game ? ` (${data.tournament.game})` : ""}.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={rejecting || accepting}
                onClick={() => reject(undefined, { onSuccess: () => navigate("/") })}
                className="border-purple-700 text-purple-200 hover:bg-purple-900/40"
              >
                Rechazar
              </Button>
              <Button
                type="button"
                disabled={accepting || rejecting}
                onClick={() =>
                  accept(undefined, {
                    onSuccess: (result) =>
                      navigate(
                        result?.tournamentId
                          ? `/admin/torneo/${result.tournamentId}`
                          : "/admin",
                      ),
                  })
                }
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Aceptar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InvitePage;
