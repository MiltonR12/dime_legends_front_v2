import { Formik } from "formik"
import { Button } from "../ui/button"
import { validatCreateeBattle } from "@/lib/validateBattle";
import { RootState, useAppDispatch } from "@/app/store";
import { createBattleThunk, getBattlesThunk } from "@/app/redux/battle/battleSlice";
import { useParams } from "react-router-dom";
import InputDatePicker from "../input/inputDatePicker";
import InputSelect from "../input/InputSelect";
import { useSelector } from "react-redux";
import InputNumber from "../input/InputNumber";
import InputGroupRadioButton from "../input/InputGroupRadioButton";

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
} from "@/components/ui/alert-dialog"

type Props = {
  round?: number
  group?: string
}

function CreateBattleModal({ round = 0, group = "A" }: Props) {

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { teams } = useSelector((state: RootState) => state.team)
  const nameTeams = teams
    .filter((team) => team.status !== "inactive")
    .map((team) => ({ value: team._id, label: team.name }))

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="lg" >
          Crear Versus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Crear Nuevo Versus
          </AlertDialogTitle>
          <AlertDialogDescription>
            Crea un encuentro entre dos equipos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Formik
          initialValues={{
            date: new Date(),
            teamOne: "",
            teamTwo: "",
            round,
            group
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (id) {
              dispatch(createBattleThunk({ tournament: id, ...values })).unwrap().then(() => {
                dispatch(getBattlesThunk(id))
              }).finally(() => {
                setSubmitting(false)
              })
            }
          }}
          validationSchema={validatCreateeBattle}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} >

              <InputSelect label="Equipo 1" name="teamOne" list={nameTeams} />
              <InputSelect label="Equipo 2" name="teamTwo" list={nameTeams} />

              <InputDatePicker name="date" label="Hora del encuentro" />

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
                <AlertDialogCancel>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction>
                  Crear Versus
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateBattleModal