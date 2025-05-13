import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { authLogout } from "@/app/redux/auth/authSlice"
import { type RootState, useAppDispatch } from "@/app/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import CreatePageModal from "@/components/modals/CreatePageModal"
import SectionPage from "@/components/page/SectionPage"
import { ArrowLeft, User, Mail, Phone, Shield, Settings, LogOut, Edit, Trophy, Calendar, Users } from "lucide-react"

function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState("info")

  if (!user) return null

  const getInitials = () => {
    return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950/50 to-black/90 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar - User Profile Summary */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-purple-800/50 to-pink-800/50"></div>
                <div className="px-6 pb-6 -mt-12">
                  <Avatar className="h-24 w-24 border-4 border-purple-950 shadow-xl">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-700 to-pink-700 text-white text-xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-white">
                        {user.firstName} {user.lastName}
                      </h1>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-purple-300 hover:text-white hover:bg-purple-800/50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-purple-300 text-ellipsis max-w-32 overflow-hidden">{user.email}</p>
                    {user?.page && (
                      <Badge className="mt-2 bg-purple-700 hover:bg-purple-600 text-white">Organizador</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-purple-900/50">
                        <Trophy className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-xs text-purple-300">Torneos</p>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-purple-900/50">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-xs text-purple-300">Equipos</p>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-full bg-purple-900/50">
                        <Calendar className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">8</p>
                    <p className="text-xs text-purple-300">Eventos</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Configuración
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
                  >
                    <Shield className="mr-2 h-4 w-4" /> Privacidad
                  </Button>
                  <Button variant="destructive" className="w-full justify-start" onClick={() => dispatch(authLogout())}>
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-purple-900/30 border border-purple-800/50 p-1">
                  <TabsTrigger
                    value="info"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <User className="h-4 w-4 mr-2" /> Información
                  </TabsTrigger>
                  <TabsTrigger
                    value="page"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <Trophy className="h-4 w-4 mr-2" /> Mi Página
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-6 space-y-6 max-w-[90vw] overflow-hidden">
                  <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Información Personal</CardTitle>
                      <CardDescription className="text-purple-300">
                        Tu información de contacto y detalles personales
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-purple-900/50 mt-1">
                            <User className="h-5 w-5 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white">Nombre Completo</h3>
                            <p className="text-purple-300">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-purple-400 hover:text-white hover:bg-purple-800/50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>

                        <Separator className="bg-purple-800/30" />

                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-purple-900/50 mt-1">
                            <Mail className="h-5 w-5 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white">Correo Electrónico</h3>
                            <p className="text-purple-300 text-ellipsis w-32 overflow-hidden">{user.email}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-purple-400 hover:text-white hover:bg-purple-800/50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>

                        <Separator className="bg-purple-800/30" />

                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-purple-900/50 mt-1">
                            <Phone className="h-5 w-5 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white">Teléfono</h3>
                            <p className="text-purple-300">{user.contact || "No especificado"}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-purple-400 hover:text-white hover:bg-purple-800/50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Seguridad</CardTitle>
                      <CardDescription className="text-purple-300">
                        Gestiona tu contraseña y la seguridad de tu cuenta
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white"
                      >
                        Cambiar contraseña
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="page" className="mt-6">
                  {user?.page ? (
                    <SectionPage />
                  ) : (
                    <Card className="bg-purple-950/30 border-purple-800/50 backdrop-blur-sm">
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl text-white">¿Quieres ser un creador de torneos?</CardTitle>
                        <CardDescription className="text-purple-300">
                          Conviértete en organizador y crea tus propios torneos
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        <CreatePageModal />
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
