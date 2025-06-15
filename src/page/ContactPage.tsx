import { Form, Formik } from "formik"
import * as Yup from "yup"
import { sendContactApi } from "@/app/api/contact/contactApi"
import { CustomToast } from "@/lib/handleToast"
import CustomInput from "@/components/form/CustomInput"
import InputTextArea from "@/components/input/InputTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/ui/Footer"
import { Mail, MapPin, Send, MessageCircle, Facebook, Users, Loader2, Clock, CheckCircle } from "lucide-react"
import { FaDiscord, FaWhatsapp } from "react-icons/fa"
import fondo from "@/assets/imgs/fondo/fondo_contacto.jpg"

const validateSchema = Yup.object().shape({
  firstName: Yup.string().required("Este campo es requerido"),
  lastName: Yup.string().required("Este campo es requerido"),
  email: Yup.string().email("Correo inválido").required("Este campo es requerido"),
  phone: Yup.string().required("Este campo es requerido"),
  message: Yup.string().required("Este campo es requerido"),
})

function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-950/80 to-black z-10" />
        <img src={fondo || "/placeholder.svg"} alt="Contacto" className="w-full h-full object-cover object-center" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5 backdrop-blur-sm">
            PONTE EN CONTACTO
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">CONTACTO</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 max-w-2xl">
            ¿Tienes preguntas sobre nuestros torneos? Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Información de <span className="text-pink-500">Contacto</span>
              </h2>
              <p className="text-purple-300 text-lg">
                Múltiples formas de conectar con nosotros. Elige la que más te convenga.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Ubicación</h3>
                      <p className="text-purple-300">Bolivia, La Paz - El Alto</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Email</h3>
                      <p className="text-purple-300">miltonaguilar142018@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Horario de Atención</h3>
                      <p className="text-purple-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Síguenos en Redes Sociales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/DimeLegendsBolivia"
                    target="_blank"
                    rel="noreferrer"
                    className="group p-3 rounded-xl border border-purple-700/50 hover:border-purple-500 bg-purple-900/30 hover:bg-purple-800/50 transition-all duration-300 flex items-center justify-center"
                  >
                    <Facebook className="h-6 w-6 text-purple-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://chat.whatsapp.com/LgwUb7ngTC5DYfjO5bOSyM"
                    target="_blank"
                    rel="noreferrer"
                    className="group p-3 rounded-xl border border-purple-700/50 hover:border-purple-500 bg-purple-900/30 hover:bg-purple-800/50 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaWhatsapp className="h-6 w-6 text-purple-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://discord.gg/hKjwBn7m"
                    target="_blank"
                    rel="noreferrer"
                    className="group p-3 rounded-xl border border-purple-700/50 hover:border-purple-500 bg-purple-900/30 hover:bg-purple-800/50 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaDiscord className="h-6 w-6 text-purple-300 group-hover:text-white transition-colors" />
                  </a>
                </div>
                <p className="text-purple-400 text-sm mt-4">
                  Únete a nuestra comunidad y mantente al día con las últimas noticias de torneos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                  Enviar un Mensaje
                </CardTitle>
                <p className="text-purple-300">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible
                </p>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: "",
                  }}
                  onSubmit={({ email, firstName, lastName, message, phone }, { setSubmitting, resetForm }) => {
                    sendContactApi({
                      email,
                      message,
                      phone,
                      name: `${firstName} ${lastName}`,
                    })
                      .then(() => {
                        CustomToast.success("Mensaje enviado correctamente")
                      })
                      .finally(() => {
                        setSubmitting(false)
                        resetForm()
                      })
                  }}
                  validationSchema={validateSchema}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <CustomInput
                          label="Nombre"
                          name="firstName"
                          variant="outline"
                          placeholder="Tu nombre"
                          disabled={isSubmitting}
                        />
                        <CustomInput
                          label="Apellido"
                          name="lastName"
                          variant="outline"
                          placeholder="Tu apellido"
                          disabled={isSubmitting}
                        />
                      </div>

                      <CustomInput
                        label="Email"
                        name="email"
                        type="email"
                        variant="outline"
                        placeholder="tu@email.com"
                        disabled={isSubmitting}
                      />

                      <CustomInput
                        label="Teléfono"
                        name="phone"
                        variant="outline"
                        placeholder="+591 12345678"
                        disabled={isSubmitting}
                      />

                      <InputTextArea
                        label="Mensaje"
                        name="message"
                        variant="outline"
                        placeholder="Escribe tu mensaje aquí..."
                        disabled={isSubmitting}
                      />

                      <Separator className="bg-purple-800/30" />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Enviando mensaje...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Enviar Mensaje
                          </span>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm mt-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Respuesta Rápida</h4>
                    <p className="text-purple-300 text-sm">
                      Normalmente respondemos en menos de 24 horas durante días laborables
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Preguntas <span className="text-pink-500">Frecuentes</span>
            </h2>
            <p className="text-purple-300 text-lg max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros torneos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">¿Cómo me inscribo?</h3>
                <p className="text-purple-300 text-sm">
                  Ve a la sección de torneos, selecciona el que te interese y sigue el proceso de inscripción.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">¿Hay torneos gratuitos?</h3>
                <p className="text-purple-300 text-sm">
                  Sí, organizamos tanto torneos gratuitos como de pago. Revisa la información de cada torneo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">¿Qué juegos incluyen?</h3>
                <p className="text-purple-300 text-sm">
                  Principalmente Mobile Legends, pero también organizamos torneos de otros juegos populares.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ContactPage
