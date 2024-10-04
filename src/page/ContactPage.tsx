import ContactForm from "@/components/form/ContactForm"
import logo from '@/assets/imgs/logomandar.png'
import Redes from "@/components/ui/Redes"
import { FaDiscord, FaFacebook, FaWhatsapp } from "react-icons/fa"

function ContactPage() {
  return (
    <section className="min-h-dvh w-screen flex items-center justify-center pt-28 px-8 pb-8 fondo_blue" >
      <div className="grid grid-cols-2 bg-fondo gap-10 rounded-2xl container overflow-hidden" >
        <div className="p-10" >

          <h3 className="text-7xl font-bold mb-5" >
            Contacto
          </h3>

          <p className="text-lg max-w-lg mb-5 text-info" >
            Si tienes alguna duda, sugerencia o simplemente quieres saludar, no dudes en contactarnos.
          </p>

          <ContactForm />

          <div className="pt-5" >
            <h3 className="text-lg font-semibold mb-2" >
              Mis redes sociales
            </h3>
            <ul className="flex gap-5" >
              <li>
                <Redes
                  title="Facebook"
                  url="https://www.facebook.com/DimeLegendsBolivia"
                >
                  <FaFacebook />
                </Redes>
              </li>
              <li>
                <Redes
                  title="Whatsapp"
                  url="https://wa.me/59177777777"
                >
                  <FaWhatsapp />
                </Redes>
              </li>
              <li>
                <Redes
                  title="Discord"
                  url="https://discord.gg/dimelegends"
                >
                  <FaDiscord />
                </Redes>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-5 fondo_support" >
          <div className="flex items-end justify-end w-full h-[80vh]" >
            <img src={logo} alt="" className="max-w-80" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage