import { RootState } from "@/app/store"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import { CustomToast } from "@/lib/handleToast"
import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import ModalAddNetwork from "@/page/public/profile/components/ModalAddNetwork"

function SectionPage() {

  const { user } = useSelector((state: RootState) => state.auth)

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    CustomToast.info("URL copiada al portapapeles")
  }

  if (!user?.page) return null
  const page = user.page

  return (
    <section className="flex flex-col gap-10" >

      <div className="bg-slate-900 border-slate-800 p-5 md:p-8 rounded-3xl">
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

          <Button asChild className="bg-slate-950 py-2 h-auto hover:bg-slate-700" >
            <Link to='/admin' >
              Administrar Torneos
            </Link>
          </Button>

        </div>
      </div>

      <div className="bg-slate-900 border-slate-800 p-5 md:p-8 rounded-3xl">
        <div className="flex justify-between items-center pb-8" >
          <h2 className="text-2xl font-semibold">
            Redes Sociales
          </h2>
          <ModalAddNetwork />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaFacebook className="text-blue-500" />
            <input
              value={page.urlPage}
              className="bg-slate-800 border-slate-700 w-full p-2"
              placeholder="URL de Facebook"
            />
            <Button onClick={() => copyUrl(user.page.urlPage)} >
              Copiar URL
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <FaTwitter className="text-sky-500" />
            <input
              value={page.urlGroup}
              className="bg-slate-800 border-slate-700 w-full p-2"
              placeholder="URL de Twitter"
            />
            <Button onClick={() => copyUrl(user.page.urlPage)} >
              Copiar URL
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionPage