import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { type RootState, useAppDispatch } from "@/app/store"
import {
  deleteTournamentThunk,
  getTournamentIdThunk,
  updateTournamentThunk,
} from "@/app/redux/tournament/tournamentSlice"
import { ListaGamesImage } from "@/payments/games"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Edit3,
  Save,
  Trash2,
  Camera,
  Users,
  Trophy,
  Settings,
  Gamepad2,
  Shield,
  Award,
  Loader2,
  Calendar,
  DollarSign,
  BarChart3,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react"

// Validation schema
const tournamentSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  game: Yup.string().required("El juego es obligatorio"),
  prize: Yup.string(),
  dateStart: Yup.date().required("La fecha de inicio es obligatoria"),
})

function TorneoAdminPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tournament, isLoading } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (id) dispatch(getTournamentIdThunk(id))
  }, [dispatch, id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-slate-300">Cargando información del torneo...</p>
        </div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Torneo no encontrado</h1>
          <Button onClick={() => navigate("/admin")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al panel
          </Button>
        </div>
      </div>
    )
  }

  const game = ListaGamesImage.find((game) => game.name === tournament.game)

  const handleDelete = () => {
    dispatch(deleteTournamentThunk(tournament._id))
      .unwrap()
      .then(() => {
        navigate("/admin")
      })
  }

  const handleStatusToggle = (checked: boolean) => {
    dispatch(updateTournamentThunk({ _id: tournament._id, status: checked }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Header with Tournament Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 z-10" />
        <img
          src={tournament.image || "/placeholder.svg"}
          alt={tournament.name}
          className="w-full h-full object-cover"
        />

        {/* Header Controls */}
        <div className="absolute top-6 left-6 z-20">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            className="bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Panel
          </Button>
        </div>

        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 backdrop-blur-sm"
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            className={
              isEditing
                ? "bg-purple-700 hover:bg-purple-600"
                : "bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 backdrop-blur-sm"
            }
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </div>

        {/* Tournament Title Overlay */}
        <div className="absolute bottom-6 left-6 z-20">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              className={`${tournament.status ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}
            >
              {tournament.status ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Activo
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3 mr-1" />
                  Inactivo
                </>
              )}
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-900/50 backdrop-blur-sm">
              <Users className="h-3 w-3 mr-1" />
              {tournament.teams?.length || 0} equipos
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{tournament.name}</h1>
          <p className="text-slate-300 text-lg drop-shadow-md">
            <Calendar className="h-4 w-4 inline mr-2" />
            {new Date(tournament.dateStart).toLocaleDateString("es", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Status Control Section */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {tournament.status ? (
                <Eye className="h-5 w-5 text-green-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-red-400" />
              )}
              Estado del Torneo
            </CardTitle>
            <CardDescription className="text-slate-400">
              Controla la visibilidad y disponibilidad del torneo para los usuarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div>
                <Label className="text-slate-300 font-medium">Torneo {tournament.status ? "Activo" : "Inactivo"}</Label>
                <p className="text-sm text-slate-400 mt-1">
                  {tournament.status
                    ? "El torneo está visible y los usuarios pueden registrarse"
                    : "El torneo está oculto y no acepta registros"}
                </p>
              </div>
              <Switch
                checked={tournament.status}
                onCheckedChange={handleStatusToggle}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </CardContent>
        </Card>

        <Formik
          initialValues={{
            name: tournament.name,
            description: tournament.description,
            game: tournament.game,
            prize: tournament.prize || "",
            dateStart: new Date(tournament.dateStart).toISOString().slice(0, 16),
          }}
          validationSchema={tournamentSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateTournamentThunk({ _id: tournament._id, ...values }))
              .unwrap()
              .then(() => {
                setIsEditing(false)
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
            <Form className="space-y-8">
              {/* Basic Information Section */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-400" />
                    Información Básica
                  </CardTitle>
                  <CardDescription className="text-slate-400">Datos principales del torneo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-300 font-medium">
                        Nombre del Torneo
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!isEditing}
                        className="bg-slate-900/50 border-slate-700 text-white mt-2"
                        placeholder="Ingresa el nombre del torneo"
                      />
                      {errors.name && touched.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="dateStart" className="text-slate-300 font-medium">
                        Fecha y Hora de Inicio
                      </Label>
                      <Input
                        id="dateStart"
                        name="dateStart"
                        type="datetime-local"
                        value={values.dateStart}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!isEditing}
                        className="bg-slate-900/50 border-slate-700 text-white mt-2"
                      />
                      {errors.dateStart && touched.dateStart && (
                        <p className="text-red-400 text-sm mt-1">{errors.dateStart}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-300 font-medium">
                      Descripción
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!isEditing}
                      rows={4}
                      className="bg-slate-900/50 border-slate-700 text-white mt-2"
                      placeholder="Describe el torneo, reglas y detalles importantes"
                    />
                    {errors.description && touched.description && (
                      <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-600">
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Guardar Cambios
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Game and Prize Section */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-purple-400" />
                    Juego y Premios
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Configuración del juego y sistema de premios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-slate-300 font-medium">Juego Seleccionado</Label>
                      <div className="flex items-center gap-4 mt-2 p-4 bg-slate-900/50 rounded-lg">
                        {game && (
                          <img
                            src={game.image || "/placeholder.svg"}
                            alt={game.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <Input
                            id="game"
                            name="game"
                            value={values.game}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!isEditing}
                            className="bg-slate-800 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="prize" className="text-slate-300 font-medium">
                        Premio Principal
                      </Label>
                      <div className="relative mt-2">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="prize"
                          name="prize"
                          value={values.prize}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditing}
                          placeholder="Ej: 1000 Bs"
                          className="bg-slate-900/50 border-slate-700 text-white pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {tournament.award && tournament.award.length > 0 && (
                    <div>
                      <Label className="text-slate-300 font-medium">Estructura de Premios</Label>
                      <div className="grid gap-3 mt-2">
                        {tournament.award.map((award, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-white font-medium">
                              {index === 0 ? "1er Lugar" : index === 1 ? "2do Lugar" : `${index + 1}° Lugar`}
                            </span>
                            <span className="text-slate-300 ml-auto">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Form>
          )}
        </Formik>

        {/* Team Configuration Section */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Configuración de Equipos
            </CardTitle>
            <CardDescription className="text-slate-400">
              Parámetros y límites para la participación de equipos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <Label className="text-slate-300 font-medium">Jugadores por Equipo</Label>
                <p className="text-2xl font-bold text-white mt-2">
                  {tournament.config?.minPlayers || 1} - {tournament.config?.maxPlayers || 5}
                </p>
                <p className="text-sm text-slate-400 mt-1">Rango permitido</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <Label className="text-slate-300 font-medium">Máximo de Equipos</Label>
                <p className="text-2xl font-bold text-white mt-2">{tournament.config?.maxTeams || 16}</p>
                <p className="text-sm text-slate-400 mt-1">Límite de participantes</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <Label className="text-slate-300 font-medium">Tipo de Torneo</Label>
                <div className="mt-2">
                  <Badge className={tournament.config?.isFree ? "bg-green-600" : "bg-blue-600"}>
                    {tournament.config?.isFree ? "Gratuito" : "De Pago"}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 mt-1">Modalidad de inscripción</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Section */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              Estadísticas del Torneo
            </CardTitle>
            <CardDescription className="text-slate-400">Información actual sobre la participación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{tournament.teams?.length || 0}</p>
                <p className="text-sm text-slate-400">Equipos Registrados</p>
              </div>

              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {Math.round(((tournament.teams?.length || 0) / (tournament.config?.maxTeams || 16)) * 100)}%
                </p>
                <p className="text-sm text-slate-400">Capacidad Ocupada</p>
              </div>

              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {Math.ceil((new Date(tournament.dateStart).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-sm text-slate-400">Días Restantes</p>
              </div>

              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <Settings className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{tournament.status ? "Activo" : "Inactivo"}</p>
                <p className="text-sm text-slate-400">Estado Actual</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone Section */}
        <Card className="bg-red-950/20 border-red-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Zona Peligrosa
            </CardTitle>
            <CardDescription className="text-red-300">
              Acciones irreversibles que afectarán permanentemente el torneo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-red-950/30 rounded-lg border border-red-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <Trash2 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-red-400 font-semibold text-lg mb-2">Eliminar Torneo</h3>
                  <p className="text-red-300 mb-4">
                    Esta acción eliminará permanentemente el torneo "{tournament.name}" y todos sus datos asociados,
                    incluyendo equipos registrados, configuraciones y estadísticas. Esta acción no se puede deshacer.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="bg-red-700 hover:bg-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Torneo Permanentemente
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-900 border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">¿Estás completamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-300">
                          Esta acción eliminará permanentemente el torneo "{tournament.name}" y todos sus datos
                          asociados. Todos los equipos registrados perderán su inscripción y no podrás recuperar esta
                          información. Esta acción es irreversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-600 text-white">
                          Sí, Eliminar Torneo
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TorneoAdminPage
