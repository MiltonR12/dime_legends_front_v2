import { MdEditCalendar } from "react-icons/md"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../alert-dialog"
import { Button } from "../ui/button"
import { Formik } from 'formik'
import SelectTeam from "../select/SelectTeam"
import { GiCrossedSwords } from "react-icons/gi"
import { useState } from "react"
import { useAppDispatch } from "@/app/store"
import { updateBattleThunk } from "@/app/redux/battle/battleSlice"
import InputDatePicker from "../input/inputDatePicker"

type Props = {
  currentOne: string
  currentTwo: string
  currentHour: string
  currentDate: Date
  id: string
}

function UpdateBattleDialog({ currentDate, currentOne, currentTwo, id }: Props) {

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
            date: currentDate ? currentDate : new Date(),
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateBattleThunk({
              date: values.date,
              teamOne,
              teamTwo,
              id
            })).unwrap().finally(() => {
              setSubmitting(false)
            })
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} >

              <div className="flex items-center justify-center gap-5" >
                <SelectTeam setValue={setTeamOne} value={teamOne} defaultValue={currentOne} />

                <div>
                  <GiCrossedSwords className="text-3xl" />
                </div>

                <SelectTeam setValue={setTeamTwo} value={teamTwo} defaultValue={currentTwo} />
              </div>

              <InputDatePicker
                name="date"
                label="Hora del encuentro"
              />

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