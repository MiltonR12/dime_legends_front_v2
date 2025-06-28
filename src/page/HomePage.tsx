import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import Footer from "@/components/ui/Footer"
import { BankDepositIcon, CompleteIcon, MedalIcon, RegisterIcon } from "@/components/icons/globals"
import { FaUsers } from "react-icons/fa"
import { TfiCup } from "react-icons/tfi"
import { RiOrganizationChart } from "react-icons/ri"
import { Gamepad2, Trophy, Zap, ChevronRight, Crown, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import fanny_image from "@/assets/imgs/personajes/fanny.png"
import personajes_image from "@/assets/imgs/personajes/personajes.png"
import esmeralda from "@/assets/imgs/personajes/esmeralda.png"
import banner1 from "@/assets/imgs/banner/pausa.png"
import banner2 from "@/assets/imgs/banner/sabado.png"
import banner3 from "@/assets/imgs/banner/domingo.png"
import banner4 from "@/assets/imgs/banner/flayer.png"
import FeatureCard from "@/components/card/FeatureCard"
import BenefitCard from "@/components/card/BenefitCard"
import FormatCard from "@/components/card/FormatCard"
import TournamentCard from "@/components/card/TournamentCard"
import OrganizerFeature from "@/components/card/OrganizerFeature"

function HomePage() {

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="bg-gradient-to-b from-purple-950 to-black overflow-hidden">
      <section ref={heroRef} className="min-h-screen relative flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0 opacity-30">
          <motion.img
            style={{ y, opacity }}
            src={personajes_image}
            alt="Personajes de fondo"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-8 relative z-10 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <Badge
              className="w-fit mb-6 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5 text-sm backdrop-blur-sm"
              variant="default"
            >
              ¡NUEVA TEMPORADA DE TORNEOS!
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">DIME</span>{" "}
              <span className="text-white">LEGENDS</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-purple-200 mb-8 max-w-xl"
            >
              Participa en la competencia más épica de gaming, forma tu equipo y demuestra que eres el mejor.{" "}
              <span className="font-bold text-white">¡El trono te espera!</span>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto text-lg py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)] border-none transition-all duration-300"
                >
                  <Link to="/torneos" className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" /> Ver Torneos
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg py-6 px-8 border-purple-500 text-purple-300 hover:bg-purple-900/30 hover:text-white"
                >
                  <Link to="/register" className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Crear Cuenta
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-700 flex items-center justify-center text-white">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white">
                  <Gamepad2 className="h-5 w-5" />
                </div>
              </div>
              <p className="text-purple-300 text-sm">+1,500 jugadores ya son parte de nuestra comunidad</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center relative"
          >
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 filter blur-3xl"></div>
            <motion.img
              src={fanny_image}
              alt="Personaje principal"
              className="z-10 max-h-[80vh] object-contain"
              initial={{ y: 20 }}
              animate={{ y: -20 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <a href="#how-it-works" className="text-purple-300 flex flex-col items-center">
              <span className="text-sm mb-2">Descubre más</span>
              <ChevronRight className="h-6 w-6 rotate-90" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5">CÓMO FUNCIONA</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Tu camino hacia la <span className="text-pink-500">gloria</span>
            </h2>
            <p className="text-purple-300 max-w-2xl mx-auto text-lg">
              Descubre cómo nuestra plataforma te ayuda a competir, organizar y ganar en los mejores torneos de gaming
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaUsers className="h-8 w-8 text-purple-400" />}
              title="COMPITE"
              subtitle="en gran escala"
              description="Enfréntate a los mejores jugadores y demuestra tu habilidad en torneos de alto nivel."
              delay={0.1}
            />
            <FeatureCard
              icon={<RiOrganizationChart className="h-8 w-8 text-pink-400" />}
              title="ORGANIZA"
              subtitle="tus propios torneos"
              description="Crea y gestiona tus propios torneos fácilmente con nuestras herramientas intuitivas."
              delay={0.3}
            />
            <FeatureCard
              icon={<TfiCup className="h-8 w-8 text-indigo-400" />}
              title="GANA"
              subtitle="premios increíbles"
              description="Obtén reconocimiento y premios increíbles en cada torneo que participes."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Tournament Format Section */}
      <section className="py-20 px-4 bg-purple-950/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5">
              FORMATO DEL TORNEO
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Cuatro pasos <span className="text-pink-500">simples</span>
            </h2>
            <p className="text-purple-300 max-w-2xl mx-auto text-lg">
              Participar en nuestros torneos es fácil y rápido. Sigue estos pasos y prepárate para la acción
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]">
              <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M 10,50 H 30 L 50,20 H 70 L 90,50"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.4)"
                  strokeWidth="1"
                  strokeDasharray="0 1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FormatCard
                icon={<RegisterIcon />}
                title="REGÍSTRATE"
                description="Crea tu cuenta y únete a los torneos que más te gusten."
                delay={0.1}
              />
              <FormatCard
                icon={<BankDepositIcon />}
                title="DEPOSITA"
                description="Realiza el pago correspondiente para asegurar tu lugar."
                delay={0.3}
              />
              <FormatCard
                icon={<CompleteIcon />}
                title="COMPLETADO"
                description="¡Listo! Ya estás inscrito y listo para competir."
                delay={0.5}
              />
              <FormatCard
                icon={<MedalIcon />}
                title="GANA & APRENDE"
                description="Compite, mejora tus habilidades y gana increíbles premios."
                delay={0.7}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Previous Tournaments Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5">
              TORNEOS ANTERIORES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Revive la <span className="text-pink-500">emoción</span>
            </h2>
            <p className="text-purple-300 max-w-2xl mx-auto text-lg">
              Echa un vistazo a nuestros torneos anteriores y prepárate para los próximos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <TournamentCard
              image={banner1}
              date={new Date()}
              title="LEYENDS OF EPICS"
              description="Este es un torneo para los más valientes y fuertes"
              game="Mobile Legends"
              delay={0.1}
            />
            <TournamentCard
              image={banner2}
              date={new Date()}
              title="LEGENDS OF THE STORM"
              description="Se parte de la leyenda y demuestra tus habilidades"
              game="Mobile Legends"
              delay={0.3}
            />
            <TournamentCard
              image={banner3}
              date={new Date()}
              title="LA ULTIMA BATALLA"
              description="Demuestra que eres el mejor en la última batalla"
              game="Mobile Legends"
              delay={0.5}
            />
            <TournamentCard
              image={banner4}
              date={new Date()}
              title="STORM LEGENDS"
              description="Demuestra que eres el mejor en la última batalla"
              game="Mobile Legends"
              delay={0.7}
            />
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="text-lg py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)] border-none transition-all duration-300"
              >
                <Link to="/torneos" className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" /> Ver todos los torneos
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-purple-950/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <motion.img
            src={esmeralda}
            alt="Personaje"
            className="h-full object-contain object-right"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-pink-600/80 hover:bg-pink-600 text-white px-4 py-1.5">PARA ORGANIZADORES</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Conviértete en <span className="text-pink-500">organizador</span>
              </h2>
              <p className="text-purple-300 text-lg mb-8">
                ¿Quieres crear tus propios torneos? Nuestra plataforma te ofrece todas las herramientas necesarias para
                organizar torneos exitosos y atraer a los mejores jugadores.
              </p>

              <div className="space-y-4 mb-8">
                <OrganizerFeature
                  icon={<Calendar className="h-5 w-5 text-pink-400" />}
                  title="Programa torneos fácilmente"
                />
                <OrganizerFeature
                  icon={<Users className="h-5 w-5 text-pink-400" />}
                  title="Gestiona equipos y participantes"
                />
                <OrganizerFeature
                  icon={<Trophy className="h-5 w-5 text-pink-400" />}
                  title="Configura premios y recompensas"
                />
                <OrganizerFeature
                  icon={<Zap className="h-5 w-5 text-pink-400" />}
                  title="Transmite en vivo tus eventos"
                />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="text-lg py-6 px-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.5)] border-none transition-all duration-300"
                >
                  <Link to="/organizer/register" className="flex items-center gap-2">
                    <Crown className="h-5 w-5" /> Convertirme en organizador
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-purple-900/30 p-8 rounded-2xl border border-purple-800/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Beneficios para organizadores</h3>
              <div className="space-y-6">
                <BenefitCard
                  title="Ingresos adicionales"
                  description="Genera ingresos a través de las inscripciones y patrocinios de tus torneos."
                />
                <BenefitCard
                  title="Herramientas profesionales"
                  description="Accede a herramientas de gestión de torneos de nivel profesional."
                />
                <BenefitCard
                  title="Comunidad activa"
                  description="Conecta con una comunidad activa de jugadores apasionados por los esports."
                />
                <BenefitCard
                  title="Soporte dedicado"
                  description="Recibe soporte dedicado para resolver cualquier problema durante tus eventos."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto relative z-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              ¿Listo para <span className="text-pink-500">competir</span>?
            </h2>
            <p className="text-purple-300 text-xl mb-10">
              ¡Regístrate ahora y comienza a competir en los torneos más emocionantes! Demuestra tus habilidades y gana
              premios increíbles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto text-lg py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.5)] border-none transition-all duration-300"
                >
                  <Link to="/register" className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Crear cuenta
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg py-6 px-8 border-purple-500 text-purple-300 hover:bg-purple-900/30 hover:text-white"
                >
                  <Link to="/torneos" className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" /> Ver torneos
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default HomePage
