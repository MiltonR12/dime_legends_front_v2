import { Formik } from "formik"
import CustomInput from "./CustomInput"
import ArrayInput from "./ArrayInput"
import { Button } from "../ui/button"
import { useState } from "react"
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom"
import InputUploadImage from "../input/InputUploadImage"
import { useAppDispatch } from "@/app/store"
import { createTeamThunk } from "@/app/redux/team/teamSlice"
import { TournamentOne } from "@/app/redux/tournament/tournament"
import UploadField from "./UploadField"
import InputPhone from "../input/InputPhone"

type PageForm = "payment" | "register" | "success"

type Props = {
  id: string
  torneo: TournamentOne
}

function CreateTeamForm({ id, torneo }: Props) {

  const [page, setPage] = useState<PageForm>(torneo.payment ? "payment" : "register")
  const dispatch = useAppDispatch()

  return (
    <div>
      {page !== "success" && <Formik
        initialValues={{
          name: '',
          captain: '',
          phone: '',
          image: null as File | null,
          voucher: null as File | null,
          players: ['']
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { image, ...rest } = values
          dispatch(createTeamThunk({ ...rest, image, id }))
            .unwrap()
            .then(() => {
              setPage("success")
            })
            .finally(() => {
              setSubmitting(false)
            })
        }}
      >
        {({ handleSubmit, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} >

            {page === "payment" && <div className="flex flex-col gap-5 items-center" >
              <p className="max-w-md text-lg text-center" >
                Para poder registrar su equipo debe pagar la inscripción
              </p>

              <div className="flex flex-col md:flex-row gap-10" >
                <div>
                  <img src={torneo.payment?.qrImage}
                    alt="banner"
                    className="max-w-96 object-cover object-center"
                  />
                  <a href={torneo.payment?.qrImage} download="qr.png" className="block text-center pt-2 text-xl" >
                    Descargar QR
                  </a>
                </div>
                <div className="flex flex-col items-center justify-center gap-5" >
                  <UploadField name="voucher" className="w-96" />
                  <Button
                    disabled={!values.voucher || isSubmitting}
                    variant="rose" type="button"
                    className="w-full" onClick={() => setPage("register")} >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>}

            {page === "register" && <div className="bg-violetTertiary/50 border max-w-3xl mx-auto p-5 rounded-3xl">
              <InputUploadImage name="image" />

              <CustomInput
                label="Nombre del equipo"
                name="name"
                disabled={isSubmitting}
                variant="outline"
              />

              <CustomInput
                label="Capitan"
                name="captain"
                disabled={isSubmitting}
                variant="outline"
              />

              <InputPhone
                label="Telefono"
                name="phone"
                disabled={isSubmitting}
                variant="outline"
              />

              <ArrayInput
                label="Integrantes"
                name="players"
                values={values.players}
                variant="outline"
              />

              <Button type="submit" variant="rose" size="lg" className="mt-10 w-full" disabled={isSubmitting} >
                {isSubmitting ? 'Enviando...' : 'Registrar equipo'}
              </Button>
            </div>}
          </form>
        )}
      </Formik>}

      {page === "success" && <div className="flex flex-col gap-5 items-center" >
        <h1 className="text-tertiary font-semibold text-2xl" >
          Equipo registrado con éxito
        </h1>
        <GrStatusGood className="text-tertiary mx-auto" size={100} />

        <p className="max-w-md text-lg text-center" >
          Por favor espere a que el administrador del torneo acepte su solicitud
          <br />
          Se le mandara un email de confirmación
        </p>

        <Button asChild variant="secondary" >
          <Link to="/torneos" >
            Volver a torneos
          </Link>
        </Button>
      </div>}
    </div>
  )
}

export default CreateTeamForm