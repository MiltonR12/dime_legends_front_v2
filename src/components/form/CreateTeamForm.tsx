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

type Props = {
  id: string
}

function CreateTeamForm({ id }: Props) {

  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <div>
      {
        !isSuccess ? <Formik
          initialValues={{
            name: '',
            captain: '',
            image: null as File | null,
            players: ['']
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { image, ...rest } = values
            if (!image) return
            dispatch(createTeamThunk({ ...rest, image, id }))
              .then(() => {
                setIsSuccess(true)
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => (
            <form onSubmit={handleSubmit} >

              <InputUploadImage name="image" />

              <CustomInput
                label="Nombre del equipo"
                name="name"
                disabled={isSubmitting}
              />
              <CustomInput
                label="Capitan"
                name="captain"
                disabled={isSubmitting}
              />

              <ArrayInput
                label="Integrantes"
                name="players"
                values={values.players}
              />
              
              <Button type="submit" variant="form" size="lg" className="mt-10" >
                {isSubmitting ? 'Enviando...' : 'Registrar equipo'}
              </Button>
            </form>
          )}
        </Formik> : <div className="flex flex-col gap-5 items-center" >
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
        </div>
      }
    </div>
  )
}

export default CreateTeamForm