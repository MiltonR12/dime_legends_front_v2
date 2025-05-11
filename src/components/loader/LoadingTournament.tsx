
function LoadingTournament() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black pt-20 pb-10 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-purple-300">Cargando información del torneo...</p>
      </div>
    </div>
  )
}

export default LoadingTournament