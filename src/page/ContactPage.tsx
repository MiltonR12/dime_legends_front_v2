import fondo from '@/assets/imgs/fondo/fondo_contacto.jpg'
import Card from "@/components/card/Card"
import { MdOutlineMail } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5";
import { Form, Formik } from 'formik';
import CustomInput from '@/components/form/CustomInput';
import InputTextArea from '@/components/input/InputTextArea';
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/Footer';
import { FaDiscord, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { sendContactApi } from '@/app/api/contact/contactApi';
import { CustomToast } from '@/lib/handleToast';
import * as Yup from 'yup';

const validateSchema = Yup.object().shape({
  firstName: Yup.string().required('Este campo es requerido'),
  lastName: Yup.string().required('Este campo es requerido'),
  email: Yup.string().email('Correo invalido').required('Este campo es requerido'),
  phone: Yup.string().required('Este campo es requerido'),
  message: Yup.string().required('Este campo es requerido'),
})

function ContactPage() {

  return (
    <main className="bg-violetPrimary" >

      <section className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] w-full" >
        <img src={fondo} alt="" className="object-cover w-full h-full" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
          <h1 className="text-white text-3xl md:text-6xl font-semibold" >
            CONTACTO
          </h1>
        </div>
      </section>

      <section className="section_funtiona flex justify-center gap-10 py-20" >
        <div>
          <Card className="bg-opacity-50 flex flex-col justify-between p-8 h-full rounded-3xl" >
            <div>
              <h3 className="text-4xl font-semibold text-white" >
                INFORMACION <br /> DE CONTACTO
              </h3>
              <div className="flex items-center gap-5 pt-5 text-xl text-white/80" >
                <IoLocationOutline className="text-3xl" />
                <p>Boliviz, La Paz El Alto</p>
              </div>
              <div className="flex items-center gap-5 pt-5 text-xl text-white/80" >
                <MdOutlineMail className="text-3xl" />
                <p>miltonaguilar142018@gmail.com</p>
              </div>
            </div>
            <div className='flex gap-5' >
              <a href='https://www.facebook.com/DimeLegendsBolivia' target='_blank' rel='noreferrer'
                className='w-12 h-12 text-3xl rounded-xl border border-white/60 p-2 flex items-center justify-center' >
                <FaFacebookF />
              </a>
              <a href='https://chat.whatsapp.com/LgwUb7ngTC5DYfjO5bOSyM' target='_blank' rel='noreferrer'
                className='w-12 h-12 text-3xl rounded-xl border border-white/60 p-2 flex items-center justify-center' >
                <FaWhatsapp />
              </a>
              <a href='https://discord.gg/hKjwBn7m' target='_blank' rel='noreferrer'
                className='w-12 h-12 text-3xl rounded-xl border border-white/60 p-2 flex items-center justify-center' >
                <FaDiscord />
              </a>
            </div>
          </Card>
        </div>
        <div>
          <Card className="bg-opacity-50 p-8 rounded-3xl w-[500px]" >
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
              }}
              onSubmit={({ email, firstName, lastName, message, phone }, { setSubmitting, resetForm }) => {
                sendContactApi({
                  email,
                  message,
                  phone,
                  name: `${firstName} ${lastName}`
                }).then(() => {
                  CustomToast.success('Mensaje enviado correctamente')
                }).catch(() => {
                  CustomToast.error('Error al enviar el mensaje')
                }).finally(() => {
                  setSubmitting(false)
                  resetForm()
                })
              }}
              validationSchema={validateSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h3 className="text-3xl font-semibold text-white pb-5" >
                    ENVIAR UN MENSAJE
                  </h3>
                  <div className='grid grid-cols-2 gap-10' >
                    <CustomInput
                      label='Nombre'
                      name='firstName'
                      variant='outline'
                    />
                    <CustomInput
                      label='Apellido'
                      name='lastName'
                      variant='outline'
                    />
                  </div>
                  <CustomInput
                    label='Email'
                    name='email'
                    type='email'
                    variant='outline'
                  />
                  <CustomInput
                    label='Telefono'
                    name='phone'
                    variant='outline'
                  />
                  <InputTextArea
                    label='Mensaje'
                    name='message'
                    variant='outline'
                  />
                  <Button type='submit' className='mt-2' variant="rose" disabled={isSubmitting} >
                    Enviar Mensaje
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ContactPage