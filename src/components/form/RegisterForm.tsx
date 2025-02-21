import { Formik } from "formik"
import CustomInput from "./CustomInput"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { authLoginGoogleThunk, authRegisterThunk } from "@/app/redux/auth/authSlice"
import { registerValidation } from "@/lib/validations"
import { GoogleLogin } from "@react-oauth/google"

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
          navigate('/login')
        }).catch(() => {
          setSubmitting(false)
        })
      }}
      validationSchema={registerValidation}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3' >
          <div className="grid grid-cols-2 gap-5" >
            <CustomInput
              label='Nombre'
              name='firstName'
              variant='outline'
            />

            <CustomInput
              label='Apellido'
              name='lastName'
              variant='outline'
            />
          </div>

          <CustomInput
            label='Correo'
            name='email'
            type='email'
            variant="outline"
          />

          <CustomInput
            label='Contraseña'
            name='password'
            type='password'
            variant='outline'
          />

          <CustomInput
            label='Contacto'
            name='contact'
            type='number'
            variant='outline'
          />

          <Button type='submit' variant="rose" size="lg" className='font-bold text-xl' >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </Button>

          <GoogleLogin onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential
            if (!token) return
            dispatch(authLoginGoogleThunk(token)).unwrap().then(() => {
              navigate('/usuario')
            })
          }} />

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