import { Formik } from "formik"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import SelectTeam from "../select/SelectTeam"
import { GiCrossedSwords } from "react-icons/gi";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import CustomInput from "../form/CustomInput";
import { validatCreateeBattle } from "@/lib/validateBattle";
import { useAppDispatch } from "@/app/store";
import { createBattleThunk } from "@/app/redux/battle/battleSlice";
import { useParams } from "react-router-dom";

function CreateBattleModal() {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [teamOne, setTeamOne] = useState("")
  const [teamTwo, setTeamTwo] = useState("")
  const dispatch = useAppDispatch()
  const { id } = useParams()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-center text-white font-semibold bg-primary" size="lg" >
          Crear Versus
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-fondo border-primary md:rounded-xl border-2" >
        <DialogHeader>
          <DialogTitle className="text-center mb-5 text-3xl" >
            Crear Encuentro
          </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            hour: "",
            date: new Date(),
          }}
          onSubmit={(values) => {
            if (id) {
              dispatch(createBattleThunk({
                hour: values.hour,
                date: values.date,
                teamOne,
                teamTwo,
                tournament: id
              }))
            }
          }}
          validationSchema={validatCreateeBattle}
        >
          {({ handleSubmit, setFieldValue }) => (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} >

              <div className="flex items-center justify-center gap-5" >
                <SelectTeam setValue={setTeamOne} value={teamOne} />

                <div>
                  <GiCrossedSwords className="text-3xl" />
                </div>

                <SelectTeam setValue={setTeamTwo} value={teamTwo} />
              </div>

              <CustomInput
                name="hour"
                label="Hora del encuentro"
                placeholder="10:00"
                type="time"
              />

              <div className="flex flex-col items-center justify-center" >

                <h3 className="text-2xl mb-5" >
                  Fecha del encuentro
                </h3>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(e) => {
                    setDate(e)
                    setFieldValue("date", e)
                  }}
                  className="rounded-md border"
                  classNames={{
                    day_selected: "bg-primary",
                  }}
                  title="Fecha del encuentro"
                  footer="Selecciona la fecha del encuentro"
                />
              </div>

              <Button
                type="submit"
                variant="form"
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