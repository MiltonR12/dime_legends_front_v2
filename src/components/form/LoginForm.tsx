import { Formik } from 'formik'
import CustomInput from './CustomInput'
import { Button } from '../ui/button'
import { loginValidation } from '@/lib/validations'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/store'
import { authLoginGoogleThunk, authLoginThunk } from '@/app/redux/auth/authSlice'
import { GoogleLogin } from '@react-oauth/google'
import { CustomToast } from '@/lib/handleToast'

function LoginForm() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(authLoginThunk(values)).unwrap().then(() => {
          navigate('/usuario')
        }).finally(() => {
          setSubmitting(false)
        })
      }}
      validationSchema={loginValidation}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5' >

          <CustomInput
            label='Correo'
            name='email'
            type='email'
            variant='outline'
          />

          <CustomInput
            label='Contraseña'
            name='password'
            type='password'
            variant='outline'
          />

          <Button type='submit' variant="rose" size="lg" className='font-bold text-xl' >
            {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
          </Button>

          <GoogleLogin onSuccess={async (credentialResponse) => {
              const token = credentialResponse.credential
              if (!token) return
              dispatch(authLoginGoogleThunk(token)).unwrap().then(() => {
                navigate('/usuario')
              })
            }}
            onError={() => {
              CustomToast.error('Error al iniciar sesión con Google')
            }}
          />

          <div>
            <p className='inline-block mr-3' >
              ¿No tienes cuenta?
            </p>
            <Link to='/register' className='font-bold' >
              Registrarse
            </Link>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm