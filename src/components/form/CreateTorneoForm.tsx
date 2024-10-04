import { Formik } from 'formik'
import CustomInput from './CustomInput'
import CustomTextArea from './CustomTextArea'
import CustomSelect from './CustomSelect'
import ArrayInput from './ArrayInput'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";
import { uploadImageApi } from '@/app/api/upload/uploadApi'
import { Switch } from '../ui/switch'
import { useAppDispatch } from '@/app/store'
import { createTournamentThunk } from '@/app/redux/tournament/tournamentSlice'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { validationBasicTorneo } from '@/lib/validationTorneo'

function CreateTorneoForm() {

  const [banner, setBanner] = useState("")
  const [imageQr, setImageQr] = useState("")
  const [isFree, setIsFree] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [nextForm, setNextForm] = useState(0)
  const [dataForm, setDataForm] = useState({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { getInputProps: getBannerInputProps, getRootProps: getBannerRootProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const { futuresyo } = await uploadImageApi(acceptedFiles[0])
      setBanner(futuresyo.data.url)
    }
  })

  const { getInputProps: getImageQrInputProps, getRootProps: getImageQrRootProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const { futuresyo } = await uploadImageApi(acceptedFiles[0])
      setImageQr(futuresyo.data.url)
    }
  })

  return (
    <div className='max-w-2xl w-full' >

      {/* INFORMACION BASICA DEL TORNEO */}

      {nextForm === 0 && <Formik
        initialValues={{
          name: '',
          formUrl: '',
          dateStart: new Date().toISOString().split('T')[0],
          description: '',
        }}
        onSubmit={(values) => {
          console.log(values)
          setDataForm({ ...values, image: banner })
          setNextForm(1)
        }}
        validationSchema={validationBasicTorneo}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} >
            <div className='flex flex-col gap-5 p-10' >

              <h3 className='text-center text-2xl font-semibold' >
                Crear Torneo
              </h3>

              <div {...getBannerRootProps()}
                className='p-5 bg-blue-950/70 float-start items-center justify-center' >
                <input {...getBannerInputProps()} />

                {
                  banner ? <img src={banner} alt="banner" className='mx-auto' /> :
                    <>
                      <FaImage size={100} className='mx-auto text-info' />
                      <h3 className='text-center font-semibold text-info' >
                        Selecciona o arrastra la imagen del banner
                      </h3>
                    </>
                }
              </div>

              <CustomInput
                label='Nombre del torneo'
                name='name'
                required={true}
              />

              <CustomTextArea
                label='Descripción'
                name='description'
                required={true}
              />

              <CustomInput
                label='Fecha de inicio'
                name='dateStart'
                type='date'
                required={true}
              />

              <Button variant="form" type='submit' >
                Siguiente paso
              </Button>

            </div>
          </form>
        )}
      </Formik>}

      {/* MODALIDAD DEL TORNEO TORNEO */}

      {nextForm === 1 && <Formik
        initialValues={{
          game: 'Mobile Legends',
          modality: [""],
          requirements: [""],
          rules: [""],
          award: [""],
          note: '',
        }}
        onSubmit={(values) => {
          console.log(values)
          setDataForm({ ...dataForm, ...values })
          setNextForm(2)
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit} >
            <div className='flex flex-col gap-5 p-10 overflow-y-auto' >

              <h3 className='text-center text-2xl font-semibold' >
                Crear Torneo
              </h3>

              <CustomSelect
                label='Juego'
                name='game'
                list={[
                  "Mobile Legends",
                  "Free Fire",
                  "Valorant",
                  "League of Legends",
                  "Clash Royale",
                  "Call of Duty",
                ]}
                setFieldValue={setFieldValue}
                defaultValue='Mobile Legends'
              />

              <ArrayInput
                label='Modalidad'
                name='modality'
                placeholder='Ejemplo: 1v1, 2v2, 3v3, 5v5'
                values={values.modality}
                required={true}
              />

              <ArrayInput
                label='Requisitos'
                name='requirements'
                placeholder='Ejemplo: Nivel 30, Rango Oro, etc'
                values={values.requirements}
                required={true}
              />

              <ArrayInput
                label='Reglas'
                name='rules'
                placeholder='Ejemplo: No hack, No bug, etc'
                values={values.rules}
                required={true}
              />

              <ArrayInput
                label='Premios'
                name='award'
                placeholder='Ejemplo: 1er lugar: 1000, 2do lugar: 500, etc'
                values={values.award}
                required={true}
              />

              <CustomTextArea
                label='Nota'
                name='note'
              />

              <div className='grid grid-cols-2 gap-10' >
                <Button variant="ghost" type='button' onClick={() => setNextForm(0)} >
                  Atras
                </Button>

                <Button variant="form" type='submit' >
                  Siguiente paso
                </Button>
              </div>

            </div>
          </form>
        )}
      </Formik>}

      {/* CONFIGURACION DEL TORNEO */}
      {nextForm === 2 && <Formik
        initialValues={{
          prize: '',
          account: '',
          minPlayers: 1,
          maxPlayers: 50,
          maxTeams: 50,
          isFree: false,
        }}
        onSubmit={(values) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = { ...dataForm, ...values }
          const config = {
            minPlayers: values.minPlayers,
            maxPlayers: values.maxPlayers,
            maxTeams: values.maxTeams,
            isFree: values.isFree,
            tipo: 'normal'
          }
          dispatch(createTournamentThunk({
            name: data.name,
            formUrl: isForm ? data.formUrl : null,
            dateStart: data.dateStart,
            game: data.game,
            image: banner,
            prize: isFree ? values.prize : null,
            imageQr: isFree ? imageQr : null,
            account: isFree ? values.account : null,
            description: data.description,
            modality: data.modality,
            requirements: data.requirements,
            rules: data.rules,
            award: data.award,
            note: data.note,
            config
          })).then(() => navigate('/tournaments'))
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} >
            <div className='flex flex-col gap-5 p-10' >

              <h3 className='text-center text-2xl font-semibold' >
                Configuración del torneo
              </h3>

              <div className='grid grid-cols-2 gap-5' >
                <CustomInput
                  label='Minimo de jugadores'
                  name='minPlayers'
                  type='number'
                />

                <CustomInput
                  label='Máximo de jugadores'
                  name='maxPlayers'
                  type='number'
                />
              </div>

              <CustomInput
                label='Máximo de equipos'
                name='maxTeams'
                type='number'
              />

              <CustomTextArea
                label='Nota'
                name='note'
              />

              <div>
                <h3 className='text-center text-2xl font-semibold mb-5' >
                  ¿User otro metodo de registro?
                </h3>
                <div className='flex items-center justify-center gap-5' >
                  <Switch onCheckedChange={() => setIsForm(!isForm)} />
                  <h3 className=' text-2xl font-semibold' >
                    {isForm ? 'Si' : 'No'}
                  </h3>
                </div>
              </div>

              {
                isForm && <CustomInput
                  label='Link del formulario'
                  name='formUrl'
                />
              }

              <div>
                <h3 className='text-center text-2xl font-semibold mb-5' >
                  ¿El torneo es gratuito?
                </h3>
                <div className='flex items-center justify-center gap-5' >
                  <Switch onCheckedChange={() => setIsFree(!isFree)} />
                  <h3 className=' text-2xl font-semibold' >
                    {isFree ? 'Si' : 'No'}
                  </h3>
                </div>
              </div>

              {
                isFree && <>
                  <h3 className='text-center text-2xl font-semibold' >
                    Agregar metodos de pago
                  </h3>
                  <div {...getImageQrRootProps()}
                    className='p-5 bg-blue-950/70 float-start items-center justify-center' >
                    <input {...getImageQrInputProps()} />
                    {
                      imageQr ? <img src={imageQr} alt="imageQr" className='mx-auto' /> :
                        <>
                          <FaImage size={100} className='mx-auto text-info' />
                          <h3 className='text-center font-semibold text-info' >
                            Selecciona o arrastra la imagen del código QR
                          </h3>
                        </>
                    }
                  </div>

                  <CustomInput
                    label='Coston de inscripción'
                    name='prize'
                  />

                  <CustomInput
                    label='Cuenta'
                    name='account'
                  />
                </>
              }

              <Button variant="form" type='submit' >
                Crear torneo
              </Button>

            </div>
          </form>
        )}
      </Formik>}
    </div>
  )
}

export default CreateTorneoForm