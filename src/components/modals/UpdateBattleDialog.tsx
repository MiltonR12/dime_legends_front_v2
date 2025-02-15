import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "../alert-dialog"
import { Button } from "../ui/button"
import { Formik } from 'formik'
import { RootState, useAppDispatch } from "@/app/store"
import InputDatePicker from "../input/inputDatePicker"
import { TBattle } from "@/app/redux/battle/battle"
import { useSelector } from "react-redux"
import InputSelect from "../input/InputSelect"
import InputNumber from "../input/InputNumber"
import InputGroupRadioButton from "../input/InputGroupRadioButton"
import { updateBattleThunk } from "@/app/redux/battle/battleSlice"

type Props = {
  battle: TBattle
  isOpen: boolean
  onClose: () => void
}

function UpdateBattleDialog({ battle, isOpen, onClose }: Props) {

  const dispatch = useAppDispatch()
  const { teams } = useSelector((state: RootState) => state.team)
  const nameTeams = teams
    .filter((team) => team.status !== "deshabilitado")
    .map((team) => ({ value: team._id, label: team.name }))

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
            round: battle.round,
            group: battle.group ? battle.group : "A"
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateBattleThunk({
              id: battle._id,
              ...values
            })).unwrap()
              .then(() => {
                onClose()
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} >

              <InputSelect label="Equipo 1" name="teamOne" list={nameTeams} disabled={isSubmitting} />

              <InputSelect label="Equipo 2" name="teamTwo" list={nameTeams} disabled={isSubmitting} />

              <InputDatePicker
                name="date"
                label="Hora del encuentro"
              />

              <InputNumber label="Ronda" name="round" max={10} disabled={isSubmitting} />

              <InputGroupRadioButton
                label="Grupo"
                name="group"
                options={[
                  { value: "A", label: "Winner Bracket" },
                  { value: "B", label: "Loser Bracket" }
                ]}
                disabled={isSubmitting}
              />

              <AlertDialogFooter>
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