import Redes from "./Redes"
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-5 px-3 bg-[#18082E]" >
      <div className="container " >
        <div className="grid grid-cols-3 gap-10" >
          <div className="max-w-72" >
            <h3 className="text-4xl font-semibold pb-5" >
              DIME LEGENDS
            </h3>
            <p className="text-white/60" >
              Participa en la leyenda de Dime, un mundo de aventuras y misterios.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-semibold" >
              Redes Sociales
            </h3>
            <ul>
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
          <div>
            <h3>
              Menu
            </h3>
            <ul>
              <li>
                <a href='#'>
                  Inicio
                </a>
              </li>
              <li>
                <a href='#'>
                  Torneos
                </a>
              </li>
              <li>
                <a href='#'>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-center pt-5" >&copy; 2021 Company, Inc.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer