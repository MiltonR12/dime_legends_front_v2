
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import InputSelect from "../input/InputSelect"
import InputNumber from "../input/InputNumber"
import InputGroupRadioButton from "../input/InputGroupRadioButton"
import { Calendar, Hash, Users, Loader2, Save, Swords } from "lucide-react"
import InputDatePicker from "../input/inputDatePicker"
import { Form, Formik } from "formik"
import { TBattle } from "@/app/redux/battle/battle"
import { RootState, useAppDispatch } from "@/app/store"
import { useSelector } from "react-redux"
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
      <AlertDialogContent className="bg-slate-900 border border-slate-700 p-0 max-w-2xl">
        <AlertDialogHeader className="bg-slate-800 px-6 py-4">
          <AlertDialogTitle className="text-xl text-white flex items-center gap-2">
            <Swords className="h-5 w-5 text-purple-400" /> Actualizar Versus
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Modifica los detalles del enfrentamiento entre equipos en el torneo
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
            <Form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">Equipos Participantes</h3>
                  </div>

                  <div className="space-y-4">
                    <InputSelect
                      label="Equipo 1"
                      name="teamOne"
                      list={nameTeams}
                      placeholder="Selecciona el primer equipo"
                    />

                    <InputSelect
                      label="Equipo 2"
                      name="teamTwo"
                      list={nameTeams}
                      placeholder="Selecciona el segundo equipo"
                    />
                  </div>
                </div>

                {/* Date and Round */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">Detalles del Enfrentamiento</h3>
                  </div>

                  <div className="space-y-4">
                    <InputDatePicker
                      name="date"
                      label="Fecha y hora del encuentro"
                    // icon={<Calendar className="h-4 w-4 text-purple-400" />}
                    />

                    <div className="grid grid-cols-[auto_1fr] gap-6">
                      <InputNumber
                        label="Ronda"
                        name="round"
                        max={10}
                        disabled={isSubmitting}
                        icon={<Hash className="h-4 w-4 text-purple-400" />}
                      />

                      <InputGroupRadioButton
                        label="Grupo"
                        name="group"
                        options={[
                          { value: "A", label: "Winner Bracket" },
                          { value: "B", label: "Loser Bracket" },
                        ]}
                        disabled={isSubmitting}
                      // icon={<Users className="h-4 w-4 text-purple-400" />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onClose()}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:opacity-90 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Creando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Crear Versus
                    </span>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateBattleDialog