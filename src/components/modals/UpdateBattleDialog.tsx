
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
import { Loader2, Save, Swords } from "lucide-react"
import InputDatePicker from "../input/inputDatePicker"
import { Form, Formik } from "formik"
import { TBattle } from "@/app/api/battle/battle.types"
import { useParams } from "react-router-dom"
import { useUpdateBattle } from "@/hooks/battle"
import { useTeamsByTournament } from "@/hooks/team"

type Props = {
  battle: TBattle
  isOpen: boolean
  onClose: () => void
}

function UpdateBattleDialog({ battle, isOpen, onClose }: Props) {

  const { id } = useParams()
  const { mutateAsync: updateBattle } = useUpdateBattle()
  const { data: teams = [] } = useTeamsByTournament(id)
  const nameTeams = teams
    .filter((team) => team.status !== "inactive")
    .map((team) => ({ value: team._id, label: team.name, image: team.image }))

  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent className="max-w-2xl border-admin-border bg-admin-surface p-0">
        <AlertDialogHeader className="border-b border-admin-border px-6 py-4">
          <AlertDialogTitle className="flex items-center gap-2 text-xl text-admin-text">
            <Swords className="h-5 w-5 text-admin-muted" /> Editar versus
          </AlertDialogTitle>
          <AlertDialogDescription className="text-admin-muted">
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
            updateBattle({
              id: battle._id,
              ...values
            })
              .then(() => {
                onClose()
              })
              .catch(() => undefined)
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div className="rounded-lg border border-admin-border bg-admin-input p-5">
                  <h3 className="mb-4 text-sm font-medium text-admin-text">Equipos</h3>

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
                <div className="rounded-lg border border-admin-border bg-admin-input p-5">
                  <h3 className="mb-4 text-sm font-medium text-admin-text">Cuándo se juega</h3>

                  <div className="space-y-4">
                    <InputDatePicker
                      name="date"
                      label="Fecha y hora del encuentro"
                    // icon={<Calendar className="h-4 w-4 text-purple-400" />}
                    />

                    <div className="grid items-end gap-4 sm:grid-cols-2">
                      <InputNumber
                        label="Ronda"
                        name="round"
                        min={0}
                        max={10}
                        disabled={isSubmitting}
                        icon={null}
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

              <div className="flex justify-end gap-3 border-t border-admin-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onClose()}
                  className="border-admin-border bg-transparent text-admin-text hover:bg-admin-input"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-admin-accent text-white hover:bg-admin-accent-hover"
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