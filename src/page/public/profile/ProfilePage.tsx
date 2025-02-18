import { authLogout } from "@/app/redux/auth/authSlice"
import { RootState, useAppDispatch } from "@/app/store"
import DirectionIcon from "@/components/icons/DirectionIcon"
import CreatePageModal from "@/components/modals/CreatePageModal"
import SectionPage from "@/components/page/SectionPage"
import { Button } from "@/components/ui/button"
import Image from "@/components/ui/Image"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function ProfilePage() {

  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  if (!user) return null

  return (
    <main className="py-10 md:py-20 min-h-screen" >

      <div className="container mx-auto flex flex-col gap-5" >

        <div>
          <Button asChild className="rounded-full hover:bg-slate-50 hover:text-slate-950" >
            <Link to="/" >
              <DirectionIcon direction="left" /> Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="flex gap-10 p-5 md:p-8" >
          <Image src={user.image} className="w-20 h-20 rounded-full" noImage="CN" />
          <div className="flex flex-col justify-center" >
            <h1 className="font-semibold text-3xl text-primary" >
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-info" >
              {user.email}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border-slate-800 p-5 md:p-8 rounded-3xl">
          <div>
            <h2 className="text-2xl font-semibold">Información</h2>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="text-lg" >Correo</h3>
              <p className="text-slate-400">{user.email}</p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg" >Celular</h3>
              <p className="text-slate-400">{user.contact}</p>
            </div>
          </div>
        </div>

        {
          user?.page ? <SectionPage /> : <div>
            <h3 className="text-white text-2xl font-semibold text-center mb-5" >
              ¿Quieres ser un creador de torneos?
            </h3>
            <CreatePageModal />
          </div>
        }

        <div>
          <Button
            onClick={() => dispatch(authLogout())}
            variant="destructive"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage