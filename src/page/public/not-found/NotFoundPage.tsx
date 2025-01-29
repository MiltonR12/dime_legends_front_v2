import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-violet-600">404</h1>
        <p className="text-2xl mt-4">Página no encontrada</p>
        <p className="mt-2">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage