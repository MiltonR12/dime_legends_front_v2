import { motion } from 'framer-motion'

type Props = {
  title: string
  description: string
}

function BenefitCard({ title, description }: Props) {
  return (
    <motion.div whileHover={{ x: 5 }} className="border-l-4 border-pink-500 pl-4 py-1">
      <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
      <p className="text-purple-300 text-sm">{description}</p>
    </motion.div>
  )
}

export default BenefitCard