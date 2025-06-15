import { Formik } from "formik"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CustomInput from "@/components/form/CustomInput"
import { createPageValidation } from "@/lib/validations"
import { useAppDispatch } from "@/app/store"
import { createPageThunk } from "@/app/redux/auth/authSlice"
import UploadPhoto from "@/components/input/UploadPhoto"
import InputTextArea from "@/components/input/InputTextArea"
import { Crown, Users, ImageIcon, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function CreatePageModal() {

  const dispatch = useAppDispatch()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="relative overflow-hidden text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_15px_rgba(168,85,247,0.3)] border-none transition-all duration-300"
          size="lg"
        >
          <Crown className="h-5 w-5 mr-2" />
          ¡Solicitar!
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-purple-950 to-black border-purple-600/50 md:rounded-2xl border-2 max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl"></div>
        <div className="relative z-10">
          <DialogHeader className="text-center space-y-4 pb-6">
            <div>
              <Badge className="mb-3 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5 text-sm">
                ORGANIZADOR
              </Badge>
              <DialogTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                ¿Quieres ser organizador?
              </DialogTitle>
              <DialogDescription className="text-purple-300 text-lg mt-2">
                Llena el siguiente formulario para convertirte en un creador de torneos épicos.
              </DialogDescription>
            </div>
          </DialogHeader>

          <Formik
            initialValues={{
              name: "",
              description: "",
              image: null as File | null,
            }}
            onSubmit={({ description, image, name }, { setSubmitting }) => {
              if (!image) return
              dispatch(
                createPageThunk({
                  description,
                  image,
                  name,
                }),
              )
                .unwrap()
                .finally(() => {
                  setSubmitting(false)
                })
            }}
            validationSchema={createPageValidation}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Image Upload Section */}
                <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold">Imagen de la página</h3>
                  </div>
                  <UploadPhoto name="image" />
                </div>

                <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-pink-600/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-pink-400" />
                    </div>
                    <h3 className="text-white font-semibold">Información básica</h3>
                  </div>

                  <CustomInput
                    label="Nombre de la página"
                    name="name"
                    placeholder="Ej: Torneos Gaming Pro"
                    required
                    disabled={isSubmitting}
                    variant="outline"
                  />

                  <InputTextArea
                    label="Descripción"
                    name="description"
                    placeholder="Describe tu página de torneos, qué tipo de eventos organizas y qué hace especial tu comunidad..."
                    required
                    disabled={isSubmitting}
                    variant="outline"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full text-lg py-6 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_15px_rgba(168,85,247,0.4)] border-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creando página...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Crear página de organizador
                      </div>
                    )}
                  </Button>
                </div>

                {/* Info Footer */}
                <div className="bg-purple-950/30 p-4 rounded-lg border border-purple-800/30">
                  <p className="text-purple-300 text-sm text-center">
                    Una vez enviada tu solicitud, nuestro equipo la revisará y te contactaremos pronto.
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePageModal
