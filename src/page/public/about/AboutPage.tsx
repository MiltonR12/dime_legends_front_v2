import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Footer from "@/components/ui/Footer"
import { Trophy, Users, Gamepad2, Star, Crown, Award, Shield, Rocket } from "lucide-react"
import about_fondo from "@/assets/imgs/fondo/about.jpg"
import equipos from "@/assets/imgs/personajes/equipos.png"
import logo from "@/assets/imgs/logos/logomandar.png"
import deathlex from "@/assets/imgs/logos/deathlex.png"
import avatar from "@/assets/imgs/personajes/equipos.png"

// Datos mejorados para estadísticas
const stats = [
  { number: "2,500+", label: "PARTICIPANTES", icon: Users, color: "from-purple-500 to-pink-500" },
  { number: "25+", label: "JUEGOS", icon: Gamepad2, color: "from-blue-500 to-purple-500" },
  { number: "5,000+", label: "INTEGRANTES", icon: Crown, color: "from-pink-500 to-red-500" },
  { number: "50+", label: "CREADORES", icon: Star, color: "from-yellow-500 to-orange-500" },
]

// Valores de la empresa
const values = [
  {
    icon: Trophy,
    title: "Competencia Justa",
    description: "Promovemos la competencia limpia y el juego justo en todos nuestros torneos",
  },
  {
    icon: Users,
    title: "Comunidad Unida",
    description: "Construimos una comunidad inclusiva donde todos los gamers son bienvenidos",
  },
  {
    icon: Shield,
    title: "Seguridad Primero",
    description: "Garantizamos un ambiente seguro y libre de toxicidad para todos",
  },
  {
    icon: Rocket,
    title: "Innovación Constante",
    description: "Mejoramos continuamente nuestra plataforma con nuevas características",
  },
]

// Testimonios mejorados
const enhancedTestimonials = [
  {
    name: "Carlos Rodríguez",
    role: "Capitán de Equipo",
    game: "Mobile Legends",
    comment:
      "Dime Legends ha revolucionado la forma en que participamos en torneos. La plataforma es intuitiva y los premios son increíbles. ¡Hemos ganado 3 torneos este año!",
    rating: 5,
    image: avatar,
    achievement: "Campeón Regional 2024",
  },
  {
    name: "Ana Martínez",
    role: "Streamer & Gamer",
    game: "Free Fire",
    comment:
      "Como creadora de contenido, valoro mucho la profesionalidad de Dime Legends. Los torneos están bien organizados y siempre hay buena comunicación.",
    rating: 5,
    image: avatar,
    achievement: "Top 3 Nacional",
  },
  {
    name: "Miguel López",
    role: "Jugador Profesional",
    game: "PUBG Mobile",
    comment:
      "La variedad de torneos y la calidad de la organización es excepcional. Dime Legends se ha convertido en mi plataforma favorita para competir.",
    rating: 5,
    image: avatar,
    achievement: "MVP del Mes",
  },
  {
    name: "Sofia Vargas",
    role: "Organizadora de Equipos",
    game: "Call of Duty",
    comment:
      "Gestionar mi equipo nunca fue tan fácil. Las herramientas de Dime Legends nos permiten enfocarnos en lo que realmente importa: ganar.",
    rating: 5,
    image: avatar,
    achievement: "Mejor Estratega 2024",
  },
  {
    name: "Diego Fernández",
    role: "Jugador Amateur",
    game: "Clash Royale",
    comment:
      "Empecé como amateur y gracias a Dime Legends he mejorado muchísimo. La comunidad es increíble y siempre hay alguien dispuesto a ayudar.",
    rating: 5,
    image: avatar,
    achievement: "Jugador Revelación",
  },
]

// Creadores mejorados
const creators = [
  {
    name: "Dime Legends",
    role: "Fundador & CEO",
    description: "Visionario detrás de la plataforma, apasionado por crear la mejor experiencia gaming en Bolivia.",
    image: logo,
    speciality: "Estrategia & Liderazgo",
    experience: "5+ años",
  },
  {
    name: "Deathlex",
    role: "Director de Torneos",
    description: "Experto en organización de eventos esports con amplia experiencia en competencias internacionales.",
    image: deathlex,
    speciality: "Gestión de Torneos",
    experience: "4+ años",
  },
  {
    name: "GameMaster Pro",
    role: "Desarrollador Principal",
    description: "Arquitecto de la plataforma tecnológica que hace posible la experiencia Dime Legends.",
    image: logo,
    speciality: "Desarrollo & Tech",
    experience: "6+ años",
  },
  {
    name: "eSports Queen",
    role: "Community Manager",
    description: "Encargada de mantener viva nuestra comunidad y crear conexiones entre gamers.",
    image: logo,
    speciality: "Comunidad & Marketing",
    experience: "3+ años",
  },
  {
    name: "Pro Gamer X",
    role: "Consultor de Juegos",
    description: "Jugador profesional que nos ayuda a entender las necesidades de la comunidad competitiva.",
    image: logo,
    speciality: "Consultoría Gaming",
    experience: "7+ años",
  },
  {
    name: "Tech Wizard",
    role: "Especialista en Streaming",
    description: "Experto en transmisiones en vivo y producción de contenido para nuestros eventos.",
    image: logo,
    speciality: "Streaming & Producción",
    experience: "4+ años",
  },
]

function AboutPage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-950/80 to-black z-10" />

        <img
          src={about_fondo}
          alt="Fondo de la sección sobre nosotros"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-4">
          <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-1.5 backdrop-blur-sm">
            CONOCE NUESTRO MUNDO
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              SOBRE NOSOTROS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto">
            La plataforma gaming que está revolucionando los esports en Bolivia
          </p>
        </div>



      </section>

      {/* Main About Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white">NUESTRA HISTORIA</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Dime Legends es una <span className="text-pink-500">plataforma revolucionaria</span> de torneos gaming
            </h2>

            <div className="space-y-4 text-purple-200 text-lg leading-relaxed">
              <p>
                En <strong className="text-white">Dime Legends</strong>, nuestra misión es proporcionar una plataforma
                accesible y emocionante para la organización y participación en torneos de videojuegos. Creemos en el
                poder de los videojuegos para unir a las personas y crear comunidades vibrantes y apasionadas.
              </p>
              <p>
                Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, permitiendo a los jugadores de
                todos los niveles de habilidad crear y unirse a torneos con facilidad. Desde principiantes hasta
                profesionales, todos tienen un lugar en nuestra comunidad.
              </p>
              <p>
                <strong className="text-white">Únete a nosotros</strong> en Dime Legends y sé parte de una comunidad que
                celebra la pasión por los videojuegos y la competencia justa. ¡Esperamos verte en nuestros próximos
                torneos!
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Trophy className="h-5 w-5 mr-2" />
                Ver Torneos
              </Button>
              <Button
                variant="outline"
                className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
              >
                <Users className="h-5 w-5 mr-2" />
                Únete a la Comunidad
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl" />
              <img
                src={equipos || "/placeholder.svg"}
                alt="Equipo Dime Legends"
                className="relative z-10 w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full object-cover border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 lg:mt-24"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm text-center hover:bg-purple-900/40 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-purple-300 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-purple-950/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white">NUESTROS VALORES</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Lo que nos <span className="text-pink-500">define</span>
            </h2>
            <p className="text-purple-300 text-lg max-w-2xl mx-auto">
              Estos son los principios fundamentales que guían cada decisión y acción en Dime Legends
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm h-full hover:bg-purple-900/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-purple-300 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white">NUESTRO EQUIPO</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Conoce a nuestros <span className="text-pink-500">creadores</span>
          </h2>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            El talentoso equipo detrás de la plataforma gaming más innovadora de Bolivia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm hover:bg-purple-900/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-purple-500 group-hover:border-pink-500 transition-colors duration-300">
                      <AvatarImage src={creator.image || "/placeholder.svg"} alt={creator.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-700 to-pink-700 text-white text-xl">
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                        {creator.experience}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{creator.name}</h3>
                  <p className="text-purple-400 font-medium mb-2">{creator.role}</p>
                  <p className="text-purple-300 text-sm mb-4 leading-relaxed">{creator.description}</p>

                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-purple-300 text-sm">{creator.speciality}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-purple-950/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-600/80 hover:bg-purple-600 text-white">TESTIMONIOS</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Lo que dicen nuestros <span className="text-pink-500">gamers</span>
            </h2>
            <p className="text-purple-300 text-lg max-w-2xl mx-auto">
              Historias reales de éxito de nuestra increíble comunidad gaming
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto px-8">
            <Carousel className="w-full">
              <CarouselContent>
                {enhancedTestimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-purple-900/30 border-purple-800/50 backdrop-blur-sm h-full hover:bg-purple-900/40 transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-purple-500">
                            <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-700 to-pink-700 text-white">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">{testimonial.name}</h4>
                            <p className="text-purple-400 text-sm">{testimonial.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <Badge className="bg-purple-700 text-white text-xs">{testimonial.game}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-purple-200 text-sm leading-relaxed mb-4">"{testimonial.comment}"</p>

                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-yellow-400" />
                          <span className="text-purple-300 text-xs">{testimonial.achievement}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-purple-800/50 hover:bg-purple-700 text-white border-none" />
              <CarouselNext className="bg-purple-800/50 hover:bg-purple-700 text-white border-none" />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-8 lg:p-12 border border-purple-800/50 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para ser parte de la <span className="text-pink-500">leyenda</span>?
            </h2>
            <p className="text-purple-300 text-lg mb-8 max-w-2xl mx-auto">
              Únete a miles de gamers que ya están viviendo la experiencia Dime Legends. Tu próxima victoria te está
              esperando.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Participar en Torneos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white text-lg px-8 py-6"
              >
                <Users className="h-5 w-5 mr-2" />
                Registrarte
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

export default AboutPage
