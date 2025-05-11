import { Link, Outlet } from 'react-router-dom'
import { Gamepad2, Trophy, Users } from "lucide-react"
import type React from "react"
import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'

function AuthLayout() {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="grid md:grid-cols-2 h-screen" >

      <Button asChild variant="outline" className='absolute py-1 h-auto top-4 left-4 z-10'>
        <Link to="/">Volver al inicio</Link>
      </Button>

      <section>
        <Outlet />
      </section>
      <div className="hidden md:flex bg-gradient-to-br from-purple-900/50 to-pink-900/30 relative overflow-hidden">
        {mounted && (
          <>
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Gaming icons floating */}
            <div className="absolute inset-0 z-10">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: Math.random() * 100 - 50 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0.3 + Math.random() * 0.7,
                    scale: 0.5 + Math.random() * 1.5,
                  }}
                  animate={{
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 15 + Math.random() * 20,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {i % 3 === 0 ? (
                    <Gamepad2 className="text-purple-500/30 w-12 h-12" />
                  ) : i % 3 === 1 ? (
                    <Trophy className="text-pink-500/30 w-12 h-12" />
                  ) : (
                    <Users className="text-indigo-500/30 w-12 h-12" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold mb-6 text-white">Plataforma Gaming</h2>
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                  <FeatureCard
                    icon={<Trophy className="w-8 h-8 text-pink-400" />}
                    title="Torneos Exclusivos"
                    description="Participa en torneos exclusivos y gana premios increíbles"
                  />
                  <FeatureCard
                    icon={<Users className="w-8 h-8 text-purple-400" />}
                    title="Forma Tu Equipo"
                    description="Crea tu equipo y compite contra los mejores jugadores"
                  />
                  <FeatureCard
                    icon={<Gamepad2 className="w-8 h-8 text-indigo-400" />}
                    title="Múltiples Juegos"
                    description="Encuentra torneos de tus juegos favoritos en un solo lugar"
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default AuthLayout

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-purple-900/30 p-5 rounded-xl border border-purple-800/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-900/50 rounded-lg">{icon}</div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-purple-300">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}