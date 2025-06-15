import CreateTorneoForm from "@/components/form/CreateTorneoForm"
import gaming from "@/assets/imgs/gaming.jpg"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function CreateTorneoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 to-black">

      <Button asChild variant="rose" className="absolute top-4 left-4 z-20">
        <Link to="/admin" className="text-white">
          Volver al Dashboard
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-2xl">
            <CreateTorneoForm />
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-950/50 z-10"></div>
          <img
            src={gaming || "/placeholder.svg"}
            alt="Gaming background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20"></div>

          {/* Overlay Content */}
          <div className="absolute bottom-8 left-8 right-8 z-30 text-white">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Crea Torneos Épicos
            </h2>
            <p className="text-lg text-purple-200 mb-6">
              Organiza competencias increíbles y conecta con la comunidad gaming más apasionada.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-pink-600 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white"></div>
              </div>
              <span className="text-purple-300 text-sm">+1,500 organizadores confían en nosotros</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateTorneoPage
