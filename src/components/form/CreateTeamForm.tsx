import { Formik } from "formik"
import { useState } from "react"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { useAppDispatch } from "@/app/store"
import { createTeamThunk } from "@/app/redux/team/teamSlice"
import type { TournamentOne } from "@/app/redux/tournament/tournament"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CustomInput from "./CustomInput"
import ArrayInput from "./ArrayInput"
import InputUploadImage from "../input/InputUploadImage"
import UploadField from "./UploadField"
import InputPhone from "../input/InputPhone"
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Users,
  Phone,
  Trophy,
  Loader2,
} from "lucide-react"
import { DownloadIcon } from "../icons/globals"

type PageForm = "payment" | "register" | "success"

type Props = {
  id: string
  torneo: TournamentOne
  onStepChange?: (step: number) => void
}

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre del equipo es obligatorio"),
  captain: Yup.string().required("El nombre del capitán es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  image: Yup.mixed().required("La imagen del equipo es obligatoria"),
  players: Yup.array()
    .of(Yup.string().required("El nombre del jugador es obligatorio"))
    .min(1, "Debe haber al menos un jugador"),
})

function CreateTeamForm({ id, torneo, onStepChange }: Props) {
  const [page, setPage] = useState<PageForm>(torneo.payment ? "payment" : "register")
  const dispatch = useAppDispatch()

  const updateStep = (newPage: PageForm) => {
    setPage(newPage)
    if (onStepChange) {
      if (newPage === "payment") onStepChange(1)
      else if (newPage === "register") onStepChange(2)
      else if (newPage === "success") onStepChange(3)
    }
  }

  return (
    <div>
      {page !== "success" && (
        <Formik
          initialValues={{
            name: "",
            captain: "",
            phone: "",
            image: null as File | null,
            voucher: null as File | null,
            players: [""],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { image, ...rest } = values
            dispatch(createTeamThunk({ ...rest, image, id }))
              .unwrap()
              .then(() => {
                updateStep("success")
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ handleSubmit, values, isSubmitting, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              {page === "payment" && (
                <div className="flex flex-col gap-6">
                  <Alert className="bg-purple-900/30 border-purple-700">
                    <AlertCircle className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-purple-200">
                      Para completar tu inscripción, realiza el pago de {torneo.payment?.amount} Bs y sube el
                      comprobante.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-purple-600">Paso 1</Badge>
                        <h3 className="text-xl font-semibold text-white">Realiza el pago</h3>
                      </div>
                      <Separator className="my-4 bg-purple-700/30" />

                      <div className="flex flex-col items-center">
                        <img
                          src={torneo.payment?.qrImage || "/placeholder.svg"}
                          alt="Código QR para pago"
                          className="max-w-full h-auto object-cover object-center rounded-lg border-2 border-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        />
                        <a
                          href={torneo.payment?.qrImage}
                          download="qr-pago-torneo.png"
                          className="mt-4 text-purple-300 hover:text-white flex items-center gap-2 transition-colors"
                        >
                          <DownloadIcon className="h-4 w-4" /> Descargar QR
                        </a>

                        <div className="mt-4 text-center text-purple-200">
                          <p className="font-medium">Monto: {torneo.payment?.amount} Bs</p>
                          {torneo.account && <p className="text-sm">Cuenta: {torneo.account}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-purple-600">Paso 2</Badge>
                        <h3 className="text-xl font-semibold text-white">Sube tu comprobante</h3>
                      </div>
                      <Separator className="my-4 bg-purple-700/30" />

                      <div className="flex flex-col items-center gap-6">
                        <UploadField name="voucher" className="w-full max-h-80" />

                        <Button
                          disabled={!values.voucher || isSubmitting}
                          variant="default"
                          type="button"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          onClick={() => updateStep("register")}
                        >
                          {values.voucher ? (
                            <span className="flex items-center gap-2">
                              Continuar <ArrowRight className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Upload className="h-4 w-4" /> Sube tu comprobante
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {page === "register" && (
                <div className="space-y-6">
                  {torneo.payment && (
                    <div className="flex justify-start mb-4">
                      <Button
                        variant="outline"
                        type="button"
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
                        onClick={() => updateStep("payment")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al pago
                      </Button>
                    </div>
                  )}

                  <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-purple-600">{torneo.payment ? "Paso 3" : "Paso 1"}</Badge>
                      <h3 className="text-xl font-semibold text-white">Información del equipo</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="h-4 w-4 text-purple-400" />
                          <label className="text-white font-medium">Logo del equipo</label>
                        </div>
                        <InputUploadImage name="image" />
                        {errors.image && touched.image && (
                          <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                        )}
                      </div>

                      <CustomInput
                        label="Nombre del equipo"
                        name="name"
                        disabled={isSubmitting}
                        variant="outline"
                        placeholder="Ej: Los Invencibles"
                        icon={<Users className="h-4 w-4 text-purple-400" />}
                      />

                      <CustomInput
                        name="captain"
                        label="Capitán del equipo"
                        disabled={isSubmitting}
                        variant="outline"
                        placeholder="Nombre completo del capitán"
                        icon={<Users className="h-4 w-4 text-purple-400" />}
                      />

                      <InputPhone
                        name="phone"
                        disabled={isSubmitting}
                        variant="outline"
                        placeholder="Ej: +591 12345678"
                        label="Teléfono de contacto"
                        icon={<Phone className="h-4 w-4 text-purple-400" />}
                      />

                      <ArrayInput
                        name="players"
                        values={values.players}
                        variant="outline"
                        label="Jugadores del equipo"
                        icon={<Users className="h-4 w-4 text-purple-400" />}
                        minPlayers={torneo.config?.minPlayers || 1}
                        maxPlayers={torneo.config?.maxPlayers || 10}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="mt-8 w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center gap-2">
                        {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Registrando equipo...</> :
                          <><CheckCircle className="h-5 w-5" /> Completar registro</>}
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          )}
        </Formik>
      )}

      {page === "success" && (
        <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-800/50 backdrop-blur-sm text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">¡Registro completado con éxito!</h1>

          <div className="max-w-md mx-auto mb-8">
            <p className="text-purple-200 text-lg mb-4">
              Tu equipo ha sido registrado correctamente en el torneo{" "}
              <span className="font-semibold">{torneo.name}</span>.
            </p>
            <p className="text-purple-300">
              El administrador del torneo revisará tu solicitud y recibirás una confirmación por correo electrónico.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
            >
              <Link to={`/torneo/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al torneo
              </Link>
            </Button>

            <Button
              asChild
              variant="default"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link to="/torneos">
                <Trophy className="mr-2 h-4 w-4" /> Explorar más torneos
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateTeamForm