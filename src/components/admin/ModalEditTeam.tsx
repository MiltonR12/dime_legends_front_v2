import { Form, Formik } from "formik"
import * as Yup from "yup"
import type { Team } from "@/app/redux/team/team"
import { updateTeamThunk } from "@/app/redux/team/teamSlice"
import { useAppDispatch } from "@/app/store"
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
import { Users, User, ImageIcon, Save, X, Loader2 } from "lucide-react"

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
  const dispatch = useAppDispatch()

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-slate-900 border border-slate-700 p-0 max-w-2xl">
        <AlertDialogHeader className="bg-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" /> Editar Equipo
            </AlertDialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialogDescription className="text-slate-300">
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
            dispatch(updateTeamThunk({ ...rest, image, id: data._id }))
              .then(() => {
                setIsOpen(false)
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="overflow-y-scroll scroll-invisible px-8 pb-4">

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="h-4 w-4 text-purple-400" />
                    <label className="text-white font-medium">Logo del equipo</label>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                    <InputUploadImage name="image" />
                  </div>
                </div>

                <CustomInput
                  label="Nombre del equipo"
                  icon={<User className="h-4 w-4 text-purple-400" />}
                  name="name"
                  disabled={isSubmitting}
                  variant="dark"
                  placeholder="Ej: Los Invencibles"
                />

                <CustomInput
                  label="Nombre del capitán"
                  name="captain"
                  icon={<User className="h-4 w-4 text-purple-400" />}
                  disabled={isSubmitting}
                  variant="dark"
                  placeholder="Nombre completo del capitán"
                />
              </div>
              <ArrayInput
                label="Jugadores"
                icon={<Users className="h-4 w-4 text-purple-400" />}
                name="players"
                values={values.players}
                variant="dark"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-700 hover:bg-purple-600 text-white"
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
