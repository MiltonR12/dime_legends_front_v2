import InputNetwork from "@/components/input/InputNetwork"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Form, Formik } from "formik"
import { Plus } from "lucide-react"

function ModalAddNetwork() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Añadir Red
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-950" >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Agregar Red Social
          </AlertDialogTitle>
          <AlertDialogDescription>
            Agrega una red social a tu página para que tus seguidores puedan encontrarte más fácilmente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Formik
          initialValues={{ red: "" }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              <InputNetwork
                label="Nombre de la Red"
                name="red"
                placeholder="url de la red social"
                disabled={isSubmitting}
              />

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isSubmitting} >Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={isSubmitting} >Continue</AlertDialogAction>
              </AlertDialogFooter>
            </Form>
          )}
        </Formik>


      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalAddNetwork