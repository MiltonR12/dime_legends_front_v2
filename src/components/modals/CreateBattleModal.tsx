import { Formik } from "formik"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import SelectTeam from "../select/SelectTeam"
import { GiCrossedSwords } from "react-icons/gi";
import { useState } from "react";
import { validatCreateeBattle } from "@/lib/validateBattle";
import { useAppDispatch } from "@/app/store";
import { createBattleThunk, getBattlesThunk } from "@/app/redux/battle/battleSlice";
import { useParams } from "react-router-dom";
import InputDatePicker from "../input/inputDatePicker";

function CreateBattleModal() {

  const [teamOne, setTeamOne] = useState("")
  const [teamTwo, setTeamTwo] = useState("")
  const dispatch = useAppDispatch()
  const { id } = useParams()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" >
          Crear Versus
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-fondo md:max-w-xl border-primary md:rounded-xl border-2" >
        <DialogHeader>
          <DialogTitle className="text-center mb-5 text-3xl" >
            Crear Encuentro
          </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            date: new Date(),
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            if (id) {
              dispatch(createBattleThunk({
                date: values.date,
                teamOne,
                teamTwo,
                tournament: id
              })).unwrap().then(() => {
                setTeamOne("")
                setTeamTwo("")
                dispatch(getBattlesThunk(id))
              }).finally(() => {
                setSubmitting(false)
              })
            }
          }}
          validationSchema={validatCreateeBattle}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} >

              <div className="flex items-center justify-center gap-5" >
                <SelectTeam setValue={setTeamOne} value={teamOne} />

                <div>
                  <GiCrossedSwords className="text-3xl" />
                </div>

                <SelectTeam setValue={setTeamTwo} value={teamTwo} />
              </div>

              <InputDatePicker
                name="date"
                label="Hora del encuentro"
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