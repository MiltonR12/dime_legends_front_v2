import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { OwnedTeam } from "@/app/api/team/team.types";
import { useMyTeams } from "@/hooks/team";
import TeamRosterForm from "@/components/form/TeamRosterForm";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Users, X } from "lucide-react";

const NO_TEAMS: OwnedTeam[] = [];

function MyTeamsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawNext = searchParams.get("next");
  const next =
    rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//")
      ? rawNext
      : null;
  const { data: teams = NO_TEAMS, isLoading } = useMyTeams();
  const [editing, setEditing] = useState<OwnedTeam | "new" | null>(
    searchParams.get("nuevo") === "1" ? "new" : null,
  );
  const selected = editing === "new" ? null : editing;

  const close = () => setEditing(null);

  const finish = () => {
    if (editing === "new" && next) {
      navigate(next);
      return;
    }
    close();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-admin-text">
            Mis equipos
          </h2>
          <p className="text-sm text-admin-muted">
            Arma tu equipo y después inscríbelo en un torneo.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setEditing("new")}
          className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover"
        >
          <Plus className="mr-2 h-4 w-4" /> Crear equipo
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-admin-border">
        {isLoading ? (
          <p className="px-4 py-6 text-sm text-admin-muted">
            Cargando equipos...
          </p>
        ) : teams.length === 0 ? (
          <p className="px-4 py-6 text-sm text-admin-muted">
            Todavía no tienes un equipo.
          </p>
        ) : (
          <ul>
            {teams.map((team) => (
              <li
                key={team._id}
                className="flex items-center justify-between gap-4 border-t border-admin-border px-4 py-3 first:border-t-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {team.image ? (
                    <img
                      src={team.image}
                      alt=""
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-admin-surface text-sm text-admin-text">
                      <Users className="h-4 w-4 text-admin-muted" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium text-admin-text">
                      {team.name}
                    </p>
                    <p className="text-sm text-admin-muted">
                      {team.captain} · {team.players.length} jugadores
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(team)}
                    className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input"
                  >
                    Editar
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover"
                  >
                    <Link to="/torneos">Inscribir</Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AlertDialog
        open={editing !== null}
        onOpenChange={(open) => !open && close()}
      >
        <AlertDialogContent className="max-w-2xl border-admin-border bg-admin-surface p-0">
          <AlertDialogHeader className="border-b border-admin-border px-6 py-4">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="text-xl text-admin-text">
                {editing === "new" ? "Crear equipo" : "Editar equipo"}
              </AlertDialogTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={close}
                className="h-8 w-8 rounded-full text-admin-muted hover:bg-admin-input hover:text-admin-text"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AlertDialogDescription className="text-admin-muted">
              El capitán es tu cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <TeamRosterForm team={selected} onDone={finish} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default MyTeamsPage;
