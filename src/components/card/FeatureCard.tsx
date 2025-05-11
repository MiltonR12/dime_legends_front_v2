import { motion } from 'framer-motion'

type Props = {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  delay?: number
}

function FeatureCard({ icon, title, subtitle, description, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="bg-purple-900/30 p-8 rounded-2xl border border-purple-800/50 backdrop-blur-sm group"
    >
      <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-pink-400 font-medium mb-4">{subtitle}</p>
      <p className="text-purple-300">{description}</p>
    </motion.div>
  )
}

export default FeatureCard