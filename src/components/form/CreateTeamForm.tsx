import { Formik } from "formik"
import CustomInput from "./CustomInput"
import ArrayInput from "./ArrayInput"
import { Button } from "../ui/button"
import { createTeamApi } from "@/app/api/team/teamApi"
import { useState } from "react"
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom"
import { useDropzone } from "react-dropzone"
import { uploadImageApi } from "@/app/api/upload/uploadApi"
import { FaUsers } from "react-icons/fa6";

type Props = {
  id: string
}

function CreateTeamForm({ id }: Props) {

  const [isSuccess, setIsSuccess] = useState(false)
  const [logoTeam, setLogoTeam] = useState('')

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      'image/png': ['.png', ".jpg", ".jpeg"],
    },
    onDrop: async (acceptedFiles) => {
      const { futuresyo } = await uploadImageApi(acceptedFiles[0])
      setLogoTeam(futuresyo.data.url)
    }
  })

  return (
    <div>
      {
        !isSuccess ? <Formik
          initialValues={{
            teamName: '',
            captain: '',
            players: ['']
          }}
          onSubmit={(values, { setSubmitting }) => {
            createTeamApi({ ...values, id, image: logoTeam }).then((data) => {
              console.log(data)
              if (data.futuresyo.success) {
                setIsSuccess(true)
              }
            }).finally(() => {
              setSubmitting(false)
            })
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => (
            <form onSubmit={handleSubmit} >

              <div {...getRootProps()}
                className='bg-blue-950/70 flex items-center justify-center mb-5 overflow-hidden mx-auto
                rounded-full h-60 w-60' >
                <input {...getInputProps()} />
                {
                  logoTeam ? <img
                    src={logoTeam}
                    alt="banner"
                    className='w-full h-full object-cover object-center'
                  /> :
                    <div className="mx-auto rounded-full flex flex-col gap-5 items-center" >
                      <FaUsers size={100} className=' text-info' />
                      <h3 className='text-center font-semibold text-info' >
                        Selecciona o arrastra la <br /> imagen del equipo
                      </h3>
                    </div>
                }
              </div>

              <CustomInput
                label="Nombre del equipo"
                name="teamName"
              />
              <CustomInput
                label="Capitan"
                name="captain"
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