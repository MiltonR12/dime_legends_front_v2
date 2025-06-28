import { motion } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'

type Props = {
  image?: string
  date: Date
  title: string
  description: string
  game: string
  delay?: number
}

function TournamentCard({ image, date, title, description, game, delay = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-purple-900/30 rounded-2xl overflow-hidden border border-purple-800/50 group hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
    >
      <div className="relative overflow-hidden h-[250px]">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-700/50">
          <div className="flex flex-col text-center">
            <p className="text-lg uppercase text-purple-300">{date.toLocaleString("es-ES", { month: "long" })}</p>
            <span className="text-2xl font-bold text-white">{date.getDate()}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="flex justify-between text-purple-300 mb-3">
          <p className="text-sm">30/50 Equipos</p>
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <p className="text-sm">{game}</p>
          </div>
        </div>
        <p className="text-purple-200 mb-4">{description}</p>
      </div>
    </motion.article>
  )
}

export default TournamentCard