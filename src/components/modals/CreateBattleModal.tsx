import { Formik } from "formik"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../ui/dialog"
import { validatCreateeBattle } from "@/lib/validateBattle";
import { RootState, useAppDispatch } from "@/app/store";
import { createBattleThunk, getBattlesThunk } from "@/app/redux/battle/battleSlice";
import { useParams } from "react-router-dom";
import InputDatePicker from "../input/inputDatePicker";
import InputSelect from "../input/InputSelect";
import { useSelector } from "react-redux";
import InputNumber from "../input/InputNumber";
import InputGroupRadioButton from "../input/InputGroupRadioButton";

function CreateBattleModal() {

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { teams } = useSelector((state: RootState) => state.team)
  const nameTeams = teams
    .filter((team) => team.status !== "inactive")
    .map((team) => ({ value: team._id, label: team.name }))

  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button variant="secondary" size="lg" >
          Crear Versus
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950" >
        <DialogHeader>
          <DialogTitle>
            Crear Nuevo Versus
          </DialogTitle>
          <DialogDescription>
            Crea un encuentro entre dos equipos
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            date: new Date(),
            teamOne: "",
            teamTwo: "",
            round: 1,
            group: "A"
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

              <Button
                type="submit"
                variant="form"
                disabled={isSubmitting}
              >
                Crear página
              </Button>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBattleModal