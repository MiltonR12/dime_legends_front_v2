import { Formik } from "formik"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import CustomInput from "../form/CustomInput"
import { createPageValidation } from "@/lib/validations"
import { useAppDispatch } from "@/app/store"
import { createPageThunk } from "@/app/redux/auth/authSlice"
import UploadPhoto from "../input/UploadPhoto"
import InputTextArea from "../input/InputTextArea"

function CreatePageModal() {

  const dispatch = useAppDispatch()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-center text-white font-semibold bg-primary" size="lg" >
          ¡Solicitar!
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-fondo border-primary md:rounded-xl border-2" >
        <DialogHeader>
          <DialogTitle className="text-center text-xl" >
            ¿Quieres ser organizador?
          </DialogTitle>
          <DialogDescription className="text-center" >
            Llena el siguiente formulario para ser un creador de torneos.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            name: "",
            description: "",
            image: null as File | null
          }}
          onSubmit={({ description, image, name }, { setSubmitting }) => {
            if (!image) return
            dispatch(createPageThunk({ description, image, name })).unwrap().finally(() => {
              setSubmitting(false)
            })
          }}
          validationSchema={createPageValidation}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} >

              <UploadPhoto name="image" />

              <CustomInput
                label="Nombre de la página"
                name="name"
                placeholder="Nombre de la página"
                required
                disabled={isSubmitting}
              />

              <InputTextArea
                label="Descripción"
                name="description"
                placeholder="Descripción"
                required
                disabled={isSubmitting}
              />

              <Button
                type="submit"
                variant="form"
                className="text-center text-white font-semibold bg-primary"
                disabled={isSubmitting}
              >
                Crear página
              </Button>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePageModal