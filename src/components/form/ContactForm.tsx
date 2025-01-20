import { Formik } from "formik"
import CustomInput from "./CustomInput"
import { Button } from "../ui/button"
import { sendContactApi } from "@/app/api/others/othersApi"
import { CustomToast } from "@/lib/handleToast"
import InputTextArea from "../input/InputTextArea"

function ContactForm() {

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: ""
      }}
      onSubmit={async (values) => {
        try {
          const { message } = await sendContactApi(values)
          console.log(message)
        } catch (error) {
          CustomToast.error('Error al enviar el mensaje')
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>

          <CustomInput
            name="name"
            label="Nombre"
          />

          <CustomInput
            name="email"
            label="Email"
            type="email"
          />

          <InputTextArea
            name="message"
            label="Mensaje"
          />

          <Button disabled={isSubmitting} className="mt-5" type="submit" size="lg" variant="secondary" >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default ContactForm