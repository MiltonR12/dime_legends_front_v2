import { useState } from "react"
import { Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import { useCreateBattle } from "@/hooks/battle"
import { useTeamsByTournament } from "@/hooks/team"
import { validatCreateeBattle } from "@/lib/validateBattle"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import InputSelect from "../input/InputSelect"
import InputNumber from "../input/InputNumber"
import InputGroupRadioButton from "../input/InputGroupRadioButton"
import { Swords, Loader2, Save } from "lucide-react"
import InputDatePicker from "../input/inputDatePicker"

type Props = {
  round?: number
  group?: string
  /** Oculta ronda y grupo (en el lienzo libre no hacen falta). */
  compact?: boolean
  /** Posición del nuevo versus en el lienzo. */
  getPosition?: () => { x: number; y: number }
}

function CreateBattleModal({ round = 0, group = "A", compact = false, getPosition }: Props) {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: createBattle } = useCreateBattle()
  const { data: teams = [] } = useTeamsByTournament(id)

  const nameTeams = teams
    .filter((team) => team.status !== "inactive")
    .map((team) => ({ value: team._id, label: team.name, image: team.image }))

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover"
        >
          <Swords className="h-4 w-4 mr-2" /> Crear Versus
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-2xl border-admin-border bg-admin-surface p-0">
        <AlertDialogHeader className="border-b border-admin-border px-6 py-4">
          <AlertDialogTitle className="flex items-center gap-2 text-xl text-admin-text">
            <Swords className="h-5 w-5 text-admin-muted" /> Crear versus
          </AlertDialogTitle>
          <AlertDialogDescription className="text-admin-muted">
            Configura un enfrentamiento entre dos equipos para el torneo
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Formik
          initialValues={{
            date: new Date(),
            teamOne: "",
            teamTwo: "",
            round,
            group,
          }}
          validationSchema={validatCreateeBattle}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (!id) {
              setSubmitting(false)
              return
            }
            const { round: valueRound, group: valueGroup, ...rest } = values
            createBattle({
              tournament: id,
              ...rest,
              ...(compact ? {} : { round: valueRound, group: valueGroup }),
              ...(getPosition ? { position: getPosition() } : {}),
              date: values.date.toISOString(),
            })
              .then(() => {
                setIsOpen(false)
                resetForm()
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

                    {!compact && <div className="grid items-end gap-4 sm:grid-cols-2">
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
                    </div>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-admin-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
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

export default CreateBattleModal
