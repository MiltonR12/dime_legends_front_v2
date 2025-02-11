import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "../alert-dialog"
import { Button } from "../ui/button"
import { Formik } from 'formik'
import SelectTeam from "../select/SelectTeam"
import { GiCrossedSwords } from "react-icons/gi"
import { useAppDispatch } from "@/app/store"
import { updateBattleThunk } from "@/app/redux/battle/battleSlice"
import InputDatePicker from "../input/inputDatePicker"
import { TBattle } from "@/app/redux/battle/battle"

type Props = {
  battle: TBattle
  isOpen: boolean
  onClose: () => void
}

function UpdateBattleDialog({ battle, isOpen, onClose }: Props) {

  const dispatch = useAppDispatch()

  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent className="bg-zinc-950" >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Editar Horario
          </AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, edita la información del horario a continuación.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Formik
          initialValues={{
            date: new Date(battle.date),
            teamOne: battle.teamOne?._id || "",
            teamTwo: battle.teamTwo?._id || "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateBattleThunk({
              id: battle._id,
              date: new Date(values.date),
              teamOne: values.teamOne,
              teamTwo: values.teamTwo
            })).unwrap()
              .then(() => {
                onClose()
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} >

              <div className="flex items-center justify-center gap-5" >
                <SelectTeam
                  setValue={(value) => setFieldValue("teamOne", value)}
                  value={values.teamOne}
                  defaultValue={battle.teamOne?._id || ""}
                />

                <div>
                  <GiCrossedSwords className="text-3xl" />
                </div>

                <SelectTeam
                  setValue={(value) => setFieldValue("teamTwo", value)}
                  value={values.teamTwo}
                  defaultValue={battle.teamTwo?._id || ""}
                />
              </div>

              <InputDatePicker
                name="date"
                label="Hora del encuentro"
              />

              <AlertDialogFooter className="pt-10" >
                <AlertDialogCancel className="text-black" onClick={onClose} >
                  Cancel
                </AlertDialogCancel>
                <Button type="submit" >
                  {isSubmitting ? "Enviando..." : "Guardar"}
                </Button>
              </AlertDialogFooter>
            </form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateBattleDialog