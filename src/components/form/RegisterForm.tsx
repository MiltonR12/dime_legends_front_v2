import { Formik } from "formik"
import CustomInput from "./CustomInput"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { authRegisterThunk } from "@/app/redux/auth/authSlice"
import { registerValidation } from "@/lib/validations"

function RegisterForm() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contact: 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(authRegisterThunk(values)).then(() => {
          console.log('entro aqui')
          navigate('/login')
        }).catch(() => {
          setSubmitting(false)
        })
      }}
      validationSchema={registerValidation}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-96' >
          <div className="grid grid-cols-2 gap-5" >
            <CustomInput
              label='Nombre'
              name='firstName'
            />

            <CustomInput
              label='Apellido'
              name='lastName'
            />
          </div>

          <CustomInput
            label='Correo'
            name='email'
            type='email'
          />

          <CustomInput
            label='Contraseña'
            name='password'
            type='password'
          />

          <CustomInput
            label='Contacto'
            name='contact'
            type='number'
          />

          <Button type='submit' variant="form" size="lg" className='font-bold text-xl' >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </Button>

          <div>
            <p className='inline-block mr-3' >
              ¿Ya tienes cuenta?
            </p>
            <Link to='/login' className='font-bold' >
              Iniciar sesión
            </Link>
          </div>

        </form>
      )}
    </Formik>
  )
}

export default RegisterForm