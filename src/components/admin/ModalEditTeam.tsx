import { Form, Formik } from "formik"
import * as Yup from "yup"
import type { Team } from "@/app/api/team/team.types"
import { useUpdateTeam } from "@/hooks/team"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ArrayInput from "../form/ArrayInput"
import InputUploadImage from "../input/InputUploadImage"
import CustomInput from "../form/CustomInput"
import { Users, Save, X, Loader2 } from "lucide-react"

const teamSchema = Yup.object({
  name: Yup.string().required("El nombre del equipo es obligatorio"),
  captain: Yup.string().required("El nombre del capitán es obligatorio"),
  players: Yup.array()
    .of(Yup.string().required("El nombre del jugador es obligatorio"))
    .min(1, "Debe haber al menos un jugador"),
})

type Props = {
  data: Team
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

function ModalEditTeam({ data, isOpen, setIsOpen }: Props) {
  const { mutateAsync: updateTeam } = useUpdateTeam()

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-2xl border-admin-border bg-admin-surface p-0">
        <AlertDialogHeader className="border-b border-admin-border px-6 py-4">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="flex items-center gap-2 text-xl text-admin-text">
              <Users className="h-5 w-5 text-admin-muted" /> Editar equipo
            </AlertDialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full text-admin-muted hover:bg-admin-input hover:text-admin-text"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialogDescription className="text-admin-muted">
            Actualiza la información del equipo "{data.name}" a continuación.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Formik
          initialValues={{
            name: data.name,
            captain: data.captain,
            image: data.image,
            players: data.players,
          }}
          validationSchema={teamSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { image, ...rest } = values
            updateTeam({ ...rest, image, id: data._id })
              .then(() => {
                setIsOpen(false)
              })
              .catch(() => undefined)
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-4 overflow-y-auto px-6 py-6">

              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-1">
                  <p className="mb-2 text-sm font-medium text-admin-text">Logo</p>
                  <InputUploadImage name="image" compact />
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                  <CustomInput
                    label="Nombre del equipo"
                    icon={null}
                    name="name"
                    disabled={isSubmitting}
                    variant="dark"
                    placeholder="Ej: Los Invencibles"
                  />
                  <CustomInput
                    label="Nombre del capitán"
                    name="captain"
                    icon={null}
                    disabled={isSubmitting}
                    variant="dark"
                    placeholder="Nombre completo del capitán"
                  />
                </div>
              </div>
              <ArrayInput
                label="Jugadores"
                icon={null}
                name="players"
                values={values.players}
                variant="dark"
              />

              <div className="flex justify-end gap-3 border-t border-admin-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-admin-accent text-white hover:bg-admin-accent-hover"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Guardar Cambios
                    </span>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalEditTeam
