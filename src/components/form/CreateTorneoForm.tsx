import { Form, Formik } from 'formik'
import CustomInput from './CustomInput'
import ArrayInput from './ArrayInput'
import { useState } from 'react'
import { Switch } from '../ui/switch'
import { useAppDispatch } from '@/app/store'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { validationTournament } from '@/lib/validationTorneo'
import InputDatePicker from '../input/inputDatePicker'
import InputComboBox from '../input/InputComboBox'
import { listGames } from '@/payments/games'
import UploadBanner from './UploadBanner'
import InputTextArea from '../input/InputTextArea'
import InputNumber from '../input/InputNumber'
import { createTournamentThunk } from '@/app/redux/tournament/tournamentSlice'

type StatusForm = "basic" | "modality" | "config"

function CreateTorneoForm() {

  const [nextForm, setNextForm] = useState<StatusForm>("basic")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div className='max-w-2xl w-full' >

      {/* INFORMACION BASICA DEL TORNEO */}

      <Formik
        initialValues={{
          name: '',
          formUrl: '',
          image: null as null | File,
          dateStart: new Date().toISOString().split('T')[0],
          description: '',
          game: '',
          modality: [""],
          requirements: [""],
          rules: [""],
          award: [""],
          note: '',
          minPlayers: 1,
          maxPlayers: 50,
          maxTeams: 50,
          isFree: false,
          qrImage: null as null | File,
          amount: 0,
          account: ''
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
            modality,
            requirements,
            amount,
            qrImage,
            rules
          } = rest
          if (!image) return
          dispatch(createTournamentThunk({
            name,
            description,
            image,
            game,
            dateStart,
            formUrl,
            award,
            modality,
            requirements,
            rules,
            config: {
              minPlayers,
              maxPlayers,
              maxTeams,
              tipo: "simple",
              registrationEnd: new Date()
            },
            payment: qrImage ? {
              qrImage,
              amount,
              account
            } : null
          })).unwrap()
            .then(() => navigate('/admin'))
            .finally(() => setSubmitting(false))

        }}
        validationSchema={validationTournament}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>

            {nextForm === "basic" && <div className='flex flex-col gap-5 p-10' >

              <h3 className='text-center text-2xl font-semibold' >
                Crear Torneo
              </h3>

              <UploadBanner name='image' />

              <CustomInput
                label='Nombre del torneo'
                name='name'
                placeholder='Ejemplo: Torneo de LOL'
                required={true}
              />

              <InputTextArea
                label='Descripción'
                name='description'
                placeholder='Ejemplo: Torneo de LOL para jugadores de nivel 30'
                required={true}
              />

              <InputDatePicker
                label='Fecha de inicio'
                name='dateStart'
              />

              <CustomInput
                label='Enlace de inscripción (opcional)'
                name='formUrl'
                placeholder='https://forms.gle/...'
              />

              <Button variant="form" type='button' onClick={() => setNextForm("modality")} >
                Siguiente paso
              </Button>

            </div>}

            {nextForm === "modality" && <div className='flex flex-col gap-5 p-10 overflow-y-auto' >

              <h3 className='text-center text-2xl font-semibold' >
                Crear Torneo
              </h3>

              <InputComboBox
                list={listGames.map((game) => ({ label: game, value: game }))}
                label='Juego'
                name='game'
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

              <InputTextArea
                label='Nota'
                name='note'
              />

              <div className='grid grid-cols-2 gap-10' >
                <Button variant="ghost" type='button' onClick={() => setNextForm("basic")} >
                  Atras
                </Button>

                <Button variant="form" type='button' onClick={() => setNextForm("config")} >
                  Siguiente paso
                </Button>
              </div>

            </div>}

            {nextForm === "config" && <div className='flex flex-col gap-5 p-10' >

              <h3 className='text-center text-2xl font-semibold' >
                Configuración del torneo
              </h3>

              <div className='grid grid-cols-2 gap-5' >

                <InputNumber
                  label='Minimo de jugadores'
                  name='minPlayers'
                  required
                />

                <InputNumber
                  label='Máximo de jugadores'
                  name='maxPlayers'
                  required
                />

              </div>

              <InputNumber
                label='Máximo de equipos'
                name='maxTeams'
                required
              />

              <div className='flex items-center gap-5 justify-between' >
                <h3 className='text-center text-2xl font-semibold' >
                  ¿El torneo es gratuito?
                </h3>
                <div className='flex items-center justify-center gap-5' >
                  <Switch onCheckedChange={() => setFieldValue("isFree", !values.isFree)} />
                  <h3 className=' text-2xl font-semibold' >
                    {values.isFree ? 'No' : 'Si'}
                  </h3>
                </div>
              </div>

              {
                values.isFree && <>
                  <h3 className='text-center text-2xl font-semibold' >
                    Agregar metodos de pago
                  </h3>

                  <UploadBanner name='qrImage' />

                  <InputNumber
                    label='Coston de inscripción'
                    name='amount'
                    required
                  />

                  <CustomInput
                    label='Nro de cuenta (opcional)'
                    name='account'
                  />
                </>
              }

              <Button variant="ghost" type='button' onClick={() => setNextForm("modality")} >
                Atras
              </Button>

              <Button variant="form" type='submit' disabled={isSubmitting} >
                Crear torneo
              </Button>

            </div>}

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateTorneoForm