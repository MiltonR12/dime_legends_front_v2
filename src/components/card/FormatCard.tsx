import { motion } from 'framer-motion'

type Props = {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

function FormatCard({ icon, title, description, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-6 mb-6 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300"
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-purple-300 max-w-[250px]">{description}</p>
    </motion.div>
  )
}

export default FormatCard