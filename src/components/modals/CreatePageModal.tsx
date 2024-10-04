import { Formik } from "formik"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import CustomInput from "../form/CustomInput"
import { createPageValidation } from "@/lib/validations"
import { useAppDispatch } from "@/app/store"
import { createPageThunk } from "@/app/redux/auth/authSlice"

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
          <DialogDescription  >
            Llena el siguiente formulario para ser un creador de torneos.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            pageName: "",
            description: "",
            urlPage: "",
            urlGroup: "",
          }}
          onSubmit={(values) => {
            dispatch(createPageThunk(values))
          }}
          validationSchema={createPageValidation}
        >
          {({ handleSubmit }) => (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} >

              <CustomInput
                label="Nombre de la página"
                name="pageName"
                placeholder="Nombre de la página"
              />

              <CustomInput
                label="Descripción"
                name="description"
                placeholder="Descripción"
              />

              <CustomInput
                label="URL de la página"
                name="urlPage"
                placeholder="URL de la página"
              />

              <CustomInput
                label="URL del grupo"
                name="urlGroup"
                placeholder="URL del grupo"
              />

              <Button
                type="submit"
                variant="form"
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