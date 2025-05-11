import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { authLoginGoogleThunk, authLoginThunk } from "@/app/redux/auth/authSlice"
import { loginValidation } from "@/lib/validations"
import { GoogleLogin } from "@react-oauth/google"
import { CustomToast } from "@/lib/handleToast"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, Loader2 } from "lucide-react"
import CustomInput from "./CustomInput"

function LoginForm() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(authLoginThunk(values))
          .unwrap()
          .then(() => {
            navigate("/usuario")
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
      validationSchema={loginValidation}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <div className="space-y-4">
            <CustomInput
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              variant="outline"
              icon={<Mail className=" h-5 w-5 text-purple-400" />}
            />

            <CustomInput
              label="Contraseña"
              name="password"
              placeholder="••••••••"
              variant="outline"
              icon={<Lock className="h-5 w-5 text-purple-400" />}
            />

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Iniciando sesión...
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </Button>

          <div className="relative my-2">
            <Separator className="bg-purple-700/30" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-900 px-2 text-purple-300 text-sm">
              O continúa con
            </span>
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const token = credentialResponse.credential
                  if (!token) return
                  dispatch(authLoginGoogleThunk(token))
                    .unwrap()
                    .then(() => {
                      navigate("/usuario")
                    })
                }}
                onError={() => {
                  CustomToast.error("Error al iniciar sesión con Google")
                }}
                theme="filled_black"
                shape="pill"
                size="large"
                logo_alignment="center"
                text="continue_with"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-purple-300">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-semibold text-white hover:text-purple-300 transition-colors underline decoration-purple-500 underline-offset-2"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
