import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { Input } from "./input"
import { Separator } from "./separator"
import {
  Facebook,
  MessageCircle,
  DiscIcon as Discord,
  Mail,
  Send,
  Gamepad2,
  Trophy,
  Users,
  Calendar,
} from "lucide-react"
import SocialButton from "../footer/SocialButton"
import CommunityLink from "../footer/CommunityLink"
import FooterLink from "../footer/FooterLink"

function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-purple-950 to-black border-t border-purple-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">DIME LEGENDS</h3>
            </div>
            <p className="text-purple-300 mb-6">
              Participa en la leyenda de Dime, un mundo de torneos, competencias y aventuras gaming.
            </p>
            <div className="flex gap-3">
              <SocialButton href="https://www.facebook.com/DimeLegendsBolivia" icon={<Facebook size={18} />} />
              <SocialButton href="https://wa.me/59177777777" icon={<MessageCircle size={18} />} />
              <SocialButton href="https://discord.gg/dimelegends" icon={<Discord size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <FooterLink href="/torneos" icon={<Trophy size={16} />} text="Torneos" />
              <FooterLink href="/sobre-nosotros" icon={<Users size={16} />} text="Sobre Nosotros" />
              <FooterLink href="/contacto" icon={<Calendar size={16} />} text="Contacto" />
              {/* <FooterLink href="/faq" icon={<HelpCircle size={16} />} text="Preguntas frecuentes" /> */}
              {/* <FooterLink href="/reglas" icon={<Shield size={16} />} text="Reglas y políticas" /> */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Comunidad</h4>
            <ul className="space-y-3">
              <CommunityLink
                title="Facebook"
                url="https://www.facebook.com/DimeLegendsBolivia"
                icon={<Facebook size={16} className="text-[#1877F2]" />}
                description="Síguenos para noticias y eventos"
              />
              <CommunityLink
                title="WhatsApp"
                url="https://chat.whatsapp.com/LgwUb7ngTC5DYfjO5bOSyM"
                icon={<MessageCircle size={16} className="text-[#25D366]" />}
                description="Únete a nuestro grupo de comunidad"
              />
              <CommunityLink
                title="Discord"
                url="https://discord.gg/hKjwBn7m"
                icon={<Discord size={16} className="text-[#5865F2]" />}
                description="Chatea con otros jugadores"
              />
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Mantente informado</h4>
            <p className="text-purple-300 mb-4">Suscríbete para recibir noticias sobre torneos y eventos exclusivos.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-purple-900/20 border-purple-700 text-white placeholder:text-purple-400 pl-10 focus:border-purple-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {subscribed ? (
                  "¡Suscrito!"
                ) : (
                  <span className="flex items-center gap-2">
                    Suscribirse <Send size={16} />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-purple-800/30" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-400 text-sm">&copy; {currentYear} Dime Legends. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/terminos" className="text-purple-400 hover:text-white transition-colors">
              Términos de servicio
            </Link>
            <Link to="/privacidad" className="text-purple-400 hover:text-white transition-colors">
              Política de privacidad
            </Link>
            <Link to="/cookies" className="text-purple-400 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer
