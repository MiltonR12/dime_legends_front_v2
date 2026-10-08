import { Form, Formik } from "formik"
import * as Yup from "yup"
import type { OwnedTeam } from "@/app/api/team/team.types"
import { useCreateOwnedTeam, useUpdateTeam } from "@/hooks/team"
import { Button } from "@/components/ui/button"
import CustomInput from "./CustomInput"
import ArrayInput from "./ArrayInput"
import InputUploadImage from "../input/InputUploadImage"
import { Loader2, Save } from "lucide-react"

const schema = Yup.object({
  name: Yup.string().required("El nombre del equipo es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  players: Yup.array()
    .of(Yup.string().required("El nombre del jugador es obligatorio"))
    .min(1, "Se requiere al menos un jugador"),
})

type Props = {
  team?: OwnedTeam | null
  onDone?: () => void
}

function TeamRosterForm({ team, onDone }: Props) {
  const { mutateAsync: createTeam } = useCreateOwnedTeam()
  const { mutateAsync: updateTeam } = useUpdateTeam()

  return (
    <Formik<{
      name: string
      phone: string
      image: File | string | null
      players: string[]
    }>
      enableReinitialize
      initialValues={{
        name: team?.name ?? "",
        phone: team?.phone ?? "",
        image: team?.image ?? null,
        players: team?.players?.length ? team.players : [""],
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        const request = team
          ? updateTeam({ ...values, id: team._id })
          : createTeam({
              name: values.name,
              phone: values.phone,
              players: values.players,
              image: values.image instanceof File ? values.image : null,
            })

        request
          .then(() => onDone?.())
          .catch(() => undefined)
          .finally(() => setSubmitting(false))
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-4 px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 pt-1">
              <p className="mb-2 text-sm font-medium text-admin-text">Logo</p>
              <InputUploadImage name="image" compact />
            </div>
            <div className="min-w-0 flex-1 space-y-4">
              <CustomInput
                label="Nombre del equipo"
                name="name"
                disabled={isSubmitting}
                variant="dark"
                placeholder="Ej: Los Invencibles"
                icon={null}
              />
              <CustomInput
                label="Teléfono de contacto"
                name="phone"
                disabled={isSubmitting}
                variant="dark"
                placeholder="Ej: +591 12345678"
                icon={null}
              />
            </div>
          </div>
          <ArrayInput
            name="players"
            values={values.players}
            variant="dark"
            label="Jugadores"
            icon={null}
          />
          <div className="flex justify-end border-t border-admin-border pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" /> {team ? "Guardar cambios" : "Crear equipo"}
                </span>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default TeamRosterForm
