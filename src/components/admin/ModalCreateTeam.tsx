import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useCreateTeam } from "@/hooks/team"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ArrayInput from "../form/ArrayInput"
import InputUploadImage from "../input/InputUploadImage"
import CustomInput from "../form/CustomInput"
import { Users, Save, X, Loader2, PlusCircle } from "lucide-react"

// Validation schema
const teamSchema = Yup.object({
  name: Yup.string().required("El nombre del equipo es obligatorio"),
  captain: Yup.string().required("El nombre del capitán es obligatorio"),
  phone: Yup.string().required("El teléfono de contacto es obligatorio"),
  players: Yup.array()
    .of(Yup.string().required("El nombre del jugador es obligatorio"))
    .min(1, "Debe haber al menos un jugador"),
})

type Props = {
  id: string
}

function ModalCreateTeam({ id }: Props) {

  const { mutateAsync: createTeam } = useCreateTeam()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Crear Equipo
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-2xl border-admin-border bg-admin-surface p-0">
        <AlertDialogHeader className="border-b border-admin-border px-6 py-4">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="flex items-center gap-2 text-xl text-admin-text">
              <Users className="h-5 w-5 text-admin-muted" /> Crear equipo
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
            Completa la información para registrar un nuevo equipo en el torneo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Formik
          initialValues={{
            name: "",
            captain: "",
            phone: "",
            image: null as null | File,
            players: [""],
          }}
          validationSchema={teamSchema}
          onSubmit={(values, { setSubmitting }) => {
            createTeam({ id, voucher: null, ...values })
              .then(() => { setIsOpen(false) })
              .catch(() => undefined)
              .finally(() => { setSubmitting(false) })
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="overflow-y-auto px-6 py-6">
              <div className="space-y-4">
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
                      icon={null}
                      name="captain"
                      disabled={isSubmitting}
                      variant="dark"
                      placeholder="Nombre completo del capitán"
                    />
                  </div>
                </div>

                <CustomInput
                  label="Teléfono de contacto"
                  icon={null}
                  name="phone"
                  disabled={isSubmitting}
                  variant="dark"
                  placeholder="Ej: +591 12345678"
                />

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
                        <Loader2 className="h-4 w-4 animate-spin" /> Creando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="h-4 w-4" /> Crear Equipo
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalCreateTeam
