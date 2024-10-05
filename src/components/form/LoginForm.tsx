import { Formik } from 'formik'
import CustomInput from './CustomInput'
import { Button } from '../ui/button'
import { loginValidation } from '@/lib/validations'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/store'
import { authLoginThunk } from '@/app/redux/auth/authSlice'

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
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-80' >

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

          <Button type='submit' variant="form" size="lg" className='font-bold text-xl' >
            {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
          </Button>

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