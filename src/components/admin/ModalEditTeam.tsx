import { Team } from "@/app/redux/team/team"
import { updateTeamThunk } from "@/app/redux/team/teamSlice"
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

type Props = {
  data: Team
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

function ModalEditTeam({ data, isOpen, setIsOpen }: Props) {

  const dispatch = useAppDispatch()

  return (
    <AlertDialog open={isOpen} >
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
              name: data.name,
              captain: data.captain,
              image: data.image,
              players: data.players
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { image, ...rest } = values
              if (!image) return
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
              <Form>

                <InputUploadImage name="image" />

                <CustomInput
                  label="Nombre del equipo"
                  name="name"
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

export default ModalEditTeam