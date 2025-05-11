import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { authLoginGoogleThunk, authRegisterThunk } from "@/app/redux/auth/authSlice"
import { registerValidation } from "@/lib/validations"
import { GoogleLogin } from "@react-oauth/google"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { User, Phone, Loader2, UserPlus } from "lucide-react"
import CustomInput from "./CustomInput"
import InputPhone from "../input/InputPhone"

function RegisterForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contact: 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(authRegisterThunk(values))
          .then(() => {
            navigate("/login")
          })
          .catch(() => {
            setSubmitting(false)
          })
      }}
      validationSchema={registerValidation}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-4">
            {/* Name fields in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Nombre"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Tu nombre"
                variant="outline"
                icon={<User className="h-5 w-5 text-purple-400" />}
              />
              <CustomInput
                label="Apellido"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Tu apellido"
                variant="outline"
                icon={<User className="h-5 w-5 text-purple-400" />}
              />
            </div>

            {/* Email field */}
            <CustomInput
              label="Correo electrónico"
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              variant="outline"
            />
            <CustomInput
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              variant="outline"
            />

            <InputPhone
              label="Teléfono de contacto"
              id="contact"
              name="contact"
              placeholder="Tu número de teléfono"
              variant="outline"
              icon={<Phone className="h-5 w-5 text-purple-400" />}
            />

          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" /> Registrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Crear cuenta
                </span>
              )}
            </Button>
          </motion.div>

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
                theme="filled_black"
                shape="pill"
                size="large"
                logo_alignment="center"
                width="100%"
                text="continue_with"
              />
            </div>
          </div>

          {/* Login link */}
          <div className="text-center mt-2">
            <p className="text-purple-300">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-white hover:text-purple-300 transition-colors underline decoration-purple-500 underline-offset-2"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
