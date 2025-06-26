import { Form, Formik } from "formik"
import CustomInput from "./CustomInput"
import ArrayInput from "./ArrayInput"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { useAppDispatch } from "@/app/store"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { validationTournament } from "@/lib/validationTorneo"
import InputDatePicker from "../input/inputDatePicker"
import InputComboBox from "../input/InputComboBox"
import { listGames } from "@/payments/games"
import InputTextArea from "../input/InputTextArea"
import InputNumber from "../input/InputNumber"
import { createTournamentThunk } from "@/app/redux/tournament/tournamentSlice"
import EditorQuill from "../EditorQuill"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import {
  Trophy,
  Settings,
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Gamepad2,
  Users,
  DollarSign,
} from "lucide-react"
import UploadPhoto from "../input/UploadPhoto"

type StatusForm = "basic" | "modality" | "config"

const steps = [
  {
    id: "basic",
    title: "Información Básica",
    description: "Detalles principales del torneo",
    icon: FileText,
  },
  {
    id: "modality",
    title: "Modalidad",
    description: "Juego, reglas y premios",
    icon: Gamepad2,
  },
  {
    id: "config",
    title: "Configuración",
    description: "Participantes y pagos",
    icon: Settings,
  },
]

function CreateTorneoForm() {
  const [nextForm, setNextForm] = useState<StatusForm>("basic")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentStepIndex = steps.findIndex((step) => step.id === nextForm)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const getCurrentStepIcon = () => {
    const step = steps.find((s) => s.id === nextForm)
    return step?.icon || Trophy
  }

  const CurrentIcon = getCurrentStepIcon()

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Crear Torneo
          </h1>
          <p className="text-purple-300 mt-2">Organiza tu próximo evento gaming</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = step.id === nextForm
            const isCompleted = index < currentStepIndex

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isActive
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-purple-700 text-purple-400 bg-purple-950/50"
                    }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-colors duration-200 ${isCompleted ? "bg-green-600" : "bg-purple-800"
                      }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">{steps.find((s) => s.id === nextForm)?.title}</h2>
          <p className="text-purple-300 text-sm">{steps.find((s) => s.id === nextForm)?.description}</p>
        </div>

        <Progress value={progress} className="h-2 bg-purple-900/30" />
      </div>

      {/* Form */}
      <Card className="bg-gradient-to-br from-purple-950 to-black border-purple-800 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <CurrentIcon className="h-6 w-6 text-purple-400" />
          </div>
          <CardTitle className="text-white">
            Paso {currentStepIndex + 1} de {steps.length}
          </CardTitle>
          <CardDescription className="text-purple-300">
            {steps.find((s) => s.id === nextForm)?.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              name: "",
              formUrl: "",
              image: null as null | File,
              dateStart: new Date(),
              description: "",
              game: "",
              rules: [""],
              award: [""],
              note: "",
              minPlayers: 1,
              maxPlayers: 50,
              maxTeams: 50,
              isFree: false,
              qrImage: null as null | File,
              amount: 0,
              account: "",
            }}
            onSubmit={({ image, ...rest }, { setSubmitting }) => {
              const {
                name,
                description,
                game,
                dateStart,
                formUrl,
                account,
                award,
                maxPlayers,
                maxTeams,
                minPlayers,
                amount,
                qrImage,
                rules,
              } = rest
              if (!image) return
              dispatch(
                createTournamentThunk({
                  name,
                  description,
                  image,
                  game,
                  dateStart: dateStart.toISOString(),
                  formUrl,
                  award,
                  rules,
                  config: {
                    minPlayers,
                    maxPlayers,
                    maxTeams,
                    tipo: "simple",
                    registrationEnd: new Date(),
                  },
                  payment: qrImage
                    ? {
                      qrImage,
                      amount,
                      account,
                    }
                    : null,
                }),
              )
                .unwrap()
                .then(() => navigate("/admin"))
                .finally(() => setSubmitting(false))
            }}
            validationSchema={validationTournament}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6">
                {nextForm === "basic" && (
                  <div className="space-y-6 flex flex-col">

                    <UploadPhoto name="image" />

                    <CustomInput
                      label="Nombre del torneo"
                      name="name"
                      placeholder="Ejemplo: Torneo de LOL"
                      required={true}
                      variant="outline"
                    />

                    <div className="space-y-2">
                      <label className="font-semibold text-white flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-400" />
                        Descripción
                      </label>
                      <div className="bg-purple-900/20 rounded-lg border border-purple-800/30 p-4">
                        <EditorQuill
                          value={values.description}
                          onChange={(value) => setFieldValue("description", value)}
                          className="bg-purple-950/50 rounded-lg border-purple-500"
                          tools={{ image: false, video: false, listOrder: false, listUnorder: false }}
                        />
                      </div>
                    </div>

                    <InputDatePicker
                      label="Fecha de inicio"
                      name="dateStart"
                    />

                    <CustomInput
                      label="Enlace de inscripción (opcional)"
                      name="formUrl"
                      placeholder="https://forms.gle/..."
                      variant="outline"
                    />
                  </div>
                )}

                {nextForm === "modality" && (
                  <div className="space-y-6">
                    <InputComboBox
                      list={listGames.map((game) => ({ label: game, value: game }))}
                      label="Juego"
                      name="game"
                    />

                    <ArrayInput
                      label="Reglas"
                      name="rules"
                      values={values.rules} 
                      variant="outline"
                    />

                    <ArrayInput
                      label="Premios"
                      name="award"
                      values={values.award}
                      variant="outline"
                    />

                    <InputTextArea
                      label="Nota"
                      name="note"
                      variant="outline"
                    />
                  </div>
                )}

                {nextForm === "config" && (
                  <div className="space-y-6">
                    <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-800/30">
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="h-5 w-5 text-purple-400" />
                        <h3 className="text-white font-semibold">Configuración de participantes</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputNumber label="Mínimo de jugadores" name="minPlayers" required />
                        <InputNumber label="Máximo de jugadores" name="maxPlayers" required />
                      </div>
                      <div className="mt-4">
                        <InputNumber label="Máximo de equipos" name="maxTeams" required />
                      </div>
                    </div>

                    <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-800/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-purple-400" />
                          <div>
                            <h3 className="text-white font-semibold">¿El torneo es gratuito?</h3>
                            <p className="text-purple-300 text-sm">Configura si requiere pago de inscripción</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={values.isFree}
                            onCheckedChange={() => setFieldValue("isFree", !values.isFree)}
                          />
                          <Badge
                            variant={values.isFree ? "default" : "outline"}
                            className={
                              values.isFree
                                ? "bg-red-600/20 text-red-400 border-red-600/50"
                                : "bg-green-600/20 text-green-400 border-green-600/50"
                            }
                          >
                            {values.isFree ? "Con costo" : "Gratuito"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {values.isFree && (
                      <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-800/30 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <DollarSign className="h-5 w-5 text-purple-400" />
                          <h3 className="text-white font-semibold">Métodos de pago</h3>
                        </div>

                        <UploadPhoto name="qrImage" />

                        <InputNumber label="Costo de inscripción" name="amount" required />

                        <CustomInput
                          label="Nro de cuenta (opcional)"
                          name="account"
                          variant="outline"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-purple-800/30">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (nextForm === "modality") setNextForm("basic")
                      if (nextForm === "config") setNextForm("modality")
                    }}
                    disabled={nextForm === "basic"}
                    className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30 hover:text-white disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>

                  {nextForm !== "config" ? (
                    <Button
                      type="button"
                      onClick={() => {
                        if (nextForm === "basic") setNextForm("modality")
                        if (nextForm === "modality") setNextForm("config")
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Siguiente
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          Crear Torneo
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateTorneoForm
