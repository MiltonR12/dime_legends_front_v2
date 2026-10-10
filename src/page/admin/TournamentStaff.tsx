import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Loader2, UserMinus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "@/components/ui/Image";
import {
  useCancelInvite,
  useCreateInvite,
  useCreatorSearch,
  useLeaveTournament,
  useRemoveOrganizer,
  useTournamentStaff,
} from "@/hooks/staff";

const fullName = (person: { firstName: string; lastName: string }) =>
  `${person.firstName} ${person.lastName}`.trim();

const initial = (person: { firstName: string }) =>
  person.firstName.charAt(0).toUpperCase();

function TournamentStaff({ tournamentId }: { tournamentId: string }) {
  const navigate = useNavigate();
  const { data: staff } = useTournamentStaff(tournamentId);
  const [query, setQuery] = useState("");
  const [link, setLink] = useState("");
  const { data: creators = [] } = useCreatorSearch(query);
  const { mutate: invite, isPending: inviting } = useCreateInvite(tournamentId);
  const { mutate: cancel } = useCancelInvite(tournamentId);
  const { mutate: remove } = useRemoveOrganizer(tournamentId);
  const { mutate: leave, isPending: leaving } = useLeaveTournament(tournamentId);

  if (!staff) return null;

  const copyLink = (path: string) => {
    const url = `${window.location.origin}${path}`;
    setLink(url);
    navigator.clipboard.writeText(url).catch(() => undefined);
  };

  return (
    <section className="space-y-4 rounded-xl border border-admin-border bg-admin-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Coorganizadores</h2>
          <p className="text-sm text-admin-muted">
            Hasta 5, entre aceptados e invitaciones pendientes. El enlace es de un
            solo uso y vence a los 7 días.
          </p>
        </div>
        {!staff.isOwner && (
          <Button
            type="button"
            variant="outline"
            disabled={leaving}
            onClick={() =>
              leave(undefined, { onSuccess: () => navigate("/admin") })
            }
            className="border-admin-border text-admin-text hover:bg-admin-input"
          >
            Salirme
          </Button>
        )}
      </div>

      {staff.isOwner && (
        <div className="space-y-2">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar un creador por nombre"
            className="border-admin-border bg-admin-input text-admin-text"
          />
          {query.trim().length >= 2 && (
            <ul className="overflow-hidden rounded-lg border border-admin-border">
              {creators.length === 0 ? (
                <li className="px-3 py-2 text-sm text-admin-muted">
                  No hay creadores con ese nombre
                </li>
              ) : (
                creators.map((creator) => (
                  <li key={creator._id}>
                    <button
                      type="button"
                      disabled={inviting}
                      onClick={() =>
                        invite(creator._id, {
                          onSuccess: (created) => {
                            if (created?.path) copyLink(created.path);
                            setQuery("");
                          },
                        })
                      }
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-admin-text hover:bg-admin-input"
                    >
                      <Image
                        src={creator.avatar}
                        alt=""
                        className="h-8 w-8"
                        noImage={initial(creator)}
                      />
                      <span>{fullName(creator)}</span>
                      {inviting && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
          {link && (
            <div className="flex gap-2">
              <Input
                readOnly
                value={link}
                className="border-admin-border bg-admin-input text-admin-text"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(link).catch(() => undefined)}
                className="border-admin-border text-admin-text hover:bg-admin-input"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      <ul className="space-y-2">
        {staff.organizers.map((person) => (
          <li
            key={person._id}
            className="flex items-center gap-3 rounded-lg border border-admin-border px-3 py-2"
          >
            <Image
              src={person.avatar}
              alt=""
              className="h-8 w-8"
              noImage={initial(person)}
            />
            <div className="min-w-0">
              <p className="truncate text-sm text-admin-text">{fullName(person)}</p>
              {!person.active && (
                <p className="text-xs text-admin-muted">Ya no es creador</p>
              )}
            </div>
            {staff.isOwner && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(person._id)}
                className="ml-auto text-admin-muted hover:text-admin-text"
              >
                <UserMinus className="h-4 w-4" />
              </Button>
            )}
          </li>
        ))}
        {staff.invites.map((invite) => (
          <li
            key={invite._id}
            className="flex items-center gap-3 rounded-lg border border-dashed border-admin-border px-3 py-2"
          >
            <Image
              src={invite.user.avatar}
              alt=""
              className="h-8 w-8"
              noImage={initial(invite.user)}
            />
            <div className="min-w-0">
              <p className="truncate text-sm text-admin-text">{fullName(invite.user)}</p>
              <p className="text-xs text-admin-muted">Invitación pendiente</p>
            </div>
            {staff.isOwner && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => cancel(invite._id)}
                className="ml-auto text-admin-muted hover:text-admin-text"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TournamentStaff;
