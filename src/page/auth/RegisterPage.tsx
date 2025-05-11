import RegisterForm from "@/components/form/RegisterForm"
import { motion } from "framer-motion"

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black flex flex-col md:flex-row">
      <div className="w-full flex items-center justify-center p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Crear Cuenta
            </h1>
            <p className="text-purple-300">
              Únete a nuestra comunidad y comienza a participar en torneos, gestionar tu equipo y mucho más
            </p>
          </div>
          <div className="bg-purple-900/20 p-8 rounded-2xl border border-purple-800/50 backdrop-blur-sm shadow-[0_0_25px_rgba(168,85,247,0.2)]">
            <RegisterForm />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage