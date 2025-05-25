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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Eye,
  Gamepad2,
  Shield,
  Award,
  Loader2,
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
  const [activeTab, setActiveTab] = useState("overview")

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
      <div className="relative h-80 overflow-hidden">
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
            className="bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Panel
          </Button>
        </div>

        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            className={
              isEditing
                ? "bg-purple-700 hover:bg-purple-600"
                : "bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
            }
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </div>

        {/* Tournament Title Overlay */}
        <div className="absolute bottom-6 left-6 z-20">

          <h1 className="text-4xl font-bold text-white mb-2">{tournament.name}</h1>
          <p className="text-slate-300 text-lg">
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
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-700">
              <Eye className="h-4 w-4 mr-2" /> Vista General
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-700">
              <Settings className="h-4 w-4 mr-2" /> Configuración
            </TabsTrigger>
            <TabsTrigger value="danger" className="data-[state=active]:bg-red-700">
              <Shield className="h-4 w-4 mr-2" /> Zona Peligrosa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                <Form className="grid md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-purple-400" /> Información Básica
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-300">
                          Nombre del Torneo
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditing}
                          className="bg-slate-900 border-slate-700 text-white"
                        />
                        {errors.name && touched.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-slate-300">
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
                          className="bg-slate-900 border-slate-700 text-white"
                        />
                        {errors.description && touched.description && (
                          <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="dateStart" className="text-slate-300">
                          Fecha de Inicio
                        </Label>
                        <Input
                          id="dateStart"
                          name="dateStart"
                          type="datetime-local"
                          value={values.dateStart}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditing}
                          className="bg-slate-900 border-slate-700 text-white"
                        />
                        {errors.dateStart && touched.dateStart && (
                          <p className="text-red-400 text-sm mt-1">{errors.dateStart}</p>
                        )}
                      </div>

                      {isEditing && (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-purple-700 hover:bg-purple-600"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Guardar Cambios
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Game and Prize Information */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5 text-purple-400" /> Juego y Premios
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        {game && (
                          <img
                            src={game.image || "/placeholder.svg"}
                            alt={game.name}
                            className="w-16 h-16 rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <Label htmlFor="game" className="text-slate-300">
                            Juego
                          </Label>
                          <Input
                            id="game"
                            name="game"
                            value={values.game}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!isEditing}
                            className="bg-slate-900 border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="prize" className="text-slate-300">
                          Premio
                        </Label>
                        <Input
                          id="prize"
                          name="prize"
                          value={values.prize}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!isEditing}
                          placeholder="Ej: 1000 Bs"
                          className="bg-slate-900 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-slate-300">Premios</Label>
                        <div className="space-y-2">
                          {tournament.award.map((award, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-slate-900 rounded-md">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="text-white">{award}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Form>
              )}
            </Formik>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-400" /> Estado del Torneo
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Controla la visibilidad y estado del torneo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Estado del Torneo</Label>
                      <p className="text-sm text-slate-400">
                        {tournament.status ? "El torneo está activo y visible" : "El torneo está inactivo"}
                      </p>
                    </div>
                    <Switch checked={tournament.status} onCheckedChange={handleStatusToggle} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" /> Configuración de Equipos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Jugadores por equipo</Label>
                      <p className="text-white font-medium">
                        {tournament.config?.minPlayers} - {tournament.config?.maxPlayers}
                      </p>
                    </div>
                    <div>
                      <Label className="text-slate-300">Máximo de equipos</Label>
                      <p className="text-white font-medium">{tournament.config?.maxTeams}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Tipo de torneo</Label>
                    <Badge className={tournament.config?.isFree ? "bg-green-600" : "bg-blue-600"}>
                      {tournament.config?.isFree ? "Gratuito" : "De pago"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="danger" className="space-y-6">
            <Card className="bg-red-950/20 border-red-800">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Zona Peligrosa
                </CardTitle>
                <CardDescription className="text-red-300">
                  Acciones irreversibles que afectarán permanentemente el torneo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-950/30 rounded-lg border border-red-800">
                  <h3 className="text-red-400 font-medium mb-2">Eliminar Torneo</h3>
                  <p className="text-red-300 text-sm mb-4">
                    Esta acción eliminará permanentemente el torneo y todos sus datos asociados. Esta acción no se puede
                    deshacer.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="bg-red-700 hover:bg-red-600">
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar Torneo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-900 border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-300">
                          Esta acción eliminará permanentemente el torneo "{tournament.name}" y todos sus datos
                          asociados. Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-600 text-white">
                          Eliminar Torneo
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default TorneoAdminPage