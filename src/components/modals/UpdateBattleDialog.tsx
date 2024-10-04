import { MdEditCalendar } from "react-icons/md"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../alert-dialog"
import { Button } from "../ui/button"
import { Formik } from 'formik'
import { Calendar } from "../ui/calendar"
import CustomInput from "../form/CustomInput"
import SelectTeam from "../select/SelectTeam"
import { GiCrossedSwords } from "react-icons/gi"
import { useState } from "react"
import { useAppDispatch } from "@/app/store"
import { updateBattleThunk } from "@/app/redux/battle/battleSlice"

type Props = {
  currentOne: string
  currentTwo: string
  currentHour: string
  currentDate: Date
  id: string
}

function UpdateBattleDialog({ currentDate, currentHour, currentOne, currentTwo, id }: Props) {

  const [date, setDate] = useState<Date | undefined>(currentDate)
  const [teamOne, setTeamOne] = useState(currentOne)
  const [teamTwo, setTeamTwo] = useState(currentTwo)
  const dispatch = useAppDispatch()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-white text-lg" >
          <MdEditCalendar />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-950" >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Editar Horario
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Formik
          initialValues={{
            hour: currentHour ? currentHour : "",
            date: currentDate ? currentDate : new Date(),
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateBattleThunk({
              hour: values.hour,
              date: values.date,
              teamOne,
              teamTwo,
              id
            })).unwrap().finally(() => {
              setSubmitting(false)
            })
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <form onSubmit={handleSubmit} >

              <div className="flex items-center justify-center gap-5" >
                <SelectTeam setValue={setTeamOne} value={teamOne} defaultValue={currentOne} />

                <div>
                  <GiCrossedSwords className="text-3xl" />
                </div>

                <SelectTeam setValue={setTeamTwo} value={teamTwo} defaultValue={currentTwo} />
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

              <AlertDialogFooter className="pt-10" >
                <AlertDialogCancel className="text-black" >Cancel</AlertDialogCancel>
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