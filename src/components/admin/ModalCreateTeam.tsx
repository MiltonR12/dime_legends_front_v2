import { createTeamThunk } from "@/app/redux/team/teamSlice"
import { useAppDispatch } from "@/app/store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Form, Formik } from "formik"
import ArrayInput from "../form/ArrayInput"
import InputUploadImage from "../input/InputUploadImage"
import CustomInput from "../form/CustomInput"
import { useState } from "react"
import { AlertDialogTrigger } from "../alert-dialog"
import * as Yup from "yup"
import { Button } from "../ui/button"

const validate = Yup.object({
  name: Yup.string().required("Nombre del equipo es requerido"),
  captain: Yup.string().required("Capitan del equipo es requerido"),
  players: Yup.array().of(Yup.string().required("Integrante es requerido")),
  image: Yup.mixed().required("Imagen del equipo es requerida")
})

type Props = {
  id: string
}

function ModalCreateTeam({ id }: Props) {

  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen} >
      <AlertDialogTrigger asChild >
        <Button 
        className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] rounded-xl text-white"
        onClick={() => setIsOpen(true)} >
          Crear Equipo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-950 sm:rounded-3xl border-2" >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Editar Equipo
          </AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, edita la información del equipo a continuación.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Formik
            initialValues={{
              name: "",
              captain: "",
              phone: "",
              image: null as null | File,
              players: [""]
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { image, ...rest } = values
              if (!image) return
              dispatch(createTeamThunk({ image, id, voucher: null, ...rest, }))
                .then(() => {
                  setIsOpen(false)
                })
                .finally(() => {
                  setSubmitting(false)
                })
            }}
            validationSchema={validate}
          >
            {({ isSubmitting, values }) => (
              <Form>

                <InputUploadImage name="image" />

                <CustomInput
                  label="Nombre del equipo"
                  name="name"
                  disabled={isSubmitting}
                />

                <CustomInput
                  label="Telefono"
                  name="phone"
                  disabled={isSubmitting}
                />

                <CustomInput
                  label="Capitan"
                  name="captain"
                  disabled={isSubmitting}
                />

                <ArrayInput
                  label="Integrantes"
                  name="players"
                  values={values.players}
                />

                <AlertDialogFooter className="grid grid-cols-2 gap-8 px-8 py-2" >
                  <AlertDialogCancel
                    disabled={isSubmitting}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Guardar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </Form>
            )}
          </Formik>
        </div>

      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalCreateTeam