import { RootState } from "@/app/store"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import { CustomToast } from "@/lib/handleToast"
import { Link } from "react-router-dom"

function SectionPage() {

  const { user } = useSelector((state: RootState) => state.auth)

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    CustomToast.info("URL copiada al portapapeles")
  }

  if (!user) return null

  return (
    <section className="bg-blue-900/70 p-10 rounded-lg" >
      <h3 className="text-center text-2xl font-semibold mb-5" >
        Mi Pagina
      </h3>
      <div className="text-xl font-semibold flex flex-col gap-5" >
        <h4>
          Nombre: {user.page.name}
        </h4>
        <h4 className="text-info" >
          Descripción: {user.page.description}
        </h4>

        <Button
          asChild
          variant="default"
          className="text-fondo bg-white hover:text-white hover:bg-fondo"
        >
          <Link to='/admin' >
            Administrar Torneos
          </Link>
        </Button>

        <div className="p-2 bg-fondo rounded-lg flex items-center justify-between" >
          <h4>
            URL: {user.page.urlPage}
          </h4>
          <Button onClick={() => copyUrl(user.page.urlPage)} >
            Copiar URL
          </Button>
        </div>
        <div className="p-2 bg-fondo rounded-lg flex items-center justify-between" >
          <h4>
            Grupo: {user.page.urlGroup}
          </h4>
          <Button onClick={() => copyUrl(user.page.urlGroup)} >
            Copiar URL
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SectionPage