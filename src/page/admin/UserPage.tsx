import { authLogout } from "@/app/redux/auth/authSlice"
import { RootState, useAppDispatch } from "@/app/store"
import CreatePageModal from "@/components/modals/CreatePageModal"
import SectionPage from "@/components/page/SectionPage"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"

function UserPage() {

  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <main className="pt-24 min-h-screen" >
      <div className="container mx-auto flex flex-col gap-5" >
        <div className="flex gap-10" >
          <img src={user?.avatar} alt="" width={80} className="rounded-full" />
          <div className="flex flex-col justify-center" >
            <h1 className="font-semibold text-3xl text-primary" >
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-info" >
              {user?.email}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold" >
            Información
          </h2>
          <div>
            <div>
              <h3>
                Correo: {user?.email}
              </h3>
              <h3>
                Celular: {user?.contact}
              </h3>
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

export default UserPage