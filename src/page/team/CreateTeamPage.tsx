import { useParams } from "react-router-dom"
import gamer from '@/assets/imgs/gamer.jpg'
import CreateTeamForm from "@/components/form/CreateTeamForm"

function CreateTeamPage() {

  const { id } = useParams()

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center fondo_blue" >
      <div className="p-10 bg-fondo rounded-2xl grid md:grid-cols-2 gap-10" >
        
        <div>
          <h1 className="text-info font-semibold mb-5 text-3xl text-center" >
            Registrar equipo
          </h1>
          {id && <CreateTeamForm id={id} />}
        </div>

        <div className="hidden md:block" >
          <img src={gamer} alt="gamer" className="max-h-[80vh] object-cover" />
        </div>
      </div>
    </main>
  )
}

export default CreateTeamPage