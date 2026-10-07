import { Form, Formik, type FormikTouched } from "formik"
import CustomInput from "./CustomInput"
import ArrayInput from "./ArrayInput"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { useCreateTournament } from "@/hooks/tournament"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { stepFields, validationTournament } from "@/lib/validationTorneo"
import InputDatePicker from "../input/inputDatePicker"
import InputComboBox from "../input/InputComboBox"
import { listGames } from "@/payments/games"
import InputNumber from "../input/InputNumber"
import { Badge } from "../ui/badge"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import UploadPhoto from "../input/UploadPhoto"
import BannerGallery, { type BannerSlot } from "../input/BannerGallery"
import InputTextArea from "../input/InputTextArea"

type StepId = keyof typeof stepFields

const steps: { id: StepId; title: string; hint: string }[] = [
  { id: "identidad", title: "Identidad", hint: "Nombre, juego, fecha y banner" },
  { id: "juego", title: "Juego", hint: "Descripción, reglas y premios" },
  { id: "cupos", title: "Cupos", hint: "Participantes y cobro" },
]

type TournamentValues = {
  name: string
  formUrl: string
  bannerSlots: BannerSlot[]
  dateStart: Date
  description: string
  game: string
  rules: string[]
  award: string[]
  minPlayers: number
  maxPlayers: number
  maxTeams: number
  chargeFee: boolean
  qrImage: File | null
  amount: number
  account: string
}

const initialValues: TournamentValues = {
  name: "",
  formUrl: "",
  bannerSlots: [],
  dateStart: new Date(),
  description: "",
  game: "",
  rules: [""],
  award: [""],
  minPlayers: 1,
  maxPlayers: 50,
  maxTeams: 50,
  chargeFee: false,
  qrImage: null,
  amount: 0,
  account: "",
}

function fieldsForStep(step: StepId, chargeFee: boolean) {
  if (step !== "cupos" || !chargeFee) {
    return step === "cupos"
      ? (["minPlayers", "maxPlayers", "maxTeams"] as const)
      : stepFields[step]
  }
  return stepFields.cupos
}

function CreateTorneoForm() {
  const [step, setStep] = useState<StepId>("identidad")
  const { mutateAsync: createTournament } = useCreateTournament()
  const navigate = useNavigate()
  const currentIndex = steps.findIndex((item) => item.id === step)

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <p className="text-xs font-medium tracking-wide text-admin-muted">Nuevo torneo</p>
        <h1 className="text-balance text-[28px] font-semibold tracking-tight text-admin-text">
          Crear torneo
        </h1>
        <p className="text-sm text-admin-muted">{steps[currentIndex].hint}</p>
      </header>

      <ol className="grid grid-cols-3 gap-2">
        {steps.map((item, index) => {
          const done = index < currentIndex
          const active = item.id === step
          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={index > currentIndex}
                onClick={() => {
                  if (index < currentIndex) setStep(item.id)
                }}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors disabled:cursor-default ${
                  active
                    ? "border-admin-accent bg-admin-row text-admin-text"
                    : "border-admin-border bg-admin-surface text-admin-muted hover:text-admin-text disabled:hover:text-admin-muted"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    done
                      ? "bg-admin-border text-admin-text"
                      : active
                        ? "bg-admin-accent text-white"
                        : "bg-admin-input text-admin-muted"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <Formik
        initialValues={initialValues}
        validationSchema={validationTournament}
        onSubmit={({ chargeFee, qrImage, bannerSlots, ...rest }, { setSubmitting }) => {
          const bannerFiles = bannerSlots.flatMap((slot) => (slot.kind === "new" ? [slot.file] : []))
          if (step !== "cupos" || bannerFiles.length === 0) {
            setSubmitting(false)
            return
          }
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
            rules,
          } = rest
          createTournament(
            {
              name,
              description,
              image: bannerFiles[0],
              banners: bannerFiles.slice(1),
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
              payment:
                chargeFee && qrImage
                  ? {
                      qrImage,
                      amount,
                      account,
                    }
                  : null,
            },
          )
            .then(() => navigate("/admin"))
            .catch(() => undefined)
            .finally(() => setSubmitting(false))
        }}
      >
        {({ isSubmitting, values, validateForm, setTouched, setFieldValue, touched, submitForm }) => {
          const goNext = async () => {
            const fields = fieldsForStep(step, values.chargeFee)
            const errors = await validateForm()
            const blocked = fields.filter((field) => errors[field as keyof typeof errors])
            if (blocked.length > 0) {
              const nextTouched = { ...touched } as FormikTouched<TournamentValues>
              for (const field of blocked) {
                nextTouched[field as keyof TournamentValues] = true as never
              }
              setTouched(nextTouched, false)
              return
            }
            setStep(steps[currentIndex + 1].id)
          }

          return (
            <Form className="space-y-6 rounded-xl border border-admin-border bg-admin-surface p-5 sm:p-6">
              {step === "identidad" && (
                <div className="space-y-6">
                  <CustomInput
                    label="Nombre del torneo"
                    name="name"
                    placeholder="Ejemplo: Torneo de LOL"
                    required
                    variant="dark"
                    icon={null}
                  />
                  <InputComboBox
                    list={listGames.map((game) => ({ label: game, value: game }))}
                    label="Juego"
                    name="game"
                    placeholder="Selecciona un juego"
                    required
                  />
                  <InputDatePicker
                    label="Fecha de inicio"
                    name="dateStart"
                    className="h-10 rounded-md border border-admin-border bg-admin-input py-2 text-sm font-normal text-admin-text hover:bg-admin-input"
                  />
                  <BannerGallery />
                </div>
              )}

              {step === "juego" && (
                <div className="space-y-6">
                  <InputTextArea
                    label="Descripción"
                    name="description"
                    placeholder="Cuéntale a los equipos de qué se trata"
                    required
                    labelClassName="text-sm font-medium text-admin-text"
                    className="min-h-28 rounded-md border border-solid border-admin-border bg-admin-input px-3 py-2 text-sm text-admin-text"
                  />
                  <ArrayInput label="Reglas" name="rules" values={values.rules} variant="dark" icon={null} addLabel="Añadir regla" />
                  <ArrayInput label="Premios" name="award" values={values.award} variant="dark" icon={null} addLabel="Añadir premio" />
                  <CustomInput
                    label="Enlace de inscripción (opcional)"
                    name="formUrl"
                    placeholder="https://forms.gle/..."
                    variant="dark"
                    icon={null}
                  />
                </div>
              )}

              {step === "cupos" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputNumber label="Mínimo de jugadores" name="minPlayers" required />
                    <InputNumber label="Máximo de jugadores" name="maxPlayers" required />
                  </div>
                  <InputNumber label="Máximo de equipos" name="maxTeams" required />

                  <div className="flex items-center justify-between gap-4 rounded-lg border border-admin-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-admin-text">Cobrar inscripción</p>
                      <p className="text-xs text-admin-muted">Si lo activas, pide QR y monto</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={
                          values.chargeFee
                            ? "border-admin-accent bg-admin-row text-admin-text"
                            : "border-admin-border text-admin-muted"
                        }
                      >
                        {values.chargeFee ? "Con costo" : "Gratuito"}
                      </Badge>
                      <Switch
                        checked={values.chargeFee}
                        onCheckedChange={(checked) => setFieldValue("chargeFee", checked)}
                        aria-label="Cobrar inscripción"
                      />
                    </div>
                  </div>

                  {values.chargeFee && (
                    <div className="space-y-4 rounded-lg border border-admin-border p-4">
                      <UploadPhoto name="qrImage" plain />
                      <InputNumber label="Costo de inscripción" name="amount" required min={1} max={100000} />
                      <CustomInput
                        label="Nro de cuenta (opcional)"
                        name="account"
                        variant="dark"
                        icon={null}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between border-t border-admin-border pt-5">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === "identidad"}
                  onClick={() => setStep(steps[currentIndex - 1].id)}
                  className="border-admin-border bg-transparent text-admin-muted hover:bg-admin-input hover:text-admin-text"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>

                {step !== "cupos" ? (
                  <Button
                    key="next"
                    type="button"
                    onClick={goNext}
                    className="bg-admin-accent text-white hover:bg-admin-accent-hover"
                  >
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    key="create"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => submitForm()}
                    className="bg-admin-accent text-white hover:bg-admin-accent-hover"
                  >
                    {isSubmitting ? "Creando..." : "Crear torneo"}
                  </Button>
                )}
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default CreateTorneoForm
