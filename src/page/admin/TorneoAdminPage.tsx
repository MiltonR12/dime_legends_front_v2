import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  useDeleteTournament,
  useTournament,
  useUpdateTournament,
} from "@/hooks/tournament";
import { queryKeys } from "@/hooks/queryKeys";
import { listGames, ListaGamesImage } from "@/payments/games";
import InputComboBox from "@/components/input/InputComboBox";
import InputNumber from "@/components/input/InputNumber";
import ArrayInput from "@/components/form/ArrayInput";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Save, Trash2 } from "lucide-react";
import BannerGallery, {
  BANNER_FILE_TOKEN,
  bannerUrls,
  savedBannerSlots,
} from "@/components/input/BannerGallery";
import TournamentStaff from "@/page/admin/TournamentStaff";
import { useTournamentStaff } from "@/hooks/staff";

const PHASES = [
  { value: "inscription", label: "Inscripción" },
  { value: "running", label: "En curso" },
  { value: "finished", label: "Finalizado" },
] as const;

const tournamentSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  game: Yup.string().required("El juego es obligatorio"),
  dateStart: Yup.string().required("La fecha de inicio es obligatoria"),
  tipo: Yup.string().oneOf(["simple", "doble", "normal"]).required(),
  minPlayers: Yup.number().min(1).required(),
  maxPlayers: Yup.number().min(1).required(),
  maxTeams: Yup.number().min(1).required(),
});

const toLocalInput = (value: string) => {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const fieldClass =
  "mt-2 h-10 rounded-md border-admin-border bg-admin-input text-sm text-admin-text shadow-none placeholder:text-admin-muted focus-visible:ring-admin-accent disabled:opacity-70";

function TorneoAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: tournament, isLoading } = useTournament(id);
  const { data: staff } = useTournamentStaff(id);
  const { mutateAsync: updateTournament, mutate: patchTournament } =
    useUpdateTournament();
  const { mutateAsync: deleteTournament } = useDeleteTournament();
  const [isEditing, setIsEditing] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-admin-accent" />
          <p className="text-sm text-admin-muted">Cargando el torneo...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="text-xl font-semibold text-admin-text">
          Torneo no encontrado
        </h1>
        <Button
          onClick={() => navigate("/admin")}
          variant="outline"
          className="mt-4 border-admin-border text-admin-text hover:bg-admin-surface"
        >
          Volver al panel
        </Button>
      </div>
    );
  }

  const game = ListaGamesImage.find((item) => item.name === tournament.game);
  const dateLabel = new Date(tournament.dateStart).toLocaleDateString("es", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const teams = tournament.teams?.length || 0;
  const maxTeams = tournament.config?.maxTeams || 0;

  const handleDelete = () => {
    const deletedId = tournament._id;
    deleteTournament(deletedId)
      .then(() => {
        navigate("/admin", { replace: true });
        window.setTimeout(() => {
          queryClient.removeQueries({
            queryKey: queryKeys.tournaments.detail(deletedId),
          });
        }, 0);
      })
      .catch(() => undefined);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <img
            src={bannerUrls(tournament)[0] || "/placeholder.svg"}
            alt=""
            className="h-16 w-16 shrink-0 rounded-lg border border-admin-border object-cover"
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-admin-muted">
              Editar torneo
            </p>
            <h1 className="truncate text-2xl font-semibold text-admin-text">
              {tournament.name}
            </h1>
            <p className="mt-1 text-sm text-admin-muted">
              {tournament.game} · {dateLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={tournament.phase ?? "inscription"}
            onValueChange={(phase: "inscription" | "running" | "finished") =>
              patchTournament({ _id: tournament._id, phase })
            }
          >
            <SelectTrigger className="w-40 border-admin-border bg-admin-input text-admin-text">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
              {PHASES.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="focus:bg-admin-row focus:text-admin-text"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 rounded-lg border border-admin-border px-3 py-2">
            <span className="text-sm text-admin-muted">
              {tournament.status ? "Activo" : "Oculto"}
            </span>
            <Switch
              checked={tournament.status}
              onCheckedChange={(checked) =>
                patchTournament({ _id: tournament._id, status: checked })
              }
              aria-label="Estado del torneo"
              className="data-[state=checked]:bg-admin-accent"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setIsEditing((editing) => {
                if (editing) setFormVersion((version) => version + 1);
                return !editing;
              })
            }
            className="border-admin-border bg-transparent text-admin-text hover:bg-admin-surface"
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </div>
      </header>

      <Formik
        key={formVersion}
        enableReinitialize
        initialValues={{
          name: tournament.name,
          description: tournament.description,
          game: tournament.game,
          dateStart: toLocalInput(tournament.dateStart),
          tipo: tournament.config?.tipo || "simple",
          minPlayers: tournament.config?.minPlayers || 1,
          maxPlayers: tournament.config?.maxPlayers || 5,
          maxTeams: tournament.config?.maxTeams || 16,
          rules: tournament.rules?.length ? tournament.rules : [""],
          award: tournament.award?.length ? tournament.award : [""],
          bannerSlots: savedBannerSlots(tournament),
        }}
        validationSchema={tournamentSchema}
        onSubmit={(values, { setSubmitting }) => {
          updateTournament({
            _id: tournament._id,
            name: values.name,
            description: values.description,
            game: values.game,
            dateStart: new Date(values.dateStart).toISOString(),
            rules: values.rules,
            award: values.award,
            bannerOrder: values.bannerSlots.map((slot) =>
              slot.kind === "saved" ? slot.url : BANNER_FILE_TOKEN,
            ),
            bannerFiles: values.bannerSlots.flatMap((slot) =>
              slot.kind === "new" ? [slot.file] : [],
            ),
            config: {
              minPlayers: Number(values.minPlayers),
              maxPlayers: Number(values.maxPlayers),
              maxTeams: Number(values.maxTeams),
              tipo: values.tipo,
              ...(tournament.config?.registrationEnd
                ? {
                    registrationEnd: new Date(
                      tournament.config.registrationEnd,
                    ),
                  }
                : {}),
            },
          })
            .then(() => setIsEditing(false))
            .catch(() => undefined)
            .finally(() => setSubmitting(false));
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form className="space-y-6">
            <section className="space-y-4 rounded-xl border border-admin-border bg-admin-surface p-5">
              <div>
                <h2 className="text-base font-semibold text-admin-text">
                  Información
                </h2>
                <p className="text-sm text-admin-muted">
                  Nombre, fecha, descripción y banner que ven los equipos.
                </p>
              </div>
              <BannerGallery disabled={!isEditing} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-sm text-admin-text">
                    Nombre del torneo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!isEditing}
                    className={fieldClass}
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="dateStart"
                    className="text-sm text-admin-text"
                  >
                    Fecha de inicio
                  </Label>
                  <Input
                    id="dateStart"
                    name="dateStart"
                    type="datetime-local"
                    value={values.dateStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!isEditing}
                    className={fieldClass}
                  />
                  {errors.dateStart && touched.dateStart && (
                    <p className="mt-1 text-sm text-red-400">
                      {String(errors.dateStart)}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm text-admin-text"
                >
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                  rows={4}
                  className="mt-2 rounded-md border-admin-border bg-admin-input text-sm text-admin-text shadow-none placeholder:text-admin-muted focus-visible:ring-admin-accent disabled:opacity-70"
                />
                {errors.description && touched.description && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.description}
                  </p>
                )}
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-admin-border bg-admin-surface p-5">
              <div>
                <h2 className="text-base font-semibold text-admin-text">
                  Juego
                </h2>
                <p className="text-sm text-admin-muted">
                  El juego publicado y el formato del torneo.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  {game && (
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt=""
                      className="mt-8 h-10 w-10 rounded-md object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <InputComboBox
                      label="Juego"
                      name="game"
                      required
                      disabled={!isEditing}
                      placeholder="Selecciona un juego"
                      list={listGames.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </div>
                </div>
                <InputComboBox
                  label="Tipo"
                  name="tipo"
                  disabled={!isEditing}
                  placeholder="Selecciona el tipo"
                  list={[
                    { label: "Eliminación simple", value: "simple" },
                    { label: "Doble eliminación", value: "doble" },
                    { label: "Formato normal", value: "normal" },
                  ]}
                />
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-admin-border bg-admin-surface p-5">
              <div>
                <h2 className="text-base font-semibold text-admin-text">
                  Cupos
                </h2>
                <p className="text-sm text-admin-muted">
                  {teams} equipos inscritos{maxTeams ? ` de ${maxTeams}` : ""}.
                  La inscripción es{" "}
                  {tournament.payment ? "de pago" : "gratuita"}.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <InputNumber
                  label="Mínimo de jugadores"
                  name="minPlayers"
                  required
                  disabled={!isEditing}
                  min={1}
                  max={20}
                />
                <InputNumber
                  label="Máximo de jugadores"
                  name="maxPlayers"
                  required
                  disabled={!isEditing}
                  min={1}
                  max={20}
                />
                <InputNumber
                  label="Máximo de equipos"
                  name="maxTeams"
                  required
                  disabled={!isEditing}
                  min={1}
                  max={128}
                />
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-admin-border bg-admin-surface p-5">
                <ArrayInput
                  label="Reglas"
                  name="rules"
                  values={values.rules}
                  variant="dark"
                  icon={null}
                  disabled={!isEditing}
                  addLabel="Añadir regla"
                  minPlayers={0}
                  maxPlayers={12}
                />
              </div>
              <div className="rounded-xl border border-admin-border bg-admin-surface p-5">
                <ArrayInput
                  label="Premios"
                  name="award"
                  values={values.award}
                  variant="dark"
                  icon={null}
                  disabled={!isEditing}
                  addLabel="Añadir premio"
                  minPlayers={0}
                  maxPlayers={12}
                />
              </div>
            </section>

            {isEditing && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-admin-accent text-white hover:bg-admin-accent-hover"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Guardar cambios
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>

      <TournamentStaff tournamentId={tournament._id} />

      {staff?.isOwner && (
      <section className="flex flex-col gap-3 rounded-xl border border-red-900/60 bg-admin-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-red-300">
            Eliminar torneo
          </h2>
          <p className="text-sm text-admin-muted">
            Borra el torneo y los equipos inscritos. No se puede deshacer.
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="border-red-900/70 text-red-300 hover:bg-red-950/40"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border-admin-border bg-admin-surface">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-admin-text">
                ¿Eliminar {tournament.name}?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-admin-muted">
                Se pierden los equipos, las batallas y la configuración. Esta
                acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-700 text-white hover:bg-red-600"
              >
                Eliminar torneo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      )}
    </div>
  );
}

export default TorneoAdminPage;
