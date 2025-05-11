import { motion } from 'framer-motion'

type Props = {
  href: string
  icon: React.ReactNode
}

function SocialButton({ href, icon }: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-900/50 border border-purple-700/50 text-purple-300 hover:text-white hover:bg-purple-800/50 transition-colors"
    >
      {icon}
    </motion.a>
  )
}

export default SocialButton