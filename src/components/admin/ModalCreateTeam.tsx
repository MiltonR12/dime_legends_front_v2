import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { createTeamThunk } from "@/app/redux/team/teamSlice"
import { useAppDispatch } from "@/app/store"
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
import { Users, User, ImageIcon, Save, X, Loader2, Phone, PlusCircle } from "lucide-react"

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

  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] rounded-xl text-white"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Crear Equipo
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-slate-900 border border-slate-700 p-0 max-w-2xl">
        <AlertDialogHeader className="bg-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" /> Crear Nuevo Equipo
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
            dispatch(createTeamThunk({ id, voucher: null, ...values }))
              .then(() => { setIsOpen(false) })
              .finally(() => { setSubmitting(false) })
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="h-4 w-4 text-purple-400" />
                    <label className="text-white font-medium">Logo del equipo</label>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                    <InputUploadImage name="image" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                    icon={<User className="h-4 w-4 text-purple-400" />}
                    name="captain"
                    disabled={isSubmitting}
                    variant="dark"
                    placeholder="Nombre completo del capitán"
                  />
                </div>

                <CustomInput
                  label="Teléfono de contacto"
                  icon={<Phone className="h-4 w-4 text-purple-400" />}
                  name="phone"
                  disabled={isSubmitting}
                  variant="dark"
                  placeholder="Ej: +591 12345678"
                />

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
                    className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:opacity-90 text-white"
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
